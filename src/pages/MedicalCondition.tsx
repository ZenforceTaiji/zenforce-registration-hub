
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
      <h1 className="page-title mb-8 text-white">Medical Information</h1>
      <div className="zen-card max-w-3xl mx-auto bg-black border border-amber-900/50">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-4 text-amber-500">Medical Conditions</h2>
            
            <div className="space-y-4 mb-6">
              <p className="text-base text-white">Do you have any medical conditions we should be aware of?</p>
              
              <RadioGroup value={hasMedical} onValueChange={setHasMedical} className="flex flex-col gap-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="medical-yes" />
                  <Label htmlFor="medical-yes" className="text-white">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="medical-no" />
                  <Label htmlFor="medical-no" className="text-white">No</Label>
                </div>
              </RadioGroup>
            </div>
            
            {hasMedical === "yes" && (
              <div className="space-y-4 pl-4 border-l-2 border-amber-900/50">
                <div className="mb-4">
                  {medicalConditions.length === 0 && (
                    <p className="text-amber-400 italic text-sm">No medical conditions added yet.</p>
                  )}
                  
                  <div className="space-y-3">
                    {medicalConditions.map((condition, index) => (
                      <Card key={condition.id} className="bg-black border-amber-900/50">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start">
                            <div className="space-y-1 flex-1">
                              <div className="flex items-center">
                                <h4 className="font-medium text-amber-500">Condition #{index + 1}</h4>
                              </div>
                              <p className="text-white"><span className="text-amber-400 text-sm">Name:</span> {condition.name}</p>
                              <p className="text-sm text-white">
                                <span className="text-amber-400">Last Checkup:</span> {new Date(condition.lastCheckup).toLocaleDateString()}
                              </p>
                              {condition.nextCheckup && (
                                <p className="text-sm text-white">
                                  <span className="text-amber-400">Next Checkup:</span> {new Date(condition.nextCheckup).toLocaleDateString()}
                                </p>
                              )}
                            </div>
                            <Button 
                              type="button"
                              variant="ghost" 
                              size="sm" 
                              onClick={() => handleRemoveCondition(condition.id)}
                              className="ml-2 h-8 text-red-600 hover:text-red-700 hover:bg-black"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-3 p-4 bg-black border border-amber-900/50 rounded-md">
                  <h3 className="font-medium text-amber-500">Add Medical Condition</h3>
                  
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="condition-name" className="text-white">Condition Name *</Label>
                      <Input
                        id="condition-name"
                        value={newCondition.name}
                        onChange={(e) => setNewCondition({...newCondition, name: e.target.value})}
                        placeholder="Enter medical condition"
                        className="bg-black text-white border-amber-900/50"
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <Label htmlFor="last-checkup" className="text-white">Last Checkup Date *</Label>
                        <Input
                          id="last-checkup"
                          type="date"
                          value={newCondition.lastCheckup}
                          onChange={(e) => setNewCondition({...newCondition, lastCheckup: e.target.value})}
                          className="bg-black text-white border-amber-900/50"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="next-checkup" className="text-white">Next Checkup Date (if known)</Label>
                        <Input
                          id="next-checkup"
                          type="date"
                          value={newCondition.nextCheckup}
                          onChange={(e) => setNewCondition({...newCondition, nextCheckup: e.target.value})}
                          className="bg-black text-white border-amber-900/50"
                        />
                      </div>
                    </div>
                    
                    <Button 
                      type="button"
                      onClick={handleAddCondition}
                      className="mt-2 w-full sm:w-auto bg-amber-700 hover:bg-amber-800"
                    >
                      <PlusCircle className="h-4 w-4 mr-2" />
                      Add Condition
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div className="pt-6 border-t border-amber-900/50">
            <h2 className="text-xl font-semibold mb-4 text-amber-500">Medications</h2>
            
            <div className="space-y-4 mb-6">
              <p className="text-base text-white">Are you currently taking any medications?</p>
              
              <RadioGroup value={takesMeds} onValueChange={setTakesMeds} className="flex flex-col gap-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="meds-yes" />
                  <Label htmlFor="meds-yes" className="text-white">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="meds-no" />
                  <Label htmlFor="meds-no" className="text-white">No</Label>
                </div>
              </RadioGroup>
            </div>
            
            {takesMeds === "yes" && (
              <div className="space-y-4 pl-4 border-l-2 border-amber-900/50">
                <div className="mb-4">
                  {medications.length === 0 && (
                    <p className="text-amber-400 italic text-sm">No medications added yet.</p>
                  )}
                  
                  <div className="space-y-3">
                    {medications.map((medication, index) => (
                      <Card key={medication.id} className="bg-black border-amber-900/50">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start">
                            <div className="space-y-1 flex-1">
                              <div className="flex items-center">
                                <h4 className="font-medium text-amber-500">Medication #{index + 1}</h4>
                              </div>
                              <p className="text-white"><span className="text-amber-400 text-sm">Name:</span> {medication.name}</p>
                              <p className="text-sm text-white">
                                <span className="text-amber-400">Dosage:</span> {medication.dosage}
                              </p>
                              {medication.reason && (
                                <p className="text-sm text-white">
                                  <span className="text-amber-400">Reason:</span> {medication.reason}
                                </p>
                              )}
                            </div>
                            <Button 
                              type="button"
                              variant="ghost" 
                              size="sm" 
                              onClick={() => handleRemoveMedication(medication.id)}
                              className="ml-2 h-8 text-red-600 hover:text-red-700 hover:bg-black"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-3 p-4 bg-black border border-amber-900/50 rounded-md">
                  <h3 className="font-medium text-amber-500">Add Medication</h3>
                  
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="medication-name" className="text-white">Medication Name *</Label>
                      <Input
                        id="medication-name"
                        value={newMedication.name}
                        onChange={(e) => setNewMedication({...newMedication, name: e.target.value})}
                        placeholder="Enter medication name"
                        className="bg-black text-white border-amber-900/50"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="medication-reason" className="text-white">Reason for Medication</Label>
                      <Input
                        id="medication-reason"
                        value={newMedication.reason}
                        onChange={(e) => setNewMedication({...newMedication, reason: e.target.value})}
                        placeholder="Enter reason for taking medication"
                        className="bg-black text-white border-amber-900/50"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="medication-dosage" className="text-white">Dosage *</Label>
                      <Input
                        id="medication-dosage"
                        value={newMedication.dosage}
                        onChange={(e) => setNewMedication({...newMedication, dosage: e.target.value})}
                        placeholder="Enter dosage (e.g., 10mg daily)"
                        className="bg-black text-white border-amber-900/50"
                      />
                    </div>
                    
                    <Button 
                      type="button"
                      onClick={handleAddMedication}
                      className="mt-2 w-full sm:w-auto bg-amber-700 hover:bg-amber-800"
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
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => navigate("/previous-training")}
              style={{
                padding: "0.75rem 1.5rem",
                minWidth: "160px",
              }}
              className="bg-black text-white border-amber-900/50"
            >
              Back to Previous Training
            </Button>
            <Button 
              type="submit" 
              className="bg-red-600 hover:bg-red-700 text-white font-medium"
              style={{
                padding: "0.75rem 1.5rem",
                minWidth: "200px",
                position: "relative",
                zIndex: 50,
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
              }}
            >
              Continue
            </Button>
          </div>
        </form>
      </div>
      
      <div className="text-center mt-6 mb-12 py-2 bg-black rounded-md max-w-3xl mx-auto border border-amber-900/50">
        <p className="text-gray-300">End of Form</p>
      </div>
    </div>
  );
};

export default MedicalCondition;
