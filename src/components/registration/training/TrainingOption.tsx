
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { TreePine, Wifi, Award, Trophy } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TrainingOption as TrainingOptionType } from "../TrainingSelectionForm";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

interface TrainingOptionProps {
  option: TrainingOptionType;
  checked: boolean;
  onCheckboxChange: (checked: boolean) => void;
}

export const TrainingOption = ({
  option,
  checked,
  onCheckboxChange,
}: TrainingOptionProps) => {
  const isOnline = option.online === true;
  const isOutdoor = option.outdoor === true;
  
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-start space-x-2">
          <Checkbox
            id={option.id}
            checked={checked}
            onCheckedChange={(checked) => onCheckboxChange(checked as boolean)}
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
                  
                  {isOnline && (
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                      Online
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-gray-500">
                  {option.schedule}
                </p>
              </div>
              <span className="font-bold text-right">
                R{option.price / 100} {isOnline ? "per participant" : option.id !== "saturday" ? "per week" : "per session"}
              </span>
            </div>
            <p className="text-sm text-gray-500">
              {option.description}
            </p>
            {isOutdoor && (
              <div className="flex items-center gap-1.5 text-sm text-green-600 mt-1">
                <TreePine className="h-4 w-4" />
                <span>Outdoor training in parks or nature reserves</span>
              </div>
            )}
            {isOnline && (
              <div className="flex flex-col gap-1 mt-1">
                <div className="flex items-center gap-1.5 text-sm text-blue-600">
                  <Wifi className="h-4 w-4" />
                  <span>Virtual training via video call</span>
                </div>
                <div className="flex items-center gap-6 text-xs text-gray-500 mt-0.5">
                  <div className="flex items-center gap-1">
                    <Award className="h-3.5 w-3.5" />
                    <span>Grading: {option.isGradingEligible !== false ? "Eligible" : "Not Eligible"}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Trophy className="h-3.5 w-3.5" />
                    <span>Competitions: {option.isCompetitionEligible !== false ? "Eligible" : "Not Eligible"}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
