
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from "lucide-react";

const GradingGuide = () => {
  return (
    <div className="space-y-6">
      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>Grading Information</AlertTitle>
        <AlertDescription>
          This guide explains the grading system for TaijiQuan forms. Only students with G03 can be 
          Advanced Student Instructors. All scoring is done by merit of the TaijiQuan coaches.
        </AlertDescription>
      </Alert>

      <ScrollArea className="rounded-md border h-[500px]">
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-4">TaijiQuan Grading System</h3>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[250px]">Forms</TableHead>
                <TableHead>Grade Level</TableHead>
                <TableHead>Score Rate</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell rowSpan={2} className="font-medium border-r align-top">
                  13 Step Form & Stick Form
                </TableCell>
                <TableCell>G01: One Month to 6 Months</TableCell>
                <TableCell>8.00 to 8.25</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>G02: Six Months + and Always</TableCell>
                <TableCell>8.00 to 8.45+</TableCell>
              </TableRow>

              <TableRow>
                <TableCell rowSpan={2} className="font-medium border-r align-top">
                  24 Step Form
                </TableCell>
                <TableCell>G01: One Month to 6 Months</TableCell>
                <TableCell>8.00 to 8.25</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>G02 & G03: Six Months + and Always</TableCell>
                <TableCell>8.00 to 8.45+</TableCell>
              </TableRow>

              <TableRow>
                <TableCell rowSpan={2} className="font-medium border-r align-top">
                  36 Form<br />
                  37 Form / 42 Form
                </TableCell>
                <TableCell>G01: One Month to 6 Months +</TableCell>
                <TableCell>8.00 to 8.25</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>G02 & G03: Six Months + and Always</TableCell>
                <TableCell>8.00 to 8.45+</TableCell>
              </TableRow>

              <TableRow>
                <TableCell rowSpan={2} className="font-medium border-r align-top">
                  99 Form, Chen Style 38 Form<br />
                  Chen Style 38-Form<br /> 
                  Yangjia Michuan-Form<br />
                  Yi-Jian Chuan-Form<br />
                  Hsiung-Style-Form (Primary)
                </TableCell>
                <TableCell>G01: 8.00 to 8.25 to 6 Months +</TableCell>
                <TableCell>8.00 to 8.25+</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>G02: 8.00 to 8.45+</TableCell>
                <TableCell>8.00 to 8.45+</TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="font-medium border-r">
                  All others: traditional forms not listed above (6 months and over)
                </TableCell>
                <TableCell>
                  G01: 8.00 to 8.25+<br />
                  G02: 8.00 to 8.45+
                </TableCell>
                <TableCell>
                  8.00 to 8.25+<br />
                  8.00 to 8.45+
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <div className="mt-8 space-y-4 text-sm text-gray-700">
            <h4 className="font-semibold text-base">Important Notes:</h4>
            <p>
              Only students with G03 can be Advanced Student Instructors by TAIJIQUAN INSTRUCTOR.
            </p>
            <p>
              All scoring is done by merit of the Taijiquan Coaches and grading of students to place the student in the proper grade (G01) to judge and score. And to grade your student on a regular time and date, and your student feel and see that the teacher (SHIFU) helps to upgrade the student, and to have the next Taijiquan coaches of the future.
            </p>
            <p>
              The G02 and G03 Grade is more Advanced Student from one year and over. I hope this system will help the judges to give better scores in National Taijiquan Competitions.
            </p>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default GradingGuide;
