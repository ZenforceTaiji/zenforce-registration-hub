
import React from 'react';
import { Routes, Route } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Index from "@/pages/Index";
import Gallery from "@/pages/Gallery";
import HistoryOfTaijiquan from "@/pages/HistoryOfTaijiquan";
import PurposeOfTaijiquan from "@/pages/PurposeOfTaijiquan";
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
import PreviousTraining from "@/pages/PreviousTraining";
import MedicalCondition from "@/pages/MedicalCondition";
import PhysicalReadiness from "@/pages/PhysicalReadiness";
import UploadId from "@/pages/UploadId";
import Indemnity from "@/pages/Indemnity";
import Popia from "@/pages/Popia";
import Summary from "@/pages/Summary";
import Completion from "@/pages/Completion";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentCancelled from "./pages/PaymentCancelled";
import PaymentSimulator from "./pages/PaymentSimulator";
import TermsAndConditions from "@/pages/TermsAndConditions";
import OnlineRegistration from "@/pages/OnlineRegistration";
import OnlinePayment from "@/pages/OnlinePayment";
import OnlineClasses from "./pages/OnlineClasses";
import OnlineClassRoom from "./pages/OnlineClassRoom";
import { Toaster } from "@/components/ui/toaster";
import TrainingProgramDetail from '@/pages/TrainingProgramDetail';
import NewsletterDetail from '@/pages/NewsletterDetail';
import { Helmet } from "react-helmet-async";

function App() {
  return (
    <>
      <Helmet>
        <html lang="en" />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#b45309" />
        
        {/* Preload critical assets */}
        <link rel="preload" href="/fonts/cinzel-v19-latin-regular.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/images/hero/hero-bg.webp" as="image" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://vyjhxyazgtdldzejjbzu.supabase.co" />
      </Helmet>
      <div className="min-h-screen flex flex-col">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:p-4 focus:bg-amber-600 focus:text-white focus:z-50">
          Skip to main content
        </a>
        <Navbar />
        <main id="main-content" className="flex-grow">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/history-of-taijiquan" element={<HistoryOfTaijiquan />} />
            <Route path="/purpose-of-taijiquan" element={<PurposeOfTaijiquan />} />
            <Route path="/events" element={<Events />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/par-form" element={<ParForm />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/previous-training" element={<PreviousTraining />} />
            <Route path="/medical-condition" element={<MedicalCondition />} />
            <Route path="/physical-readiness" element={<PhysicalReadiness />} />
            <Route path="/upload-id" element={<UploadId />} />
            <Route path="/indemnity" element={<Indemnity />} />
            <Route path="/popia" element={<Popia />} />
            <Route path="/summary" element={<Summary />} />
            <Route path="/completion" element={<Completion />} />
            <Route path="/admin-portal" element={<AdminPortal />} />
            <Route path="/student-portal" element={<StudentPortal />} />
            <Route path="/instructor-portal" element={<InstructorPortal />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/payment-success" element={<PaymentSuccess />} />
            <Route path="/payment-cancelled" element={<PaymentCancelled />} />
            <Route path="/payment-simulator" element={<PaymentSimulator />} />
            <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
            <Route path="/online-registration" element={<OnlineRegistration />} />
            <Route path="/online-payment" element={<OnlinePayment />} />
            <Route path="/online-classes" element={<OnlineClasses />} />
            <Route path="/online-classroom/:sessionId" element={<OnlineClassRoom />} />
            
            {/* New detail pages */}
            <Route path="/program/:programId" element={<TrainingProgramDetail />} />
            <Route path="/newsletter/:newsletterId" element={<NewsletterDetail />} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
        <Toaster />
      </div>
    </>
  );
}

export default App;
