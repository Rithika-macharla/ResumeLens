export interface AnalysisResult {
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    location: string;
  };
  summary: string;
  scores: {
    overall: number;
    atsCompatibility: number;
    skillRelevance: number;
    experienceStrength: number;
    formatting: number;
  };
  sections: {
    skills: string[];
    education: Array<{
      institution: string;
      degree: string;
      year: string;
    }>;
    experience: Array<{
      company: string;
      role: string;
      duration: string;
      description: string;
    }>;
    projects: Array<{
      name: string;
      description: string;
    }>;
    certifications: string[];
  };
  analysis: {
    strengths: string[];
    weaknesses: string[];
    suggestions: string[];
    missingKeywords: string[];
    actionVerbImprovements: Array<{
      original: string;
      suggested: string;
    }>;
  };
  jobMatch: {
    matchPercentage: number;
    missingSkills: string[];
    recommendedSkills: string[];
  };
}

export interface HistoryItem {
  id: number;
  filename: string;
  timestamp: string;
  score: number;
  analysis: AnalysisResult;
}
