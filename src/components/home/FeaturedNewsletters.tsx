
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

// Pre-defined newsletters data to avoid runtime fetch
const newsletters = [
  {
    id: "newsletter-1",
    title: "Traditional TaijiQuan Summer Camp",
    date: "May 1, 2025",
    description: "Join us for our annual summer training camp experience"
  },
  {
    id: "newsletter-2",
    title: "New QiGong Classes for Beginners",
    date: "May 2, 2025",
    description: "Starting in June - perfect for those new to energy practices"
  },
  {
    id: "newsletter-3",
    title: "Meditation Retreat Weekend",
    date: "May 3, 2025",
    description: "A special weekend focused on finding inner balance"
  }
];

export function FeaturedNewsletters() {
  // Filter newsletters to only include those from the last 30 days
  const currentDate = new Date();
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(currentDate.getDate() - 30);
  
  const recentNewsletters = newsletters.filter(item => {
    const newsletterDate = new Date(item.date);
    return newsletterDate >= thirtyDaysAgo;
  });
  
  // If there are no recent newsletters, don't render the section
  if (recentNewsletters.length === 0) {
    return null;
  }

  return (
    <section className="py-12 bg-black text-gray-200">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-amber-500">Latest News & Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentNewsletters.map((item) => (
            <Link to={`/newsletter/${item.id}`} key={item.id}>
              <Card className="bg-black/90 border-amber-900/50 hover:border-amber-500 transition-all text-white hover:shadow-md hover:shadow-amber-900/20">
                <CardHeader>
                  <CardTitle className="text-amber-500">{item.title}</CardTitle>
                  <CardDescription className="text-gray-300">Published on {item.date}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-white">{item.description}</p>
                </CardContent>
                <CardFooter>
                  <span className="text-amber-500 hover:text-amber-400 transition-colors">Read more →</span>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
