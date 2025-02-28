
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import GradingInfo from "@/components/student-portal/GradingInfo";
import GradingGuide from "@/components/student-portal/GradingGuide";
import Certificates from "@/components/student-portal/Certificates";
import FinancialInfo from "@/components/student-portal/FinancialInfo";
import MediaGallery from "@/components/student-portal/MediaGallery";

const StudentPortal = () => {
  return (
    <div className="zen-container py-8 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Student Portal</h1>
          <p className="text-gray-500 mt-1">View your grading information, certificates, and more</p>
        </div>
        <div className="mt-4 md:mt-0 p-3 border rounded-lg bg-white shadow-sm">
          <div className="text-sm text-gray-500">Current Grade</div>
          <div className="text-2xl font-bold text-accent-red">G02</div>
        </div>
      </div>

      <Tabs defaultValue="grading">
        <TabsList className="grid grid-cols-2 md:grid-cols-5 w-full mb-6">
          <TabsTrigger value="grading">Grading</TabsTrigger>
          <TabsTrigger value="guide">Grading Guide</TabsTrigger>
          <TabsTrigger value="certificates">Certificates</TabsTrigger>
          <TabsTrigger value="financial">Financial</TabsTrigger>
          <TabsTrigger value="media">Images & Videos</TabsTrigger>
        </TabsList>
        
        <TabsContent value="grading" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Grading Information</CardTitle>
              <CardDescription>
                View and manage your Taijiquan grading records
              </CardDescription>
            </CardHeader>
            <CardContent>
              <GradingInfo />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="guide" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Grading Guide</CardTitle>
              <CardDescription>
                Reference guide for TaijiQuan grading requirements and scoring system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <GradingGuide />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="certificates" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Certificates</CardTitle>
              <CardDescription>
                View and download your achievement certificates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Certificates />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="financial" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Financial Information</CardTitle>
              <CardDescription>
                View your payment history and current balance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FinancialInfo />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="media" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Media Gallery</CardTitle>
              <CardDescription>
                View images and videos of your training sessions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <MediaGallery />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StudentPortal;
