import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { pipeline } from '@huggingface/transformers';
import { toast } from 'sonner';

interface SkinToneAnalysisProps {
  photos: File[];
}

interface SkinToneInfo {
  tone: string;
  description: string;
  palette: string[];
}

interface ClassificationResult {
  label: string;
  score: number;
}

const CONFIDENCE_THRESHOLD = 0.3; // Minimum confidence score to consider a prediction

const skinToneData: Record<string, SkinToneInfo> = {
  'fair': {
    tone: 'Fair',
    description: 'Fair skin tones have cool or neutral undertones and are more susceptible to sun damage. This skin type often has visible veins and burns easily.',
    palette: ['#F5E6E0', '#E8B298', '#D77556', '#6B4423', '#8B0000']
  },
  'light': {
    tone: 'Light',
    description: 'Light skin tones can have warm or cool undertones and may tan gradually. This skin type can handle moderate sun exposure but should still use protection.',
    palette: ['#FFE4C4', '#DEB887', '#CD853F', '#8B4513', '#A0522D']
  },
  'medium': {
    tone: 'Medium',
    description: 'Medium skin tones typically have warm or neutral undertones and tan easily. This versatile skin type can handle various colors and moderate sun exposure.',
    palette: ['#E5C6B3', '#C19A6B', '#996515', '#6F4E37', '#3B2F2F']
  },
  'olive': {
    tone: 'Olive',
    description: 'Olive skin tones have green or golden undertones and tan very easily. This skin type rarely burns and looks great in both warm and cool colors.',
    palette: ['#BC8F8F', '#966919', '#808000', '#556B2F', '#2F4F4F']
  },
  'deep': {
    tone: 'Deep',
    description: 'Deep skin tones have warm undertones and natural sun protection. This rich skin type looks stunning in bright colors and rarely burns.',
    palette: ['#9E7B6B', '#8B4513', '#654321', '#3B2F2F', '#28282B']
  }
};

const SkinToneAnalysis = ({ photos }: SkinToneAnalysisProps) => {
  const [analysis, setAnalysis] = React.useState<SkinToneInfo | null>(null);
  const [isAnalyzing, setIsAnalyzing] = React.useState(false);
  const [error, setError] = React.useState<boolean>(false);

  React.useEffect(() => {
    const analyzeSkinTone = async () => {
      if (photos.length === 0) return;
      
      try {
        setIsAnalyzing(true);
        setError(false);
        console.log('Starting analysis of multiple photos...');
        
        const classifier = await pipeline('image-classification', 'Xenova/vit-base-patch16-224');
        console.log('Classifier created');
        
        const predictions = await Promise.all(
          photos.map(async (photo) => {
            const imageUrl = URL.createObjectURL(photo);
            console.log('Processing image:', imageUrl);
            
            // Get multiple predictions per image
            const results = await classifier(imageUrl, {
              top_k: 3, // Get top 3 predictions per image
            });
            
            URL.revokeObjectURL(imageUrl);
            return Array.isArray(results) ? results : [results];
          })
        );
        
        console.log('All classification results:', predictions);
        
        // Flatten predictions and filter by confidence
        const validPredictions = predictions
          .flat()
          .filter(pred => pred.score >= CONFIDENCE_THRESHOLD);
        
        if (validPredictions.length === 0) {
          console.log('No predictions met the confidence threshold');
          toast.error('Unable to determine skin tone with confidence. Please try with different photos.');
          setError(true);
          return;
        }

        // Calculate weighted predictions
        const predictionScores: Record<string, { totalScore: number; count: number }> = {};
        
        validPredictions.forEach(prediction => {
          if (prediction && prediction.label) {
            const mappedLabel = mapResultToSkinTone(prediction.label.toLowerCase());
            predictionScores[mappedLabel] = predictionScores[mappedLabel] || { totalScore: 0, count: 0 };
            // Weight the prediction by its confidence score
            predictionScores[mappedLabel].totalScore += prediction.score * prediction.score; // Square the score to give more weight to high-confidence predictions
            predictionScores[mappedLabel].count += 1;
          }
        });
        
        // Find the prediction with highest weighted average
        let bestPrediction = 'medium';
        let highestWeightedScore = 0;
        
        Object.entries(predictionScores).forEach(([prediction, { totalScore, count }]) => {
          const weightedAverage = totalScore / count;
          if (weightedAverage > highestWeightedScore) {
            bestPrediction = prediction;
            highestWeightedScore = weightedAverage;
          }
        });
        
        console.log('Final weighted prediction:', bestPrediction, 'with score:', highestWeightedScore);
        setAnalysis(skinToneData[bestPrediction] || skinToneData['medium']);
        
      } catch (error) {
        console.error('Error analyzing skin tone:', error);
        setError(true);
        toast.error('Error analyzing skin tone. Please try again.');
        setAnalysis(null);
      } finally {
        setIsAnalyzing(false);
      }
    };

    analyzeSkinTone();
  }, [photos]);

  const mapResultToSkinTone = (label: string): string => {
    // Enhanced mapping logic with more variations
    const mappings: Record<string, string[]> = {
      fair: ['light', 'pale', 'fair', 'porcelain', 'ivory'],
      light: ['beige', 'cream', 'neutral'],
      medium: ['tan', 'medium', 'natural'],
      olive: ['olive', 'golden', 'warm'],
      deep: ['dark', 'deep', 'rich', 'ebony', 'mahogany']
    };

    for (const [tone, keywords] of Object.entries(mappings)) {
      if (keywords.some(keyword => label.includes(keyword))) {
        return tone;
      }
    }
    
    return 'medium'; // Default fallback
  };

  if (!analysis && !isAnalyzing && error) {
    return (
      <Card className="w-full animate-fade-up">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-gray-800">
            Too pretty to analyze! 😊
          </CardTitle>
          <CardDescription className="text-center text-gray-600">
            Our AI was overwhelmed by your beauty. Please try again.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  if (!analysis && !isAnalyzing) return null;

  return (
    <Card className="w-full animate-fade-up">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          {isAnalyzing ? `Analyzing ${photos.length} photos...` : analysis?.tone}
        </CardTitle>
        {!isAnalyzing && (
          <CardDescription className="text-center">
            {analysis?.description}
          </CardDescription>
        )}
      </CardHeader>
      {!isAnalyzing && analysis && (
        <CardContent>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Recommended Color Palette</h3>
            <div className="flex justify-center gap-2">
              {analysis.palette.map((color, index) => (
                <div
                  key={index}
                  className="w-12 h-12 rounded-full border border-gray-200 shadow-sm"
                  style={{ backgroundColor: color }}
                  title={color}
                />
              ))}
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export default SkinToneAnalysis;