
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { TRAINING_PACKAGES } from "@/constants/financialRules";

interface OnlineParticipantsSelectorProps {
  participantCount: number;
  onParticipantCountChange: (count: number) => void;
}

export const OnlineParticipantsSelector = ({ 
  participantCount, 
  onParticipantCountChange 
}: OnlineParticipantsSelectorProps) => {
  const maxParticipants = TRAINING_PACKAGES.ONLINE.maxParticipantsPerDevice || 10;
  const pricePerParticipant = TRAINING_PACKAGES.ONLINE.price / 100;
  const totalPrice = pricePerParticipant * participantCount;
  
  const handleParticipantChange = (value: string) => {
    const count = parseInt(value, 10);
    onParticipantCountChange(count);
  };

  return (
    <Card className="mt-3 border-dashed">
      <CardContent className="pt-4">
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium mb-2">
              Number of Participants for Online Sessions
            </h4>
            <p className="text-sm text-muted-foreground mb-4">
              Please specify how many people will be attending each online session. 
              The price is R{pricePerParticipant} per participant per session.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-4 items-end">
            <div className="space-y-1.5 flex-1">
              <Label htmlFor="participants">Number of Participants</Label>
              <Select 
                value={participantCount.toString()} 
                onValueChange={handleParticipantChange}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select number of participants" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: maxParticipants }, (_, i) => i + 1).map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num === 1 ? "1 participant" : `${num} participants`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="bg-slate-50 px-4 py-2 rounded-md border border-slate-200">
              <div className="text-sm text-slate-600">Total price per session:</div>
              <div className="text-xl font-semibold">R{totalPrice.toFixed(2)}</div>
            </div>
          </div>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3">
            <p className="text-sm text-yellow-800">
              <strong>Important Note:</strong> Online classes are for relaxation, meditation, 
              and health improvement only. Participants in online classes are not eligible for 
              grading or competitions.
            </p>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
            <p className="text-sm text-blue-800">
              <strong>Technical Requirements:</strong> You will need a device with a working 
              camera and microphone. Our system will verify the number of participants present 
              matches your registration.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
