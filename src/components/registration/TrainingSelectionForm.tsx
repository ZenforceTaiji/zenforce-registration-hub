
import { useState } from "react";
import { TRAINING_PACKAGES } from "@/constants/financialRules";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { TrainingOption } from "./training/TrainingOption";
import { DateSelector } from "./training/DateSelector";
import { OnlineParticipantsSelector } from "./training/OnlineParticipantsSelector";

export interface TrainingOption {
  id: string;
  name: string;
  price: number;
  description: string;
  schedule: string;
  outdoor?: boolean;
  online?: boolean;
  isGradingEligible?: boolean;
  isCompetitionEligible?: boolean;
  details: string;
  selectedDates?: Date[];
  participantCount?: number;
}

export const trainingOptions: TrainingOption[] = [
  {
    id: "monday-wednesday",
    name: TRAINING_PACKAGES.QI_GONG.name,
    price: TRAINING_PACKAGES.QI_GONG.price,
    description: "Focus on relaxation, meditation, and Qi Gong practices",
    schedule: TRAINING_PACKAGES.QI_GONG.schedule,
    details: "This training focuses on ancient Chinese practices that combine meditation, controlled breathing, and gentle physical movement. Qi Gong helps improve mental clarity, reduce stress, enhance energy flow, and promote overall well-being. Perfect for beginners and those seeking a mindful practice."
  },
  {
    id: "tuesday-thursday",
    name: TRAINING_PACKAGES.MARTIAL_ARTS.name,
    price: TRAINING_PACKAGES.MARTIAL_ARTS.price,
    description: "Advanced training including martial applications and push hands practice",
    schedule: TRAINING_PACKAGES.MARTIAL_ARTS.schedule,
    details: "Advanced training that combines traditional martial arts techniques with Push Hands (Tui Shou) practice. This training develops sensitivity, balance, and practical self-defense skills while improving overall fitness and coordination. Suitable for those interested in the martial aspects of Tai Chi."
  },
  {
    id: "saturday",
    name: TRAINING_PACKAGES.SATURDAY.name,
    price: TRAINING_PACKAGES.SATURDAY.price,
    description: "Outdoor training focusing on health improvement and meditation",
    schedule: TRAINING_PACKAGES.SATURDAY.schedule,
    outdoor: true,
    details: `A unique outdoor experience combining health-focused exercises with meditation in natural settings. Training takes place in parks or nature reserves, allowing participants to connect with nature while practicing. This session emphasizes breathing techniques, gentle movement, and mindfulness practices suitable for all levels.`
  },
  {
    id: "online",
    name: TRAINING_PACKAGES.ONLINE.name,
    price: TRAINING_PACKAGES.ONLINE.price,
    description: "Online classes focused on relaxation, meditation, and health improvement",
    schedule: TRAINING_PACKAGES.ONLINE.schedule,
    online: true,
    isGradingEligible: false,
    isCompetitionEligible: false,
    details: "Virtual training sessions focused on relaxation techniques, meditation, and health improvement. These online classes are designed for those who cannot attend in-person sessions or prefer to practice from home. Note: Online class participants are not eligible for grading or competition participation. Price is per participant per session."
  }
];

interface TrainingSelectionFormProps {
  onSelectionChange: (selectedOptions: TrainingOption[]) => void;
}

export const TrainingSelectionForm = ({ onSelectionChange }: TrainingSelectionFormProps) => {
  const [selectedTraining, setSelectedTraining] = useState<string[]>([]);
  const [selectedDates, setSelectedDates] = useState<{[key: string]: Date[]}>({});
  const [participantCounts, setParticipantCounts] = useState<{[key: string]: number}>({});

  const handleCheckboxChange = (optionId: string, checked: boolean) => {
    const newSelection = checked
      ? [...selectedTraining, optionId]
      : selectedTraining.filter(id => id !== optionId);
    
    setSelectedTraining(newSelection);
    updateSelectedOptions(newSelection, selectedDates, participantCounts);
  };

  const handleDateSelect = (optionId: string, dates: Date[]) => {
    const newSelectedDates = {
      ...selectedDates,
      [optionId]: dates
    };
    
    setSelectedDates(newSelectedDates);
    updateSelectedOptions(selectedTraining, newSelectedDates, participantCounts);
  };

  const handleParticipantCountChange = (optionId: string, count: number) => {
    const newParticipantCounts = {
      ...participantCounts,
      [optionId]: count
    };
    
    setParticipantCounts(newParticipantCounts);
    updateSelectedOptions(selectedTraining, selectedDates, newParticipantCounts);
  };

  const updateSelectedOptions = (
    selection: string[], 
    dates: {[key: string]: Date[]},
    counts: {[key: string]: number}
  ) => {
    const selectedOptions = trainingOptions.map(option => {
      if (selection.includes(option.id)) {
        return {
          ...option,
          selectedDates: dates[option.id] || [],
          participantCount: counts[option.id] || 1
        };
      }
      return option;
    }).filter(option => selection.includes(option.id));
    
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
            <div key={option.id}>
              <TrainingOption
                option={option}
                checked={selectedTraining.includes(option.id)}
                onCheckboxChange={(checked) => handleCheckboxChange(option.id, checked)}
              />
              
              {option.id === "saturday" && selectedTraining.includes(option.id) && (
                <DateSelector
                  selectedDates={selectedDates[option.id] || []}
                  onDatesChange={(dates) => handleDateSelect(option.id, dates)}
                />
              )}
              
              {option.id === "online" && selectedTraining.includes(option.id) && (
                <OnlineParticipantsSelector
                  participantCount={participantCounts[option.id] || 1}
                  onParticipantCountChange={(count) => handleParticipantCountChange(option.id, count)}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </TooltipProvider>
  );
};
