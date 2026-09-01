import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./DoctorDashboard.css";

function DoctorDashboard() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [activeMenu, setActiveMenu] = useState("Dashboard");
  const [previousMenu, setPreviousMenu] = useState("Dashboard");

  const [showProfile, setShowProfile] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);

  const [search, setSearch] = useState("");
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [consultationPatient, setConsultationPatient] = useState(null);

  const [showPrescription, setShowPrescription] = useState(false);
  const [showReferral, setShowReferral] = useState(false);
  const [showPatientDetails, setShowPatientDetails] = useState(false);

  const [toast, setToast] = useState("");

  /* =========================
     DOCTOR PROFILE
  ========================= */

  const [doctorProfile, setDoctorProfile] = useState({
    name: "Dr. Sharma",
    specialization: "General Physician",
    qualification: "MBBS",
    experience: "8 Years",
    facility: "SwasthyaSetu Community Health Centre",
    consultationHours: "09:00 AM – 04:00 PM",
    phone: "+91 98XXXXXX21",
    email: "dr.sharma@swasthyasetu.in",
    registration: "MED-2026-78421",
    bio: "Experienced general physician focused on accessible and continuous healthcare.",
    image: "",
  });

  const [editProfile, setEditProfile] = useState(false);

  const [profileForm, setProfileForm] = useState({
    name: "Dr. Sharma",
    specialization: "General Physician",
    qualification: "MBBS",
    experience: "8 Years",
    facility: "SwasthyaSetu Community Health Centre",
    consultationHours: "09:00 AM – 04:00 PM",
    phone: "+91 98XXXXXX21",
    email: "dr.sharma@swasthyasetu.in",
    registration: "MED-2026-78421",
    bio: "Experienced general physician focused on accessible and continuous healthcare.",
  });

  /* =========================
     SETTINGS
  ========================= */

  const [settings, setSettings] = useState({
    appointmentNotifications: true,
    referralNotifications: true,
    followUpNotifications: true,
    emailNotifications: false,
    smsNotifications: true,
    onlineConsultation: true,
    showAvailability: true,
    twoFactor: false,
    language: "English",
  });

  /* =========================
     DATA
  ========================= */

  const [appointments, setAppointments] = useState([
    {
      id: 1,
      patient: "Rahul Kumar",
      age: 42,
      gender: "Male",
      time: "09:30 AM",
      type: "Follow-up",
      status: "Waiting",
      reason: "Diabetes follow-up",
    },
    {
      id: 2,
      patient: "Sunita Devi",
      age: 35,
      gender: "Female",
      time: "10:15 AM",
      type: "Consultation",
      status: "Confirmed",
      reason: "Fever & weakness",
    },
    {
      id: 3,
      patient: "Amit Singh",
      age: 51,
      gender: "Male",
      time: "11:00 AM",
      type: "Follow-up",
      status: "Confirmed",
      reason: "Blood pressure review",
    },
    {
      id: 4,
      patient: "Pooja Verma",
      age: 28,
      gender: "Female",
      time: "12:30 PM",
      type: "Consultation",
      status: "Pending",
      reason: "General consultation",
    },
    {
      id: 5,
      patient: "Ramesh Yadav",
      age: 64,
      gender: "Male",
      time: "02:00 PM",
      type: "Follow-up",
      status: "Confirmed",
      reason: "Heart health follow-up",
    },
  ]);

  const [patients] = useState([
    {
      id: 101,
      name: "Rahul Kumar",
      age: 42,
      gender: "Male",
      phone: "98XXXXXX21",
      condition: "Type 2 Diabetes",
      lastVisit: "28 Aug 2026",
      risk: "Moderate",
    },
    {
      id: 102,
      name: "Sunita Devi",
      age: 35,
      gender: "Female",
      phone: "97XXXXXX42",
      condition: "Viral Fever",
      lastVisit: "30 Aug 2026",
      risk: "Low",
    },
    {
      id: 103,
      name: "Amit Singh",
      age: 51,
      gender: "Male",
      phone: "96XXXXXX18",
      condition: "Hypertension",
      lastVisit: "25 Aug 2026",
      risk: "Moderate",
    },
    {
      id: 104,
      name: "Pooja Verma",
      age: 28,
      gender: "Female",
      phone: "95XXXXXX73",
      condition: "General Checkup",
      lastVisit: "21 Aug 2026",
      risk: "Low",
    },
    {
      id: 105,
      name: "Ramesh Yadav",
      age: 64,
      gender: "Male",
      phone: "94XXXXXX64",
      condition: "Cardiac Monitoring",
      lastVisit: "20 Aug 2026",
      risk: "High",
    },
  ]);

  const [referrals, setReferrals] = useState([
    {
      id: 1,
      patient: "Ramesh Yadav",
      destination: "District Hospital",
      reason: "Cardiology consultation",
      date: "29 Aug 2026",
      status: "Active",
    },
    {
      id: 2,
      patient: "Rahul Kumar",
      destination: "Community Health Centre",
      reason: "Diabetes management",
      date: "27 Aug 2026",
      status: "Pending",
    },
    {
      id: 3,
      patient: "Sunita Devi",
      destination: "Diagnostic Centre",
      reason: "Blood test",
      date: "25 Aug 2026",
      status: "Completed",
    },
  ]);

  const [followUps, setFollowUps] = useState([
    {
      id: 1,
      patient: "Rahul Kumar",
      date: "02 Sep 2026",
      reason: "Diabetes review",
      status: "Due Soon",
    },
    {
      id: 2,
      patient: "Amit Singh",
      date: "04 Sep 2026",
      reason: "BP monitoring",
      status: "Upcoming",
    },
    {
      id: 3,
      patient: "Ramesh Yadav",
      date: "01 Sep 2026",
      reason: "Cardiac follow-up",
      status: "Urgent",
    },
  ]);

  const notifications = [
    {
      id: 1,
      title: "New appointment request",
      message: "Pooja Verma requested a consultation.",
      time: "10 min ago",
    },
    {
      id: 2,
      title: "Referral update",
      message: "Ramesh Yadav's referral is active.",
      time: "35 min ago",
    },
    {
      id: 3,
      title: "Follow-up reminder",
      message: "3 patient follow-ups are scheduled.",
      time: "1 hour ago",
    },
  ];

  /* =========================
     COMMON FUNCTIONS
  ========================= */

  const showToast = (message) => {
    setToast(message);

    setTimeout(() => {
      setToast("");
    }, 2500);
  };

  const handleMenu = (menu) => {
    setPreviousMenu(activeMenu);
    setActiveMenu(menu);

    setSearch("");
    setSelectedPatient(null);
    setSelectedAppointment(null);
    setConsultationPatient(null);
    setShowPrescription(false);
    setShowReferral(false);
    setShowPatientDetails(false);
    setNotificationOpen(false);
    setShowProfile(false);
    setShowSettings(false);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleBack = () => {
    if (activeMenu === "Settings") {
      setActiveMenu(previousMenu || "Profile");
      return;
    }

    if (activeMenu !== "Dashboard") {
      setActiveMenu("Dashboard");
      setSearch("");

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } else {
      navigate("/roles");
    }
  };

  const handleLogout = () => {
    navigate("/");
  };

  /* =========================
     PROFILE IMAGE
  ========================= */

  const handleProfileImage = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      showToast("Please select a valid image.");
      return;
    }

    const reader = new FileReader();

    reader.onload = (e) => {
      setDoctorProfile((prev) => ({
        ...prev,
        image: e.target.result,
      }));

      showToast("Profile photo updated successfully.");
    };

    reader.readAsDataURL(file);
  };

  /* =========================
     EDIT PROFILE
  ========================= */

  const openEditProfile = () => {
    setProfileForm({
      name: doctorProfile.name,
      specialization: doctorProfile.specialization,
      qualification: doctorProfile.qualification,
      experience: doctorProfile.experience,
      facility: doctorProfile.facility,
      consultationHours: doctorProfile.consultationHours,
      phone: doctorProfile.phone,
      email: doctorProfile.email,
      registration: doctorProfile.registration,
      bio: doctorProfile.bio,
    });

    setEditProfile(true);
  };

  const saveProfile = (e) => {
    e.preventDefault();

    setDoctorProfile((prev) => ({
      ...prev,
      ...profileForm,
    }));

    setEditProfile(false);
    showToast("Profile updated successfully.");
  };

  const updateProfileField = (field, value) => {
    setProfileForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  /* =========================
     SETTINGS
  ========================= */

  const updateSetting = (key, value) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const saveSettings = () => {
    showToast("Settings saved successfully.");
  };

  /* =========================
     APPOINTMENTS
  ========================= */

  const handleAppointmentStatus = (id, status) => {
    setAppointments((prev) =>
      prev.map((appointment) =>
        appointment.id === id
          ? { ...appointment, status }
          : appointment
      )
    );

    showToast(`Appointment ${status.toLowerCase()}.`);
  };

  const handleStartConsultation = (patient) => {
    setConsultationPatient(patient);
    setActiveMenu("Consultations");
    showToast(`Consultation started for ${patient.name}`);
  };

  const handleCompleteConsultation = () => {
    if (!consultationPatient) return;

    setAppointments((prev) =>
      prev.map((appointment) =>
        appointment.patient === consultationPatient.name
          ? { ...appointment, status: "Completed" }
          : appointment
      )
    );

    showToast("Consultation completed successfully.");
    setConsultationPatient(null);
  };

  /* =========================
     REFERRALS
  ========================= */

  const handleCreateReferral = () => {
    const newReferral = {
      id: referrals.length + 1,
      patient: "New Patient",
      destination: "District Hospital",
      reason: "Specialist consultation",
      date: "30 Aug 2026",
      status: "Pending",
    };

    setReferrals((prev) => [newReferral, ...prev]);
    setShowReferral(false);

    showToast("Referral created successfully.");
  };

  /* =========================
     FOLLOW UPS
  ========================= */

  const handleFollowUpComplete = (id) => {
    setFollowUps((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, status: "Completed" }
          : item
      )
    );

    showToast("Follow-up marked as completed.");
  };

  const filteredPatients = patients.filter((patient) =>
    `${patient.name} ${patient.condition}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const filteredAppointments = appointments.filter((appointment) =>
    `${appointment.patient} ${appointment.reason}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  /* =========================
     PROFILE AVATAR
  ========================= */

  const ProfileAvatar = ({ large = false }) => {
    return doctorProfile.image ? (
      <img
        src={doctorProfile.image}
        alt="Doctor profile"
        className={
          large
            ? "doctor-avatar-image large"
            : "doctor-avatar-image"
        }
      />
    ) : (
      <div
        className={
          large
            ? "doctor-avatar-fallback large"
            : "doctor-avatar-fallback"
        }
      >
        DS
      </div>
    );
  };

  /* =========================
     DASHBOARD
  ========================= */

  const renderDashboard = () => (
    <>
      <PageHeader
        title={`Good Morning, ${doctorProfile.name}`}
        subtitle="Here's what's happening with your patients today."
        action={
          <button
            className="doctor-primary-btn"
            onClick={() => handleMenu("Appointments")}
          >
            <span>＋</span>
            View Appointments
          </button>
        }
      />

      <div className="doctor-stats-grid">
        <StatCard
          icon="📅"
          label="Today's Appointments"
          value="12"
          change="+3 today"
        />

        <StatCard
          icon="👥"
          label="Total Patients"
          value="248"
          change="+8 this month"
        />

        <StatCard
          icon="🩺"
          label="Pending Consultations"
          value="05"
          change="2 urgent"
          urgent
        />

        <StatCard
          icon="🔄"
          label="Active Follow-ups"
          value="18"
          change="4 due soon"
        />
      </div>

      <div className="doctor-dashboard-grid">
        <div className="doctor-panel">
          <div className="panel-header">
            <div>
              <h3>Today's Appointments</h3>
              <p>Your upcoming patient consultations</p>
            </div>

            <button
              className="panel-link"
              onClick={() => handleMenu("Appointments")}
            >
              View all →
            </button>
          </div>

          <div className="appointment-list">
            {appointments.slice(0, 4).map((appointment) => (
              <AppointmentRow
                key={appointment.id}
                appointment={appointment}
                onClick={() =>
                  setSelectedAppointment(appointment)
                }
              />
            ))}
          </div>
        </div>

        <div className="doctor-panel">
          <div className="panel-header">
            <div>
              <h3>Quick Actions</h3>
              <p>Frequently used doctor tools</p>
            </div>
          </div>

          <div className="quick-actions">
            <QuickAction
              icon="👤"
              title="Find Patient"
              text="Search patient records"
              onClick={() => handleMenu("Patients")}
            />

            <QuickAction
              icon="🩺"
              title="Start Consultation"
              text="Begin patient consultation"
              onClick={() => handleMenu("Consultations")}
            />

            <QuickAction
              icon="🔄"
              title="Create Referral"
              text="Refer patient to facility"
              onClick={() => setShowReferral(true)}
            />

            <QuickAction
              icon="💊"
              title="Prescription"
              text="Create a prescription"
              onClick={() => setShowPrescription(true)}
            />
          </div>
        </div>
      </div>

      <div className="doctor-dashboard-grid lower">
        <div className="doctor-panel">
          <div className="panel-header">
            <div>
              <h3>Recent Patients</h3>
              <p>Recently visited patients</p>
            </div>

            <button
              className="panel-link"
              onClick={() => handleMenu("Patients")}
            >
              View all →
            </button>
          </div>

          <PatientTable
            patients={patients.slice(0, 4)}
            onPatient={(patient) => {
              setSelectedPatient(patient);
              setShowPatientDetails(true);
            }}
          />
        </div>

        <div className="doctor-panel">
          <div className="panel-header">
            <div>
              <h3>Follow-up Alerts</h3>
              <p>Patients requiring attention</p>
            </div>
          </div>

          <div className="followup-list">
            {followUps.map((item) => (
              <FollowUpRow
                key={item.id}
                item={item}
                onComplete={handleFollowUpComplete}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );

  /* =========================
     APPOINTMENTS
  ========================= */

  const renderAppointments = () => (
    <>
      <PageHeader
        title="Appointments"
        subtitle="Manage today's and upcoming patient appointments."
      />

      <div className="doctor-filter-bar">
        <div className="doctor-search">
          <span>⌕</span>

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search patient or reason..."
          />
        </div>

        <button
          className="doctor-secondary-btn"
          onClick={() =>
            showToast("Appointment filter opened.")
          }
        >
          ⚙ Filter
        </button>
      </div>

      <div className="doctor-panel full-panel">
        <div className="panel-header">
          <div>
            <h3>Appointment Schedule</h3>
            <p>
              {filteredAppointments.length} appointments found
            </p>
          </div>
        </div>

        <div className="appointment-full-list">
          {filteredAppointments.map((appointment) => (
            <div
              className="appointment-card"
              key={appointment.id}
            >
              <div className="appointment-time">
                <strong>{appointment.time}</strong>
                <span>{appointment.type}</span>
              </div>

              <div className="appointment-patient">
                <div className="patient-avatar">
                  {appointment.patient.charAt(0)}
                </div>

                <div>
                  <strong>{appointment.patient}</strong>

                  <span>
                    {appointment.age} years ·{" "}
                    {appointment.gender}
                  </span>

                  <small>{appointment.reason}</small>
                </div>
              </div>

              <StatusBadge status={appointment.status} />

              <div className="appointment-actions">
                {appointment.status !== "Completed" && (
                  <button
                    className="small-primary-btn"
                    onClick={() => {
                      const patient = patients.find(
                        (p) =>
                          p.name === appointment.patient
                      );

                      if (patient) {
                        handleStartConsultation(patient);
                      }
                    }}
                  >
                    Start
                  </button>
                )}

                <button
                  className="small-icon-btn"
                  onClick={() =>
                    setSelectedAppointment(appointment)
                  }
                >
                  →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );

  /* =========================
     PATIENTS
  ========================= */

  const renderPatients = () => (
    <>
      <PageHeader
        title="Patient Records"
        subtitle="Search and manage your patient information."
        action={
          <button
            className="doctor-primary-btn"
            onClick={() =>
              showToast("Add patient form opened.")
            }
          >
            ＋ Add Patient
          </button>
        }
      />

      <div className="doctor-filter-bar">
        <div className="doctor-search">
          <span>⌕</span>

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search patients..."
          />
        </div>
      </div>

      <div className="doctor-panel full-panel">
        <div className="panel-header">
          <div>
            <h3>All Patients</h3>
            <p>{filteredPatients.length} patients found</p>
          </div>
        </div>

        <PatientTable
          patients={filteredPatients}
          onPatient={(patient) => {
            setSelectedPatient(patient);
            setShowPatientDetails(true);
          }}
        />
      </div>
    </>
  );

  /* =========================
     CONSULTATIONS
  ========================= */

  const renderConsultations = () => (
    <>
      <PageHeader
        title="Consultations"
        subtitle="Conduct and manage digital patient consultations."
      />

      {!consultationPatient ? (
        <div className="consultation-empty">
          <div className="empty-icon">🩺</div>

          <h3>No active consultation</h3>

          <p>
            Select an appointment or patient to start a
            consultation.
          </p>

          <button
            className="doctor-primary-btn"
            onClick={() => handleMenu("Appointments")}
          >
            View Appointments
          </button>
        </div>
      ) : (
        <div className="consultation-workspace">
          <div className="consultation-patient-header">
            <div className="large-patient-avatar">
              {consultationPatient.name.charAt(0)}
            </div>

            <div>
              <span>Current Consultation</span>

              <h2>{consultationPatient.name}</h2>

              <p>
                {consultationPatient.age} years ·{" "}
                {consultationPatient.gender} ·{" "}
                {consultationPatient.condition}
              </p>
            </div>

            <button
              className="doctor-secondary-btn"
              onClick={() => setConsultationPatient(null)}
            >
              End Session
            </button>
          </div>

          <div className="consultation-grid">
            <div className="doctor-panel">
              <h3>Patient Information</h3>

              <div className="info-grid">
                <InfoItem
                  label="Condition"
                  value={consultationPatient.condition}
                />

                <InfoItem
                  label="Last Visit"
                  value={consultationPatient.lastVisit}
                />

                <InfoItem
                  label="Risk Level"
                  value={consultationPatient.risk}
                />

                <InfoItem
                  label="Contact"
                  value={consultationPatient.phone}
                />
              </div>

              <div className="medical-note">
                <label>Symptoms / Patient Notes</label>

                <textarea
                  placeholder="Enter symptoms, observations and patient notes..."
                />
              </div>
            </div>

            <div className="doctor-panel">
              <h3>Clinical Assessment</h3>

              <div className="medical-note">
                <label>Diagnosis</label>

                <textarea placeholder="Enter diagnosis..." />
              </div>

              <div className="medical-note">
                <label>Doctor's Notes</label>

                <textarea placeholder="Add consultation notes..." />
              </div>

              <div className="consultation-actions">
                <button
                  className="doctor-secondary-btn"
                  onClick={() =>
                    setShowPrescription(true)
                  }
                >
                  💊 Prescription
                </button>

                <button
                  className="doctor-primary-btn"
                  onClick={handleCompleteConsultation}
                >
                  ✓ Complete Consultation
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );

  /* =========================
     MEDICAL RECORDS
  ========================= */

  const renderRecords = () => (
    <>
      <PageHeader
        title="Medical Records"
        subtitle="Review patient medical history and previous consultations."
      />

      <div className="record-highlight">
        <div>
          <span>Total Records</span>
          <strong>248</strong>
        </div>

        <div>
          <span>Updated Today</span>
          <strong>16</strong>
        </div>

        <div>
          <span>Reports</span>
          <strong>82</strong>
        </div>

        <div>
          <span>Prescriptions</span>
          <strong>134</strong>
        </div>
      </div>

      <div className="doctor-panel full-panel">
        <div className="panel-header">
          <div>
            <h3>Patient Medical History</h3>
            <p>Select a patient to view their records.</p>
          </div>
        </div>

        <PatientTable
          patients={patients}
          onPatient={(patient) => {
            setSelectedPatient(patient);
            setShowPatientDetails(true);
          }}
        />
      </div>
    </>
  );

  /* =========================
     REFERRALS
  ========================= */

  const renderReferrals = () => (
    <>
      <PageHeader
        title="Referrals"
        subtitle="Track and manage patient referrals across healthcare facilities."
        action={
          <button
            className="doctor-primary-btn"
            onClick={() => setShowReferral(true)}
          >
            ＋ New Referral
          </button>
        }
      />

      <div className="referral-stats">
        <MiniStat label="Active Referrals" value="08" />
        <MiniStat label="Pending" value="04" />
        <MiniStat label="Completed" value="23" />
        <MiniStat label="This Month" value="31" />
      </div>

      <div className="doctor-panel full-panel">
        <div className="panel-header">
          <div>
            <h3>Referral Tracking</h3>
            <p>Monitor the status of referred patients.</p>
          </div>
        </div>

        <div className="referral-list">
          {referrals.map((referral) => (
            <div
              className="referral-card"
              key={referral.id}
            >
              <div className="referral-icon">🔄</div>

              <div className="referral-info">
                <strong>{referral.patient}</strong>

                <span>
                  → {referral.destination}
                </span>

                <small>{referral.reason}</small>
              </div>

              <div className="referral-date">
                <span>Date</span>
                <strong>{referral.date}</strong>
              </div>

              <StatusBadge status={referral.status} />

              <button
                className="small-icon-btn"
                onClick={() =>
                  showToast(
                    `Viewing referral for ${referral.patient}`
                  )
                }
              >
                →
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );

  /* =========================
     PRESCRIPTIONS
  ========================= */

  const renderPrescriptions = () => (
    <>
      <PageHeader
        title="Prescriptions"
        subtitle="Create and manage digital prescriptions for patients."
        action={
          <button
            className="doctor-primary-btn"
            onClick={() => setShowPrescription(true)}
          >
            ＋ New Prescription
          </button>
        }
      />

      <div className="prescription-grid">
        <PrescriptionCard
          patient="Rahul Kumar"
          status="Completed"
          description="Diabetes management prescription"
          medicines={[
            "Metformin — 500 mg · Twice daily",
            "Glimepiride — 1 mg · Once daily",
          ]}
          onClick={() =>
            showToast("Prescription preview opened.")
          }
        />

        <PrescriptionCard
          patient="Amit Singh"
          status="Pending"
          description="Blood pressure management"
          medicines={[
            "Amlodipine — 5 mg · Once daily",
            "Losartan — 50 mg · Once daily",
          ]}
          onClick={() =>
            showToast("Prescription preview opened.")
          }
        />
      </div>
    </>
  );

  /* =========================
     FOLLOW UPS
  ========================= */

  const renderFollowUps = () => (
    <>
      <PageHeader
        title="Follow-ups"
        subtitle="Monitor patients who need continued care."
      />

      <div className="followup-overview">
        <MiniStat label="Due Today" value="03" />
        <MiniStat label="Due Soon" value="07" />
        <MiniStat label="Upcoming" value="12" />
        <MiniStat label="Completed" value="46" />
      </div>

      <div className="doctor-panel full-panel">
        <div className="panel-header">
          <div>
            <h3>Follow-up Schedule</h3>
            <p>Keep track of continuity of care.</p>
          </div>
        </div>

        <div className="followup-table">
          {followUps.map((item) => (
            <div
              className="followup-card"
              key={item.id}
            >
              <div className="followup-date">
                <strong>
                  {item.date.split(" ")[0]}
                </strong>

                <span>
                  {item.date.split(" ")[1]}
                </span>
              </div>

              <div className="followup-patient">
                <strong>{item.patient}</strong>
                <span>{item.reason}</span>
              </div>

              <StatusBadge status={item.status} />

              {item.status !== "Completed" && (
                <button
                  className="small-primary-btn"
                  onClick={() =>
                    handleFollowUpComplete(item.id)
                  }
                >
                  Complete
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );

  /* =========================
     ANALYTICS
  ========================= */

  const renderAnalytics = () => (
    <>
      <PageHeader
        title="Analytics"
        subtitle="Overview of your patient care and consultation activity."
      />

      <div className="analytics-grid">
        <AnalyticsCard
          title="Patients This Month"
          value="84"
          text="↑ 12% from last month"
        />

        <AnalyticsCard
          title="Consultations"
          value="126"
          text="↑ 8% from last month"
        />

        <AnalyticsCard
          title="Referrals"
          value="31"
          text="4 currently active"
        />

        <AnalyticsCard
          title="Follow-up Rate"
          value="92%"
          text="Excellent continuity"
        />
      </div>

      <div className="doctor-panel analytics-chart-panel">
        <div className="panel-header">
          <div>
            <h3>Consultation Overview</h3>
            <p>Patient consultations over the last 7 days</p>
          </div>
        </div>

        <div className="fake-chart">
          {[48, 72, 55, 84, 65, 91, 76].map(
            (height, index) => (
              <div
                className="chart-column"
                key={index}
              >
                <div
                  className="chart-bar"
                  style={{ height: `${height}%` }}
                ></div>

                <span>
                  {
                    [
                      "Mon",
                      "Tue",
                      "Wed",
                      "Thu",
                      "Fri",
                      "Sat",
                      "Sun",
                    ][index]
                  }
                </span>
              </div>
            )
          )}
        </div>
      </div>
    </>
  );

  /* =========================
     PROFILE
  ========================= */

  const renderProfile = () => (
    <>
      <PageHeader
        title="Doctor Profile"
        subtitle="Manage your professional information and availability."
        action={
          <button
            className="doctor-primary-btn"
            onClick={openEditProfile}
          >
            ✎ Edit Profile
          </button>
        }
      />

      {!editProfile ? (
        <div className="profile-layout">
          <div className="doctor-panel profile-card-main">
            <div className="profile-cover"></div>

            <div className="profile-avatar-wrapper">
              <ProfileAvatar large />

              <button
                className="change-photo-btn"
                onClick={() =>
                  fileInputRef.current?.click()
                }
                title="Change profile photo"
              >
                📷
              </button>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                hidden
                onChange={handleProfileImage}
              />
            </div>

            <div className="profile-main-info">
              <h2>{doctorProfile.name}</h2>

              <p>{doctorProfile.specialization}</p>

              <span>
                {doctorProfile.qualification} ·{" "}
                {doctorProfile.experience} Experience
              </span>
            </div>

            <button
              className="doctor-secondary-btn profile-edit-button"
              onClick={openEditProfile}
            >
              ✎ Edit Profile
            </button>

            <div className="profile-details">
              <InfoItem
                label="Healthcare Facility"
                value={doctorProfile.facility}
              />

              <InfoItem
                label="Specialization"
                value={doctorProfile.specialization}
              />

              <InfoItem
                label="Experience"
                value={doctorProfile.experience}
              />

              <InfoItem
                label="Consultation Hours"
                value={doctorProfile.consultationHours}
              />

              <InfoItem
                label="Phone"
                value={doctorProfile.phone}
              />

              <InfoItem
                label="Email"
                value={doctorProfile.email}
              />

              <InfoItem
                label="Registration ID"
                value={doctorProfile.registration}
              />
            </div>

            <div className="doctor-bio">
              <h3>About Doctor</h3>
              <p>{doctorProfile.bio}</p>
            </div>
          </div>

          <div className="doctor-panel availability-panel">
            <h3>Availability</h3>

            <p>
              Manage your consultation schedule.
            </p>

            {[
              ["Monday", "09:00 AM – 04:00 PM"],
              ["Tuesday", "09:00 AM – 04:00 PM"],
              ["Wednesday", "09:00 AM – 04:00 PM"],
              ["Thursday", "09:00 AM – 04:00 PM"],
              ["Friday", "09:00 AM – 04:00 PM"],
            ].map(([day, time]) => (
              <div
                className="availability-row"
                key={day}
              >
                <strong>{day}</strong>
                <span>{time}</span>
                <i>●</i>
              </div>
            ))}
          </div>
        </div>
      ) : (
        renderEditProfile()
      )}
    </>
  );

  /* =========================
     EDIT PROFILE FORM
  ========================= */

  const renderEditProfile = () => (
    <div className="doctor-panel edit-profile-panel">
      <div className="edit-profile-heading">
        <div>
          <span>PROFILE SETTINGS</span>

          <h2>Edit Professional Profile</h2>

          <p>
            Update your professional information below.
          </p>
        </div>

        <button
          className="doctor-secondary-btn"
          onClick={() => setEditProfile(false)}
        >
          ← Back to Profile
        </button>
      </div>

      <div className="edit-profile-photo">
        <ProfileAvatar large />

        <div>
          <h3>Profile Photo</h3>

          <p>
            Upload a clear professional photo.
          </p>

          <button
            className="doctor-secondary-btn"
            onClick={() =>
              fileInputRef.current?.click()
            }
          >
            📷 Change Photo
          </button>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            hidden
            onChange={handleProfileImage}
          />
        </div>
      </div>

      <form onSubmit={saveProfile}>
        <div className="edit-form-grid">
          <FormField
            label="Doctor Name"
            value={profileForm.name}
            onChange={(e) =>
              updateProfileField(
                "name",
                e.target.value
              )
            }
          />

          <FormField
            label="Specialization"
            value={profileForm.specialization}
            onChange={(e) =>
              updateProfileField(
                "specialization",
                e.target.value
              )
            }
          />

          <FormField
            label="Qualification"
            value={profileForm.qualification}
            onChange={(e) =>
              updateProfileField(
                "qualification",
                e.target.value
              )
            }
          />

          <FormField
            label="Experience"
            value={profileForm.experience}
            onChange={(e) =>
              updateProfileField(
                "experience",
                e.target.value
              )
            }
          />

          <FormField
            label="Healthcare Facility"
            value={profileForm.facility}
            onChange={(e) =>
              updateProfileField(
                "facility",
                e.target.value
              )
            }
          />

          <FormField
            label="Consultation Hours"
            value={profileForm.consultationHours}
            onChange={(e) =>
              updateProfileField(
                "consultationHours",
                e.target.value
              )
            }
          />

          <FormField
            label="Phone Number"
            value={profileForm.phone}
            onChange={(e) =>
              updateProfileField(
                "phone",
                e.target.value
              )
            }
          />

          <FormField
            label="Email Address"
            type="email"
            value={profileForm.email}
            onChange={(e) =>
              updateProfileField(
                "email",
                e.target.value
              )
            }
          />

          <FormField
            label="Medical Registration ID"
            value={profileForm.registration}
            onChange={(e) =>
              updateProfileField(
                "registration",
                e.target.value
              )
            }
          />
        </div>

        <div className="form-group">
          <label>Professional Bio</label>

          <textarea
            value={profileForm.bio}
            onChange={(e) =>
              updateProfileField(
                "bio",
                e.target.value
              )
            }
            rows="5"
            placeholder="Write something about your professional experience..."
          />
        </div>

        <div className="edit-profile-actions">
          <button
            type="button"
            className="doctor-secondary-btn"
            onClick={() => setEditProfile(false)}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="doctor-primary-btn"
          >
            ✓ Save Profile
          </button>
        </div>
      </form>
    </div>
  );

  /* =========================
     SETTINGS
  ========================= */

  const renderSettings = () => (
    <>
      <PageHeader
        title="Settings"
        subtitle="Manage your account, notifications and availability preferences."
        action={
          <button
            className="doctor-secondary-btn"
            onClick={() => handleMenu("Profile")}
          >
            ← Back to Profile
          </button>
        }
      />

      <div className="settings-layout">
        <div className="settings-sidebar">
          <button className="active">
            🔔 Notifications
          </button>

          <button>🩺 Consultation</button>

          <button>🕐 Availability</button>

          <button>🔐 Privacy & Security</button>

          <button>🌐 Language</button>
        </div>

        <div className="doctor-panel settings-content">
          <section className="settings-section">
            <div className="settings-title">
              <h3>Notification Preferences</h3>

              <p>
                Choose which updates you want to receive.
              </p>
            </div>

            <SettingToggle
              title="Appointment Notifications"
              description="Receive alerts when patients book or update appointments."
              checked={
                settings.appointmentNotifications
              }
              onChange={(value) =>
                updateSetting(
                  "appointmentNotifications",
                  value
                )
              }
            />

            <SettingToggle
              title="Referral Notifications"
              description="Get notified about referral status changes."
              checked={
                settings.referralNotifications
              }
              onChange={(value) =>
                updateSetting(
                  "referralNotifications",
                  value
                )
              }
            />

            <SettingToggle
              title="Follow-up Reminders"
              description="Receive reminders about upcoming patient follow-ups."
              checked={
                settings.followUpNotifications
              }
              onChange={(value) =>
                updateSetting(
                  "followUpNotifications",
                  value
                )
              }
            />

            <SettingToggle
              title="Email Notifications"
              description="Send important dashboard updates to your email."
              checked={
                settings.emailNotifications
              }
              onChange={(value) =>
                updateSetting(
                  "emailNotifications",
                  value
                )
              }
            />

            <SettingToggle
              title="SMS Notifications"
              description="Receive important healthcare alerts through SMS."
              checked={settings.smsNotifications}
              onChange={(value) =>
                updateSetting(
                  "smsNotifications",
                  value
                )
              }
            />
          </section>

          <section className="settings-section">
            <div className="settings-title">
              <h3>Consultation Preferences</h3>

              <p>
                Configure how you handle patient consultations.
              </p>
            </div>

            <SettingToggle
              title="Online Consultation"
              description="Allow patients to request digital consultations."
              checked={
                settings.onlineConsultation
              }
              onChange={(value) =>
                updateSetting(
                  "onlineConsultation",
                  value
                )
              }
            />

            <SettingToggle
              title="Show Availability"
              description="Display your available consultation hours to patients."
              checked={settings.showAvailability}
              onChange={(value) =>
                updateSetting(
                  "showAvailability",
                  value
                )
              }
            />
          </section>

          <section className="settings-section">
            <div className="settings-title">
              <h3>Privacy & Security</h3>

              <p>
                Protect your doctor account and professional data.
              </p>
            </div>

            <SettingToggle
              title="Two-Factor Authentication"
              description="Add an extra verification step when signing in."
              checked={settings.twoFactor}
              onChange={(value) =>
                updateSetting(
                  "twoFactor",
                  value
                )
              }
            />

            <button
              className="security-action"
              onClick={() =>
                showToast(
                  "Password change option opened."
                )
              }
            >
              🔑 Change Password
            </button>

            <button
              className="security-action danger"
              onClick={() =>
                showToast(
                  "Active sessions management opened."
                )
              }
            >
              🚪 Manage Active Sessions
            </button>
          </section>

          <section className="settings-section">
            <div className="settings-title">
              <h3>Language</h3>

              <p>
                Select your preferred dashboard language.
              </p>
            </div>

            <select
              className="settings-select"
              value={settings.language}
              onChange={(e) =>
                updateSetting(
                  "language",
                  e.target.value
                )
              }
            >
              <option>English</option>
              <option>Hindi</option>
              <option>Hinglish</option>
            </select>
          </section>

          <div className="settings-save-bar">
            <button
              className="doctor-secondary-btn"
              onClick={() => handleMenu("Profile")}
            >
              Cancel
            </button>

            <button
              className="doctor-primary-btn"
              onClick={saveSettings}
            >
              ✓ Save Settings
            </button>
          </div>
        </div>
      </div>
    </>
  );

  /* =========================
     NOTIFICATIONS
  ========================= */

  const renderNotifications = () => (
    <>
      <PageHeader
        title="Notifications"
        subtitle="Stay updated with patient activity and care alerts."
      />

      <div className="doctor-panel full-panel">
        <div className="panel-header">
          <div>
            <h3>Recent Notifications</h3>
            <p>Latest updates from your dashboard.</p>
          </div>

          <button
            className="panel-link"
            onClick={() =>
              showToast(
                "All notifications marked as read."
              )
            }
          >
            Mark all as read
          </button>
        </div>

        <div className="notification-page-list">
          {notifications.map((notification) => (
            <div
              className="notification-page-item"
              key={notification.id}
            >
              <div className="notification-icon">
                🔔
              </div>

              <div>
                <strong>{notification.title}</strong>

                <p>{notification.message}</p>

                <small>{notification.time}</small>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );

  /* =========================
     CONTENT SWITCH
  ========================= */

  const renderContent = () => {
    switch (activeMenu) {
      case "Dashboard":
        return renderDashboard();

      case "Appointments":
        return renderAppointments();

      case "Patients":
        return renderPatients();

      case "Consultations":
        return renderConsultations();

      case "Medical Records":
        return renderRecords();

      case "Referrals":
        return renderReferrals();

      case "Prescriptions":
        return renderPrescriptions();

      case "Follow-ups":
        return renderFollowUps();

      case "Analytics":
        return renderAnalytics();

      case "Profile":
        return renderProfile();

      case "Settings":
        return renderSettings();

      case "Notifications":
        return renderNotifications();

      default:
        return renderDashboard();
    }
  };

  /* =========================
     MENU
  ========================= */

  const menuItems = [
    {
      section: "MAIN",
      items: [
        { label: "Dashboard", icon: "⌂" },
        { label: "Appointments", icon: "▣" },
        { label: "Patients", icon: "♙" },
        { label: "Consultations", icon: "◉" },
      ],
    },
    {
      section: "PATIENT CARE",
      items: [
        { label: "Medical Records", icon: "▤" },
        { label: "Referrals", icon: "↗" },
        { label: "Prescriptions", icon: "＋" },
        { label: "Follow-ups", icon: "↻" },
      ],
    },
    {
      section: "INSIGHTS",
      items: [
        { label: "Analytics", icon: "▥" },
      ],
    },
  ];

  return (
    <div className="doctor-dashboard-page">

      {/* SIDEBAR */}

      <aside className="doctor-sidebar">

        <div className="doctor-brand">
          <div className="doctor-brand-icon">
            ✚
          </div>

          <div>
            <strong>SwasthyaSetu</strong>
            <span>Doctor Portal</span>
          </div>
        </div>

        <div className="doctor-sidebar-profile">
          <ProfileAvatar />

          <div>
            <strong>{doctorProfile.name}</strong>
            <span>{doctorProfile.specialization}</span>
          </div>
        </div>

        <nav className="doctor-navigation">
          {menuItems.map((group) => (
            <div
              className="doctor-nav-group"
              key={group.section}
            >
              <small>{group.section}</small>

              {group.items.map((item) => (
                <button
                  key={item.label}
                  className={`doctor-nav-item ${
                    activeMenu === item.label
                      ? "active"
                      : ""
                  }`}
                  onClick={() =>
                    handleMenu(item.label)
                  }
                >
                  <span className="doctor-nav-icon">
                    {item.icon}
                  </span>

                  <span>{item.label}</span>

                  {item.label === "Appointments" && (
                    <b>5</b>
                  )}
                </button>
              ))}
            </div>
          ))}
        </nav>

        <div className="doctor-sidebar-bottom">

          <button
            className={`doctor-nav-item ${
              activeMenu === "Notifications"
                ? "active"
                : ""
            }`}
            onClick={() =>
              handleMenu("Notifications")
            }
          >
            <span className="doctor-nav-icon">
              ♢
            </span>

            <span>Notifications</span>

            <b>3</b>
          </button>

          <button
            className={`doctor-nav-item ${
              activeMenu === "Profile"
                ? "active"
                : ""
            }`}
            onClick={() =>
              handleMenu("Profile")
            }
          >
            <span className="doctor-nav-icon">
              ⚙
            </span>

            <span>Profile & Settings</span>
          </button>

          <button
            className="doctor-logout"
            onClick={handleLogout}
          >
            <span>↪</span>
            Logout
          </button>
        </div>
      </aside>

      {/* MAIN */}

      <main className="doctor-main">

        {/* TOPBAR */}

        <header className="doctor-topbar">

          <div className="mobile-doctor-brand">
            <div>✚</div>
            <strong>SwasthyaSetu</strong>
          </div>

          <div className="doctor-breadcrumb">

            {/* UPDATED GO BACK BUTTON */}

            <button
              className="top-back-btn"
              onClick={handleBack}
              title="Go Back"
            >
              <span>←</span>
              <strong>Go Back</strong>
            </button>

            <span>Doctor Portal</span>

            <b>/</b>

            <strong>{activeMenu}</strong>
          </div>

          <div className="doctor-top-actions">

            <button
              className="topbar-icon-btn"
              onClick={() =>
                setNotificationOpen(
                  !notificationOpen
                )
              }
            >
              🔔
              <i>3</i>
            </button>

            <div className="doctor-profile-wrapper">

              <button
                className="doctor-top-profile"
                onClick={() =>
                  setShowProfile(!showProfile)
                }
              >
                <ProfileAvatar />

                <div>
                  <strong>
                    {doctorProfile.name}
                  </strong>

                  <span>
                    {doctorProfile.specialization}
                  </span>
                </div>

                <span className="profile-arrow">
                  ⌄
                </span>
              </button>

              {showProfile && (
                <div className="doctor-profile-dropdown">

                  <button
                    onClick={() => {
                      setShowProfile(false);
                      handleMenu("Profile");
                    }}
                  >
                    👤 My Profile
                  </button>

                  <button
                    onClick={() => {
                      setShowProfile(false);
                      handleMenu("Settings");
                    }}
                  >
                    ⚙ Settings
                  </button>

                  <button
                    onClick={() => {
                      setShowProfile(false);
                      openEditProfile();
                      setActiveMenu("Profile");
                    }}
                  >
                    ✎ Edit Profile
                  </button>

                  <button onClick={handleLogout}>
                    ↪ Logout
                  </button>
                </div>
              )}
            </div>
          </div>

          {notificationOpen && (
            <div className="doctor-notification-dropdown">

              <div className="dropdown-title">
                <strong>Notifications</strong>
                <span>3 new</span>
              </div>

              {notifications.map(
                (notification) => (
                  <div
                    className="dropdown-notification"
                    key={notification.id}
                  >
                    <div>🔔</div>

                    <div>
                      <strong>
                        {notification.title}
                      </strong>

                      <p>
                        {notification.message}
                      </p>

                      <small>
                        {notification.time}
                      </small>
                    </div>
                  </div>
                )
              )}

              <button
                onClick={() => {
                  setNotificationOpen(false);
                  handleMenu("Notifications");
                }}
              >
                View all notifications →
              </button>
            </div>
          )}
        </header>

        {/* CONTENT */}

        <section className="doctor-content">
          {renderContent()}
        </section>
      </main>

      {/* =========================
          APPOINTMENT MODAL
      ========================= */}

      {selectedAppointment && (
        <Modal
          title="Appointment Details"
          onClose={() =>
            setSelectedAppointment(null)
          }
        >
          <div className="modal-patient">
            <div className="large-patient-avatar">
              {selectedAppointment.patient.charAt(0)}
            </div>

            <div>
              <h3>
                {selectedAppointment.patient}
              </h3>

              <p>
                {selectedAppointment.age} years ·{" "}
                {selectedAppointment.gender}
              </p>
            </div>
          </div>

          <div className="modal-info-grid">

            <InfoItem
              label="Appointment"
              value={selectedAppointment.time}
            />

            <InfoItem
              label="Type"
              value={selectedAppointment.type}
            />

            <InfoItem
              label="Reason"
              value={selectedAppointment.reason}
            />

            <InfoItem
              label="Status"
              value={selectedAppointment.status}
            />
          </div>

          <div className="modal-actions">

            {selectedAppointment.status !==
              "Completed" && (
              <button
                className="doctor-primary-btn"
                onClick={() => {
                  const patient =
                    patients.find(
                      (p) =>
                        p.name ===
                        selectedAppointment.patient
                    );

                  setSelectedAppointment(null);

                  if (patient) {
                    handleStartConsultation(
                      patient
                    );
                  }
                }}
              >
                Start Consultation
              </button>
            )}

            <button
              className="doctor-secondary-btn"
              onClick={() =>
                setSelectedAppointment(null)
              }
            >
              Close
            </button>
          </div>
        </Modal>
      )}

      {/* =========================
          PATIENT MODAL
      ========================= */}

      {showPatientDetails &&
        selectedPatient && (
          <Modal
            title="Patient Details"
            onClose={() =>
              setShowPatientDetails(false)
            }
          >
            <div className="modal-patient">

              <div className="large-patient-avatar">
                {selectedPatient.name.charAt(0)}
              </div>

              <div>
                <h3>{selectedPatient.name}</h3>

                <p>
                  {selectedPatient.age} years ·{" "}
                  {selectedPatient.gender}
                </p>
              </div>

              <StatusBadge
                status={selectedPatient.risk}
              />
            </div>

            <div className="modal-info-grid">

              <InfoItem
                label="Condition"
                value={selectedPatient.condition}
              />

              <InfoItem
                label="Last Visit"
                value={selectedPatient.lastVisit}
              />

              <InfoItem
                label="Contact"
                value={selectedPatient.phone}
              />

              <InfoItem
                label="Risk Level"
                value={selectedPatient.risk}
              />
            </div>

            <div className="patient-history-box">
              <h4>Recent Medical History</h4>

              <div>
                <span>28 Aug 2026</span>

                <strong>
                  Routine consultation
                </strong>
              </div>

              <div>
                <span>20 Aug 2026</span>

                <strong>
                  Follow-up visit
                </strong>
              </div>

              <div>
                <span>12 Aug 2026</span>

                <strong>
                  Diagnostic report reviewed
                </strong>
              </div>
            </div>

            <div className="modal-actions">

              <button
                className="doctor-primary-btn"
                onClick={() => {
                  setShowPatientDetails(false);

                  handleStartConsultation(
                    selectedPatient
                  );
                }}
              >
                Start Consultation
              </button>

              <button
                className="doctor-secondary-btn"
                onClick={() =>
                  setShowPatientDetails(false)
                }
              >
                Close
              </button>
            </div>
          </Modal>
        )}

      {/* =========================
          PRESCRIPTION MODAL
      ========================= */}

      {showPrescription && (
        <Modal
          title="Create Prescription"
          onClose={() =>
            setShowPrescription(false)
          }
        >
          <div className="form-group">
            <label>Patient</label>

            <select>
              <option>Select patient</option>

              {patients.map((patient) => (
                <option key={patient.id}>
                  {patient.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Medicine</label>

            <input
              placeholder="Enter medicine name"
            />
          </div>

          <div className="form-row">

            <div className="form-group">
              <label>Dosage</label>

              <input
                placeholder="e.g. 500 mg"
              />
            </div>

            <div className="form-group">
              <label>Frequency</label>

              <select>
                <option>Once daily</option>
                <option>Twice daily</option>
                <option>Three times daily</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Instructions</label>

            <textarea
              placeholder="Enter medicine instructions..."
            />
          </div>

          <div className="modal-actions">

            <button
              className="doctor-primary-btn"
              onClick={() => {
                setShowPrescription(false);

                showToast(
                  "Prescription created successfully."
                );
              }}
            >
              Create Prescription
            </button>

            <button
              className="doctor-secondary-btn"
              onClick={() =>
                setShowPrescription(false)
              }
            >
              Cancel
            </button>
          </div>
        </Modal>
      )}

      {/* =========================
          REFERRAL MODAL
      ========================= */}

      {showReferral && (
        <Modal
          title="Create New Referral"
          onClose={() =>
            setShowReferral(false)
          }
        >
          <div className="form-group">
            <label>Patient</label>

            <select>
              <option>Select patient</option>

              {patients.map((patient) => (
                <option key={patient.id}>
                  {patient.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Referral Facility</label>

            <select>
              <option>District Hospital</option>
              <option>
                Community Health Centre
              </option>
              <option>Diagnostic Centre</option>
              <option>Specialist Hospital</option>
            </select>
          </div>

          <div className="form-group">
            <label>Reason for Referral</label>

            <textarea
              placeholder="Enter reason for referral..."
            />
          </div>

          <div className="modal-actions">

            <button
              className="doctor-primary-btn"
              onClick={handleCreateReferral}
            >
              Create Referral
            </button>

            <button
              className="doctor-secondary-btn"
              onClick={() =>
                setShowReferral(false)
              }
            >
              Cancel
            </button>
          </div>
        </Modal>
      )}

      {/* TOAST */}

      {toast && (
        <div className="doctor-toast">
          <span>✓</span>
          {toast}
        </div>
      )}
    </div>
  );
}

/* =========================================================
   COMPONENTS
========================================================= */

function PageHeader({
  title,
  subtitle,
  action,
}) {
  return (
    <div className="doctor-page-header">
      <div>
        <span className="doctor-page-eyebrow">
          SWASTHYASETU · DOCTOR PORTAL
        </span>

        <h1>{title}</h1>

        <p>{subtitle}</p>
      </div>

      {action && <div>{action}</div>}
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  change,
  urgent,
}) {
  return (
    <div className="doctor-stat-card">
      <div className="stat-top">
        <div className="stat-icon">{icon}</div>

        <span className={urgent ? "stat-urgent" : ""}>
          {change}
        </span>
      </div>

      <strong>{value}</strong>

      <p>{label}</p>
    </div>
  );
}

function AppointmentRow({
  appointment,
  onClick,
}) {
  return (
    <button
      className="appointment-row"
      onClick={onClick}
    >
      <div className="appointment-row-time">
        {appointment.time}
      </div>

      <div className="patient-avatar">
        {appointment.patient.charAt(0)}
      </div>

      <div className="appointment-row-info">
        <strong>{appointment.patient}</strong>

        <span>{appointment.reason}</span>
      </div>

      <StatusBadge status={appointment.status} />

      <span className="row-arrow">→</span>
    </button>
  );
}

function QuickAction({
  icon,
  title,
  text,
  onClick,
}) {
  return (
    <button
      className="quick-action"
      onClick={onClick}
    >
      <div className="quick-action-icon">
        {icon}
      </div>

      <div>
        <strong>{title}</strong>
        <span>{text}</span>
      </div>

      <b>→</b>
    </button>
  );
}

function PatientTable({
  patients,
  onPatient,
}) {
  return (
    <div className="patient-table">
      <div className="patient-table-header">
        <span>Patient</span>
        <span>Condition</span>
        <span>Last Visit</span>
        <span>Risk</span>
        <span></span>
      </div>

      {patients.map((patient) => (
        <button
          className="patient-table-row"
          key={patient.id}
          onClick={() => onPatient(patient)}
        >
          <div className="table-patient">
            <div className="patient-avatar">
              {patient.name.charAt(0)}
            </div>

            <div>
              <strong>{patient.name}</strong>

              <span>
                {patient.age} yrs ·{" "}
                {patient.gender}
              </span>
            </div>
          </div>

          <span>{patient.condition}</span>

          <span>{patient.lastVisit}</span>

          <StatusBadge status={patient.risk} />

          <b>→</b>
        </button>
      ))}
    </div>
  );
}

function FollowUpRow({
  item,
  onComplete,
}) {
  return (
    <div className="followup-row">
      <div className="followup-avatar">
        {item.patient.charAt(0)}
      </div>

      <div>
        <strong>{item.patient}</strong>
        <span>{item.reason}</span>
      </div>

      <div className="followup-right">
        <StatusBadge status={item.status} />

        {item.status !== "Completed" && (
          <button
            onClick={() =>
              onComplete(item.id)
            }
            title="Mark complete"
          >
            ✓
          </button>
        )}
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const normalized = status
    .toLowerCase()
    .replaceAll(" ", "-");

  return (
    <span
      className={`doctor-status ${normalized}`}
    >
      <i></i>
      {status}
    </span>
  );
}

function InfoItem({
  label,
  value,
}) {
  return (
    <div className="info-item">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function MiniStat({
  label,
  value,
}) {
  return (
    <div className="mini-stat">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function FormField({
  label,
  value,
  onChange,
  type = "text",
}) {
  return (
    <div className="form-group">
      <label>{label}</label>

      <input
        type={type}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

function SettingToggle({
  title,
  description,
  checked,
  onChange,
}) {
  return (
    <div className="setting-row">
      <div>
        <strong>{title}</strong>

        <p>{description}</p>
      </div>

      <button
        type="button"
        className={`toggle ${
          checked ? "on" : ""
        }`}
        onClick={() => onChange(!checked)}
      >
        <span></span>
      </button>
    </div>
  );
}

function AnalyticsCard({
  title,
  value,
  text,
}) {
  return (
    <div className="doctor-panel analytics-card">
      <span>{title}</span>
      <strong>{value}</strong>
      <small>{text}</small>
    </div>
  );
}

function PrescriptionCard({
  patient,
  status,
  description,
  medicines,
  onClick,
}) {
  return (
    <div className="doctor-panel prescription-card">
      <div className="prescription-top">
        <span className="prescription-icon">
          💊
        </span>

        <StatusBadge status={status} />
      </div>

      <h3>{patient}</h3>

      <p>{description}</p>

      {medicines.map((medicine) => {
        const parts = medicine.split(" — ");

        return (
          <div
            className="medicine-line"
            key={medicine}
          >
            <span>{parts[0]}</span>

            <small>
              {parts[1]}
            </small>
          </div>
        );
      })}

      <button
        className="full-width-secondary"
        onClick={onClick}
      >
        View Prescription
      </button>
    </div>
  );
}

function Modal({
  title,
  children,
  onClose,
}) {
  return (
    <div
      className="doctor-modal-overlay"
      onClick={onClose}
    >
      <div
        className="doctor-modal"
        onClick={(e) =>
          e.stopPropagation()
        }
      >
        <div className="modal-header">
          <h2>{title}</h2>

          <button onClick={onClose}>
            ×
          </button>
        </div>

        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  );
}

export default DoctorDashboard;