
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Index from "./pages/Index";
import Registration from "./pages/Registration";
import ParentDetails from "./pages/ParentDetails";
import AddChildren from "./pages/AddChildren";
import PreviousTraining from "./pages/PreviousTraining";
import MedicalCondition from "./pages/MedicalCondition";
import PhysicalReadiness from "./pages/PhysicalReadiness";
import ParForm from "./pages/ParForm";
import Indemnity from "./pages/Indemnity";
import Popia from "./pages/Popia";
import Summary from "./pages/Summary";
import Completion from "./pages/Completion";
import RejectionMessage from "./pages/RejectionMessage";
import ParQRejection from "./pages/ParQRejection";
import NotFound from "./pages/NotFound";
import StudentPortal from "./pages/StudentPortal";
import InstructorPortal from "./pages/InstructorPortal";
import AdminPortal from "./pages/AdminPortal";
import { Toaster } from "./components/ui/toaster";
import Navbar from "./components/Navbar";

// Layout with Navbar
const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

// Create routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout><Index /></Layout>,
  },
  {
    path: "/par-form",
    element: <Layout><ParForm /></Layout>,
  },
  {
    path: "/registration",
    element: <Layout><Registration /></Layout>,
  },
  {
    path: "/parent-details",
    element: <Layout><ParentDetails /></Layout>,
  },
  {
    path: "/add-children",
    element: <Layout><AddChildren /></Layout>,
  },
  {
    path: "/previous-training",
    element: <Layout><PreviousTraining /></Layout>,
  },
  {
    path: "/medical-condition",
    element: <Layout><MedicalCondition /></Layout>,
  },
  {
    path: "/physical-readiness",
    element: <Layout><PhysicalReadiness /></Layout>,
  },
  {
    path: "/indemnity",
    element: <Layout><Indemnity /></Layout>,
  },
  {
    path: "/popia",
    element: <Layout><Popia /></Layout>,
  },
  {
    path: "/summary",
    element: <Layout><Summary /></Layout>,
  },
  {
    path: "/completion",
    element: <Layout><Completion /></Layout>,
  },
  {
    path: "/rejection",
    element: <Layout><RejectionMessage /></Layout>,
  },
  {
    path: "/par-q-rejection",
    element: <Layout><ParQRejection /></Layout>,
  },
  {
    path: "/student-portal",
    element: <Layout><StudentPortal /></Layout>,
  },
  {
    path: "/instructor-portal",
    element: <Layout><InstructorPortal /></Layout>,
  },
  {
    path: "/admin-portal",
    element: <Layout><AdminPortal /></Layout>,
  },
  {
    path: "*",
    element: <Layout><NotFound /></Layout>,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
}

export default App;
