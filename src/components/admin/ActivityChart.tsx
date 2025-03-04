
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface ActivityChartProps {
  data: number[];
  labels: string[];
  title: string;
  icon: React.ElementType;
}

const ActivityChart = ({ data, labels, title, icon: Icon }: ActivityChartProps) => (
  <Card className="col-span-1">
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-sm font-medium">
        {title}
      </CardTitle>
      <Icon className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="h-[200px] w-full relative mt-4">
        <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between h-[180px]">
          {data.map((value, index) => (
            <div 
              key={index} 
              className="bg-accent-red w-8 rounded-t transition-all duration-300 hover:bg-accent-red/80"
              style={{ 
                height: `${(value / Math.max(...data)) * 100}%`,
                opacity: 0.7 + (index / data.length) * 0.3
              }}
            >
              <div className="text-xs text-center mt-2 hidden md:block">{value}</div>
            </div>
          ))}
        </div>
        <div className="absolute bottom-0 left-0 right-0 flex justify-between pt-2 border-t">
          {labels.map((label, index) => (
            <div key={index} className="text-xs w-8 text-center text-muted-foreground">
              {label}
            </div>
          ))}
        </div>
      </div>
    </CardContent>
  </Card>
);

export default ActivityChart;
