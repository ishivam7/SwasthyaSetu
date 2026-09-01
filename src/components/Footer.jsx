function Footer({ onGetStarted }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">

      <div className="footer-main">

        <div className="footer-brand">

          <div className="footer-logo">
            ✚
          </div>

          <div>
            <h3>
              SwasthyaSetu
            </h3>

            <p>
              Smart Rural Healthcare Access
              <br />
              & Care Continuity Platform.
            </p>
          </div>

        </div>

        <div className="footer-column">

          <h4>
            Platform
          </h4>

          <a href="#features">
            Features
          </a>

          <a href="#how-it-works">
            How It Works
          </a>

          <a href="#impact">
            Impact
          </a>

          <button onClick={onGetStarted}>
            Get Started
          </button>

        </div>

        <div className="footer-column">

          <h4>
            Care Network
          </h4>

          <span>
            Patients
          </span>

          <span>
            Health Workers
          </span>

          <span>
            Doctors
          </span>

          <span>
            Administrators
          </span>

        </div>

        <div className="footer-column">

          <h4>
            Principles
          </h4>

          <span>
            Secure by design
          </span>

          <span>
            Role-based access
          </span>

          <span>
            Multilingual ready
          </span>

          <span>
            Low-connectivity ready
          </span>

        </div>

      </div>

      <div className="footer-bottom">

        <p>
          © {currentYear} SwasthyaSetu. All rights reserved.
        </p>

        <div>
          <span>
            Secure
          </span>

          <span>
            •
          </span>

          <span>
            Accessible
          </span>

          <span>
            •
          </span>

          <span>
            Care-focused
          </span>
        </div>

      </div>

    </footer>
  );
}

export default Footer;