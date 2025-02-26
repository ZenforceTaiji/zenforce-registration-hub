
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import { RegistrationDialog } from "@/components/RegistrationDialog";

const Index = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative">
        <div className="absolute inset-0">
          <img
            src="/placeholder.svg"
            alt="Water background"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30" />
        </div>

        {/* Logo */}
        <div className="absolute top-4 right-4">
          <img
            src="/placeholder.svg"
            alt="ZenForce Logo"
            className="h-16 w-16 rounded-full bg-white/10 p-2"
          />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-32 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            ZenForce TaijiQuan SA
          </h1>
          <p className="mt-6 max-w-3xl text-xl text-gray-300">
            Discover the ancient art of balance, strength, and inner peace
          </p>
          <div className="mt-10">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="default"
                  size="lg"
                  className="zen-button-primary"
                >
                  Begin Your Journey
                </Button>
              </DialogTrigger>
              <RegistrationDialog onClose={() => setIsDialogOpen(false)} />
            </Dialog>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <section className="zen-container py-24">
        <div className="grid gap-16 lg:grid-cols-2">
          <div className="space-y-6">
            <h2 className="section-title">
              Taijiquan (Tai Chi Chuan): An Overview
            </h2>
            <div className="prose prose-lg">
              <h3 className="text-xl font-semibold text-gray-900">
                History of Taijiquan
              </h3>
              <p className="mt-4 text-gray-600">
                Taijiquan, also known as Tai Chi Chuan, is a traditional Chinese
                martial art that combines self-defense, health benefits, and
                philosophical principles. The history of Taijiquan dates back
                several centuries and involves various families and styles, each
                contributing to its development.
              </p>
            </div>
          </div>
          <div className="relative h-96 overflow-hidden rounded-xl">
            <img
              src="/placeholder.svg"
              alt="Taijiquan Practice"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
