import { ClassificationResult, ImageClassificationOutput } from '../types/skinTone';
import { SKIN_TONE_MAPPINGS, CONFIDENCE_THRESHOLD } from '../constants/skinTone';

export const mapResultToSkinTone = (label: string): string => {
  const normalizedLabel = label.toLowerCase();
  
  // More precise mapping based on specific keywords
  if (normalizedLabel.includes('fair') || normalizedLabel.includes('pale') || normalizedLabel.includes('light')) {
    return 'fair';
  }
  if (normalizedLabel.includes('beige') || normalizedLabel.includes('cream')) {
    return 'light';
  }
  if (normalizedLabel.includes('olive') || normalizedLabel.includes('golden')) {
    return 'olive';
  }
  if (normalizedLabel.includes('dark') || normalizedLabel.includes('deep') || normalizedLabel.includes('rich')) {
    return 'deep';
  }
  
  // If no specific match is found, look through the general mappings
  return Object.entries(SKIN_TONE_MAPPINGS).find(
    ([_, keywords]) => keywords.some(keyword => normalizedLabel.includes(keyword))
  )?.[0] || 'medium';
};

export const processClassificationResults = (predictions: ImageClassificationOutput[]): string => {
  const validPredictions = predictions
    .flat()
    .filter((pred): pred is ClassificationResult => 
      pred && typeof pred.score === 'number' && pred.score >= CONFIDENCE_THRESHOLD
    );

  if (validPredictions.length === 0) {
    throw new Error('No valid predictions found');
  }

  // Weight predictions by their confidence scores
  const predictionScores = validPredictions.reduce((acc, prediction) => {
    const mappedLabel = mapResultToSkinTone(prediction.label);
    if (!acc[mappedLabel]) {
      acc[mappedLabel] = { totalScore: 0, count: 0 };
    }
    // Square the score to give more weight to high-confidence predictions
    const weightedScore = prediction.score * prediction.score;
    acc[mappedLabel].totalScore += weightedScore;
    acc[mappedLabel].count += 1;
    return acc;
  }, {} as Record<string, { totalScore: number; count: number }>);

  // Find the prediction with the highest weighted average score
  const [bestPrediction] = Object.entries(predictionScores).reduce(
    ([bestLabel, highestScore], [label, { totalScore, count }]) => {
      const weightedAverage = totalScore / count;
      return weightedAverage > highestScore ? [label, weightedAverage] : [bestLabel, highestScore];
    },
    ['', 0] as [string, number]
  );

  return bestPrediction;
};