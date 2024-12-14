import { ArchiveX, CirclePlus } from 'lucide-react';
import React, { useState } from 'react';

interface ImageUploadProps {
  label: string;
  name: string;
  ww: number;
  onImageChange: (file: File | null) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  label,
  name,
  ww,
  onImageChange
}) => {
  const [preview, setPreview] = useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      onImageChange(file);
    }
  };

  const handleRemoveImage = () => {
    setPreview(null);
    onImageChange(null);
  };

  const triggerFileInput = () => {
    document.getElementById(name)?.click();
  };

  return (
    <div className="mb-4">
      <label className="mb-2 block text-lg font-semibold   text-black">
        {label}
      </label>
      <div
        style={{ width: `${ww}%` }}
        className={`relative flex h-[12rem] cursor-pointer items-center justify-center justify-self-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:border-gray-400`}
        onClick={triggerFileInput}
      >
        {preview ? (
          <div className="relative h-full w-full">
            <img
              src={preview}
              alt="Preview"
              className="h-full w-full rounded-lg object-cover"
            />
            <button
              type="button"
              className="absolute right-2 top-2 rounded-full bg-white p-1 shadow hover:bg-gray-100"
              onClick={(e) => {
                e.stopPropagation();
                handleRemoveImage();
              }}
            >
              <ArchiveX className="h-5 w-5 text-gray-500" />
            </button>
          </div>
        ) : (
          <CirclePlus className="h-10 w-10 text-gray-500" />
        )}
      </div>
      <input
        id={name}
        name={name}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleImageChange}
      />
    </div>
  );
};

export default ImageUpload;
