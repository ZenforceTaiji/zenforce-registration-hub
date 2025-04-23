
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface DateSelectorProps {
  selectedDates: Date[];
  onDatesChange: (dates: Date[]) => void;
}

export const DateSelector = ({ selectedDates, onDatesChange }: DateSelectorProps) => {
  return (
    <div className="mt-4">
      <Label className="mb-2 block">Select Training Dates (Saturdays Only)</Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "justify-start text-left font-normal w-full",
              !selectedDates?.length && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {selectedDates?.length ? (
              `${selectedDates.length} date${selectedDates.length > 1 ? 's' : ''} selected`
            ) : (
              "Select Saturdays"
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="multiple"
            selected={selectedDates}
            onSelect={(dates) => {
              if (dates) {
                onDatesChange(dates.filter(date => date.getDay() === 6));
              }
            }}
            disabled={(date) => {
              return date.getDay() !== 6 || date < new Date();
            }}
            className="rounded-md border pointer-events-auto"
          />
        </PopoverContent>
      </Popover>
      {selectedDates?.length > 0 && (
        <div className="mt-2">
          <p className="text-sm text-gray-500">
            Selected Saturdays:{" "}
            {selectedDates.map(date => 
              format(date, "PPP")
            ).join(", ")}
          </p>
        </div>
      )}
    </div>
  );
};
