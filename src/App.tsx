
import { useState, useEffect } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Index from "./pages/Index";
import Registration from "./pages/Registration"; 
import ParForm from "./pages/ParForm";
import ParentDetails from "./pages/ParentDetails";
import PreviousTraining from "./pages/PreviousTraining";
import MedicalCondition from "./pages/MedicalCondition";
import UploadId from "./pages/UploadId";
import Indemnity from "./pages/Indemnity";
import Popia from "./pages/Popia";
import Summary from "./pages/Summary";
import Completion from "./pages/Completion";
import AgeAlert from "./components/registration/AgeAlert";
import ParQAlert from "./components/registration/ParQAlert";
import MembershipReactivation from "./pages/MembershipReactivation";
import PhysicalReadiness from "./pages/PhysicalReadiness";
import AddChildren from "./pages/AddChildren";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/par-form" element={<ParForm />} />
        <Route path="/parent-details" element={<ParentDetails />} />
        <Route path="/add-children" element={<AddChildren />} />
        <Route path="/previous-training" element={<PreviousTraining />} />
        <Route path="/medical-conditions" element={<MedicalCondition />} />
        <Route path="/physical-readiness" element={<PhysicalReadiness />} />
        <Route path="/upload-id" element={<UploadId />} />
        <Route path="/indemnity" element={<Indemnity />} />
        <Route path="/popia" element={<Popia />} />
        <Route path="/summary" element={<Summary />} />
        <Route path="/completion" element={<Completion />} />
        <Route path="/age-alert" element={<AgeAlert />} />
        <Route path="/parq-alert" element={<ParQAlert />} />
        <Route path="/membership-reactivation" element={<MembershipReactivation />} />
        <Route path="/medical-condition" element={<MedicalCondition />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
