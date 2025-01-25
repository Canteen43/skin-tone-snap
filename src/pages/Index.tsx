import { useState } from 'react';
import PhotoUpload from '../components/PhotoUpload';
import SkinToneAnalysis from '../components/SkinToneAnalysis';

const Index = () => {
  const [photos, setPhotos] = useState<File[]>([]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-skin-light/30 to-white">
      <div className="container px-4 py-16 mx-auto">
        <div className="text-center mb-16 animate-fade-up">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Skin Tone Analysis
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Upload your photos for a detailed analysis of your skin tone. Our AI will help you understand your unique complexion.
          </p>
        </div>

        <PhotoUpload
          photos={photos}
          onPhotosSelected={setPhotos}
        />

        {photos.length > 0 && (
          <div className="mt-8 space-y-8 animate-fade-up">
            {photos.map((photo, index) => (
              <SkinToneAnalysis key={index} photo={photo} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;