
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { InfoIcon, TreePine } from "lucide-react";

export interface TrainingOption {
  id: string;
  name: string;
  price: number;
  description: string;
  schedule: string;
  outdoor?: boolean;
}

export const trainingOptions: TrainingOption[] = [
  {
    id: "monday-wednesday",
    name: "Qi Gong, Relaxation and Meditation",
    price: 12000, // R120 per week (2 sessions at R60 each)
    description: "Focus on relaxation, meditation, and Qi Gong practices",
    schedule: "Mondays and Wednesdays"
  },
  {
    id: "tuesday-thursday",
    name: "Martial Arts, Push Hands and Fitness",
    price: 16000, // R160 per week (2 sessions at R80 each)
    description: "Advanced training including martial applications and push hands practice",
    schedule: "Tuesdays and Thursdays"
  },
  {
    id: "saturday",
    name: "Health and Meditation",
    price: 4000, // R40 per session
    description: "Outdoor training focusing on health improvement and meditation",
    schedule: "Saturday Mornings",
    outdoor: true
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
                      <Label 
                        htmlFor={option.id}
                        className="text-base font-semibold"
                      >
                        {option.name}
                      </Label>
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
  );
};
