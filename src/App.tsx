
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Registration from "./pages/Registration";
import ParentDetails from "./pages/ParentDetails";
import PreviousTraining from "./pages/PreviousTraining";
import MedicalCondition from "./pages/MedicalCondition";
import Indemnity from "./pages/Indemnity";
import RejectionMessage from "./pages/RejectionMessage";
import Popia from "./pages/Popia";
import Summary from "./pages/Summary";
import Completion from "./pages/Completion";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/parent-details" element={<ParentDetails />} />
          <Route path="/previous-training" element={<PreviousTraining />} />
          <Route path="/medical-condition" element={<MedicalCondition />} />
          <Route path="/indemnity" element={<Indemnity />} />
          <Route path="/rejection-message" element={<RejectionMessage />} />
          <Route path="/popia" element={<Popia />} />
          <Route path="/summary" element={<Summary />} />
          <Route path="/completion" element={<Completion />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
