
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";

export interface TrainingOption {
  id: string;
  name: string;
  price: number;
  description: string;
}

export const trainingOptions: TrainingOption[] = [
  {
    id: "qigong",
    name: "Qi Gong",
    price: 30000, // R300 in cents
    description: "Basic Qi Gong training"
  },
  {
    id: "taiji-relaxation",
    name: "TaijiQuan (Relaxation and Forms)",
    price: 60000, // R600 in cents
    description: "Focus on relaxation techniques and basic forms"
  },
  {
    id: "taiji-fighting",
    name: "TaijiQuan (Fighting Forms and Push Hands)",
    price: 80000, // R800 in cents
    description: "Advanced training including fighting forms and push hands"
  },
  {
    id: "taiji-health",
    name: "TaijiQuan (Health issues)",
    price: 40000, // R400 in cents
    description: "Specialized training focusing on health improvement"
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
          Training sessions are conducted twice a week. Prices are based on 30 sessions.
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
                <div className="grid gap-1.5">
                  <div className="flex items-center justify-between">
                    <Label 
                      htmlFor={option.id}
                      className="text-base font-semibold"
                    >
                      {option.name}
                    </Label>
                    <span className="font-bold">
                      R{option.price / 100} per month
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">
                    {option.description}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
