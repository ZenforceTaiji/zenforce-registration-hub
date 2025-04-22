
import React from 'react';
import { NewsletterList } from './NewsletterList';
import { NewsletterForm } from './NewsletterForm';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const NewsletterTab = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Newsletter Management</h2>
      </div>

      <Tabs defaultValue="list" className="w-full">
        <TabsList>
          <TabsTrigger value="list">Newsletters</TabsTrigger>
          <TabsTrigger value="create">Create Newsletter</TabsTrigger>
        </TabsList>
        <TabsContent value="list">
          <NewsletterList />
        </TabsContent>
        <TabsContent value="create">
          <NewsletterForm />
        </TabsContent>
      </Tabs>
    </div>
  );
};
