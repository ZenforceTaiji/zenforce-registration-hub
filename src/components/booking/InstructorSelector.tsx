
import { Button } from "@/components/ui/button";
import { Instructor } from "./types";

interface InstructorSelectorProps {
  instructors: Instructor[];
  selectedDate?: Date;
  selectedInstructor?: Instructor | null;
  onSelect: (instructor: Instructor) => void;
  formatDateToString: (date: Date) => string;
}

const InstructorSelector = ({ 
  instructors, 
  selectedDate, 
  selectedInstructor, 
  onSelect,
  formatDateToString 
}: InstructorSelectorProps) => {
  if (!selectedDate) return null;

  return (
    <div>
      <h3 className="font-medium mb-3">Available Instructors</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {instructors
          .filter(instructor => 
            instructor.availableDates.includes(formatDateToString(selectedDate))
          )
          .map(instructor => (
            <Button
              key={instructor.id}
              variant={selectedInstructor?.id === instructor.id ? "default" : "outline"}
              className="justify-start h-auto py-3 text-left"
              onClick={() => onSelect(instructor)}
            >
              <div>
                <div className="font-medium">{instructor.name}</div>
                <div className="text-xs text-gray-500 mt-1">
                  {instructor.specialties.join(", ")}
                </div>
              </div>
            </Button>
          ))}
      </div>
    </div>
  );
};

export default InstructorSelector;
