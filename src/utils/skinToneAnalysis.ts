import { ClassificationResult, ImageClassificationOutput, AnalysisResult } from '../types/skinTone';
import { SKIN_TONE_MAPPINGS, UNDERTONE_MAPPINGS, SEASON_CHARACTERISTICS, CONFIDENCE_THRESHOLD } from '../constants/skinTone';

export const mapResultToSkinTone = (label: string): string => {
  const normalizedLabel = label.toLowerCase();
  
  // Check each skin tone category for matches
  for (const [tone, keywords] of Object.entries(SKIN_TONE_MAPPINGS)) {
    if (keywords.some(keyword => normalizedLabel.includes(keyword))) {
      return tone;
    }
  }
  
  return 'medium'; // Default fallback
};

export const determineUndertone = (labels: string[]): 'warm' | 'cool' | 'neutral' => {
  const scores = {
    warm: 0,
    cool: 0,
    neutral: 0
  };

  labels.forEach(label => {
    const normalizedLabel = label.toLowerCase();
    Object.entries(UNDERTONE_MAPPINGS).forEach(([undertone, keywords]) => {
      if (keywords.some(keyword => normalizedLabel.includes(keyword))) {
        scores[undertone as keyof typeof scores] += 1;
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
    // For neutral undertones, base it more on skin depth
    return ['light', 'fair'].includes(skinTone) ? 'summer' : 
           ['medium', 'olive'].includes(skinTone) ? 'spring' :
           ['tan', 'dark'].includes(skinTone) ? 'autumn' : 'winter';
  }
};

export const processClassificationResults = (predictions: ImageClassificationOutput[]): AnalysisResult => {
  const validPredictions = predictions
    .flat()
    .filter((pred): pred is ClassificationResult => 
      pred && typeof pred.score === 'number' && pred.score >= CONFIDENCE_THRESHOLD
    );

  if (validPredictions.length === 0) {
    throw new Error('No valid predictions found');
  }

  // Analyze each prediction and collect results
  const results = validPredictions.map(prediction => ({
    skinTone: mapResultToSkinTone(prediction.label),
    confidence: prediction.score,
    label: prediction.label
  }));

  // Aggregate results
  const skinToneScores: Record<string, { total: number; count: number }> = {};
  const labels: string[] = [];

  results.forEach(result => {
    if (!skinToneScores[result.skinTone]) {
      skinToneScores[result.skinTone] = { total: 0, count: 0 };
    }
    skinToneScores[result.skinTone].total += result.confidence;
    skinToneScores[result.skinTone].count += 1;
    labels.push(result.label);
  });

  // Find the most confident skin tone
  const [bestSkinTone] = Object.entries(skinToneScores).reduce(
    ([bestTone, highestAvg], [tone, { total, count }]) => {
      const average = total / count;
      return average > highestAvg ? [tone, average] : [bestTone, highestAvg];
    },
    ['medium', 0] as [string, number]
  );

  // Determine undertone and season
  const undertone = determineUndertone(labels);
  const season = determineSeason(bestSkinTone, undertone);

  // Calculate overall confidence
  const overallConfidence = Object.values(skinToneScores).reduce(
    (acc, { total, count }) => acc + (total / count),
    0
  ) / Object.keys(skinToneScores).length;

  return {
    skinTone: bestSkinTone,
    undertone,
    season,
    confidence: overallConfidence
  };
};