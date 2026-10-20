---
title: API Security Best Practices
category: software-engineering
tags: [API Security, OWASP, Authentication, NestJS]
excerpt: Most API breaches are not clever hacks. They are missing checks. A practical guide to the controls every production API needs, mapped to the OWASP API Security Top 10.
date: 2026-10-20
status: published
---

Most API breaches are not sophisticated attacks. They are a missing ownership check, a token that never expires, or an endpoint nobody remembered existed. The [OWASP API Security Top 10 (2023)](https://owasp.org/API-Security/editions/2023/en/0x11-t10/) is a good map of these failures. Here are the controls I treat as non-negotiable, with notes on where each fits in a Node.js or NestJS backend.

## 1. Check ownership on every object (API1: Broken Object Level Authorization)

This is the most common serious API flaw. A user requests `GET /orders/1042`, the API confirms they are logged in, and returns the order without checking whether it is **their** order. Change the ID and you can read someone else's data.

The fix is to scope every lookup to the caller:

```ts
const order = await this.orders.findOne({
  where: { id: orderId, customerId: user.id },
});
if (!order) throw new NotFoundException();
```

Return `404` rather than `403` for objects the caller does not own, so the API does not confirm the object exists. Random UUIDs make IDs harder to guess, but they are not a replacement for this check.

## 2. Get authentication right (API2: Broken Authentication)

- **Keep access tokens short-lived**, typically 5 to 15 minutes, so a leaked token expires quickly.
- **Rotate refresh tokens** on every use, store only a hash of them, and if an old refresh token is ever reused, revoke the whole session. Reuse means it was stolen.
- **Pin the JWT algorithm** when verifying. Never let the token header decide which algorithm is used.
- **Do not put sensitive data in a JWT.** The payload is only base64-encoded, so anyone holding the token can read it.
- **Rate-limit login, signup and password-reset endpoints**, and use a slow password hash such as Argon2id or bcrypt.

## 3. Control which fields can be read and written (API3: Broken Object Property Level Authorization)

Two mirror-image mistakes live here:

- **Mass assignment:** the API copies the request body into the database model, so a client can set fields it should never touch, like `role` or `balance`.
- **Excessive data exposure:** the API returns the whole database row, including password hashes or internal notes, and relies on the frontend to hide them.

Accept input only through explicit DTOs and reject unknown fields. In NestJS:

```ts
app.useGlobalPipes(
  new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
);
```

For output, map entities to response objects that list exactly the fields each client may see.

## 4. Limit resource consumption (API4: Unrestricted Resource Consumption)

Every endpoint should have limits, or one client can exhaust your database, bandwidth or third-party bill:

- **Rate limits** per user and per IP, for example with `@nestjs/throttler` or at the API gateway.
- **A maximum page size** on list endpoints, enforced on the server.
- **Request body size limits** and **upload size limits**.
- **Timeouts** on database queries and outbound HTTP calls.

Pay extra attention to endpoints that cost money per call, such as SMS, email or AI APIs. Attackers abuse them precisely because each request costs you.

## 5. Deny by default for privileged functions (API5: Broken Function Level Authorization)

Admin and internal endpoints are often protected only by being undocumented. Instead, apply authorization globally and require every route to opt in to access:

```ts
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!roles) return true; // public or authenticated-only routes
    const { user } = context.switchToHttp().getRequest();
    return roles.some(role => user?.roles?.includes(role));
  }
}
```

Register guards globally, so forgetting a decorator fails safe rather than open.

## 6. Protect sensitive business flows (API6)

Some endpoints are technically correct but easy to abuse at scale: buying limited stock, creating accounts, claiming promotions or booking slots. Add friction where it matters, such as per-account limits, device or behaviour checks, and CAPTCHA on high-risk actions, without punishing normal users.

## 7. Never fetch a URL blindly (API7: Server-Side Request Forgery)

Features like "import from URL", webhooks or link previews make your server fetch an address supplied by a user. Without checks, an attacker can point it at internal services or the cloud metadata endpoint (`169.254.169.254`) to steal credentials.

- Allow-list domains where possible.
- Resolve the hostname and block private, loopback and link-local IP ranges.
- Disable automatic redirects, or re-check the address after each one.

## 8. Harden the configuration (API8: Security Misconfiguration)

- **HTTPS everywhere**, with HSTS.
- **CORS is not authentication.** Allow specific origins, and never reflect an arbitrary `Origin` while also allowing credentials.
- **Return generic error messages** to clients. Stack traces and SQL errors belong in your logs, not your responses.
- **Keep secrets out of the repository.** Use a secrets manager or your platform's encrypted environment variables, and rotate anything that has ever been exposed.
- **Set security headers** with a library such as Helmet.

## 9. Know every API you run (API9: Improper Inventory Management)

Old API versions, staging environments with production data and forgotten debug endpoints are frequent entry points. Keep an inventory, generate OpenAPI documentation from code so it stays accurate, and retire old versions on a schedule.

## 10. Distrust the APIs you call (API10: Unsafe Consumption of APIs)

Data from third-party APIs and webhooks is user input too. Validate it, verify webhook signatures, set timeouts, and do not follow redirects or execute instructions from responses without checks.

## Logging and monitoring

You cannot respond to an attack you cannot see:

- Log authentication failures, authorization denials and rate-limit hits, with user and request IDs.
- **Never log passwords, tokens, card numbers or full personal data.**
- Alert on unusual patterns, such as one account reading thousands of records or a spike in `401` and `403` responses.

## A pre-launch checklist

1. Every object lookup is scoped to the caller.
2. Short-lived access tokens, rotated refresh tokens, pinned JWT algorithm.
3. Explicit input DTOs with unknown fields rejected, explicit response shapes.
4. Rate limits, page-size limits, body-size limits and timeouts.
5. Authorization applied globally, deny by default.
6. Outbound requests to user-supplied URLs are validated.
7. HTTPS, strict CORS, generic errors, secrets outside the repo.
8. An up-to-date inventory of every API and version in production.
9. Third-party data validated, webhook signatures verified.
10. Security events logged and alerted on, with no secrets in the logs.

Security is not a feature you add at the end. It is a set of defaults you build in from the first endpoint, so that the easy path for every developer is also the safe one.
