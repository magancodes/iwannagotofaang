import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

interface TechStackProps {
  technologies: string[];
}

export function TechStack({ technologies }: TechStackProps) {
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);

  // Group technologies by type (approximation)
  const categories = {
    languages: ["JavaScript", "TypeScript", "Python", "Java", "C#", "Ruby", "Go", "Rust", "PHP", "Swift", "Kotlin"],
    frontend: ["React", "Vue", "Angular", "Svelte", "Next.js", "HTML", "CSS", "SCSS", "Tailwind", "Bootstrap"],
    backend: ["Node.js", "Express", "Django", "Flask", "Spring", "Laravel", "Rails", "ASP.NET", "FastAPI"],
    database: ["MongoDB", "PostgreSQL", "MySQL", "SQLite", "Redis", "Firebase", "Supabase", "DynamoDB"],
    devops: ["Docker", "Kubernetes", "AWS", "GCP", "Azure", "CI/CD", "GitHub Actions", "Jenkins", "Terraform"],
    testing: ["Jest", "Mocha", "Cypress", "Selenium", "PyTest", "JUnit", "Enzyme", "Testing Library"],
    other: []
  };

  // Place each technology in appropriate category
  const categorizedTech: Record<string, string[]> = {
    languages: [],
    frontend: [],
    backend: [],
    database: [],
    devops: [],
    testing: [],
    other: []
  };

  technologies.forEach(tech => {
    let found = false;
    for (const [category, techList] of Object.entries(categories)) {
      if (techList.some(t => tech.includes(t))) {
        categorizedTech[category].push(tech);
        found = true;
        break;
      }
    }
    if (!found) {
      categorizedTech.other.push(tech);
    }
  });

  // Badge colors for each category
  const categoryColors: Record<string, string> = {
    languages: "bg-neon-pink/20 text-neon-pink border-neon-pink hover:bg-neon-pink/30",
    frontend: "bg-neon-cyan/20 text-neon-cyan border-neon-cyan hover:bg-neon-cyan/30",
    backend: "bg-neon-green/20 text-neon-green border-neon-green hover:bg-neon-green/30",
    database: "bg-yellow-500/20 text-yellow-500 border-yellow-500 hover:bg-yellow-500/30",
    devops: "bg-purple-500/20 text-purple-500 border-purple-500 hover:bg-purple-500/30",
    testing: "bg-orange-500/20 text-orange-500 border-orange-500 hover:bg-orange-500/30",
    other: "bg-gray-500/20 text-gray-400 border-gray-500 hover:bg-gray-500/30",
  };

  return (
    <Card className="border border-neon-green/30 bg-black">
      <CardHeader>
        <CardTitle className="text-xl text-neon-green flex items-center">
          Tech Stack
        </CardTitle>
        <Separator className="bg-neon-green/30" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {Object.entries(categorizedTech).map(([category, techs]) => 
            techs.length > 0 && (
              <div key={category}>
                <h3 className="text-sm text-gray-400 mb-2 capitalize">{category}</h3>
                <div className="flex flex-wrap gap-2">
                  {techs.map(tech => (
                    <Badge
                      key={tech}
                      className={`border ${categoryColors[category]} transition-colors hover:cursor-pointer`}
                      onMouseEnter={() => setHoveredTech(tech)}
                      onMouseLeave={() => setHoveredTech(null)}
                      variant="outline"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            )
          )}
        </div>
      </CardContent>
    </Card>
  );
}