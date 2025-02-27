
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Trash, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface TrainingEntry {
  id: string;
  style: string;
  instructor: string;
  institute: string;
  grade: string;
  lastDate: string;
}

const PreviousTraining = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const userAge = sessionStorage.getItem("userAge");
  const studentDetails = sessionStorage.getItem("studentDetails");
  
  const [hasPreviousTraining, setHasPreviousTraining] = useState<string>("no");
  const [trainingEntries, setTrainingEntries] = useState<TrainingEntry[]>([
    {
      id: crypto.randomUUID(),
      style: "",
      instructor: "",
      institute: "",
      grade: "",
      lastDate: "",
    },
  ]);

  // Check if required session data exists
  useEffect(() => {
    if (!userAge || !studentDetails) {
      navigate("/");
    }

    // Load previous data if available
    const savedData = sessionStorage.getItem("previousTraining");
    if (savedData) {
      const { hasPrevious, entries } = JSON.parse(savedData);
      setHasPreviousTraining(hasPrevious);
      if (entries && entries.length > 0) {
        setTrainingEntries(entries);
      }
    }
  }, [userAge, studentDetails, navigate]);

  const handleSelectChange = (value: string) => {
    setHasPreviousTraining(value);
  };

  const handleEntryChange = (id: string, field: keyof TrainingEntry, value: string) => {
    setTrainingEntries(
      trainingEntries.map((entry) =>
        entry.id === id ? { ...entry, [field]: value } : entry
      )
    );
  };

  const addEntry = () => {
    setTrainingEntries([
      ...trainingEntries,
      {
        id: crypto.randomUUID(),
        style: "",
        instructor: "",
        institute: "",
        grade: "",
        lastDate: "",
      },
    ]);
  };

  const removeEntry = (id: string) => {
    if (trainingEntries.length > 1) {
      setTrainingEntries(trainingEntries.filter((entry) => entry.id !== id));
    } else {
      toast({
        title: "Cannot Remove",
        description: "You need at least one entry",
        variant: "destructive",
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate entries if user has previous training
    if (hasPreviousTraining === "yes") {
      const hasEmptyFields = trainingEntries.some(
        entry => !entry.style || !entry.lastDate
      );
      
      if (hasEmptyFields) {
        toast({
          title: "Incomplete Information",
          description: "Please fill in at least the Style and Last Date fields for all entries",
          variant: "destructive",
        });
        return;
      }
    }

    // Save data to session storage
    sessionStorage.setItem(
      "previousTraining",
      JSON.stringify({
        hasPrevious: hasPreviousTraining,
        entries: hasPreviousTraining === "yes" ? trainingEntries : [],
      })
    );
    
    // Navigate to Medical Condition page
    navigate("/medical-condition");
  };

  return (
    <div className="zen-container py-12 animate-fade-in">
      <h1 className="page-title mb-8">Previous Training</h1>
      <div className="zen-card max-w-3xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <Label htmlFor="hasPreviousTraining">
              Have you had previous Martial Arts Training?
            </Label>
            <Select value={hasPreviousTraining} onValueChange={handleSelectChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="yes">Yes</SelectItem>
                <SelectItem value="no">No</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {hasPreviousTraining === "yes" && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Previous Training Details</h3>
                <Button
                  type="button"
                  onClick={addEntry}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <Plus className="w-4 h-4" /> Add Entry
                </Button>
              </div>

              {trainingEntries.map((entry) => (
                <div key={entry.id} className="p-4 border rounded-md bg-slate-50">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="text-sm font-medium text-slate-500">Training Entry</h4>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeEntry(entry.id)}
                      className="h-8 w-8 p-0 text-red-500"
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor={`style-${entry.id}`}>Martial Arts Form/Style *</Label>
                      <Input
                        id={`style-${entry.id}`}
                        value={entry.style}
                        onChange={(e) => handleEntryChange(entry.id, "style", e.target.value)}
                        placeholder="Enter martial arts style"
                        required={hasPreviousTraining === "yes"}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor={`instructor-${entry.id}`}>Instructor</Label>
                      <Input
                        id={`instructor-${entry.id}`}
                        value={entry.instructor}
                        onChange={(e) => handleEntryChange(entry.id, "instructor", e.target.value)}
                        placeholder="Enter instructor name"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`institute-${entry.id}`}>Institute</Label>
                      <Input
                        id={`institute-${entry.id}`}
                        value={entry.institute}
                        onChange={(e) => handleEntryChange(entry.id, "institute", e.target.value)}
                        placeholder="Enter institute name"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor={`grade-${entry.id}`}>Grade</Label>
                      <Input
                        id={`grade-${entry.id}`}
                        value={entry.grade}
                        onChange={(e) => handleEntryChange(entry.id, "grade", e.target.value)}
                        placeholder="Enter grade/level"
                      />
                    </div>

                    <div className="space-y-2 sm:col-span-2">
                      <Label htmlFor={`lastDate-${entry.id}`}>Last Date Training *</Label>
                      <Input
                        id={`lastDate-${entry.id}`}
                        type="date"
                        value={entry.lastDate}
                        onChange={(e) => handleEntryChange(entry.id, "lastDate", e.target.value)}
                        required={hasPreviousTraining === "yes"}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="flex justify-between pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                // Check if coming from parent details or student details
                const hasParentDetails = sessionStorage.getItem("parentDetails");
                if (hasParentDetails) {
                  navigate("/parent-details");
                } else {
                  navigate("/registration");
                }
              }}
            >
              Back
            </Button>
            <Button type="submit" className="bg-accent-red hover:bg-accent-red/90 text-white">
              Continue to Medical Condition
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PreviousTraining;
