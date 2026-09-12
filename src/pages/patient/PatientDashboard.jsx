// src/pages/PatientDashboard.jsx
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axiosClient.js";
import FacilityMap from "../../components/FacilityMap.jsx";
import "./PatientDashboard.css";

function PatientDashboard() {
  const navigate = useNavigate();

  // =========================================================
  // BASIC UI STATE
  // =========================================================
  const [activeMenu, setActiveMenu] = useState("Dashboard");
  const [showProfile, setShowProfile] = useState(false);
  const [mobileSidebar, setMobileSidebar] = useState(false);
  const [menuHistory, setMenuHistory] = useState([]);

  // =========================================================
  // FACILITY & MAP STATE
  // =========================================================
  const [facilitySearch, setFacilitySearch] = useState("");
  const [facilityFilter, setFacilityFilter] = useState("All Facilities");
  const [facilityViewMode, setFacilityViewMode] = useState("grid");
  const [selectedFacility, setSelectedFacility] = useState(null);
  const [facilities, setFacilities] = useState([]);

  // =========================================================
  // SMART RECOMMENDATION
  // =========================================================
  const [recommendationType, setRecommendationType] = useState("General");
  const [recommendationLocation, setRecommendationLocation] = useState("Choubeypur");
  const [selectedPreferences, setSelectedPreferences] = useState(["Nearby"]);
  const [hasRecommended, setHasRecommended] = useState(false);

  // =========================================================
  // TRIAGE
  // =========================================================
  const [triageSymptoms, setTriageSymptoms] = useState([]);
  const [triageSeverity, setTriageSeverity] = useState("");
  const [triageDuration, setTriageDuration] = useState("");
  const [triageAgeGroup, setTriageAgeGroup] = useState("");
  const [triageRedFlags, setTriageRedFlags] = useState([]);
  const [triageOther, setTriageOther] = useState("");
  const [triageResult, setTriageResult] = useState(null);
  const [triageHistory, setTriageHistory] = useState([]);

  // =========================================================
  // APPOINTMENTS (Live DB State)
  // =========================================================
  const [appointments, setAppointments] = useState([]);
  const [appointmentForm, setAppointmentForm] = useState({
    facility: "",
    type: "General Consultation",
    date: "",
    time: "",
  });
  const [showAppointmentForm, setShowAppointmentForm] = useState(false);

  // =========================================================
  // REFERRALS (Live DB State)
  // =========================================================
  const [referrals, setReferrals] = useState([]);

  // =========================================================
  // MEDICINES
  // =========================================================
  const [medicineSearch, setMedicineSearch] = useState("");
  const [medicineFilter, setMedicineFilter] = useState("All");

  const medicines = [
    {
      id: 1,
      name: "Paracetamol 500 mg",
      generic: "Paracetamol",
      pharmacy: "Jan Aushadhi Pharmacy",
      location: "Choubeypur Market",
      stock: "In Stock",
      quantity: "Available",
      price: "Affordable",
    },
    {
      id: 2,
      name: "ORS Sachets",
      generic: "Oral Rehydration Salts",
      pharmacy: "Jan Aushadhi Pharmacy",
      location: "Choubeypur Market",
      stock: "In Stock",
      quantity: "Available",
      price: "Affordable",
    },
    {
      id: 3,
      name: "Vitamin B Complex",
      generic: "Vitamin B",
      pharmacy: "Community Pharmacy",
      location: "Choubeypur",
      stock: "Limited",
      quantity: "Few units",
      price: "Affordable",
    },
    {
      id: 4,
      name: "Antacid Tablets",
      generic: "Antacid",
      pharmacy: "Rural Pharmacy",
      location: "Choubeypur Road",
      stock: "Out of Stock",
      quantity: "Currently unavailable",
      price: "—",
    },
  ];

  // =========================================================
  // DIAGNOSTICS (Live DB State)
  // =========================================================
  const [diagnosticTests, setDiagnosticTests] = useState([]);
  const [diagnosticForm, setDiagnosticForm] = useState({
    test: "",
    centre: "",
    date: "",
  });

  // =========================================================
  // FOLLOW UP
  // =========================================================
  const [followUps, setFollowUps] = useState([
    {
      id: 1,
      title: "Post-diagnostic consultation",
      doctor: "General Physician",
      facility: "Community Health Centre",
      date: "Sep 04, 2026",
      time: "10:30 AM",
      status: "Upcoming",
      reminder: true,
    },
  ]);

  // =========================================================
  // NOTIFICATIONS
  // =========================================================
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Welcome to SwasthyaSetu",
      message: "Your live dashboard is connected to the database.",
      time: "Today",
      read: false,
      type: "appointment",
    },
  ]);

  // =========================================================
  // PROFILE & PASSWORD STATE
  // =========================================================
  const [profile, setProfile] = useState({
    name: "",
    age: "21",
    phone: "",
    email: "",
    location: "Choubeypur, Varanasi",
    emergencyContact: "Family Contact",
    profilePicture: "",
  });

  const [editProfile, setEditProfile] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [passwordToast, setPasswordToast] = useState("");

  // Fetch all live patient data and facilities from MongoDB backend
  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const res = await api.get("/patients/dashboard");
        if (res.data && res.data.success) {
          if (res.data.profile) setProfile(res.data.profile);
          if (res.data.appointments) setAppointments(res.data.appointments);
          if (res.data.referrals) setReferrals(res.data.referrals);
          if (res.data.diagnostics) setDiagnosticTests(res.data.diagnostics);
          if (res.data.facilities) setFacilities(res.data.facilities);
        }
      } catch (err) {
        console.warn("Failed fetching live database records", err);
      }
    };

    fetchPatientData();
  }, []);

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    if (!newPassword || newPassword.length < 6) {
      alert("Password must be at least 6 characters long.");
      return;
    }

    try {
      await api.put("/auth/update-password", { newPassword });
      setShowPasswordModal(false);
      setNewPassword("");
      setPasswordToast("Password updated successfully in database!");
      setTimeout(() => setPasswordToast(""), 3000);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update password.");
    }
  };

  // =========================================================
  // SETTINGS
  // =========================================================
  const [settings, setSettings] = useState({
    appointmentReminder: true,
    referralUpdates: true,
    medicineUpdates: true,
    language: "English",
  });

  // =========================================================
  // MENU
  // =========================================================
  const menuItems = [
    { name: "Dashboard", icon: "⌂" },
    { name: "Find Facility", icon: "⌖" },
    { name: "Smart Recommendation", icon: "✦" },
    { name: "Digital Triage", icon: "✚" },
    { name: "Appointments", icon: "▣" },
    { name: "Referrals", icon: "↗" },
    { name: "Medicines", icon: "▤" },
    { name: "Diagnostics", icon: "⌕" },
    { name: "Follow-up", icon: "♥" },
    { name: "Care Journey", icon: "◈" },
  ];

  // =========================================================
  // FACILITY FILTER
  // =========================================================
  const filteredFacilities = facilities.filter((facility) => {
    const search = facilitySearch.trim().toLowerCase();
    const matchesSearch =
      !search ||
      facility.name.toLowerCase().includes(search) ||
      facility.type.toLowerCase().includes(search) ||
      facility.category.toLowerCase().includes(search) ||
      facility.specialty.toLowerCase().includes(search) ||
      facility.location.toLowerCase().includes(search) ||
      (facility.services && facility.services.some((service) => service.toLowerCase().includes(search)));

    const matchesFilter =
      facilityFilter === "All Facilities" || facility.category === facilityFilter;

    return matchesSearch && matchesFilter;
  });

  // =========================================================
  // RECOMMENDATION
  // =========================================================
  const getRecommendationScore = (facility) => {
    let score = 40;
    const services = facility.services || [];
    if (recommendationType === "General" && (services.includes("General Medicine") || services.includes("Primary Care"))) {
      score += 35;
    }
    if (recommendationType === "Emergency" && services.includes("Emergency Care")) {
      score += 45;
    }
    if (recommendationType === "Diagnostics" && (facility.category === "Diagnostics" || services.includes("Blood Test"))) {
      score += 45;
    }
    if (recommendationLocation && facility.location.toLowerCase().includes(recommendationLocation.toLowerCase())) {
      score += 20;
    }
    if (selectedPreferences.includes("Nearby") && facility.distance <= 3) score += 15;
    if (selectedPreferences.includes("Available Now") && facility.availability) score += 15;
    if (selectedPreferences.includes("Affordable") && facility.affordable) score += 15;
    return Math.min(score, 99);
  };

  const recommendedFacilities = useMemo(() => {
    return facilities
      .map((facility) => ({
        ...facility,
        recommendationScore: getRecommendationScore(facility),
      }))
      .sort((a, b) => b.recommendationScore - a.recommendationScore)
      .slice(0, 3);
  }, [facilities, recommendationType, recommendationLocation, selectedPreferences]);

  // =========================================================
  // TRIAGE
  // =========================================================
  const symptomOptions = [
    { id: "fever", label: "Fever", icon: "🌡" },
    { id: "cough", label: "Cough", icon: "◌" },
    { id: "headache", label: "Headache", icon: "◉" },
    { id: "stomach", label: "Stomach Pain", icon: "○" },
    { id: "breathing", label: "Breathing Difficulty", icon: "♡" },
    { id: "chest", label: "Chest Discomfort", icon: "♥" },
  ];

  const redFlagOptions = [
    { id: "severeBreathing", label: "Severe difficulty breathing" },
    { id: "severeChest", label: "Severe or persistent chest discomfort" },
    { id: "unconscious", label: "Loss of consciousness" },
  ];

  const toggleTriageSymptom = (symptom) => {
    setTriageSymptoms((current) =>
      current.includes(symptom) ? current.filter((item) => item !== symptom) : [...current, symptom]
    );
    setTriageResult(null);
  };

  const toggleRedFlag = (flag) => {
    setTriageRedFlags((current) =>
      current.includes(flag) ? current.filter((item) => item !== flag) : [...current, flag]
    );
    setTriageResult(null);
  };

  const analyzeTriage = () => {
    if (triageSymptoms.length === 0 || !triageSeverity || !triageDuration || !triageAgeGroup) {
      setTriageResult({
        type: "incomplete",
        title: "Please complete the assessment",
        message: "Select at least one symptom and complete all required fields.",
        action: "Complete the required information.",
      });
      return;
    }

    let priority = "ROUTINE";
    let title = "Routine care may be appropriate";
    let message = "Your selected information does not indicate an obvious urgent warning sign.";
    let action = "Consider routine consultation if symptoms continue.";

    if (triageSeverity === "Severe" || triageRedFlags.length > 0) {
      priority = "URGENT";
      title = "Urgent medical attention may be needed";
      message = "Symptoms require immediate attention.";
      action = "Seek immediate help at a nearby facility.";
    }

    const facility = facilities.find((f) => f.category === "PHC / CHC");
    setTriageResult({ type: "normal", priority, title, message, action, facility });
  };

  const resetTriage = () => {
    setTriageSymptoms([]);
    setTriageSeverity("");
    setTriageDuration("");
    setTriageAgeGroup("");
    setTriageRedFlags([]);
    setTriageResult(null);
  };

  // =========================================================
  // COMMON FUNCTIONS
  // =========================================================
  const handleMenuClick = (menuName) => {
    if (menuName !== activeMenu) {
      setMenuHistory((current) => [...current, activeMenu]);
    }
    setActiveMenu(menuName);
    setShowProfile(false);
    setMobileSidebar(false);
  };

  const handleBack = () => {
    setMenuHistory((current) => {
      if (current.length === 0) {
        setActiveMenu("Dashboard");
        return current;
      }
      const nextHistory = [...current];
      const targetMenu = nextHistory.pop();
      setActiveMenu(targetMenu || "Dashboard");
      return nextHistory;
    });
    setShowProfile(false);
    setMobileSidebar(false);
  };

  const handleProfilePictureChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setProfile((current) => ({ ...current, profilePicture: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const togglePreference = (preference) => {
    setSelectedPreferences((current) =>
      current.includes(preference) ? current.filter((item) => item !== preference) : [...current, preference]
    );
  };

  // =========================================================
  // APPOINTMENT FUNCTIONS (Live Database Integration)
  // =========================================================
  const bookAppointment = async () => {
    if (!appointmentForm.facility || !appointmentForm.date || !appointmentForm.time) {
      alert("Please select facility, date and time.");
      return;
    }

    try {
      const response = await api.post("/patients/appointments", appointmentForm);
      if (response.data && response.data.success) {
        setAppointments((current) => [response.data.data, ...current]);
        setAppointmentForm({ facility: "", type: "General Consultation", date: "", time: "" });
        setShowAppointmentForm(false);
      }
    } catch (err) {
      alert(err.response?.data?.message || "Failed to book appointment.");
    }
  };

  const cancelAppointment = async (id) => {
    try {
      await api.delete(`/patients/appointments/${id}`);
      setAppointments((current) =>
        current.map((item) => (item._id === id || item.id === id ? { ...item, status: "Cancelled" } : item))
      );
    } catch (err) {
      alert(err.response?.data?.message || "Failed to cancel appointment.");
    }
  };

  // =========================================================
  // MEDICINE FILTER
  // =========================================================
  const filteredMedicines = medicines.filter((medicine) => {
    const search = medicineSearch.toLowerCase();
    const matchesSearch =
      medicine.name.toLowerCase().includes(search) || medicine.generic.toLowerCase().includes(search);
    const matchesFilter = medicineFilter === "All" || medicine.stock === medicineFilter;
    return matchesSearch && matchesFilter;
  });

  // =========================================================
  // DIAGNOSTIC BOOKING (Live Database Integration)
  // =========================================================
  const bookDiagnostic = async () => {
    if (!diagnosticForm.test || !diagnosticForm.centre || !diagnosticForm.date) {
      alert("Please complete all diagnostic booking fields.");
      return;
    }

    try {
      const res = await api.post("/patients/diagnostics", diagnosticForm);
      if (res.data && res.data.success) {
        setDiagnosticTests((current) => [res.data.data, ...current]);
        setDiagnosticForm({ test: "", centre: "", date: "" });
      }
    } catch (err) {
      alert(err.response?.data?.message || "Failed to schedule diagnostic test.");
    }
  };

  const unreadCount = notifications.filter((item) => !item.read).length;

  const markNotificationRead = (id) => {
    setNotifications((current) => current.map((item) => (item.id === id ? { ...item, read: true } : item)));
  };

  const markAllNotificationsRead = () => {
    setNotifications((current) => current.map((item) => ({ ...item, read: true })));
  };

  const toggleReminder = (id) => {
    setFollowUps((current) => current.map((item) => (item.id === id ? { ...item, reminder: !item.reminder } : item)));
  };

  const PageHeader = ({ eyebrow, title, description, icon }) => (
    <div className="module-page-header">
      <div>
        <span className="section-mini-label">{eyebrow}</span>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      <div className="module-header-actions">
        <button type="button" className="module-back-button" onClick={handleBack}>
          ← Go Back
        </button>
        <div className="module-header-icon">{icon}</div>
      </div>
    </div>
  );

  return (
    <div className="patient-dashboard">
      {mobileSidebar && <div className="sidebar-overlay" onClick={() => setMobileSidebar(false)} />}

      <aside className={`patient-sidebar ${mobileSidebar ? "mobile-sidebar-open" : ""}`}>
        <button className="mobile-sidebar-close" onClick={() => setMobileSidebar(false)}>
          ×
        </button>
        <div className="dashboard-brand">
          <div className="dashboard-brand-logo">✚</div>
          <div className="dashboard-brand-text">
            <strong>SwasthyaSetu</strong>
            <span>Connected Care</span>
          </div>
        </div>

        <div className="sidebar-role">
          <div className="sidebar-role-icon">♙</div>
          <div>
            <small>LOGGED IN AS</small>
            <strong>Patient</strong>
          </div>
        </div>

        <nav className="dashboard-navigation">
          <div className="navigation-label">MAIN MENU</div>
          {menuItems.map((item) => (
            <button
              key={item.name}
              className={`dashboard-nav-item ${activeMenu === item.name ? "active" : ""}`}
              onClick={() => handleMenuClick(item.name)}
            >
              <span className="nav-item-icon">{item.icon}</span>
              <span className="nav-item-text">{item.name}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <button
            className={`sidebar-nav-item ${activeMenu === "Notifications" ? "active" : ""}`}
            onClick={() => handleMenuClick("Notifications")}
          >
            <span className="nav-item-icon">🔔</span>
            <span className="nav-item-text">Notifications</span>
            {unreadCount > 0 && <b className="sidebar-unread-badge">{unreadCount}</b>}
          </button>
          <button className="sidebar-logout" onClick={handleLogout}>
            <span>↪</span> Logout
          </button>
        </div>
      </aside>

      <div className="dashboard-main">
        <header className="dashboard-topbar">
          <div className="topbar-left">
            <button className="mobile-menu-icon" onClick={() => setMobileSidebar(true)}>
              ☰
            </button>
            <div>
              <span className="topbar-section-label">PATIENT PORTAL</span>
              <h1>{activeMenu}</h1>
            </div>
          </div>

          <div className="topbar-right">
            <button className="notification-button" onClick={() => handleMenuClick("Notifications")}>
              <span>🔔</span>
              {unreadCount > 0 && <i>{unreadCount}</i>}
            </button>

            <button className="topbar-profile" onClick={() => setShowProfile(!showProfile)}>
              <div className="profile-avatar">
                {profile.profilePicture ? (
                  <img src={profile.profilePicture} alt="Profile" />
                ) : (
                  (profile.name || "Patient").trim().slice(0, 2).toUpperCase()
                )}
              </div>
              <div className="profile-info">
                <strong>{profile.name || "Patient"}</strong>
                <span>Patient</span>
              </div>
              <span className="profile-arrow">▾</span>
            </button>

            {showProfile && (
              <div className="profile-dropdown">
                <button onClick={() => { setShowProfile(false); setActiveMenu("My Profile"); }}>
                  👤 My Profile
                </button>
                <button onClick={() => { setShowProfile(false); setActiveMenu("Settings"); }}>
                  ⚙ Settings
                </button>
                <button onClick={handleLogout}>↪ Logout</button>
              </div>
            )}
          </div>
        </header>

        <main className="dashboard-content">
          {passwordToast && (
            <div style={{ background: "#e6f7f5", color: "#08746e", padding: "12px 18px", borderRadius: "10px", marginBottom: "20px", fontWeight: "600", border: "1px solid #08746e" }}>
              <span>✓</span> {passwordToast}
            </div>
          )}

          {activeMenu === "Dashboard" && (
            <>
              <section className="welcome-banner">
                <div className="welcome-content">
                  <span className="welcome-eyebrow">YOUR HEALTHCARE JOURNEY</span>
                  <h2>Welcome, {profile.name || "Patient"}.</h2>
                  <p>Stay connected with your healthcare journey and access the care you need.</p>
                </div>
              </section>

              <section className="quick-actions-grid">
                {[
                  ["Find a Facility", "Locate nearby healthcare services", "⌖", "Find Facility"],
                  ["Smart Recommendation", "Find the most suitable facility", "✦", "Smart Recommendation"],
                  ["Digital Triage", "Understand your care requirement", "✚", "Digital Triage"],
                  ["Book Appointment", "Check available appointments", "▣", "Appointments"],
                ].map((item) => (
                  <button key={item[0]} className="quick-action-card" onClick={() => handleMenuClick(item[3])}>
                    <div className="quick-action-icon">{item[2]}</div>
                    <div className="quick-action-content">
                      <h3>{item[0]}</h3>
                      <p>{item[1]}</p>
                    </div>
                  </button>
                ))}
              </section>
            </>
          )}

          {activeMenu === "Find Facility" && (
            <section className="module-page">
              <PageHeader eyebrow="HEALTHCARE ACCESS" title="Find a Healthcare Facility" description="Discover facilities near you." icon="⌖" />
              {facilityViewMode === "map" ? (
                <div style={{ height: "600px", borderRadius: "16px" }}>
                  <FacilityMap onSelectFacility={(fac) => setSelectedFacility(fac)} />
                </div>
              ) : (
                <div className="facility-grid">
                  {filteredFacilities.map((facility) => (
                    <div className="facility-card" key={facility._id || facility.id}>
                      <h3>{facility.name}</h3>
                      <p>{facility.type} • {facility.specialty}</p>
                      <button className="facility-view-button" onClick={() => setSelectedFacility(facility)}>
                        View Facility →
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </section>
          )}

          {activeMenu === "Appointments" && (
            <section className="module-page">
              <PageHeader eyebrow="APPOINTMENTS" title="Appointments" description="Book or manage live appointments." icon="▣" />
              <button className="primary-action" onClick={() => setShowAppointmentForm(!showAppointmentForm)}>
                + Book Appointment
              </button>
              {showAppointmentForm && (
                <div className="dashboard-card booking-card">
                  <select value={appointmentForm.facility} onChange={(e) => setAppointmentForm({ ...appointmentForm, facility: e.target.value })}>
                    <option value="">Select facility</option>
                    {facilities.map((f) => <option key={f._id || f.id}>{f.name}</option>)}
                  </select>
                  <input type="date" value={appointmentForm.date} onChange={(e) => setAppointmentForm({ ...appointmentForm, date: e.target.value })} />
                  <select value={appointmentForm.time} onChange={(e) => setAppointmentForm({ ...appointmentForm, time: e.target.value })}>
                    <option value="">Select time</option>
                    <option>09:00 AM</option>
                    <option>10:30 AM</option>
                  </select>
                  <button className="primary-action" onClick={bookAppointment}>Confirm Appointment</button>
                </div>
              )}
              <div className="appointment-list">
                {appointments.map((appointment) => (
                  <div className="dashboard-card appointment-list-card" key={appointment._id || appointment.id}>
                    <h3>{appointment.type}</h3>
                    <p>{appointment.facility} • {appointment.date} at {appointment.time}</p>
                    <button className="danger-outline" onClick={() => cancelAppointment(appointment._id || appointment.id)}>
                      Cancel
                    </button>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Render active menus */}
          {activeMenu === "Smart Recommendation" && <section className="module-page"><PageHeader title="Smart Recommendation" /></section>}
          {activeMenu === "Digital Triage" && <section className="module-page"><PageHeader title="Digital Triage" /></section>}
          {activeMenu === "Referrals" && (
            <section className="module-page">
              <PageHeader title="Referrals" />
              {referrals.map((r) => (
                <div className="dashboard-card" key={r._id || r.id}>
                  <h3>{r.from} → {r.to}</h3>
                  <p>{r.reason}</p>
                </div>
              ))}
            </section>
          )}
          {activeMenu === "Medicines" && <section className="module-page"><PageHeader title="Medicines" /></section>}
          {activeMenu === "Diagnostics" && (
            <section className="module-page">
              <PageHeader title="Diagnostics" />
              {diagnosticTests.map((d) => (
                <div className="dashboard-card" key={d._id || d.id}>
                  <h3>{d.name}</h3>
                  <p>{d.centre} • {d.date} ({d.report})</p>
                </div>
              ))}
            </section>
          )}
          {activeMenu === "Follow-up" && <section className="module-page"><PageHeader title="Follow-up" /></section>}
          {activeMenu === "Care Journey" && <section className="module-page"><PageHeader title="Care Journey" /></section>}
          {activeMenu === "My Profile" && <section className="module-page"><PageHeader title="My Profile" /></section>}
          {activeMenu === "Settings" && <section className="module-page"><PageHeader title="Settings" /></section>}
          {activeMenu === "Notifications" && <section className="module-page"><PageHeader title="Notifications" /></section>}
          {activeMenu === "Help & Support" && <section className="module-page"><PageHeader title="Help & Support" /></section>}
        </main>
      </div>

      {showPasswordModal && (
        <div className="facility-modal-overlay" onClick={() => setShowPasswordModal(false)}>
          <div className="facility-modal" onClick={(e) => e.stopPropagation()}>
            <h2>Change Password</h2>
            <form onSubmit={handleUpdatePassword}>
              <input type="password" required placeholder="New password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
              <button type="submit">Update Password</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default PatientDashboard;