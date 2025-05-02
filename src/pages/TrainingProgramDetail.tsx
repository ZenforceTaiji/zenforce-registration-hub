
import React from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

// Mock data for program details
const programsData = {
  "traditional-taijiquan": {
    title: "Traditional TaijiQuan",
    description: "Ancient wisdom meets modern practice in our authentic TaijiQuan classes",
    fullDescription: `
      <p>Traditional TaijiQuan at ZenForce embodies the ancient Chinese martial art form that has been passed down through generations. Our classes focus on the authentic Yang style movements that promote harmony between mind and body.</p>
      
      <p>Students learn a series of slow, deliberate movements that emphasize proper posture, breathing techniques, and mental focus. These movements, known as forms or 'taolu', create a meditative state that enhances the flow of qi (energy) throughout the body.</p>
      
      <h3>What to expect in our Traditional TaijiQuan classes:</h3>
      <ul>
        <li>Systematic learning of traditional Yang-style TaijiQuan forms</li>
        <li>Understanding of the philosophical principles that underpin the art</li>
        <li>Development of internal energy cultivation techniques</li>
        <li>Application of TaijiQuan movements for self-defense</li>
        <li>Progressive advancement through various levels as skills develop</li>
      </ul>
      
      <p>Our Traditional TaijiQuan classes welcome practitioners of all ages and experience levels. The gentle, non-impact nature of TaijiQuan makes it accessible to everyone while still offering profound benefits for physical health, mental clarity, and spiritual growth.</p>
    `,
    image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?q=80&w=2670"
  },
  "qigong-practice": {
    title: "QiGong Practice",
    description: "Harness your internal energy through specialized breathing and movement",
    fullDescription: `
      <p>QiGong is an ancient Chinese system of exercises and meditation that cultivates vital life-force energy for healing, vitality, and spiritual development. At ZenForce, our QiGong practice focuses on the coordination of different breathing patterns with various physical postures and motions of the body.</p>
      
      <p>Through regular practice, students learn to gather, circulate, and apply qi (vital energy) both for maintaining health and addressing specific health concerns. Our instructors guide practitioners through sequences designed to open energy channels, improve organ function, and enhance overall wellbeing.</p>
      
      <h3>Benefits of our QiGong Practice:</h3>
      <ul>
        <li>Stress reduction and improved mental clarity</li>
        <li>Enhanced immune function and vitality</li>
        <li>Greater balance, flexibility, and strength</li>
        <li>Development of focused awareness and mindfulness</li>
        <li>Support for healing and managing chronic conditions</li>
      </ul>
      
      <p>QiGong is particularly beneficial for those seeking gentle yet powerful practices for health maintenance and improvement. Classes include standing, seated, and moving forms, making them adaptable to various physical abilities and needs.</p>
    `,
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=2622"
  },
  "meditation-classes": {
    title: "Meditation Classes",
    description: "Find inner peace and mental clarity through guided meditation sessions",
    fullDescription: `
      <p>Our Meditation Classes at ZenForce provide a structured approach to developing mindfulness and inner peace. Drawing from traditional Chinese and Buddhist meditation practices associated with TaijiQuan and QiGong, our sessions guide students toward deeper states of awareness and tranquility.</p>
      
      <p>Under the guidance of experienced instructors, participants learn various meditation techniques, including focused attention, mindful awareness, and visualization practices. These sessions complement the physical aspects of martial arts training by developing the mental discipline essential for advancement.</p>
      
      <h3>Our Meditation Classes include:</h3>
      <ul>
        <li>Sitting meditation practices for developing concentration</li>
        <li>Standing meditation postures from the TaijiQuan tradition</li>
        <li>Moving meditation that integrates awareness with gentle movement</li>
        <li>Breath awareness techniques for calming the mind</li>
        <li>Visualization practices for energy cultivation</li>
      </ul>
      
      <p>Regular meditation practice helps reduce stress, improve focus, enhance emotional regulation, and promote overall mental wellbeing. Our classes are suitable for beginners and experienced meditators alike, with options for both short sessions and deeper practice periods.</p>
    `,
    image: "https://images.unsplash.com/photo-1528319725582-ddc096101511?q=80&w=2670"
  }
};

const TrainingProgramDetail = () => {
  const { programId } = useParams<{ programId: string }>();
  const program = programsData[programId as keyof typeof programsData];

  if (!program) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold text-amber-500 mb-6">Program Not Found</h1>
        <p className="mb-8">The program you're looking for doesn't exist.</p>
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
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-amber-500">{program.title}</h1>
          
          <div className="relative h-64 md:h-80 mb-8 overflow-hidden rounded-lg">
            <img 
              src={program.image} 
              alt={program.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40"></div>
          </div>
          
          <div className="prose prose-invert prose-amber max-w-none">
            <div dangerouslySetInnerHTML={{ __html: program.fullDescription }} />
          </div>
          
          <div className="mt-12">
            <h3 className="text-xl font-semibold mb-4 text-amber-500">Ready to begin your journey?</h3>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/registration" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-amber-700/80 hover:bg-amber-700 text-white rounded-md transition-all">
                Register for Classes
              </Link>
              <Link to="/contact" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-black/60 hover:bg-black/80 text-white border border-amber-700/50 rounded-md transition-all">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainingProgramDetail;
