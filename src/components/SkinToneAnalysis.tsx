import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { pipeline } from '@huggingface/transformers';
import { toast } from 'sonner';
import { SkinToneInfo, ImageClassificationOutput } from '../types/skinTone';
import { SKIN_TONE_DATA } from '../constants/skinTone';
import { processClassificationResults } from '../utils/skinToneAnalysis';

interface SkinToneAnalysisProps {
  photos: File[];
}

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
        
        const classifier = await pipeline('image-classification', 'Xenova/vit-base-patch16-224');
        
        const predictions = await Promise.all(
          photos.map(async (photo) => {
            const imageUrl = URL.createObjectURL(photo);
            const results = await classifier(imageUrl, {
              top_k: 3,
            }) as ImageClassificationOutput;
            
            URL.revokeObjectURL(imageUrl);
            return results;
          })
        );
        
        const bestPrediction = processClassificationResults(predictions);
        setAnalysis(SKIN_TONE_DATA[bestPrediction]);
        
      } catch (error) {
        console.error('Error analyzing skin tone:', error);
        setError(true);
        toast.error('Error analyzing skin tone. Please try again.');
      } finally {
        setIsAnalyzing(false);
      }
    };

    analyzeSkinTone();
  }, [photos]);

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