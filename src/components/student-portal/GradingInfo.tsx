import { useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { CalendarIcon, Plus, FileImage, FileDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Empty array for sample data
const sampleGradingData = [];

// Sample instructors for the dropdown
const instructors = [
  "Shifu Zhang Wei",
  "Shifu Li Min",
  "Shifu Wang Chen",
  "Shifu Liu Yan",
  "Shifu Huang Jing"
];

const GradingInfo = () => {
  const { toast } = useToast();
  const [date, setDate] = useState<Date>();
  const [gradingData, setGradingData] = useState(sampleGradingData);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newGrading, setNewGrading] = useState({
    formName: "",
    grade: "",
    gradedBy: "",
    score: ""
  });
  const [certificatePreview, setCertificatePreview] = useState<string | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);

  const handleAddGrading = () => {
    if (!newGrading.formName || !newGrading.grade || !date || !newGrading.gradedBy || !newGrading.score) {
      toast({
        title: "Required Fields",
        description: "Please fill all the required fields",
        variant: "destructive",
      });
      return;
    }

    const newEntry = {
      id: (gradingData.length + 1).toString(),
      formName: newGrading.formName,
      grade: newGrading.grade,
      date: date,
      gradedBy: newGrading.gradedBy,
      score: newGrading.score,
      certificateUrl: ""
    };

    setGradingData([...gradingData, newEntry]);
    setDialogOpen(false);
    setNewGrading({
      formName: "",
      grade: "",
      gradedBy: "",
      score: ""
    });
    setDate(undefined);

    toast({
      title: "Grading Added",
      description: "New grading record has been added successfully",
    });
  };

  const viewCertificate = (url: string) => {
    setCertificatePreview(url);
    setPreviewOpen(true);
  };

  return (
    <div>
      <div className="flex justify-end mb-4">
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Grading
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Grading</DialogTitle>
              <DialogDescription>
                Enter the details for your new grading record
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 gap-4 items-center">
                <Label htmlFor="formName" className="text-right">
                  Form Name
                </Label>
                <div className="col-span-3">
                  <Select
                    onValueChange={(value) => setNewGrading({...newGrading, formName: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select form" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="13 Step Form">13 Step Form</SelectItem>
                      <SelectItem value="24 Step Form">24 Step Form</SelectItem>
                      <SelectItem value="36 Form">36 Form</SelectItem>
                      <SelectItem value="37 Form">37 Form</SelectItem>
                      <SelectItem value="42 Form">42 Form</SelectItem>
                      <SelectItem value="99 Form">99 Form</SelectItem>
                      <SelectItem value="Chen Style 38 Form">Chen Style 38 Form</SelectItem>
                      <SelectItem value="Yangjia Michuan-Form">Yangjia Michuan-Form</SelectItem>
                      <SelectItem value="Yi-Jian Chuan-Form">Yi-Jian Chuan-Form</SelectItem>
                      <SelectItem value="Hsiung-Style-Form">Hsiung-Style-Form</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-4 gap-4 items-center">
                <Label htmlFor="grade" className="text-right">
                  Grade
                </Label>
                <div className="col-span-3">
                  <Select
                    onValueChange={(value) => setNewGrading({...newGrading, grade: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select grade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="G01">G01</SelectItem>
                      <SelectItem value="G02">G02</SelectItem>
                      <SelectItem value="G03">G03</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-4 gap-4 items-center">
                <Label htmlFor="date" className="text-right">
                  Date
                </Label>
                <div className="col-span-3">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              
              <div className="grid grid-cols-4 gap-4 items-center">
                <Label htmlFor="gradedBy" className="text-right">
                  Graded By
                </Label>
                <div className="col-span-3">
                  <Select
                    onValueChange={(value) => setNewGrading({...newGrading, gradedBy: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select instructor" />
                    </SelectTrigger>
                    <SelectContent>
                      {instructors.map((instructor) => (
                        <SelectItem key={instructor} value={instructor}>
                          {instructor}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-4 gap-4 items-center">
                <Label htmlFor="score" className="text-right">
                  Score
                </Label>
                <div className="col-span-3">
                  <Input
                    id="score"
                    type="text"
                    placeholder="Enter score (e.g. 8.15)"
                    value={newGrading.score}
                    onChange={(e) => setNewGrading({...newGrading, score: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-4 gap-4 items-center">
                <Label htmlFor="certificate" className="text-right">
                  Certificate
                </Label>
                <div className="col-span-3">
                  <Input
                    id="certificate"
                    type="file"
                    accept="image/*"
                    className="cursor-pointer"
                  />
                </div>
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddGrading}>
                Add Grading
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <Table>
        <TableCaption>A list of your grading records</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Form Name</TableHead>
            <TableHead>Grade</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Graded By</TableHead>
            <TableHead>Score</TableHead>
            <TableHead>Certificate</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {gradingData.map((record) => (
            <TableRow key={record.id}>
              <TableCell className="font-medium">{record.formName}</TableCell>
              <TableCell>{record.grade}</TableCell>
              <TableCell>{format(record.date, "PPP")}</TableCell>
              <TableCell>{record.gradedBy}</TableCell>
              <TableCell>{record.score}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex items-center"
                    onClick={() => viewCertificate(record.certificateUrl)}
                  >
                    <FileImage className="h-4 w-4 mr-1" />
                    View
                  </Button>
                  <Button variant="outline" size="sm" className="flex items-center">
                    <FileDown className="h-4 w-4 mr-1" />
                    Download
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
          {gradingData.length === 0 && (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-4">No grading records found</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Certificate Preview</DialogTitle>
          </DialogHeader>
          
          {certificatePreview && (
            <div className="overflow-hidden rounded-lg border">
              <img 
                src={certificatePreview} 
                alt="Certificate" 
                className="w-full h-auto object-contain"
              />
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setPreviewOpen(false)}>
              Close
            </Button>
            <Button>
              Download
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GradingInfo;
