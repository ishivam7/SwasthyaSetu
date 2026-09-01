function Topbar({
  role,
  onRoleChange,
  onHome
}) {
  const roleNames = {
    patient: "Patient",
    worker: "Health Worker",
    doctor: "Doctor",
    admin: "Administrator"
  };

  const roleName =
    roleNames[role] || "User";

  return (
    <header className="dashboard-topbar">

      <div className="topbar-left">

        <button
          className="mobile-home-button"
          onClick={onHome}
        >
          ←
        </button>

        <div className="topbar-title">
          <span>
            SWASTHYASETU
          </span>

          <strong>
            Healthcare Network
          </strong>
        </div>

      </div>

      <div className="topbar-actions">

        <div className="connectivity-status">
          <span className="connectivity-dot"></span>

          <span>
            Low-connectivity ready
          </span>
        </div>

        <button
          className="language-button"
          title="Language"
        >
          <span>
            अ
          </span>

          <span>
            A
          </span>
        </button>

        <button
          className="notification-button"
          title="Notifications"
        >
          🔔

          <span className="notification-count">
            3
          </span>
        </button>

        <button
          className="user-profile-button"
          onClick={onRoleChange}
        >

          <span className="user-avatar">
            👤
          </span>

          <span className="user-profile-info">

            <strong>
              {roleName}
            </strong>

            <small>
              View profile
            </small>

          </span>

          <span>
           ⌄
          </span>

        </button>

      </div>

    </header>
  );
}

export default Topbar;