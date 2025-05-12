"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2, GitBranch } from 'lucide-react';

interface GitHubRepoInputProps {
  onSubmit: (repoUrl: string) => void;
  isLoading?: boolean;
}

export function GitHubRepoInput({ onSubmit, isLoading = false }: GitHubRepoInputProps) {
  const [repoUrl, setRepoUrl] = useState('');
  const [error, setError] = useState('');

  const validateGitHubUrl = (url: string): boolean => {
    // Simple validation for GitHub URLs
    const githubUrlRegex = /^https?:\/\/(www\.)?github\.com\/[\w-]+\/[\w.-]+\/?$/;
    return githubUrlRegex.test(url);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!repoUrl.trim()) {
      setError('Please enter a GitHub repository URL');
      return;
    }

    if (!validateGitHubUrl(repoUrl)) {
      setError('Please enter a valid GitHub repository URL (e.g., https://github.com/username/repo)');
      return;
    }

    setError('');
    onSubmit(repoUrl);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <GitBranch className="h-5 w-5 text-gray-500" />
        </div>
        <Input
          type="text"
          placeholder="https://github.com/username/repository"
          className="w-full pl-10 bg-black border-neon-cyan/50 hover:border-neon-cyan focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan"
          value={repoUrl}
          onChange={(e) => setRepoUrl(e.target.value)}
          disabled={isLoading}
        />
      </div>
      
      {error && (
        <p className="text-red-500 text-sm">{error}</p>
      )}
      
      <Button 
        type="submit" 
        disabled={isLoading}
        className="w-full md:w-auto bg-transparent hover:bg-neon-pink/10 text-neon-pink border border-neon-pink hover:border-neon-pink focus:ring-2 focus:ring-neon-pink/40 transition-all duration-200"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Analyzing Repository...
          </>
        ) : (
          'Analyze Repository'
        )}
      </Button>
    </form>
  );
}