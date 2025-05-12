import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface CompanySuggestions {
  meta: string[];
  amazon: string[];
  apple: string[];
  netflix: string[];
  google: string[];
}

interface CompanySuggestionsProps {
  suggestions: CompanySuggestions;
}

export function CompanySuggestions({ suggestions }: CompanySuggestionsProps) {
  const [activeTab, setActiveTab] = useState("meta");
  
  const companyColors: Record<string, string> = {
    meta: "border-[#4267B2] text-[#4267B2]",
    amazon: "border-[#FF9900] text-[#FF9900]",
    apple: "border-[#A2AAAD] text-[#A2AAAD]",
    netflix: "border-[#E50914] text-[#E50914]",
    google: "border-[#4285F4] text-[#4285F4]",
  };
  
  const companyData = [
    { id: "meta", name: "Meta", color: "#4267B2" },
    { id: "amazon", name: "Amazon", color: "#FF9900" },
    { id: "apple", name: "Apple", color: "#A2AAAD" },
    { id: "netflix", name: "Netflix", color: "#E50914" },
    { id: "google", name: "Google", color: "#4285F4" },
  ];

  return (
    <Card className="border border-neon-cyan/30 bg-black">
      <CardHeader>
        <CardTitle className="text-xl text-neon-cyan flex items-center">
          Improvement Suggestions
        </CardTitle>
        <Separator className="bg-neon-cyan/30" />
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="meta" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-5 bg-black border border-gray-800">
            {companyData.map(company => (
              <TabsTrigger 
                key={company.id}
                value={company.id}
                className={`data-[state=active]:border-b-2 data-[state=active]:${companyColors[company.id]} data-[state=active]:bg-black data-[state=active]:shadow-none transition-all`}
              >
                {company.name}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {companyData.map(company => (
            <TabsContent 
              key={company.id}
              value={company.id}
              className="space-y-4 mt-4"
            >
              <div className="space-y-2">
                {suggestions[company.id as keyof CompanySuggestions].map((suggestion, index) => (
                  <div 
                    key={index} 
                    className="border border-gray-800 bg-black/50 p-3 rounded-md"
                  >
                    <div className="flex items-start">
                      <div 
                        className="w-1.5 h-1.5 rounded-full mt-1.5 mr-2" 
                        style={{ backgroundColor: company.color }}
                      />
                      <p className="text-gray-300">{suggestion}</p>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
}