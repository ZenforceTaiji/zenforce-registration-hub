import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Index from './pages/Index';
import HistoryOfTaijiquan from './pages/HistoryOfTaijiquan';
import Gallery from './pages/Gallery';
import AdminPortal from './pages/AdminPortal';
import InstructorPortal from './pages/InstructorPortal';
import StudentPortal from './pages/StudentPortal';
import Registration from './pages/Registration';
import ParForm from './pages/ParForm';
import PhysicalReadiness from './pages/PhysicalReadiness';
import ParQRejection from './pages/ParQRejection';
import UploadId from './pages/UploadId';
import Indemnity from './pages/Indemnity';
import RejectionMessage from './pages/RejectionMessage';
import Popia from './pages/Popia';
import Summary from './pages/Summary';
import Completion from './pages/Completion';
import PaymentSuccess from './pages/PaymentSuccess';
import PaymentCancelled from './pages/PaymentCancelled';
import NotFound from './pages/NotFound';
import ParentDetails from './pages/ParentDetails';
import AddChildren from './pages/AddChildren';
import PreviousTraining from './pages/PreviousTraining';
import MedicalCondition from './pages/MedicalCondition';
import MembershipReactivation from './pages/MembershipReactivation';
import FloatingWhatsAppButton from './components/FloatingWhatsAppButton';
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/hooks/use-toast"

function App() {
  const location = useLocation();
  const [isExistingUser, setIsExistingUser] = useState(false);
  const { toast } = useToast()

  useEffect(() => {
    const checkExistingMembership = () => {
      const hasExistingMembership = localStorage.getItem("existingMembershipFound") === "true";
      setIsExistingUser(hasExistingMembership);

      if (hasExistingMembership) {
        toast({
          title: "Welcome Back!",
          description: "It looks like you're already a member. Please proceed to membership reactivation.",
        })
      }
    };

    checkExistingMembership();
  }, [toast]);

  // Function to determine if the current route is part of the registration flow
  const isRegistrationRoute = (route: string) => {
    const registrationRoutes = [
      '/registration',
      '/par-form',
      '/physical-readiness',
      '/upload-id',
      '/indemnity',
      '/popia',
      '/summary',
      '/completion',
      '/parent-details',
      '/add-children',
      '/previous-training',
      '/medical-condition'
    ];
    return registrationRoutes.includes(route);
  };

  return (
    <>
      {/* Main Content */}
      <main className="app-container">
        {/* Routes */}
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/history" element={<HistoryOfTaijiquan />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/admin" element={<AdminPortal />} />
          <Route path="/instructor" element={<InstructorPortal />} />
          <Route path="/student" element={<StudentPortal />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/par-form" element={<ParForm />} />
          <Route path="/physical-readiness" element={<PhysicalReadiness />} />
          <Route path="/par-rejection" element={<ParQRejection />} />
          <Route path="/upload-id" element={<UploadId />} />
          <Route path="/indemnity" element={<Indemnity />} />
          <Route path="/rejection" element={<RejectionMessage />} />
          <Route path="/popia" element={<Popia />} />
          <Route path="/summary" element={<Summary />} />
          <Route path="/completion" element={<Completion />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/payment-cancelled" element={<PaymentCancelled />} />
          <Route path="/parent-details" element={<ParentDetails />} />
          <Route path="/add-children" element={<AddChildren />} />
          <Route path="/previous-training" element={<PreviousTraining />} />
          <Route path="/medical-condition" element={<MedicalCondition />} />
          <Route path="/membership-reactivation" element={<MembershipReactivation />} />
          <Route path="*" element={<NotFound />} />
        </Routes>

        {/* Floating WhatsApp Button - Conditionally render based on route */}
        {!isRegistrationRoute(location.pathname) && (
          <FloatingWhatsAppButton
            phoneNumber="27731742969"
            message="Hello, I have a question about ZenForce TaijiQuan."
            isExistingUser={isExistingUser}
          />
        )}
      </main>

      <Toaster />
    </>
  );
}

export default App;
