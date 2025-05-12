"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { GitHubRepoInput } from '@/components/github/GitHubRepoInput';
import { motion } from 'framer-motion';
import { HistoryLink } from '@/components/history/HistoryLink';

export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleAnalyze = async (repoUrl: string) => {
    setIsLoading(true);
    // In a real implementation, we would call the backend API here
    // For now, we'll simulate a delay and then redirect to the results page
    setTimeout(() => {
      // We would store the repo URL or ID in localStorage or state management
      localStorage.setItem('lastAnalyzedRepo', repoUrl);
      router.push(`/results?repo=${encodeURIComponent(repoUrl)}`);
    }, 1500);
  };

  return (
    <div className="container mx-auto px-4 py-12 relative">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 min-h-[calc(100vh-240px)]">
        <div className="lg:col-span-6 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-neon-pink via-neon-cyan to-neon-green inline-block text-transparent bg-clip-text">
              DevLens
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-300">
              AI-powered GitHub project analyzer that transforms ordinary repositories 
              into <span className="text-neon-cyan">FAANG-ready</span> portfolio entries.
            </p>
            <div className="mb-12">
              <GitHubRepoInput onSubmit={handleAnalyze} isLoading={isLoading} />
            </div>
          </motion.div>
        </div>
        
        <div className="lg:col-span-6 flex items-center">
          <motion.div 
            className="w-full h-full bg-black border border-neon-cyan/30 rounded-lg p-6 overflow-hidden"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex justify-between items-center mb-4">
              <div className="font-mono text-neon-green text-sm">DevLens Analysis</div>
              <div className="text-xs text-gray-500">.faang</div>
            </div>
            <div className="space-y-4">
              <div className="border-b border-gray-800 pb-4">
                <h3 className="text-lg text-neon-pink mb-2">Tech Stack Detection</h3>
                <p className="text-gray-400 text-sm">
                  Identifies programming languages, frameworks, and libraries from your repository.
                </p>
              </div>
              <div className="border-b border-gray-800 pb-4">
                <h3 className="text-lg text-neon-cyan mb-2">FAANG Company Fit</h3>
                <p className="text-gray-400 text-sm">
                  Evaluates your project against standards from Meta, Amazon, Apple, Netflix, and Google.
                </p>
              </div>
              <div className="border-b border-gray-800 pb-4">
                <h3 className="text-lg text-neon-green mb-2">Resume Generator</h3>
                <p className="text-gray-400 text-sm">
                  Creates professional summaries of your project ready for your resume.
                </p>
              </div>
              <div>
                <h3 className="text-lg text-neon-pink mb-2">Custom Recommendations</h3>
                <p className="text-gray-400 text-sm">
                  Offers personalized suggestions to improve your project for specific companies.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      <HistoryLink className="absolute bottom-4 right-8" />
    </div>
  );
}