function Sidebar({
  role,
  activePage,
  onNavigate,
  onExit
}) {
  const menuItems = {

    patient: [
      {
        id: "dashboard",
        label: "Overview",
        icon: "⌂"
      },
      {
        id: "facilities",
        label: "Find Facility",
        icon: "⌖"
      },
      {
        id: "triage",
        label: "Digital Triage",
        icon: "✚"
      },
      {
        id: "referrals",
        label: "My Referrals",
        icon: "↗"
      },
      {
        id: "medicines",
        label: "Medicine & Diagnostics",
        icon: "▣"
      },
      {
        id: "followup",
        label: "Follow-up",
        icon: "♥"
      }
    ],

    worker: [
      {
        id: "dashboard",
        label: "Dashboard",
        icon: "⌂"
      },
      {
        id: "patients",
        label: "Patients",
        icon: "♙"
      },
      {
        id: "triage",
        label: "Digital Triage",
        icon: "✚"
      },
      {
        id: "referrals",
        label: "Referrals",
        icon: "↗"
      },
      {
        id: "followup",
        label: "Follow-up",
        icon: "♥"
      },
      {
        id: "facilities",
        label: "Facility Services",
        icon: "▣"
      }
    ],

    doctor: [
      {
        id: "dashboard",
        label: "Dashboard",
        icon: "⌂"
      },
      {
        id: "queue",
        label: "Consultation Queue",
        icon: "▤"
      },
      {
        id: "referrals",
        label: "Referrals",
        icon: "↗"
      },
      {
        id: "patients",
        label: "Patient Records",
        icon: "♙"
      },
      {
        id: "followup",
        label: "Follow-up",
        icon: "♥"
      }
    ],

    admin: [
      {
        id: "dashboard",
        label: "Dashboard",
        icon: "⌂"
      },
      {
        id: "facilities",
        label: "Facilities",
        icon: "⌖"
      },
      {
        id: "referrals",
        label: "Referral Analytics",
        icon: "↗"
      },
      {
        id: "gaps",
        label: "Care Gaps",
        icon: "⚠"
      },
      {
        id: "quality",
        label: "Quality Dashboard",
        icon: "◈"
      }
    ]

  };

  const items = menuItems[role] || [];

  return (
    <aside className="dashboard-sidebar">

      <div className="sidebar-brand">

        <button
          className="sidebar-logo-button"
          onClick={() => onNavigate("dashboard")}
        >

          <div className="sidebar-logo">
            ✚
          </div>

          <div>
            <strong>
              SwasthyaSetu
            </strong>

            <span>
              Connected Care
            </span>
          </div>

        </button>

      </div>

      <div className="sidebar-section-title">
        MAIN MENU
      </div>

      <nav className="sidebar-navigation">

        {items.map((item) => (

          <button
            key={item.id}
            className={
              activePage === item.id
                ? "sidebar-item active"
                : "sidebar-item"
            }
            onClick={() => onNavigate(item.id)}
          >

            <span className="sidebar-item-icon">
              {item.icon}
            </span>

            <span>
              {item.label}
            </span>

          </button>

        ))}

      </nav>

      <div className="sidebar-bottom">

        <div className="sidebar-help">

          <div className="sidebar-help-icon">
            ?
          </div>

          <div>
            <strong>
              Need help?
            </strong>

            <p>
              Contact your support team.
            </p>

            <button>
              Get Support →
            </button>
          </div>

        </div>

        <button
          className="sidebar-exit"
          onClick={onExit}
        >
          <span>
            ↩
          </span>

          Exit Portal
        </button>

      </div>

    </aside>
  );
}

export default Sidebar;