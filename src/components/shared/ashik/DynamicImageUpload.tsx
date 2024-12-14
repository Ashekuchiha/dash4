import { ArchiveX } from 'lucide-react';
import React, { useState } from 'react';

interface UploadedImage {
  id: number;
  file: File | null;
  preview: string | null;
}

interface DynamicImageUploadProps {
  onChange: (files: File[]) => void;
}

const DynamicImageUpload: React.FC<DynamicImageUploadProps> = ({
  onChange
}) => {
  const [images, setImages] = useState<UploadedImage[]>([
    { id: 0, file: null, preview: null }
  ]);

  const handleImageChange = (id: number, file: File) => {
    const updatedImages = images.map((img) =>
      img.id === id ? { ...img, file, preview: URL.createObjectURL(file) } : img
    );

    if (!updatedImages.find((img) => img.file === null)) {
      updatedImages.push({ id: images.length, file: null, preview: null });
    }

    setImages(updatedImages);

    const validFiles = updatedImages
      .filter((img) => img.file !== null)
      .map((img) => img.file as File);
    onChange(validFiles); // Pass valid files to parent
  };

  const handleRemoveImage = (id: number) => {
    const filteredImages = images.filter((img) => img.id !== id);
    setImages(
      filteredImages.length > 0
        ? filteredImages
        : [{ id: 0, file: null, preview: null }]
    );

    const validFiles = filteredImages
      .filter((img) => img.file !== null)
      .map((img) => img.file as File);
    onChange(validFiles); // Update parent with valid files
  };

  return (
    <div className="space-y-4">
      {images.map((image) => (
        <div
          key={image.id}
          className="relative flex h-48 w-full cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:border-gray-400"
        >
          {image.preview ? (
            <div className="relative h-full w-full">
              <img
                src={image.preview}
                alt="Preview"
                className="h-full w-full rounded-lg object-cover"
              />
              <button
                type="button"
                className="absolute right-2 top-2 rounded-full bg-white p-1 shadow hover:bg-gray-100"
                onClick={() => handleRemoveImage(image.id)}
              >
                <ArchiveX className="h-5 w-5 text-gray-500" />
              </button>
            </div>
          ) : (
            <input
              type="file"
              accept="image/*"
              className="absolute inset-0 cursor-pointer opacity-0"
              onChange={(e) =>
                e.target.files && handleImageChange(image.id, e.target.files[0])
              }
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default DynamicImageUpload;
