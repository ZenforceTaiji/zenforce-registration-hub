
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Index from "./pages/Index";
import Registration from "./pages/Registration";
import ParentDetails from "./pages/ParentDetails";
import AddChildren from "./pages/AddChildren";
import PreviousTraining from "./pages/PreviousTraining";
import MedicalCondition from "./pages/MedicalCondition";
import PhysicalReadiness from "./pages/PhysicalReadiness";
import Indemnity from "./pages/Indemnity";
import Popia from "./pages/Popia";
import Summary from "./pages/Summary";
import Completion from "./pages/Completion";
import RejectionMessage from "./pages/RejectionMessage";
import ParQRejection from "./pages/ParQRejection";
import NotFound from "./pages/NotFound";
import { Toaster } from "./components/ui/toaster";

// Create routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "/registration",
    element: <Registration />,
  },
  {
    path: "/parent-details",
    element: <ParentDetails />,
  },
  {
    path: "/add-children",
    element: <AddChildren />,
  },
  {
    path: "/previous-training",
    element: <PreviousTraining />,
  },
  {
    path: "/medical-condition",
    element: <MedicalCondition />,
  },
  {
    path: "/physical-readiness",
    element: <PhysicalReadiness />,
  },
  {
    path: "/indemnity",
    element: <Indemnity />,
  },
  {
    path: "/popia",
    element: <Popia />,
  },
  {
    path: "/summary",
    element: <Summary />,
  },
  {
    path: "/completion",
    element: <Completion />,
  },
  {
    path: "/rejection",
    element: <RejectionMessage />,
  },
  {
    path: "/par-q-rejection",
    element: <ParQRejection />,
  },
  {
    path: "*",
    element: <NotFound />,
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
