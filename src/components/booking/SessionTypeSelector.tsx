
import { Button } from "@/components/ui/button";
import { Users, Clock } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface SessionTypeSelectorProps {
  selectedType?: string;
  onSelect: (type: string) => void;
}

const SessionTypeSelector = ({ selectedType, onSelect }: SessionTypeSelectorProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Select Session Type</CardTitle>
        <CardDescription>Choose what type of session you want to book</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-3">
          <Button
            variant={selectedType === "special" ? "default" : "outline"}
            onClick={() => onSelect("special")}
            className="justify-start"
          >
            <Users className="mr-2 h-4 w-4" />
            Special Event
          </Button>
          <Button
            variant={selectedType === "online" ? "default" : "outline"}
            onClick={() => onSelect("online")}
            className="justify-start"
          >
            <Clock className="mr-2 h-4 w-4" />
            Online Session
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SessionTypeSelector;
