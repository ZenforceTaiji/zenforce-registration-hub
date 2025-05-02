
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export function FeaturedNewsletters() {
  // Sample newsletter data
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

  return (
    <section className="py-12 bg-black text-gray-200">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-amber-500">Latest News & Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {newsletters.map((item) => (
            <Link to={`/newsletter/${item.id}`} key={item.id}>
              <Card className="bg-black/80 border-amber-900/50 hover:border-amber-500 transition-all text-gray-200 hover:shadow-md hover:shadow-amber-900/20">
                <CardHeader>
                  <CardTitle className="text-amber-500">{item.title}</CardTitle>
                  <CardDescription className="text-gray-400">Published on {item.date}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>{item.description}</p>
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
