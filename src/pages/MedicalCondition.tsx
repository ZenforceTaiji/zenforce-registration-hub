
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { PlusCircle, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

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
  
  const [hasMedical, setHasMedical] = useState("");
  const [medicalConditions, setMedicalConditions] = useState<MedicalConditionEntry[]>([]);
  const [newCondition, setNewCondition] = useState({
    name: "",
    lastCheckup: "",
    nextCheckup: "",
  });
  
  const [takesMeds, setTakesMeds] = useState("");
  const [medications, setMedications] = useState<MedicationEntry[]>([]);
  const [newMedication, setNewMedication] = useState({
    name: "",
    reason: "",
    dosage: "",
  });

  useEffect(() => {
    console.log("MedicalCondition component mounted");
    
    if (!userAge) {
      console.log("No user age found, redirecting to home");
      navigate("/");
      return;
    }
    
    const savedMedical = sessionStorage.getItem("medicalConditions");
    if (savedMedical) {
      const parsedMedical = JSON.parse(savedMedical);
      setHasMedical(parsedMedical.hasMedical);
      setMedicalConditions(parsedMedical.entries);
    }
    
    const savedMeds = sessionStorage.getItem("medications");
    if (savedMeds) {
      const parsedMeds = JSON.parse(savedMeds);
      setTakesMeds(parsedMeds.takesMeds);
      setMedications(parsedMeds.entries);
    }
  }, [userAge, navigate]);

  const handleAddCondition = () => {
    if (!newCondition.name || !newCondition.lastCheckup) {
      toast({
        title: "Required Fields",
        description: "Please enter at least the condition name and last checkup date",
        variant: "destructive",
      });
      return;
    }
    
    const entry: MedicalConditionEntry = {
      id: Date.now().toString(),
      ...newCondition,
    };
    
    setMedicalConditions([...medicalConditions, entry]);
    setNewCondition({
      name: "",
      lastCheckup: "",
      nextCheckup: "",
    });
  };

  const handleRemoveCondition = (id: string) => {
    setMedicalConditions(medicalConditions.filter(condition => condition.id !== id));
  };

  const handleAddMedication = () => {
    if (!newMedication.name || !newMedication.dosage) {
      toast({
        title: "Required Fields",
        description: "Please enter at least the medication name and dosage",
        variant: "destructive",
      });
      return;
    }
    
    const entry: MedicationEntry = {
      id: Date.now().toString(),
      ...newMedication,
    };
    
    setMedications([...medications, entry]);
    setNewMedication({
      name: "",
      reason: "",
      dosage: "",
    });
  };

  const handleRemoveMedication = (id: string) => {
    setMedications(medications.filter(medication => medication.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!hasMedical) {
      toast({
        title: "Required Selection",
        description: "Please indicate whether you have any medical conditions",
        variant: "destructive",
      });
      return;
    }
    
    if (!takesMeds) {
      toast({
        title: "Required Selection",
        description: "Please indicate whether you take any medications",
        variant: "destructive",
      });
      return;
    }
    
    if (hasMedical === "yes" && medicalConditions.length === 0) {
      toast({
        title: "Medical Conditions Required",
        description: "Please add at least one medical condition",
        variant: "destructive",
      });
      return;
    }
    
    if (takesMeds === "yes" && medications.length === 0) {
      toast({
        title: "Medications Required",
        description: "Please add at least one medication",
        variant: "destructive",
      });
      return;
    }
    
    sessionStorage.setItem("medicalConditions", JSON.stringify({
      hasMedical,
      entries: medicalConditions,
    }));
    
    sessionStorage.setItem("medications", JSON.stringify({
      takesMeds,
      entries: medications,
    }));
    
    navigate("/physical-readiness");
  };

  const renderConditionList = () => {
    if (!medicalConditions.length) {
      return <p className="text-slate-500 italic text-sm">No medical conditions added yet.</p>;
    }
    
    return (
      <div className="space-y-3">
        {medicalConditions.map((condition, index) => (
          <Card key={condition.id}>
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div className="space-y-1 flex-1">
                  <div className="flex items-center">
                    <h4 className="font-medium">Condition #{index + 1}</h4>
                  </div>
                  <p><span className="text-slate-500 text-sm">Name:</span> {condition.name}</p>
                  <p className="text-sm">
                    <span className="text-slate-500">Last Checkup:</span> {new Date(condition.lastCheckup).toLocaleDateString()}
                  </p>
                  {condition.nextCheckup && (
                    <p className="text-sm">
                      <span className="text-slate-500">Next Checkup:</span> {new Date(condition.nextCheckup).toLocaleDateString()}
                    </p>
                  )}
                </div>
                <Button 
                  type="button"
                  variant="ghost" 
                  size="sm" 
                  onClick={() => handleRemoveCondition(condition.id)}
                  className="ml-2 h-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };

  const renderMedicationList = () => {
    if (!medications.length) {
      return <p className="text-slate-500 italic text-sm">No medications added yet.</p>;
    }
    
    return (
      <div className="space-y-3">
        {medications.map((medication, index) => (
          <Card key={medication.id}>
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div className="space-y-1 flex-1">
                  <div className="flex items-center">
                    <h4 className="font-medium">Medication #{index + 1}</h4>
                  </div>
                  <p><span className="text-slate-500 text-sm">Name:</span> {medication.name}</p>
                  <p className="text-sm">
                    <span className="text-slate-500">Dosage:</span> {medication.dosage}
                  </p>
                  {medication.reason && (
                    <p className="text-sm">
                      <span className="text-slate-500">Reason:</span> {medication.reason}
                    </p>
                  )}
                </div>
                <Button 
                  type="button"
                  variant="ghost" 
                  size="sm" 
                  onClick={() => handleRemoveMedication(medication.id)}
                  className="ml-2 h-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };

  return (
    <div className="zen-container py-12 animate-fade-in">
      <h1 className="page-title mb-8">Medical Information</h1>
      <div className="zen-card max-w-3xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">Medical Conditions</h2>
            
            <div className="space-y-4 mb-6">
              <p className="text-base">Do you have any medical conditions we should be aware of?</p>
              
              <RadioGroup value={hasMedical} onValueChange={setHasMedical} className="flex flex-col gap-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="medical-yes" />
                  <Label htmlFor="medical-yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="medical-no" />
                  <Label htmlFor="medical-no">No</Label>
                </div>
              </RadioGroup>
            </div>
            
            {hasMedical === "yes" && (
              <div className="space-y-4 pl-4 border-l-2 border-slate-200">
                <div className="mb-4">
                  {renderConditionList()}
                </div>
                
                <div className="space-y-3 p-4 bg-slate-50 rounded-md">
                  <h3 className="font-medium">Add Medical Condition</h3>
                  
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="condition-name">Condition Name *</Label>
                      <Input
                        id="condition-name"
                        value={newCondition.name}
                        onChange={(e) => setNewCondition({...newCondition, name: e.target.value})}
                        placeholder="Enter medical condition"
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <Label htmlFor="last-checkup">Last Checkup Date *</Label>
                        <Input
                          id="last-checkup"
                          type="date"
                          value={newCondition.lastCheckup}
                          onChange={(e) => setNewCondition({...newCondition, lastCheckup: e.target.value})}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="next-checkup">Next Checkup Date (if known)</Label>
                        <Input
                          id="next-checkup"
                          type="date"
                          value={newCondition.nextCheckup}
                          onChange={(e) => setNewCondition({...newCondition, nextCheckup: e.target.value})}
                        />
                      </div>
                    </div>
                    
                    <Button 
                      type="button"
                      onClick={handleAddCondition}
                      className="mt-2 w-full sm:w-auto"
                    >
                      <PlusCircle className="h-4 w-4 mr-2" />
                      Add Condition
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div className="pt-6 border-t border-slate-200">
            <h2 className="text-xl font-semibold mb-4">Medications</h2>
            
            <div className="space-y-4 mb-6">
              <p className="text-base">Are you currently taking any medications?</p>
              
              <RadioGroup value={takesMeds} onValueChange={setTakesMeds} className="flex flex-col gap-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="meds-yes" />
                  <Label htmlFor="meds-yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="meds-no" />
                  <Label htmlFor="meds-no">No</Label>
                </div>
              </RadioGroup>
            </div>
            
            {takesMeds === "yes" && (
              <div className="space-y-4 pl-4 border-l-2 border-slate-200">
                <div className="mb-4">
                  {renderMedicationList()}
                </div>
                
                <div className="space-y-3 p-4 bg-slate-50 rounded-md">
                  <h3 className="font-medium">Add Medication</h3>
                  
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="medication-name">Medication Name *</Label>
                      <Input
                        id="medication-name"
                        value={newMedication.name}
                        onChange={(e) => setNewMedication({...newMedication, name: e.target.value})}
                        placeholder="Enter medication name"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="medication-reason">Reason for Medication</Label>
                      <Input
                        id="medication-reason"
                        value={newMedication.reason}
                        onChange={(e) => setNewMedication({...newMedication, reason: e.target.value})}
                        placeholder="Enter reason for taking medication"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="medication-dosage">Dosage *</Label>
                      <Input
                        id="medication-dosage"
                        value={newMedication.dosage}
                        onChange={(e) => setNewMedication({...newMedication, dosage: e.target.value})}
                        placeholder="Enter dosage (e.g., 10mg daily)"
                      />
                    </div>
                    
                    <Button 
                      type="button"
                      onClick={handleAddMedication}
                      className="mt-2 w-full sm:w-auto"
                    >
                      <PlusCircle className="h-4 w-4 mr-2" />
                      Add Medication
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-between pt-4">
            <Button type="button" variant="outline" onClick={() => navigate("/previous-training")}>
              Back to Previous Training
            </Button>
            <Button type="submit" className="bg-accent-red hover:bg-accent-red/90 text-white">
              Continue
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MedicalCondition;
