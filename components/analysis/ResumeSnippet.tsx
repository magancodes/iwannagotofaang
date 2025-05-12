import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { useState } from "react";

interface ResumeSnippetProps {
  resumeSnippet: string;
}

export function ResumeSnippet({ resumeSnippet }: ResumeSnippetProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyClick = () => {
    navigator.clipboard.writeText(resumeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="border border-neon-green/30 bg-black">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl text-neon-green">
            Resume-Ready Snippet
          </CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopyClick}
            className="border-neon-green/50 text-neon-green hover:bg-neon-green/10 hover:text-neon-green"
          >
            <Copy className="h-4 w-4 mr-2" />
            {copied ? "Copied!" : "Copy"}
          </Button>
        </div>
        <Separator className="bg-neon-green/30" />
      </CardHeader>
      <CardContent>
        <div className="p-4 border border-dashed border-neon-green/30 rounded-md bg-black/70">
          <p className="text-gray-300 whitespace-pre-line">{resumeSnippet}</p>
        </div>
        <p className="mt-4 text-sm text-gray-400">
          This snippet is formatted for your resume and highlights the most impressive aspects of your project in a professional manner.
        </p>
      </CardContent>
    </Card>
  );
}