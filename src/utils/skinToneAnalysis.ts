import { ClassificationResult, ImageClassificationOutput } from '../types/skinTone';
import { SKIN_TONE_MAPPINGS, CONFIDENCE_THRESHOLD } from '../constants/skinTone';

export const mapResultToSkinTone = (label: string): string => {
  const normalizedLabel = label.toLowerCase();
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

  const predictionScores = validPredictions.reduce((acc, prediction) => {
    const mappedLabel = mapResultToSkinTone(prediction.label);
    if (!acc[mappedLabel]) {
      acc[mappedLabel] = { totalScore: 0, count: 0 };
    }
    acc[mappedLabel].totalScore += prediction.score * prediction.score;
    acc[mappedLabel].count += 1;
    return acc;
  }, {} as Record<string, { totalScore: number; count: number }>);

  const [bestPrediction] = Object.entries(predictionScores).reduce(
    ([bestLabel, highestScore], [label, { totalScore, count }]) => {
      const weightedAverage = totalScore / count;
      return weightedAverage > highestScore ? [label, weightedAverage] : [bestLabel, highestScore];
    },
    ['medium', 0] as [string, number]
  );

  return bestPrediction;
};