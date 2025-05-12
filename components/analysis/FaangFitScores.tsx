"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  ResponsiveContainer, 
  Tooltip, 
  TooltipProps
} from "recharts";
import { 
  ValueType, 
  NameType 
} from "recharts/types/component/DefaultTooltipContent";

interface FaangScores {
  meta: number;
  amazon: number;
  apple: number;
  netflix: number;
  google: number;
}

interface FaangFitScoresProps {
  scores: FaangScores;
}

export function FaangFitScores({ scores }: FaangFitScoresProps) {
  const [activeCompany, setActiveCompany] = useState<string | null>(null);
  
  const data = [
    { name: "Meta", score: scores.meta, fill: "#4267B2" },
    { name: "Amazon", score: scores.amazon, fill: "#FF9900" },
    { name: "Apple", score: scores.apple, fill: "#A2AAAD" },
    { name: "Netflix", score: scores.netflix, fill: "#E50914" },
    { name: "Google", score: scores.google, fill: "#4285F4" }
  ];

  const CustomTooltip = ({ active, payload, label }: TooltipProps<ValueType, NameType>) => {
    if (active && payload && payload.length) {
      const score = payload[0].value as number;
      let feedback;
      
      if (score >= 8) {
        feedback = "Excellent fit!";
      } else if (score >= 6) {
        feedback = "Good fit";
      } else if (score >= 4) {
        feedback = "Moderate fit";
      } else {
        feedback = "Could use improvement";
      }
      
      return (
        <div className="bg-black border border-neon-cyan/50 p-2 rounded-md">
          <p className="text-neon-cyan font-bold">{`${label}: ${score}/10`}</p>
          <p className="text-sm text-gray-300">{feedback}</p>
        </div>
      );
    }
  
    return null;
  };

  return (
    <Card className="border border-neon-pink/30 bg-black">
      <CardHeader>
        <CardTitle className="text-xl text-neon-pink flex items-center">
          FAANG Company Fit
        </CardTitle>
        <Separator className="bg-neon-pink/30" />
      </CardHeader>
      <CardContent>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
              onMouseMove={(e) => {
                if (e.activeTooltipIndex !== undefined) {
                  setActiveCompany(data[e.activeTooltipIndex].name);
                }
              }}
              onMouseLeave={() => setActiveCompany(null)}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="name" tick={{ fill: '#fff' }} />
              <YAxis domain={[0, 10]} tick={{ fill: '#fff' }} />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="score" 
                radius={[4, 4, 0, 0]}
                className="cursor-pointer hover:opacity-80 transition-opacity"
                animationDuration={1500}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-4">
          <p className="text-gray-300 text-sm">
            {activeCompany ? (
              `${activeCompany} score: ${data.find(d => d.name === activeCompany)?.score}/10`
            ) : (
              "Hover over bars to see detailed scores"
            )}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}