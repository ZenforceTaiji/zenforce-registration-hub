
import { Routes, Route } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Index from "@/pages/Index";
import Gallery from "@/pages/Gallery";
import HistoryOfTaijiquan from "@/pages/HistoryOfTaijiquan";
import NotFound from "@/pages/NotFound";
import ParForm from "@/pages/ParForm";
import Registration from "@/pages/Registration";
import AdminPortal from "@/pages/AdminPortal";
import StudentPortal from "@/pages/StudentPortal";
import InstructorPortal from "@/pages/InstructorPortal";
import Events from "@/pages/Events";
import Booking from "@/pages/Booking";
import Contact from "@/pages/Contact";
import AboutUs from "@/pages/AboutUs";
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
          <Route path="/booking" element={<Booking />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/par-form" element={<ParForm />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/admin-portal" element={<AdminPortal />} />
          <Route path="/student-portal" element={<StudentPortal />} />
          <Route path="/instructor-portal" element={<InstructorPortal />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Toaster />
    </div>
  );
}

export default App;
