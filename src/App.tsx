
import { Routes, Route } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Index from "@/pages/Index";
import Gallery from "@/pages/Gallery";
import HistoryOfTaijiquan from "@/pages/HistoryOfTaijiquan";
import NotFound from "@/pages/NotFound";
import ParForm from "@/pages/ParForm";
import AdminPortal from "@/pages/AdminPortal";
import StudentPortal from "@/pages/StudentPortal";
import InstructorPortal from "@/pages/InstructorPortal";
import Events from "@/pages/Events";
import { Toaster } from "@/components/ui/toaster";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/history-of-taijiquan" element={<HistoryOfTaijiquan />} />
          <Route path="/events" element={<Events />} />
          <Route path="/par-form" element={<ParForm />} />
          <Route path="/admin-portal" element={<AdminPortal />} />
          <Route path="/student-portal" element={<StudentPortal />} />
          <Route path="/instructor-portal" element={<InstructorPortal />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Toaster />
    </div>
  );
}

export default App;
