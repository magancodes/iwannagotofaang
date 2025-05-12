import Link from 'next/link';
import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black border-t border-neon-cyan/20 py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-1 mb-4 md:mb-0">
            <span className="text-gray-400">Built with</span>
            <Heart size={16} className="text-neon-pink" />
            <span className="text-gray-400">using Next.js & Gemini API</span>
          </div>
          
          <div className="flex space-x-6">
            <Link 
              href="/" 
              className="text-gray-400 hover:text-neon-cyan transition-colors"
            >
              Home
            </Link>
            <Link 
              href="/history" 
              className="text-gray-400 hover:text-neon-pink transition-colors"
            >
              History
            </Link>
            <Link 
              href="https://github.com" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-neon-green transition-colors"
            >
              GitHub
            </Link>
          </div>
        </div>
        
        <div className="mt-6 text-center text-xs text-gray-500">
          &copy; {new Date().getFullYear()} DevLens. All rights reserved.
        </div>
      </div>
    </footer>
  );
}