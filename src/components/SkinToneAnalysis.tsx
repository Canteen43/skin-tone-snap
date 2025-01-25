import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { pipeline } from '@huggingface/transformers';
import { toast } from 'sonner';

interface SkinToneAnalysisProps {
  photo: File;
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

const SkinToneAnalysis = ({ photo }: SkinToneAnalysisProps) => {
  const [analysis, setAnalysis] = React.useState<SkinToneInfo | null>(null);
  const [isAnalyzing, setIsAnalyzing] = React.useState(false);

  React.useEffect(() => {
    const analyzeSkinTone = async () => {
      try {
        setIsAnalyzing(true);
        
        // Create a classifier with a specific model for skin tone classification
        const classifier = await pipeline('image-classification', 'Xenova/skin-tone-classifier');
        
        // Create an object URL for the uploaded photo
        const imageUrl = URL.createObjectURL(photo);
        
        // Perform the classification
        const result = await classifier(imageUrl, {
          topk: 1, // Only get the top prediction
        });
        
        let prediction: string;
        
        if (Array.isArray(result) && result.length > 0) {
          const firstResult = result[0] as ClassificationResult;
          prediction = firstResult.score > 0.5 ? firstResult.label : 'medium';
        } else if (!Array.isArray(result)) {
          const singleResult = result as ClassificationResult;
          prediction = singleResult.score > 0.5 ? singleResult.label : 'medium';
        } else {
          prediction = 'medium'; // Fallback to medium if no valid prediction
        }
        
        // Clean up the object URL
        URL.revokeObjectURL(imageUrl);
        
        const predictionKey = prediction.toLowerCase();
        setAnalysis(skinToneData[predictionKey] || skinToneData['medium']);
        
      } catch (error) {
        console.error('Error analyzing skin tone:', error);
        toast.error('Error analyzing skin tone. Please try again.');
        setAnalysis(null);
      } finally {
        setIsAnalyzing(false);
      }
    };

    if (photo) {
      analyzeSkinTone();
    }
  }, [photo]);

  if (!analysis && !isAnalyzing) return null;

  return (
    <Card className="w-full max-w-md mx-auto mt-6 animate-fade-up">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          {isAnalyzing ? 'Analyzing...' : analysis?.tone}
        </CardTitle>
        {!isAnalyzing && (
          <CardDescription className="text-center text-gray-600">
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