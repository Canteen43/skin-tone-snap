export interface SkinToneInfo {
  tone: string;
  description: string;
  palette: string[];
}

export interface ClassificationResult {
  label: string;
  score: number;
}

export type ImageClassificationSingle = ClassificationResult;
export type ImageClassificationOutput = ClassificationResult[];