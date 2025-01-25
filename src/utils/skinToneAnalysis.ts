import { ClassificationResult, ImageClassificationOutput, AnalysisResult } from '../types/skinTone';
import { SKIN_TONE_MAPPINGS, UNDERTONE_MAPPINGS, SEASON_CHARACTERISTICS, CONFIDENCE_THRESHOLD } from '../constants/skinTone';

export const aggregateScoresByCategory = (predictions: ClassificationResult[]): Record<string, number> => {
  const scores: Record<string, number> = {};
  
  // Initialize scores for each category
  Object.keys(SKIN_TONE_MAPPINGS).forEach(category => {
    scores[category] = 0;
  });
  
  // For each prediction, add its score to the corresponding category
  predictions.forEach(prediction => {
    Object.entries(SKIN_TONE_MAPPINGS).forEach(([category, keywords]) => {
      if (keywords.some(keyword => prediction.label.toLowerCase().includes(keyword))) {
        scores[category] += prediction.score;
      }
    });
  });
  
  return scores;
};

export const determineUndertone = (predictions: ClassificationResult[]): 'warm' | 'cool' | 'neutral' => {
  const scores = {
    warm: 0,
    cool: 0,
    neutral: 0
  };

  predictions.forEach(prediction => {
    const label = prediction.label.toLowerCase();
    Object.entries(UNDERTONE_MAPPINGS).forEach(([undertone, keywords]) => {
      if (keywords.some(keyword => label.includes(keyword))) {
        scores[undertone as keyof typeof scores] += prediction.score;
      }
    });
  });

  const maxScore = Math.max(...Object.values(scores));
  const undertone = Object.entries(scores).find(([_, score]) => score === maxScore)?.[0] as 'warm' | 'cool' | 'neutral';
  return undertone || 'neutral';
};

export const determineSeason = (skinTone: string, undertone: 'warm' | 'cool' | 'neutral'): 'spring' | 'summer' | 'autumn' | 'winter' => {
  if (undertone === 'warm') {
    return ['light', 'fair', 'medium'].includes(skinTone) ? 'spring' : 'autumn';
  } else if (undertone === 'cool') {
    return ['light', 'fair', 'medium'].includes(skinTone) ? 'summer' : 'winter';
  } else {
    return ['light', 'fair'].includes(skinTone) ? 'summer' : 
           ['medium', 'olive'].includes(skinTone) ? 'spring' :
           ['tan', 'dark'].includes(skinTone) ? 'autumn' : 'winter';
  }
};

export const processClassificationResults = (predictions: ImageClassificationOutput[]): AnalysisResult => {
  const allPredictions = predictions.flat();
  
  if (allPredictions.length === 0) {
    throw new Error('No valid predictions found');
  }

  // Aggregate scores by category across all photos
  const categoryScores = aggregateScoresByCategory(allPredictions);
  
  // Find the category with the highest score
  const [bestSkinTone, highestScore] = Object.entries(categoryScores).reduce(
    ([bestTone, highestScore], [tone, score]) => 
      score > highestScore ? [tone, score] : [bestTone, highestScore],
    ['medium', 0] as [string, number]
  );

  const undertone = determineUndertone(allPredictions);
  const season = determineSeason(bestSkinTone, undertone);

  return {
    skinTone: bestSkinTone,
    undertone,
    season,
    confidence: highestScore
  };
};