import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface ProjectSummaryProps {
  summary: string;
}

export function ProjectSummary({ summary }: ProjectSummaryProps) {
  return (
    <Card className="border border-neon-cyan/30 bg-black">
      <CardHeader>
        <CardTitle className="text-xl text-neon-cyan flex items-center">
          Project Summary
        </CardTitle>
        <Separator className="bg-neon-cyan/30" />
      </CardHeader>
      <CardContent>
        <p className="text-gray-300 whitespace-pre-line">{summary}</p>
      </CardContent>
    </Card>
  );
}