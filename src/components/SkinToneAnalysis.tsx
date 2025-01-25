import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { pipeline } from '@huggingface/transformers';
import { toast } from 'sonner';
import { SkinToneInfo, ImageClassificationOutput } from '../types/skinTone';
import { SKIN_TONE_DATA, SKIN_TONE_MAPPINGS } from '../constants/skinTone';
import { processClassificationResults } from '../utils/skinToneAnalysis';

interface SkinToneAnalysisProps {
  photos: File[];
  onPredictions?: (predictions: ImageClassificationOutput, index: number) => void;
}

const SkinToneAnalysis = ({ photos, onPredictions }: SkinToneAnalysisProps) => {
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
        
        // Create labels for all our skin tone categories
        const skinToneLabels = Object.entries(SKIN_TONE_MAPPINGS).flatMap(([category, keywords]) => 
          keywords.map(keyword => ({ category, keyword }))
        );
        
        // Process each photo and get predictions for our specific categories
        const predictions = await Promise.all(
          photos.map(async (photo, index) => {
            const imageUrl = URL.createObjectURL(photo);
            
            // Get predictions for all our keywords
            const results = await classifier(imageUrl, {
              candidate_labels: skinToneLabels.map(label => label.keyword),
            }) as ImageClassificationOutput;
            
            URL.revokeObjectURL(imageUrl);
            
            // Send predictions back to parent component
            onPredictions?.(results, index);
            
            return results;
          })
        );
        
        // Process all predictions to get the final result
        const result = processClassificationResults(predictions);
        setAnalysis(SKIN_TONE_DATA[result.skinTone]);
        
      } catch (error) {
        console.error('Error analyzing skin tone:', error);
        setError(true);
        toast.error('Error analyzing skin tone. Please try again.');
      } finally {
        setIsAnalyzing(false);
      }
    };

    analyzeSkinTone();
  }, [photos, onPredictions]);

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
          <>
            <CardDescription className="text-center mb-4">
              {analysis?.description}
            </CardDescription>
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
              <div>
                <p className="font-semibold">Undertone:</p>
                <p className="capitalize">{analysis?.undertone}</p>
              </div>
              <div>
                <p className="font-semibold">Season:</p>
                <p className="capitalize">{analysis?.season}</p>
              </div>
              <div>
                <p className="font-semibold">Contrast:</p>
                <p className="capitalize">{analysis?.contrast}</p>
              </div>
            </div>
          </>
        )}
      </CardHeader>
      {!isAnalyzing && analysis && (
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Characteristics</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              {analysis.characteristics.map((trait, index) => (
                <li key={index}>{trait}</li>
              ))}
            </ul>
          </div>

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

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Jewelry Recommendations</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="font-medium text-gray-700 mb-2">Recommended:</p>
                <ul className="list-disc list-inside space-y-1 text-gray-600">
                  {analysis.jewelry.recommended.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="font-medium text-gray-700 mb-2">Avoid:</p>
                <ul className="list-disc list-inside space-y-1 text-gray-600">
                  {analysis.jewelry.avoid.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export default SkinToneAnalysis;