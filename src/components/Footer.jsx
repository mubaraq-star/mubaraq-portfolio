import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <span className="footer-logo">MA.</span>
        <span className="footer-copy">
          © {new Date().getFullYear()} Mubaraq Abdulrahmon. All rights reserved.
        </span>
        <span className="footer-built">
          Built with React &amp; Vite
        </span>
      </div>
    </footer>
  );
}
