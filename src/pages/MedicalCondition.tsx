
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

interface MedicalConditionEntry {
  id: string;
  name: string;
  lastCheckup: string;
  nextCheckup: string;
}

interface MedicationEntry {
  id: string;
  name: string;
  reason: string;
  dosage: string;
}

const MedicalCondition = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const userAge = sessionStorage.getItem("userAge");
  
  const [hasMedicalCondition, setHasMedicalCondition] = useState<string>("no");
  const [medicalEntries, setMedicalEntries] = useState<MedicalConditionEntry[]>([
    {
      id: crypto.randomUUID(),
      name: "",
      lastCheckup: "",
      nextCheckup: "",
    },
  ]);

  const [takesMedication, setTakesMedication] = useState<string>("no");
  const [medicationEntries, setMedicationEntries] = useState<MedicationEntry[]>([
    {
      id: crypto.randomUUID(),
      name: "",
      reason: "",
      dosage: "",
    },
  ]);

  // Check if required session data exists
  useEffect(() => {
    if (!userAge) {
      navigate("/");
      return;
    }

    // Load previous medical data if available
    const savedMedicalData = sessionStorage.getItem("medicalConditions");
    if (savedMedicalData) {
      const { hasMedical, entries } = JSON.parse(savedMedicalData);
      setHasMedicalCondition(hasMedical);
      if (entries && entries.length > 0) {
        setMedicalEntries(entries);
      }
    }

    // Load previous medication data if available
    const savedMedicationData = sessionStorage.getItem("medications");
    if (savedMedicationData) {
      const { takesMeds, entries } = JSON.parse(savedMedicationData);
      setTakesMedication(takesMeds);
      if (entries && entries.length > 0) {
        setMedicationEntries(entries);
      }
    }
  }, [userAge, navigate]);

  const handleMedicalChange = (value: string) => {
    setHasMedicalCondition(value);
  };

  const handleMedicationChange = (value: string) => {
    setTakesMedication(value);
  };

  const handleMedicalEntryChange = (id: string, field: keyof MedicalConditionEntry, value: string) => {
    setMedicalEntries(
      medicalEntries.map((entry) =>
        entry.id === id ? { ...entry, [field]: value } : entry
      )
    );
  };

  const handleMedicationEntryChange = (id: string, field: keyof MedicationEntry, value: string) => {
    setMedicationEntries(
      medicationEntries.map((entry) =>
        entry.id === id ? { ...entry, [field]: value } : entry
      )
    );
  };

  const addMedicalEntry = () => {
    setMedicalEntries([
      ...medicalEntries,
      {
        id: crypto.randomUUID(),
        name: "",
        lastCheckup: "",
        nextCheckup: "",
      },
    ]);
  };

  const addMedicationEntry = () => {
    setMedicationEntries([
      ...medicationEntries,
      {
        id: crypto.randomUUID(),
        name: "",
        reason: "",
        dosage: "",
      },
    ]);
  };

  const removeMedicalEntry = (id: string) => {
    if (medicalEntries.length > 1) {
      setMedicalEntries(medicalEntries.filter((entry) => entry.id !== id));
    } else {
      toast({
        title: "Cannot Remove",
        description: "You need at least one entry",
        variant: "destructive",
      });
    }
  };

  const removeMedicationEntry = (id: string) => {
    if (medicationEntries.length > 1) {
      setMedicationEntries(medicationEntries.filter((entry) => entry.id !== id));
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
    
    // Validate entries if user has medical conditions
    if (hasMedicalCondition === "yes") {
      const hasEmptyMedicalFields = medicalEntries.some(
        entry => !entry.name || !entry.lastCheckup
      );
      
      if (hasEmptyMedicalFields) {
        toast({
          title: "Incomplete Medical Information",
          description: "Please fill in at least the Condition Name and Last Checkup fields",
          variant: "destructive",
        });
        return;
      }
    }

    // Validate entries if user takes medication
    if (takesMedication === "yes") {
      const hasEmptyMedicationFields = medicationEntries.some(
        entry => !entry.name || !entry.dosage
      );
      
      if (hasEmptyMedicationFields) {
        toast({
          title: "Incomplete Medication Information",
          description: "Please fill in at least the Medication Name and Dosage fields",
          variant: "destructive",
        });
        return;
      }
    }

    // Save medical data to session storage
    sessionStorage.setItem(
      "medicalConditions",
      JSON.stringify({
        hasMedical: hasMedicalCondition,
        entries: hasMedicalCondition === "yes" ? medicalEntries : [],
      })
    );

    // Save medication data to session storage
    sessionStorage.setItem(
      "medications",
      JSON.stringify({
        takesMeds: takesMedication,
        entries: takesMedication === "yes" ? medicationEntries : [],
      })
    );
    
    // Navigate to Indemnity page
    navigate("/indemnity");
  };

  return (
    <div className="zen-container py-12 animate-fade-in">
      <h1 className="page-title mb-8">Medical Information</h1>
      <div className="zen-card max-w-3xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Medical Conditions Section */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold border-b pb-2">Medical Conditions</h2>
            <div className="space-y-4">
              <Label htmlFor="hasMedicalCondition">
                Do you suffer from any Medical Condition?
              </Label>
              <Select value={hasMedicalCondition} onValueChange={handleMedicalChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select an option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="yes">Yes</SelectItem>
                  <SelectItem value="no">No</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {hasMedicalCondition === "yes" && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Medical Condition Details</h3>
                  <Button
                    type="button"
                    onClick={addMedicalEntry}
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1"
                  >
                    <Plus className="w-4 h-4" /> Add Condition
                  </Button>
                </div>

                {medicalEntries.map((entry) => (
                  <div key={entry.id} className="p-4 border rounded-md bg-slate-50">
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="text-sm font-medium text-slate-500">Medical Condition</h4>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeMedicalEntry(entry.id)}
                        className="h-8 w-8 p-0 text-red-500"
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="space-y-2 sm:col-span-2">
                        <Label htmlFor={`condition-${entry.id}`}>Medical Condition Name *</Label>
                        <Input
                          id={`condition-${entry.id}`}
                          value={entry.name}
                          onChange={(e) => handleMedicalEntryChange(entry.id, "name", e.target.value)}
                          placeholder="Enter medical condition"
                          required={hasMedicalCondition === "yes"}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor={`lastCheckup-${entry.id}`}>Date of Last Checkup *</Label>
                        <Input
                          id={`lastCheckup-${entry.id}`}
                          type="date"
                          value={entry.lastCheckup}
                          onChange={(e) => handleMedicalEntryChange(entry.id, "lastCheckup", e.target.value)}
                          required={hasMedicalCondition === "yes"}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`nextCheckup-${entry.id}`}>Date of Next Checkup</Label>
                        <Input
                          id={`nextCheckup-${entry.id}`}
                          type="date"
                          value={entry.nextCheckup}
                          onChange={(e) => handleMedicalEntryChange(entry.id, "nextCheckup", e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Medications Section */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold border-b pb-2">Medication</h2>
            <div className="space-y-4">
              <Label htmlFor="takesMedication">
                Do you use any Medication?
              </Label>
              <Select value={takesMedication} onValueChange={handleMedicationChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select an option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="yes">Yes</SelectItem>
                  <SelectItem value="no">No</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {takesMedication === "yes" && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Medication Details</h3>
                  <Button
                    type="button"
                    onClick={addMedicationEntry}
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1"
                  >
                    <Plus className="w-4 h-4" /> Add Medication
                  </Button>
                </div>

                {medicationEntries.map((entry) => (
                  <div key={entry.id} className="p-4 border rounded-md bg-slate-50">
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="text-sm font-medium text-slate-500">Medication Entry</h4>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeMedicationEntry(entry.id)}
                        className="h-8 w-8 p-0 text-red-500"
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor={`medication-${entry.id}`}>Medication Name *</Label>
                        <Input
                          id={`medication-${entry.id}`}
                          value={entry.name}
                          onChange={(e) => handleMedicationEntryChange(entry.id, "name", e.target.value)}
                          placeholder="Enter medication name"
                          required={takesMedication === "yes"}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor={`reason-${entry.id}`}>Reason For Taking</Label>
                        <Input
                          id={`reason-${entry.id}`}
                          value={entry.reason}
                          onChange={(e) => handleMedicationEntryChange(entry.id, "reason", e.target.value)}
                          placeholder="Enter reason for taking"
                        />
                      </div>

                      <div className="space-y-2 sm:col-span-2">
                        <Label htmlFor={`dosage-${entry.id}`}>Dosage *</Label>
                        <Input
                          id={`dosage-${entry.id}`}
                          value={entry.dosage}
                          onChange={(e) => handleMedicationEntryChange(entry.id, "dosage", e.target.value)}
                          placeholder="Enter dosage information"
                          required={takesMedication === "yes"}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-between pt-4">
            <Button type="button" variant="outline" onClick={() => navigate("/previous-training")}>
              Back to Previous Training
            </Button>
            <Button type="submit" className="bg-accent-red hover:bg-accent-red/90 text-white">
              Continue to Indemnity
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MedicalCondition;
