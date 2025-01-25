import { useState } from 'react';
import PhotoUpload from '../components/PhotoUpload';
import SkinToneAnalysis from '../components/SkinToneAnalysis';

const Index = () => {
  const [photos, setPhotos] = useState<File[]>([]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-skin-light/30 to-white">
      <div className="container px-4 py-16 mx-auto">
        {photos.length === 0 ? (
          <>
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
          </>
        ) : (
          <div className="grid md:grid-cols-2 gap-8 animate-fade-up">
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-900">Your Photo</h2>
              {photos.map((photo, index) => (
                <div key={index} className="rounded-lg overflow-hidden shadow-lg">
                  <img
                    src={URL.createObjectURL(photo)}
                    alt="Uploaded photo"
                    className="w-full h-auto object-cover"
                    onLoad={(e) => URL.revokeObjectURL((e.target as HTMLImageElement).src)}
                  />
                </div>
              ))}
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Analysis Results</h2>
              {photos.map((photo, index) => (
                <SkinToneAnalysis key={index} photo={photo} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;