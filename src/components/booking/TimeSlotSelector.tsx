
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";
import { TimeSlot } from "./types";

interface TimeSlotSelectorProps {
  timeSlots: TimeSlot[];
  selectedTimeSlot: TimeSlot | null;
  onSelect: (slot: TimeSlot) => void;
}

const TimeSlotSelector = ({ timeSlots, selectedTimeSlot, onSelect }: TimeSlotSelectorProps) => {
  return (
    <div>
      <h3 className="font-medium mb-3">Available Time Slots</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {timeSlots.map(slot => {
          let buttonVariant: "outline" | "default" = "outline";
          let buttonClass = "justify-center";
          let capacityText = "";
          
          if (!slot.available) {
            buttonClass += " opacity-50 cursor-not-allowed";
            capacityText = "Fully Booked";
          } else if (slot.registeredUsers > 0) {
            if (slot.type === "online-individual") {
              capacityText = `${slot.registeredUsers}/10`;
            } else if (slot.type === "online-group") {
              capacityText = `${slot.registeredUsers}/20`;
            } else {
              capacityText = `${slot.registeredUsers}/${slot.capacity}`;
            }
          }
          
          if (selectedTimeSlot?.id === slot.id) {
            buttonVariant = "default";
          }
          
          return (
            <div key={slot.id} className="flex flex-col">
              <Button
                variant={buttonVariant}
                className={buttonClass}
                onClick={() => onSelect(slot)}
                disabled={!slot.available}
              >
                <Clock className="mr-2 h-4 w-4" />
                {slot.time}
              </Button>
              {capacityText && (
                <div className={`text-xs mt-1 text-center ${!slot.available ? 'text-red-500' : 'text-gray-500'}`}>
                  {capacityText}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TimeSlotSelector;
