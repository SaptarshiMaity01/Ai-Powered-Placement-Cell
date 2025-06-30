import React from 'react';
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { CheckCircle } from 'lucide-react';

const SummaryPage = ({ answers, feedback, jobRole, onStartNew }) => {
  return (
    <Card className="p-6 w-full max-w-2xl mx-auto mt-8 shadow-lg">
      <div className="flex items-center justify-center mb-6">
        <CheckCircle className="w-10 h-10 text-green-500 mr-3" />
        <h2 className="text-2xl font-bold text-gray-800">Interview Summary</h2>
      </div>

      <div className="bg-blue-50 p-4 rounded-md mb-6 border border-blue-100">
        <h3 className="text-lg font-medium text-blue-800 mb-2">
          Position: {jobRole}
        </h3>
        <p className="text-gray-600">
          You have completed all interview questions. Review your answers and feedback below.
        </p>
      </div>

      <div className="space-y-6">
        {answers.map((answer, index) => (
          <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="bg-gray-50 p-4 border-b border-gray-200">
              <p className="font-medium text-gray-700">Question {index + 1}</p>
            </div>
            <div className="p-4">
              <div className="mb-4">
                <p className="text-gray-700 whitespace-pre-wrap">{answer}</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-md border border-blue-100">
                <p className="font-medium mb-1 text-blue-800">Feedback:</p>
                <p className="text-gray-700">{feedback[index]}</p>
              </div>
            </div>
          </div>
        ))}

        <div className="pt-4">
          <Button onClick={onStartNew} className="w-full bg-blue-600 hover:bg-blue-700">
            Start New Interview
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default SummaryPage;
