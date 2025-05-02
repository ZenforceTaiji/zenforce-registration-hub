
import React from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, User } from "lucide-react";

// Mock data for newsletter details
const newslettersData = {
  "newsletter-1": {
    title: "Traditional TaijiQuan Summer Camp Announcement",
    date: "May 1, 2025",
    author: "Master Chen",
    content: `
      <p>We are pleased to announce our annual Traditional TaijiQuan Summer Camp, scheduled for July 15-20, 2025. This intensive 5-day retreat offers a unique opportunity to deepen your practice in a peaceful natural setting.</p>
      
      <h3>Camp Highlights:</h3>
      <ul>
        <li>Daily morning and evening practice sessions</li>
        <li>Special workshops on Traditional Yang Style forms</li>
        <li>QiGong sessions for energy cultivation</li>
        <li>Philosophy discussions and cultural presentations</li>
        <li>Healthy meals and accommodation included</li>
      </ul>
      
      <p>The summer camp is open to practitioners of all levels, from beginners to advanced students. Our experienced instructors will provide personalized guidance to help you advance your skills regardless of your starting point.</p>
      
      <p>Early registration is now open with a special discount for current members. Places are limited, so we encourage you to secure your spot early.</p>
      
      <h3>Registration Information:</h3>
      <p>To register, please visit our registration page or contact the administrative office. A 50% deposit is required to confirm your place, with the balance due by June 15, 2025.</p>
    `,
    image: "https://images.unsplash.com/photo-1571945192246-4fcee13c27b1?q=80&w=2670"
  },
  "newsletter-2": {
    title: "New QiGong Classes for Beginners Starting in June",
    date: "May 2, 2025",
    author: "Sifu Wong",
    content: `
      <p>In response to growing interest, we are excited to introduce a new series of beginner-friendly QiGong classes starting this June. These classes are specifically designed for newcomers to the practice and will focus on foundational techniques and principles.</p>
      
      <h3>Class Details:</h3>
      <ul>
        <li>Starting Date: June 5, 2025</li>
        <li>Schedule: Tuesday and Thursday evenings, 6:00-7:00 PM</li>
        <li>Location: Main Studio</li>
        <li>Duration: 8-week introductory course</li>
      </ul>
      
      <p>The new beginner series will cover essential QiGong practices including:</p>
      <ul>
        <li>Basic standing postures for energy cultivation</li>
        <li>Foundational breathing techniques</li>
        <li>Simple flowing movements for energy circulation</li>
        <li>Introduction to TCM principles related to QiGong</li>
      </ul>
      
      <p>These classes are perfect for those interested in improving overall health, reducing stress, or preparing for more advanced energy work. No previous experience is required, and all necessary equipment will be provided.</p>
      
      <h3>Enrollment Information:</h3>
      <p>Space is limited to ensure quality instruction. To reserve your spot, please register online or visit the front desk. Early bird pricing is available until May 20th.</p>
    `,
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=2620"
  },
  "newsletter-3": {
    title: "Meditation Retreat Weekend - Finding Inner Balance",
    date: "May 3, 2025",
    author: "Dr. Liu",
    content: `
      <p>Join us for a special weekend retreat focused on developing meditation skills and finding inner balance. This two-day immersive experience will be held at our peaceful countryside retreat center on the weekend of June 25-26, 2025.</p>
      
      <h3>Retreat Program:</h3>
      <ul>
        <li>Guided meditation sessions for various skill levels</li>
        <li>Workshops on integrating meditation into daily life</li>
        <li>Silent meditation periods for deep practice</li>
        <li>Nature walks and outdoor meditation</li>
        <li>Nutritious vegetarian meals provided</li>
      </ul>
      
      <p>The retreat is designed to help participants establish or deepen their meditation practice, with techniques specifically complementary to TaijiQuan and QiGong training. Our experienced instructors will guide you through different meditation approaches suitable for your experience level.</p>
      
      <p>Whether you're new to meditation or have an established practice, this retreat offers a valuable opportunity to disconnect from daily stresses and connect with your inner self in a supportive environment.</p>
      
      <h3>Booking Information:</h3>
      <p>Accommodation options include shared rooms or private rooms (subject to availability). Transportation from our main center can be arranged for those who need it. Register before June 1st to receive the early bird discount.</p>
    `,
    image: "https://images.unsplash.com/photo-1536623975707-c4b3b2af565d?q=80&w=2670"
  }
};

const NewsletterDetail = () => {
  const { newsletterId } = useParams<{ newsletterId: string }>();
  const newsletter = newslettersData[newsletterId as keyof typeof newslettersData];

  if (!newsletter) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold text-amber-500 mb-6">Newsletter Not Found</h1>
        <p className="mb-8">The newsletter you're looking for doesn't exist.</p>
        <Button asChild>
          <Link to="/">Return to Home</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-black text-white min-h-screen py-16">
      <div className="container mx-auto px-4">
        <Link to="/" className="inline-flex items-center text-amber-500 hover:text-amber-400 mb-8">
          <ArrowLeft className="w-5 h-5 mr-2" />
          <span>Back to Home</span>
        </Link>

        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-amber-500">{newsletter.title}</h1>
          
          <div className="flex items-center text-gray-400 mb-6 gap-4">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              <span>{newsletter.date}</span>
            </div>
            <div className="flex items-center">
              <User className="w-4 h-4 mr-1" />
              <span>{newsletter.author}</span>
            </div>
          </div>
          
          <div className="relative h-64 md:h-80 mb-8 overflow-hidden rounded-lg">
            <img 
              src={newsletter.image} 
              alt={newsletter.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40"></div>
          </div>
          
          <div className="prose prose-invert prose-amber max-w-none">
            <div dangerouslySetInnerHTML={{ __html: newsletter.content }} />
          </div>
          
          <div className="mt-12">
            <h3 className="text-xl font-semibold mb-4 text-amber-500">Stay Updated</h3>
            <p className="mb-4">Subscribe to our newsletter for the latest updates on classes, events, and special offers.</p>
            <Link to="/contact" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-amber-700/80 hover:bg-amber-700 text-white rounded-md transition-all">
              Subscribe Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsletterDetail;
