import { 
    ChartContainer, 
    ChartTooltip, 
    ChartTooltipContent 
  } from "../../../components/ui/chart";
  import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, CartesianGrid } from "recharts";
  import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
  import { BarChart3 } from "lucide-react";
  
  const data = [
    { department: "CSE", placed: 85 },
    { department: "ECE", placed: 63 },
    { department: "Mech", placed: 47 },
    { department: "Civil", placed: 35 },
    { department: "EEE", placed: 52 },
    { department: "MBA", placed: 72 }
  ];
  
  const DepartmentPlacementChart = () => {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Students Placed per Department</CardTitle>
          <BarChart3 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ChartContainer
              config={{
                placed: {
                  label: "Students Placed",
                  color: "#8B5CF6"
                }
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="department" />
                  <YAxis />
                  <ChartTooltip
                    content={<ChartTooltipContent />}
                  />
                  <Bar dataKey="placed" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>
    );
  };
  
  export default DepartmentPlacementChart;
  