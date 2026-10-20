---
title: PostgreSQL Performance Optimisation Strategies
category: software-engineering
tags: [PostgreSQL, Performance, Databases, Indexing]
excerpt: Most slow APIs are slow databases in disguise. A practical, measurement-first guide to finding and fixing PostgreSQL bottlenecks.
date: 2026-10-20
status: published
---

When an API gets slow, the database is usually where the time goes. The good news is that PostgreSQL tells you exactly where, if you know where to look. This is the process I follow, in order: measure, read the plan, fix the access pattern, then tune the server.

## 1. Measure before you change anything

Guessing which query is slow wastes time. Enable `pg_stat_statements`, which records execution statistics for every query shape:

```sql
-- requires shared_preload_libraries = 'pg_stat_statements'
CREATE EXTENSION IF NOT EXISTS pg_stat_statements;

SELECT query, calls, mean_exec_time, total_exec_time
FROM pg_stat_statements
ORDER BY total_exec_time DESC
LIMIT 10;
```

Sort by **total** time, not just mean time. A 5 ms query called a million times a day costs more than a 2-second report that runs once. Fix the queries at the top of this list first.

## 2. Read the query plan

For each expensive query, run it with `EXPLAIN (ANALYZE, BUFFERS)` and look for three things:

- **Sequential scans on large tables** where you expected an index to be used.
- **Estimated rows far from actual rows.** If the planner thinks a step returns 10 rows and it returns 100,000, it will choose a bad plan. Outdated statistics are the usual cause, so run `ANALYZE` on the table.
- **Sorts or hashes spilling to disk**, shown as `Sort Method: external merge`. The query needs more memory or, better, an index that returns rows already in order.

`ANALYZE` actually runs the query, so be careful with `UPDATE` or `DELETE` statements. Wrap them in a transaction and roll back.

## 3. Index for the queries you actually run

An index helps when it matches how a query filters and sorts. For a composite index, put **equality** columns first and **range or sort** columns after:

```sql
-- Supports: WHERE customer_id = $1 ORDER BY created_at DESC
CREATE INDEX CONCURRENTLY idx_orders_customer_created
  ON orders (customer_id, created_at DESC);
```

Two variations are worth knowing:

```sql
-- Partial index: only index the rows a hot query cares about
CREATE INDEX CONCURRENTLY idx_orders_pending
  ON orders (created_at) WHERE status = 'pending';

-- Covering index: answer the query from the index alone
CREATE INDEX CONCURRENTLY idx_orders_customer_total
  ON orders (customer_id) INCLUDE (total_amount);
```

Always use `CONCURRENTLY` on production tables. Without it, creating an index blocks writes for the whole build.

Indexes are not free: every insert and update must maintain them. Check for indexes that are never used and drop them:

```sql
SELECT relname AS table_name, indexrelname AS index_name, idx_scan
FROM pg_stat_user_indexes
WHERE idx_scan = 0
ORDER BY pg_relation_size(indexrelid) DESC;
```

Indexes that enforce a unique constraint will show up here too. Keep those.

## 4. Fix the access patterns in your application

Many database problems start in application code.

**N+1 queries.** An ORM loop that loads 50 orders and then queries each order's customer separately makes 51 round trips. Load related rows in one query with a join or `WHERE id = ANY($1)`, or use your ORM's eager-loading option.

**Deep `OFFSET` pagination.** `OFFSET 100000` still reads and discards 100,000 rows. Keyset pagination jumps straight to the next page using the last row the client saw:

```sql
SELECT id, created_at, total_amount
FROM orders
WHERE (created_at, id) < ($1, $2)
ORDER BY created_at DESC, id DESC
LIMIT 20;
```

Back it with an index on `(created_at DESC, id DESC)` and every page is equally fast, whether it is the first or the ten-thousandth.

**Selecting everything.** `SELECT *` pulls wide columns (JSON blobs, long text) across the network even when the API returns three fields. Select what you need.

## 5. Pool your connections

Each PostgreSQL connection is a separate server process with its own memory. Hundreds of idle connections from scaled-out application instances waste resources and can slow down the whole database.

- Use a connection pool in the application, and keep it **smaller than you would guess**. A modest pool that queues requests briefly often beats a huge pool where every query competes for CPU.
- When many instances or serverless functions connect, put **PgBouncer** (or your cloud provider's equivalent) in front of the database. In transaction mode, check how your driver handles prepared statements and session settings.

## 6. Keep vacuum and statistics healthy

PostgreSQL never updates rows in place. Updates and deletes leave dead rows behind, which **autovacuum** cleans up. On busy tables, the default settings can fall behind, causing bloat and slower scans.

```sql
SELECT relname, n_live_tup, n_dead_tup, last_autovacuum, last_autoanalyze
FROM pg_stat_user_tables
ORDER BY n_dead_tup DESC
LIMIT 10;
```

If a hot table carries a large share of dead rows, lower its vacuum threshold so cleanup runs more often:

```sql
ALTER TABLE orders SET (autovacuum_vacuum_scale_factor = 0.02);
```

When two columns are strongly correlated (for example `city` and `postcode`), the planner can misjudge combined filters. `CREATE STATISTICS` lets it learn the relationship.

## 7. Tune the server last

Configuration changes help, but only after the queries are sensible. Common starting points:

- `shared_buffers` around a quarter of system memory on a dedicated database server.
- `effective_cache_size` set to roughly how much memory the OS can use for file caching, so the planner knows indexes are likely to be cached.
- `work_mem` raised carefully. It applies **per sort or hash operation**, not per connection, so a high value multiplied across many concurrent queries can exhaust memory.

On managed databases (RDS, Cloud SQL, Azure), many of these are pre-tuned. Change one setting at a time and measure the effect.

## 8. Plan for growth

For tables that only ever grow, such as events, logs or tracking points, consider **partitioning by time**. Queries for recent data touch only recent partitions, and removing old data becomes a fast `DROP` of a partition instead of a slow bulk `DELETE`.

## A quick checklist

1. `pg_stat_statements` enabled, top queries reviewed regularly.
2. Every hot query checked with `EXPLAIN (ANALYZE, BUFFERS)`.
3. Composite indexes match filter and sort order, unused indexes removed.
4. No N+1 queries, no deep `OFFSET` pagination, no unnecessary `SELECT *`.
5. Connections pooled, PgBouncer in front of large fleets.
6. Autovacuum keeping up on the busiest tables.
7. Server settings changed one at a time, with measurements.

Most of the performance wins come from steps 1 to 4. Measure first, fix the worst query, and repeat.
