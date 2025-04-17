
import React from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { CalendarPlus, LockKeyhole } from "lucide-react";

type UserRole = "admin" | "instructor" | "student" | "guest";

interface EventsHeaderProps {
  canManageEvents: boolean;
  setIsAddingEvent: (isAdding: boolean) => void;
  isAddingEvent: boolean;
}

const EventsHeader = ({ canManageEvents, setIsAddingEvent, isAddingEvent }: EventsHeaderProps) => {
  return (
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-bold">Events Calendar</h2>
      {canManageEvents ? (
        <Dialog open={isAddingEvent} onOpenChange={setIsAddingEvent}>
          <DialogTrigger asChild>
            <Button>
              <CalendarPlus className="mr-2 h-4 w-4" />
              Add Event
            </Button>
          </DialogTrigger>
        </Dialog>
      ) : (
        <div className="flex items-center text-muted-foreground">
          <LockKeyhole className="mr-2 h-4 w-4" />
          <span className="text-sm">Event management restricted to admin/instructors</span>
        </div>
      )}
    </div>
  );
};

export default EventsHeader;
