import { NextResponse } from 'next/server';
import axios from 'axios';

// Check if API key is available
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error('GEMINI_API_KEY is not defined in environment variables');
}

async function analyzeRepository(repoUrl: string) {
  try {
    console.log('Starting repository analysis for:', repoUrl);
    
    // Validate API key
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY is not configured');
    }
    
    const prompt = `Analyze this GitHub repository: ${repoUrl}

    If the README is missing or lacks detail, inspect the entire codebase — including file structure, code comments, file extensions, import statements, and config files (like package.json, requirements.txt, pom.xml) — to understand the project and identify technologies used.
    
    Return your findings in the following strict JSON structure:
    {
      "summary": "A comprehensive overview of what the project does and its key features",
      "technologies": ["List all detected technologies, frameworks, and languages used"],
      "faangScores": {
        "meta": 0,
        "amazon": 0,
        "apple": 0,
        "netflix": 0,
        "google": 0
      },
      "suggestions": {
        "meta": ["3-4 dynamic, context-aware improvements for Meta alignment"],
        "amazon": ["3-4 dynamic, context-aware improvements for Amazon alignment"],
        "apple": ["3-4 dynamic, context-aware improvements for Apple alignment"],
        "netflix": ["3-4 dynamic, context-aware improvements for Netflix alignment"],
        "google": ["3-4 dynamic, context-aware improvements for Google alignment"]
      },
      "resumeSnippet": "A professional, concise project description suitable for a resume"
    }
    
    IMPORTANT:
    - Respond ONLY with the JSON object — no text before or after.
    - Use integer values between 0 and 10 for faangScores.
    - In 'technologies', include both backend and frontend stacks, databases, hosting, cloud, etc.
    
    When analyzing FAANG alignment:
    - Do NOT use fixed criteria. Instead, assess how the project aligns with each company’s known product domains, engineering focus, and cultural values.
    - Tailor suggestions to this specific project — consider architecture, scalability, algorithmic complexity, real-time behavior, UX/UI quality, infra integration, cloud readiness, test coverage, documentation, etc.
    
    Example:
    - If the project is a full-stack web app, assess how well it uses modern tools, frameworks, and structure that companies like Google or Meta expect.
    - If it's an ML repo, suggest improvements for data handling, model explainability, or deployment aligned with Amazon or Apple standards.
    - If it's a CLI tool, evaluate abstraction, usability, packaging, etc., in ways Google or Netflix might care about.
    
    Also analyze:
    1. Code readability, modularity, and maintainability
    2. Deployment readiness and DevOps practices
    3. Testing coverage and CI integration
    4. Security, error handling, and logging
    5. Scalability and performance engineering
    
    `;
    

    console.log('Sending request to Gemini API...');
    
    // Using direct HTTP request to Gemini API
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        contents: [{
          parts: [{ text: prompt }]
        }]
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    
    console.log('Received response from Gemini API');
    console.log('Response structure:', JSON.stringify(response.data).substring(0, 200) + '...');
    
    // Extract the text from the response
    let text = '';
    if (response.data && 
        response.data.candidates && 
        response.data.candidates[0] && 
        response.data.candidates[0].content && 
        response.data.candidates[0].content.parts && 
        response.data.candidates[0].content.parts[0]) {
      text = response.data.candidates[0].content.parts[0].text;
    } else {
      console.error('Unexpected API response structure:', response.data);
      throw new Error('Invalid API response structure');
    }
    
    // Clean the text to ensure it's valid JSON
    // Sometimes the API might return markdown code blocks or extra text
    text = text.trim();
    if (text.startsWith('```json')) {
      text = text.replace(/```json\n/, '').replace(/\n```$/, '');
    } else if (text.startsWith('```')) {
      text = text.replace(/```\n/, '').replace(/\n```$/, '');
    }
    
    console.log('Cleaned text for parsing:', text.substring(0, 200) + '...');
    
    console.log('Attempting to parse response as JSON');
    try {
      const parsedData = JSON.parse(text);
      
      // Ensure faangScores are numbers
      if (parsedData.faangScores) {
        Object.keys(parsedData.faangScores).forEach(key => {
          const score = parsedData.faangScores[key];
          if (typeof score === 'string') {
            // Try to extract numeric value from string (e.g., "8/10" -> 8)
            const numericValue = parseInt(score);
            if (!isNaN(numericValue)) {
              parsedData.faangScores[key] = numericValue;
            } else {
              parsedData.faangScores[key] = 0;
            }
          }
        });
      }
      
      console.log('Successfully parsed data:', JSON.stringify(parsedData).substring(0, 200) + '...');
      return parsedData;
    } catch (parseError) {
      console.error('JSON parsing error:', parseError);
      console.log('Raw API response text:', text);
      
      // Fall back to mock data if parsing fails
      return {
        summary: "Failed to parse API response. This is a fallback response.",
        technologies: ["Unknown"],
        faangScores: {
          meta: 5,
          amazon: 5,
          apple: 5,
          netflix: 5,
          google: 5
        },
        suggestions: {
          meta: ["Improve React component structure"],
          amazon: ["Implement microservices"],
          apple: ["Enhance UI/UX"],
          netflix: ["Improve data handling"],
          google: ["Improve testing coverage"]
        },
        resumeSnippet: "A project that demonstrates web development practices."
      };
    }
  } catch (error) {
    console.error('Error in analyzeRepository function:', error);
    throw error;
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('Received analysis request with body:', body);
    
    if (!body.repoUrl) {
      console.error('Missing repoUrl in request body');
      return NextResponse.json(
        { error: 'Missing repoUrl in request body' },
        { status: 400 }
      );
    }
    
    const { repoUrl } = body;
    console.log('Analyzing repository:', repoUrl);
    
    const analysis = await analyzeRepository(repoUrl);
    
    console.log('Analysis completed successfully');
    return NextResponse.json(analysis);
  } catch (error) {
    console.error('Error analyzing repository:', error);
    if (error instanceof Error) {
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
      
      return NextResponse.json(
        { error: `Failed to analyze repository: ${error.message}` },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to analyze repository' },
      { status: 500 }
    );
  }
}