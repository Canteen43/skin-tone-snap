import { useState } from 'react';
import PhotoUpload from '../components/PhotoUpload';
import SkinToneAnalysis from '../components/SkinToneAnalysis';
import { Button } from '@/components/ui/button';
import { Plus, X } from 'lucide-react';
import { toast } from 'sonner';
import { ImageClassificationOutput } from '../types/skinTone';

interface PhotoWithPredictions {
  file: File;
  predictions?: ImageClassificationOutput;
}

const Index = () => {
  const [photosWithPredictions, setPhotosWithPredictions] = useState<PhotoWithPredictions[]>([]);

  const handleAddPhotos = (newPhotos: File[]) => {
    setPhotosWithPredictions(prev => [...prev, ...newPhotos.map(file => ({ file }))]);
    if (newPhotos.length > 0) {
      toast.success(`Added ${newPhotos.length} new photo${newPhotos.length > 1 ? 's' : ''}`);
    }
  };

  const handleDeletePhoto = (index: number) => {
    const newPhotos = photosWithPredictions.filter((_, i) => i !== index);
    setPhotosWithPredictions(newPhotos);
    toast.success('Photo removed');
  };

  const handlePredictions = (predictions: ImageClassificationOutput, index: number) => {
    setPhotosWithPredictions(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], predictions };
      return updated;
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-skin-light/30 to-white">
      <div className="container px-4 py-16 mx-auto">
        {photosWithPredictions.length === 0 ? (
          <>
            <div className="text-center mb-16 animate-fade-up">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Skin Tone Analysis
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Upload multiple photos for a more accurate analysis of your skin tone. Our AI will analyze all photos to determine your unique complexion.
              </p>
            </div>

            <PhotoUpload
              photos={[]}
              onPhotosSelected={(files) => setPhotosWithPredictions(files.map(file => ({ file })))}
            />
          </>
        ) : (
          <div className="grid md:grid-cols-2 gap-8 animate-fade-up">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-gray-900">Your Photos</h2>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => {
                    const input = document.createElement('input');
                    input.type = 'file';
                    input.multiple = true;
                    input.accept = 'image/*';
                    input.onchange = (e) => {
                      const files = Array.from((e.target as HTMLInputElement).files || []);
                      handleAddPhotos(files);
                    };
                    input.click();
                  }}
                  className="rounded-full hover:bg-skin-light/50"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {photosWithPredictions.map(({ file }, index) => (
                  <div key={index} className="space-y-2">
                    <div className="relative group">
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`Uploaded photo ${index + 1}`}
                        className="w-full aspect-square object-cover rounded-lg"
                        onLoad={(e) => URL.revokeObjectURL((e.target as HTMLImageElement).src)}
                      />
                      <button
                        onClick={() => handleDeletePhoto(index)}
                        className="absolute top-1 right-1 p-1 bg-white/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
                        aria-label="Delete photo"
                      >
                        <X className="h-4 w-4 text-gray-700" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Analysis Results</h2>
              <SkinToneAnalysis 
                photos={photosWithPredictions.map(p => p.file)} 
                onPredictions={handlePredictions}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;