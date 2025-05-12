"use client";

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { ProjectSummary } from '@/components/analysis/ProjectSummary';
import { TechStack } from '@/components/analysis/TechStack';
import { FaangFitScores } from '@/components/analysis/FaangFitScores';
import { CompanySuggestions } from '@/components/analysis/CompanySuggestions';
import { ResumeSnippet } from '@/components/analysis/ResumeSnippet';
import { fetchAnalysisResults } from '@/lib/api';
import { AnalysisResult } from '@/lib/types';
import { Button } from '@/components/ui/button';

export default function ResultsPage() {
  const searchParams = useSearchParams();
  const repoUrl = searchParams.get('repo');
  const [isLoading, setIsLoading] = useState(true);
  const [results, setResults] = useState<AnalysisResult | null>(null);

  useEffect(() => {
    const getResults = async () => {
      if (!repoUrl) return;
      
      try {
        setIsLoading(true);
        // In a real implementation, we would call our API to get the results
        const data = await fetchAnalysisResults(repoUrl);
        setResults(data);
        
        // Save to history
        const history = JSON.parse(localStorage.getItem('analysisHistory') || '[]');
        const existingIndex = history.findIndex((item: any) => item.repoUrl === repoUrl);
        
        if (existingIndex >= 0) {
          history[existingIndex] = { ...data, repoUrl, timestamp: new Date().toISOString() };
        } else {
          history.push({ ...data, repoUrl, timestamp: new Date().toISOString() });
        }
        
        localStorage.setItem('analysisHistory', JSON.stringify(history));
      } catch (error) {
        console.error('Error fetching results:', error);
      } finally {
        setIsLoading(false);
      }
    };

    getResults();
  }, [repoUrl]);

  const handleExport = () => {
    if (!results) return;
    
    const dataStr = JSON.stringify(results, null, 2);
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;
    
    const exportFileName = `devlens-analysis-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileName);
    linkElement.click();
  };

  if (!repoUrl) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-3xl font-bold mb-4 text-neon-pink">No Repository Specified</h1>
        <p className="mb-8 text-gray-300">Please go back to the home page and enter a GitHub repository URL.</p>
        <Button
          onClick={() => window.location.href = '/'}
          className="bg-transparent hover:bg-neon-cyan/10 text-neon-cyan border border-neon-cyan hover:border-neon-cyan"
        >
          Go Back Home
        </Button>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-24 flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="h-16 w-16 text-neon-cyan animate-spin mb-8" />
        <h2 className="text-2xl font-bold mb-2 text-white">Analyzing Repository</h2>
        <p className="text-gray-300 mb-8 text-center max-w-md">
          DevLens is analyzing {repoUrl} and evaluating against FAANG standards...
        </p>
        <div className="w-full max-w-md grid grid-cols-5 gap-2">
          <div className="h-1 bg-neon-pink rounded-full animate-pulse"></div>
          <div className="h-1 bg-neon-cyan rounded-full animate-pulse delay-100"></div>
          <div className="h-1 bg-neon-green rounded-full animate-pulse delay-200"></div>
          <div className="h-1 bg-neon-yellow rounded-full animate-pulse delay-300"></div>
          <div className="h-1 bg-neon-pink rounded-full animate-pulse delay-400"></div>
        </div>
      </div>
    );
  }

  if (!results) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-3xl font-bold mb-4 text-neon-pink">Analysis Failed</h1>
        <p className="mb-8 text-gray-300">There was an error analyzing the repository. Please try again.</p>
        <Button
          onClick={() => window.location.href = '/'}
          className="bg-transparent hover:bg-neon-cyan/10 text-neon-cyan border border-neon-cyan hover:border-neon-cyan"
        >
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-2">
          <span className="text-neon-cyan">Analysis</span> Results
        </h1>
        <p className="text-gray-300 mb-6 break-all">
          Repository: <a href={repoUrl} target="_blank" rel="noopener noreferrer" className="text-neon-pink hover:underline">{repoUrl}</a>
        </p>
        <div className="flex flex-wrap gap-4">
          <Button
            onClick={handleExport}
            className="bg-transparent hover:bg-neon-green/10 text-neon-green border border-neon-green hover:border-neon-green"
          >
            Export Results
          </Button>
          <Button
            onClick={() => window.location.href = '/'}
            className="bg-transparent hover:bg-neon-cyan/10 text-neon-cyan border border-neon-cyan hover:border-neon-cyan"
          >
            Analyze Another Repository
          </Button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <ProjectSummary summary={results.summary} />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <TechStack technologies={results.technologies} />
        </motion.div>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-8"
      >
        <FaangFitScores scores={results.faangScores} />
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="mt-8"
      >
        <CompanySuggestions suggestions={results.suggestions} />
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="mt-8"
      >
        <ResumeSnippet resumeSnippet={results.resumeSnippet} />
      </motion.div>
    </div>
  );
}