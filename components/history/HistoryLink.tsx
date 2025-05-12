"use client";

import Link from 'next/link';
import { History } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HistoryLinkProps {
  className?: string;
}

export function HistoryLink({ className }: HistoryLinkProps) {
  return (
    <Link 
      href="/history" 
      className={cn("flex items-center space-x-2 text-gray-400 hover:text-neon-cyan transition-colors", className)}
    >
      <History size={18} />
      <span>View Analysis History</span>
    </Link>
  );
}