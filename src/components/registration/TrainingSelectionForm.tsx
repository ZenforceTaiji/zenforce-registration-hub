import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { InfoIcon, TreePine, Calendar as CalendarIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

export interface TrainingOption {
  id: string;
  name: string;
  price: number;
  description: string;
  schedule: string;
  outdoor?: boolean;
  details: string;
  selectedDates?: Date[];
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
  const [selectedDates, setSelectedDates] = useState<{[key: string]: Date[]}>({});

  const handleCheckboxChange = (optionId: string, checked: boolean) => {
    const newSelection = checked
      ? [...selectedTraining, optionId]
      : selectedTraining.filter(id => id !== optionId);
    
    setSelectedTraining(newSelection);
    
    const selectedOptions = trainingOptions.map(option => {
      if (newSelection.includes(option.id)) {
        return {
          ...option,
          selectedDates: selectedDates[option.id] || []
        };
      }
      return option;
    }).filter(option => newSelection.includes(option.id));
    
    onSelectionChange(selectedOptions);
  };

  const handleDateSelect = (optionId: string, date: Date) => {
    if (date.getDay() !== 6) {
      return;
    }

    const currentDates = selectedDates[optionId] || [];
    const dateExists = currentDates.some(
      existingDate => format(existingDate, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
    );

    const newDates = dateExists
      ? currentDates.filter(d => format(d, 'yyyy-MM-dd') !== format(date, 'yyyy-MM-dd'))
      : [...currentDates, date];

    setSelectedDates({
      ...selectedDates,
      [optionId]: newDates
    });

    if (selectedTraining.includes(optionId)) {
      const selectedOptions = trainingOptions.map(option => {
        if (option.id === optionId) {
          return {
            ...option,
            selectedDates: newDates
          };
        }
        if (selectedTraining.includes(option.id)) {
          return {
            ...option,
            selectedDates: selectedDates[option.id] || []
          };
        }
        return option;
      }).filter(option => selectedTraining.includes(option.id));
      
      onSelectionChange(selectedOptions);
    }
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
                    {option.id === "saturday" && selectedTraining.includes(option.id) && (
                      <div className="mt-4">
                        <Label className="mb-2 block">Select Training Dates (Saturdays Only)</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                "justify-start text-left font-normal w-full",
                                !selectedDates[option.id]?.length && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {selectedDates[option.id]?.length ? (
                                `${selectedDates[option.id].length} date${selectedDates[option.id].length > 1 ? 's' : ''} selected`
                              ) : (
                                "Select Saturdays"
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="multiple"
                              selected={selectedDates[option.id] || []}
                              onSelect={(dates) => {
                                if (dates) {
                                  setSelectedDates({
                                    ...selectedDates,
                                    [option.id]: dates.filter(date => date.getDay() === 6)
                                  });
                                  const selectedOptions = trainingOptions.map(opt => {
                                    if (opt.id === option.id) {
                                      return {
                                        ...opt,
                                        selectedDates: dates.filter(date => date.getDay() === 6)
                                      };
                                    }
                                    if (selectedTraining.includes(opt.id)) {
                                      return {
                                        ...opt,
                                        selectedDates: selectedDates[opt.id] || []
                                      };
                                    }
                                    return opt;
                                  }).filter(opt => selectedTraining.includes(opt.id));
                                  
                                  onSelectionChange(selectedOptions);
                                }
                              }}
                              disabled={(date) => {
                                return date.getDay() !== 6 || date < new Date();
                              }}
                              className="rounded-md border pointer-events-auto"
                            />
                          </PopoverContent>
                        </Popover>
                        {selectedDates[option.id]?.length > 0 && (
                          <div className="mt-2">
                            <p className="text-sm text-gray-500">
                              Selected Saturdays:{" "}
                              {selectedDates[option.id].map(date => 
                                format(date, "PPP")
                              ).join(", ")}
                            </p>
                          </div>
                        )}
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
