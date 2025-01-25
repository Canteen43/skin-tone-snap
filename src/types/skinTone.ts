export interface SkinToneInfo {
  tone: string;
  description: string;
  undertone: 'warm' | 'cool' | 'neutral';
  contrast: 'high' | 'medium' | 'low';
  season: 'spring' | 'summer' | 'autumn' | 'winter';
  palette: string[];
  jewelry: {
    recommended: string[];
    avoid: string[];
  };
  characteristics: string[];
}

export interface ClassificationResult {
  label: string;
  score: number;
}

export type ImageClassificationSingle = ClassificationResult;
export type ImageClassificationOutput = ClassificationResult[];

export interface AnalysisResult {
  skinTone: string;
  undertone: 'warm' | 'cool' | 'neutral';
  season: 'spring' | 'summer' | 'autumn' | 'winter';
  confidence: number;
}