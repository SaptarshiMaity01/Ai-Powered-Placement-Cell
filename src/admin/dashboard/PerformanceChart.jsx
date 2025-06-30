import { 
    ChartContainer, 
    ChartTooltip, 
    ChartTooltipContent 
  } from "../../components/ui/chart";
  import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, CartesianGrid } from "recharts";
  import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
  
  const data = [
    { month: "Jan", placements: 45, interviews: 78 },
    { month: "Feb", placements: 52, interviews: 84 },
    { month: "Mar", placements: 48, interviews: 69 },
    { month: "Apr", placements: 61, interviews: 92 },
    { month: "May", placements: 55, interviews: 81 },
    { month: "Jun", placements: 67, interviews: 95 },
  ];
  
  const PerformanceChart = () => {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Placement Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ChartContainer
              config={{
                placements: {
                  label: "Placements",
                  color: "#9b87f5"
                },
                interviews: {
                  label: "Interviews",
                  color: "#6E59A5"
                }
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="placements" fill="#9b87f5" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="interviews" fill="#6E59A5" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>
    );
  };
  
  export default PerformanceChart;
  