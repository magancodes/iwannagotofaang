export interface AnalysisResult {
  summary: string;
  technologies: string[];
  faangScores: {
    meta: number;
    amazon: number;
    apple: number;
    netflix: number;
    google: number;
  };
  suggestions: {
    meta: string[];
    amazon: string[];
    apple: string[];
    netflix: string[];
    google: string[];
  };
  resumeSnippet: string;
}

export interface AnalysisHistoryItem extends AnalysisResult {
  repoUrl: string;
  timestamp: string;
}