"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X, ExternalLink, GithubIcon as GitHubIcon, Trash2 } from 'lucide-react';
import { AnalysisHistoryItem } from '@/lib/types';

export default function HistoryPage() {
  const [history, setHistory] = useState<AnalysisHistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadHistory = () => {
      try {
        const historyData = localStorage.getItem('analysisHistory');
        const parsedHistory = historyData ? JSON.parse(historyData) : [];
        // Sort by timestamp descending
        parsedHistory.sort((a: AnalysisHistoryItem, b: AnalysisHistoryItem) => 
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        );
        setHistory(parsedHistory);
      } catch (error) {
        console.error('Error loading history:', error);
        setHistory([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadHistory();
  }, []);

  const handleDelete = (repoUrl: string) => {
    try {
      const updatedHistory = history.filter(item => item.repoUrl !== repoUrl);
      localStorage.setItem('analysisHistory', JSON.stringify(updatedHistory));
      setHistory(updatedHistory);
    } catch (error) {
      console.error('Error deleting history item:', error);
    }
  };

  const handleClearAll = () => {
    try {
      localStorage.removeItem('analysisHistory');
      setHistory([]);
    } catch (error) {
      console.error('Error clearing history:', error);
    }
  };

  const getRepoName = (url: string) => {
    try {
      const urlObj = new URL(url);
      const pathParts = urlObj.pathname.split('/').filter(Boolean);
      if (pathParts.length >= 2) {
        return `${pathParts[0]}/${pathParts[1]}`;
      }
      return url;
    } catch {
      return url;
    }
  };

  return (
    <div className="container mx-auto px-4 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 flex flex-wrap justify-between items-center"
      >
        <div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            <span className="text-neon-green">Analysis</span> History
          </h1>
          <p className="text-gray-300 mb-4">
            Your previously analyzed GitHub repositories
          </p>
        </div>
        
        {history.length > 0 && (
          <Button
            onClick={handleClearAll}
            variant="outline"
            className="border-red-500 text-red-500 hover:bg-red-500/10 hover:text-red-400"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Clear All
          </Button>
        )}
      </motion.div>

      {isLoading ? (
        <div className="flex justify-center items-center min-h-[40vh]">
          <div className="h-8 w-8 border-4 border-t-neon-cyan border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
        </div>
      ) : history.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center py-16"
        >
          <div className="bg-black/50 border border-neon-cyan/30 rounded-lg p-8 max-w-md mx-auto">
            <X className="h-12 w-12 text-neon-pink mx-auto mb-4" />
            <h2 className="text-xl font-bold text-white mb-2">No Analysis History</h2>
            <p className="text-gray-300 mb-6">
              You haven't analyzed any GitHub repositories yet. Go back to the home page to analyze your first repository.
            </p>
            <Button
              onClick={() => window.location.href = '/'}
              className="bg-transparent hover:bg-neon-cyan/10 text-neon-cyan border border-neon-cyan hover:border-neon-cyan"
            >
              Go Back Home
            </Button>
          </div>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {history.map((item, index) => (
            <motion.div
              key={item.repoUrl}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="border border-neon-cyan/30 bg-black overflow-hidden h-full flex flex-col">
                <CardHeader className="relative">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 text-gray-400 hover:text-red-500 hover:bg-transparent"
                    onClick={() => handleDelete(item.repoUrl)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                  <CardTitle className="text-lg text-neon-pink truncate pr-8">
                    {getRepoName(item.repoUrl)}
                  </CardTitle>
                  <div className="text-xs text-gray-400">
                    {format(new Date(item.timestamp), "MMM d, yyyy 'at' h:mm a")}
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="mb-3">
                    <h3 className="text-sm font-medium text-neon-cyan mb-1">Key Technologies</h3>
                    <div className="flex flex-wrap gap-1">
                      {item.technologies.slice(0, 3).map((tech, i) => (
                        <span 
                          key={i} 
                          className="text-xs bg-neon-cyan/10 text-neon-cyan px-2 py-0.5 rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                      {item.technologies.length > 3 && (
                        <span className="text-xs text-gray-400">+{item.technologies.length - 3} more</span>
                      )}
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <h3 className="text-sm font-medium text-neon-green mb-1">Top FAANG Score</h3>
                    <div className="flex items-center">
                      {Object.entries(item.faangScores)
                        .sort(([,a], [,b]) => b - a)
                        .slice(0, 1)
                        .map(([company, score]) => (
                          <div key={company} className="flex items-center">
                            <span className="text-gray-300 capitalize">{company}:</span>
                            <span className="ml-1 text-neon-green font-medium">{score}/10</span>
                          </div>
                        ))
                      }
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-neon-pink mb-1">Summary</h3>
                    <p className="text-gray-300 text-xs line-clamp-3">
                      {item.summary}
                    </p>
                  </div>
                </CardContent>
                <CardFooter className="pt-0 flex justify-between">
                  <a 
                    href={item.repoUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-400 text-sm hover:text-neon-cyan flex items-center"
                  >
                    <GitHubIcon className="h-4 w-4 mr-1" />
                    View Repo
                  </a>
                  <Link
                    href={`/results?repo=${encodeURIComponent(item.repoUrl)}`}
                    className="text-neon-green text-sm hover:text-neon-green/80 flex items-center"
                  >
                    View Analysis
                    <ExternalLink className="h-3 w-3 ml-1" />
                  </Link>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}