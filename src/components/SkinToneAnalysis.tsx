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
        console.log('Starting analysis...');
        
        const classifier = await pipeline('image-classification', 'microsoft/resnet-50');
        console.log('Classifier created');
        
        const imageUrl = URL.createObjectURL(photo);
        console.log('Image URL created:', imageUrl);
        
        const result = await classifier(imageUrl, {
          top_k: 1,
        });
        console.log('Classification result:', result);
        
        URL.revokeObjectURL(imageUrl);
        
        let prediction: string;
        
        if (Array.isArray(result)) {
          console.log('Processing array result');
          const firstResult = result[0] as ClassificationResult;
          prediction = mapResultToSkinTone(firstResult.label.toLowerCase());
        } else {
          console.log('Processing single result');
          const singleResult = result as ClassificationResult;
          prediction = mapResultToSkinTone(singleResult.label.toLowerCase());
        }
        
        console.log('Final prediction:', prediction);
        setAnalysis(skinToneData[prediction] || skinToneData['medium']);
        
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

  const mapResultToSkinTone = (label: string): string => {
    if (label.includes('light') || label.includes('pale')) return 'fair';
    if (label.includes('medium') || label.includes('tan')) return 'medium';
    if (label.includes('dark') || label.includes('deep')) return 'deep';
    if (label.includes('olive')) return 'olive';
    return 'medium'; // default fallback
  };

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
