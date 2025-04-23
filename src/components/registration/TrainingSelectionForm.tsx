
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { InfoIcon, TreePine } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export interface TrainingOption {
  id: string;
  name: string;
  price: number;
  description: string;
  schedule: string;
  outdoor?: boolean;
  details: string;
}

export const trainingOptions: TrainingOption[] = [
  {
    id: "monday-wednesday",
    name: "Qi Gong, Relaxation and Meditation",
    price: 12000,
    description: "Focus on relaxation, meditation, and Qi Gong practices",
    schedule: "Mondays and Wednesdays",
    details: "This training focuses on ancient Chinese practices that combine meditation, controlled breathing, and gentle physical movement. Qi Gong helps improve mental clarity, reduce stress, enhance energy flow, and promote overall well-being. Perfect for beginners and those seeking a mindful practice."
  },
  {
    id: "tuesday-thursday",
    name: "Martial Arts, Push Hands and Fitness",
    price: 16000,
    description: "Advanced training including martial applications and push hands practice",
    schedule: "Tuesdays and Thursdays",
    details: "Advanced training that combines traditional martial arts techniques with Push Hands (Tui Shou) practice. This training develops sensitivity, balance, and practical self-defense skills while improving overall fitness and coordination. Suitable for those interested in the martial aspects of Tai Chi."
  },
  {
    id: "saturday",
    name: "Health and Meditation",
    price: 4000,
    description: "Outdoor training focusing on health improvement and meditation",
    schedule: "Saturday Mornings",
    outdoor: true,
    details: "A unique outdoor experience combining health-focused exercises with meditation in natural settings. Training takes place in parks or nature reserves, allowing participants to connect with nature while practicing. This session emphasizes breathing techniques, gentle movement, and mindfulness practices suitable for all levels."
  }
];

interface TrainingSelectionFormProps {
  onSelectionChange: (selectedOptions: TrainingOption[]) => void;
}

export const TrainingSelectionForm = ({ onSelectionChange }: TrainingSelectionFormProps) => {
  const [selectedTraining, setSelectedTraining] = useState<string[]>([]);

  const handleCheckboxChange = (optionId: string, checked: boolean) => {
    const newSelection = checked
      ? [...selectedTraining, optionId]
      : selectedTraining.filter(id => id !== optionId);
    
    setSelectedTraining(newSelection);
    
    const selectedOptions = trainingOptions.filter(option => 
      newSelection.includes(option.id)
    );
    
    onSelectionChange(selectedOptions);
  };

  return (
    <TooltipProvider>
      <div className="space-y-6">
        <Alert>
          <InfoIcon className="h-4 w-4" />
          <AlertDescription>
            Training sessions are priced per session with a minimum of 2 sessions per week for weekday classes.
          </AlertDescription>
        </Alert>

        <div className="grid gap-4">
          {trainingOptions.map((option) => (
            <Card key={option.id}>
              <CardContent className="pt-6">
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id={option.id}
                    checked={selectedTraining.includes(option.id)}
                    onCheckedChange={(checked) => 
                      handleCheckboxChange(option.id, checked as boolean)
                    }
                  />
                  <div className="grid gap-1.5 w-full">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <Label 
                            htmlFor={option.id}
                            className="text-base font-semibold"
                          >
                            {option.name}
                          </Label>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-6 px-2 text-muted-foreground hover:text-foreground"
                              >
                                Learn More
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent className="max-w-[300px] p-4">
                              <p className="text-sm leading-relaxed">
                                {option.details}
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                        <p className="text-sm text-gray-500">
                          {option.schedule}
                        </p>
                      </div>
                      <span className="font-bold text-right">
                        R{option.price / 100} {option.id !== "saturday" ? "per week" : "per session"}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">
                      {option.description}
                    </p>
                    {option.outdoor && (
                      <div className="flex items-center gap-1.5 text-sm text-green-600 mt-1">
                        <TreePine className="h-4 w-4" />
                        <span>Outdoor training in parks or nature reserves</span>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </TooltipProvider>
  );
};
