
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export function FeaturedNewsletters() {
  // Remove any import or usage of GreetingGenerator if it exists
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Latest Newsletters</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((item) => (
            <Card key={item} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>Newsletter {item}</CardTitle>
                <CardDescription>Published on May {item}, 2025</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Read our latest updates and announcements about upcoming classes and events.</p>
              </CardContent>
              <CardFooter>
                <a href="#" className="text-primary hover:underline">Read more →</a>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
