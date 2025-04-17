
import React from "react";
import { BookOpen, Users, Award } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const FeaturesSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 text-sm px-3 py-1 border-primary-500/50 text-primary-600">Ancient Practice, Modern Benefits</Badge>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose TaijiQuan?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Discover how this ancient martial art can transform your physical and mental wellbeing</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="shadow-soft hover:shadow-card-hover transition-all duration-300 border-t-4 border-t-primary-600">
            <CardContent className="p-6">
              <div className="h-12 w-12 rounded-full bg-primary-50 flex items-center justify-center mb-4">
                <BookOpen className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Traditional Practice</h3>
              <p className="text-gray-600">
                Learn authentic movements passed down through generations, preserving the rich history and philosophy of TaijiQuan.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-soft hover:shadow-card-hover transition-all duration-300 border-t-4 border-t-primary-600">
            <CardContent className="p-6">
              <div className="h-12 w-12 rounded-full bg-primary-50 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Supportive Community</h3>
              <p className="text-gray-600">
                Join a welcoming community of practitioners who share your journey and support your growth and development.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-soft hover:shadow-card-hover transition-all duration-300 border-t-4 border-t-primary-600">
            <CardContent className="p-6">
              <div className="h-12 w-12 rounded-full bg-primary-50 flex items-center justify-center mb-4">
                <Award className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Expert Instruction</h3>
              <p className="text-gray-600">
                Train with certified instructors who provide personalized guidance to help you master the art of TaijiQuan.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
