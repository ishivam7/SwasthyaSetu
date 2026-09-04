import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  /* =========================
     GET ROLE FROM URL
  ========================= */

  const params = new URLSearchParams(location.search);
  const role = params.get("role");

  /* =========================
     LOGIN STATES
  ========================= */

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  /* =========================
     ROLE NAMES
  ========================= */

  const roleNames = {
    patient: "Patient",
    "health-worker": "Health Worker",
    doctor: "Doctor",
    admin: "Administrator",
  };

  /* =========================
     CURRENT ROLE
  ========================= */

  const currentRole =
    roleNames[role] || "Healthcare User";

  /* =========================
     REGISTER FUNCTION
  ========================= */

  const handleRegister = () => {
    if (!role) {
      navigate("/roles");
      return;
    }

    navigate(`/registration?role=${role}`);
  };

  /* =========================
     LOGIN FUNCTION
  ========================= */

  const handleLogin = (e) => {
    e.preventDefault();

    /*
      FRONTEND DEMO LOGIN

      Backend authentication abhi nahi hai,
      isliye role ke according dashboard open hoga.
    */

    // PATIENT
    if (role === "patient") {
      navigate("/patient/dashboard");
      return;
    }

    // DOCTOR
    if (role === "doctor") {
      navigate("/doctor-dashboard");
      return;
    }

    // HEALTH WORKER
    if (role === "health-worker") {
      navigate("/worker-dashboard");
      return;
    }

    // ADMIN
    if (role === "admin") {
      navigate("/admin-dashboard");
      return;
    }

    // NO ROLE
    alert("Please select a role first.");
    navigate("/roles");
  };

  return (
    <div className="login-page">

      {/* =====================================================
          LEFT SECTION
      ===================================================== */}

      <section className="login-left">

        <div className="login-left-overlay"></div>

        <div className="login-left-content">

          {/* CHANGE ROLE */}

          <button
            className="change-role-btn"
            onClick={() => navigate("/roles")}
          >
            ← Change Role
          </button>

          {/* BRAND */}

          <div className="login-brand">

            <div className="login-brand-icon">
              +
            </div>

            <span>
              SwasthyaSetu
            </span>

          </div>

          {/* INTRODUCTION */}

          <div className="login-introduction">

            <span className="login-small-label">
              SMART RURAL HEALTHCARE
            </span>

            <h1>
              Healthcare
              <br />
              <span>
                Without Boundaries.
              </span>
            </h1>

            <p>
              Connecting patients, healthcare workers, doctors and
              healthcare facilities through one intelligent care
              continuity platform.
            </p>

          </div>

          {/* HIGHLIGHTS */}

          <div className="login-highlights">

            <div className="highlight-item">

              <div>
                ✓
              </div>

              <span>
                Connected Healthcare Network
              </span>

            </div>

            <div className="highlight-item">

              <div>
                ✓
              </div>

              <span>
                Smart Facility Recommendation
              </span>

            </div>

            <div className="highlight-item">

              <div>
                ✓
              </div>

              <span>
                Continuous Care & Follow-up
              </span>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          RIGHT SECTION
      ===================================================== */}

      <section className="login-right">

        <div className="login-card">

          {/* MOBILE BRAND */}

          <div className="mobile-brand">

            <div className="login-brand-icon">
              +
            </div>

            <span>
              SwasthyaSetu
            </span>

          </div>

          {/* LOGIN HEADER */}

          <div className="login-header">

            <span className="selected-role">
              {currentRole}
            </span>

            <h2>
              Welcome Back
            </h2>

            <p>
              Sign in to continue to your SwasthyaSetu account.
            </p>

          </div>

          {/* LOGIN FORM */}

          <form onSubmit={handleLogin}>

            {/* EMAIL */}

            <div className="input-group">

              <label htmlFor="email">
                Email or Mobile Number
              </label>

              <div className="input-box">

                <span className="field-icon">
                  ✉
                </span>

                <input
                  id="email"
                  type="text"
                  placeholder="Enter email or mobile number"
                  required
                />

              </div>

            </div>

            {/* PASSWORD */}

            <div className="input-group">

              <div className="password-heading">

                <label htmlFor="password">
                  Password
                </label>

                <button
                  type="button"
                  onClick={() =>
                    alert(
                      "Password recovery will be connected later."
                    )
                  }
                >
                  Forgot Password?
                </button>

              </div>

              <div className="input-box">

                <span className="field-icon">
                  🔒
                </span>

                <input
                  id="password"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Enter your password"
                  required
                />

                <button
                  type="button"
                  className="show-password"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                >
                  {showPassword
                    ? "Hide"
                    : "Show"}
                </button>

              </div>

            </div>

            {/* REMEMBER ME */}

            <label className="remember-me">

              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) =>
                  setRememberMe(
                    e.target.checked
                  )
                }
              />

              <span>
                Remember me
              </span>

            </label>

            {/* SIGN IN BUTTON */}

            <button
              type="submit"
              className="login-button"
            >
              Sign In

              <span>
                →
              </span>

            </button>

          </form>

          {/* =================================================
              REGISTER YOURSELF
          ================================================= */}

          <div className="login-register-section">

            <p>
              Don't have an account?
            </p>

            <button
              type="button"
              className="register-yourself-btn"
              onClick={handleRegister}
            >
              Register Yourself
            </button>

          </div>

          {/* DIVIDER */}

          <div className="login-divider">

            <span>
              OR
            </span>

          </div>

          {/* DIFFERENT ROLE */}

          <button
            className="different-role-btn"
            onClick={() =>
              navigate("/roles")
            }
          >
            Continue with a different role
          </button>

          {/* SECURITY */}

          <div className="security-message">

            🔐 Your healthcare information is protected
            with secure access controls.

          </div>

        </div>

        {/* FOOTER */}

        <div className="login-footer">

          <span>
            © 2026 SwasthyaSetu
          </span>

          <span>
            Smart Rural Healthcare Access & Care Continuity
          </span>

        </div>

      </section>

    </div>
  );
}

export default Login;