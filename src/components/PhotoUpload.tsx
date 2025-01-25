import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X } from 'lucide-react';
import { toast } from 'sonner';

interface PhotoUploadProps {
  onPhotosSelected: (photos: File[]) => void;
  photos: File[];
}

const PhotoUpload = ({ onPhotosSelected, photos }: PhotoUploadProps) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const validFiles = acceptedFiles.filter(file => {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Files must be less than 5MB');
        return false;
      }
      if (!file.type.startsWith('image/')) {
        toast.error('Only image files are allowed');
        return false;
      }
      return true;
    });

    if (validFiles.length > 0) {
      onPhotosSelected(validFiles);
      toast.success('Photos uploaded successfully!');
    }
  }, [onPhotosSelected]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    multiple: true
  });

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6 animate-fade-up">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
          ${isDragActive 
            ? 'border-skin-dark bg-skin-light/50' 
            : 'border-gray-300 hover:border-skin-medium'
          }`}
      >
        <input {...getInputProps()} />
        <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <p className="text-lg text-gray-600">
          {isDragActive
            ? "Drop your photos here..."
            : "Drag & drop photos here, or click to select"}
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Supported formats: JPEG, PNG, WebP
        </p>
      </div>

      {photos.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
          {photos.map((photo, index) => (
            <div key={index} className="relative group animate-fade-in">
              <img
                src={URL.createObjectURL(photo)}
                alt={`Upload ${index + 1}`}
                className="w-full h-32 object-cover rounded-lg"
              />
              <button
                onClick={(e) => {
                  e.preventDefault();
                  const newPhotos = [...photos];
                  newPhotos.splice(index, 1);
                  onPhotosSelected(newPhotos);
                }}
                className="absolute top-2 right-2 p-1 bg-white/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="h-4 w-4 text-gray-700" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PhotoUpload;