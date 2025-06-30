import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Sparkles, TrendingUp, LineChart, Globe, UserSearch } from 'lucide-react';

const CareerInsights = () => {
  const insights = [
    {
      title: "Tech skills in demand",
      content: "Machine learning, cloud computing, and cybersecurity are among the fastest-growing tech specializations.",
      icon: TrendingUp
    },
    {
      title: "Interview tip",
      content: "Prepare specific examples that demonstrate how you've overcome workplace challenges.",
      icon: Sparkles
    },
    {
      title: "Job market update",
      content: "Remote work opportunities have increased by 140% since 2019 across most sectors.",
      icon: LineChart
    },
    {
      title: "Global opportunity",
      content: "Consider upskilling in fields with international demand, such as healthcare informatics.",
      icon: Globe
    },
    {
      title: "Recruitment trend",
      content: "Employers increasingly value soft skills alongside technical qualifications.",
      icon: UserSearch
    }
  ];

  return (
    <div className="w-full space-y-4 py-4">
      <h3 className="text-lg font-semibold">Career Insights</h3>
      <div className="space-y-3">
        {insights.map((insight, index) => {
          const Icon = insight.icon;
          return (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between py-3">
                <CardTitle className="text-sm font-medium">{insight.title}</CardTitle>
                <Icon className="h-4 w-4 text-accent" />
              </CardHeader>
              <CardContent className="py-0 pb-3">
                <p className="text-xs text-muted-foreground">{insight.content}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default CareerInsights;
