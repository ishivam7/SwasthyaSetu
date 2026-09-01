import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import RoleSelection from "./pages/Roleselection";
import Login from "./pages/Login";
import PatientDashboard from "./pages/patient/PatientDashboard.jsx";
import DoctorDashboard from "./pages/doctor/DoctorDashboard.jsx";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* Landing Page */}
        <Route
          path="/"
          element={<Landing />}
        />

        {/* Role Selection */}
        <Route
          path="/roles"
          element={<RoleSelection />}
        />

        {/* Login */}
        <Route
          path="/login"
          element={<Login />}
        />

        {/* Patient Dashboard */}
        <Route
          path="/patient/dashboard"
          element={<PatientDashboard />}
        />
 <Route
          path="/doctor-dashboard"
          element={<DoctorDashboard />}
        />
      </Routes>

    </BrowserRouter>
  );
}


export default App;

