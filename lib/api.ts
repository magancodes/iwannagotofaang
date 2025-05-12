import axios from 'axios';
import { AnalysisResult } from './types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchAnalysisResults(repoUrl: string): Promise<AnalysisResult> {
  try {
    const response = await axios.post(`${API_BASE_URL}/analyze`, {
      repoUrl,
    });
    
    return response.data;
  } catch (error) {
    console.error('Error analyzing repository:', error);
    throw new Error('Failed to analyze repository. Please try again.');
  }
}