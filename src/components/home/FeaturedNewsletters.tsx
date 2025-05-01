
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export function FeaturedNewsletters() {
  return (
    <section className="py-12 bg-black text-gray-200">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-amber-500">Latest News & Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((item) => (
            <Card key={item} className="bg-black/80 border-amber-900/50 hover:border-amber-500 transition-all text-gray-200">
              <CardHeader>
                <CardTitle className="text-amber-500">Newsletter {item}</CardTitle>
                <CardDescription className="text-gray-400">Published on May {item}, 2025</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Read our latest updates and announcements about upcoming classes and events.</p>
              </CardContent>
              <CardFooter>
                <a href="#" className="text-amber-500 hover:text-amber-400 transition-colors">Read more →</a>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
