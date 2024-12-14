import axios from 'axios';
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditBannerForm() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    slug: '',
    image: null as string | null, // Store Base64 string instead of File
  });

  const [loading, setLoading] = useState(false); // Loading state for form submission
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { slug } = useParams();
  const [banner, setBanner] = useState();
  const [n, setN] = useState(true);


  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`https://api.tamkeen.center/api/banners/${slug}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBanner(response.data);

      } catch (error) {
        console.error("Error fetching invoie:", error);
      }
    };
    fetchBanner();
  }, []);
  useEffect(() => {
    if (banner) { // Update formData only if banner is fetched successfully
      setFormData({
        name: banner.title,
        description: banner.description,
        slug: banner.slug, // Assuming the slug doesn't need editing
        image: banner.image, // Clear any existing image data (optional)
      });
    }
  }, [banner]);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      convertToBase64(file); // Convert file to Base64 string
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      convertToBase64(file); // Convert dropped file to Base64 string
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const removeImage = () => {
    setFormData({
      ...formData,
      image: null,
    });
  };

  const navigate=useNavigate();
  const convertToBase64 = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      // Store the Base64 string in formData
      setFormData({
        ...formData,
        image: reader.result as string,
      });
    };

    reader.readAsDataURL(file); // Convert the file to Base64
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // If no image is selected, return
    if (!formData.image) {
      alert('Please upload an image');
      return;
    }

    // Set loading state to true when starting the submission process
    setLoading(true);

    // Prepare the data for the POST request
    const data = {
      title: formData.name,
      description: formData.description,
      slug: formData.slug,
      image: formData.image, // Base64 string of the image
    };

    try {
      // Send POST request
      const response = await fetch('https://api.tamkeen.center/api/banners/'+slug, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to submit the banner');
      }

      const responseData = await response.json();
      console.log('Banner submitted successfully:', responseData);
      navigate('/showBanner');

      // Optionally reset the form after successful submission
      setFormData({
        name: '',
        description: '',
        slug: '',
        image: null,
      });
    } catch (error) {
      console.error('Error submitting banner:', error);
      alert('Failed to submit the banner. Please try again.');
    } finally {
      // Reset loading state after submission is finished
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8 p-4">
      {/* Banner Name */}
      <label className="flex flex-col mb-4">
        <span className="text-sm font-medium">Banner Name:</span>
        <input
          type="text"
          placeholder="Enter Banner Name"
          className="border p-2 mt-1"
          required
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </label>

      {/* Description */}
      <label className="flex flex-col mb-4">
        <span className="text-sm font-medium">Description:</span>
        <textarea
          placeholder="Enter Description"
          className="border p-2 mt-1"
          required
          name="description"
          rows={4}
          value={formData.description}
          onChange={handleChange}
        />
      </label>

      {/* Slug */}
      <label className="flex flex-col mb-4">
        <span className="text-sm font-medium">Slug:</span>
        <input
          type="text"
          placeholder="Enter Banner Slug (e.g., banner-name)"
          className="border p-2 mt-1"
          required
          name="slug"
          value={formData.slug}
          onChange={handleChange}
        />
      </label>

      {/* File Upload Section */}
      <div className="flex flex-col mb-4">
        <h3 className="text-sm font-medium mb-2">Upload Banner Image:</h3>
        <div
          className="w-full h-32 border-2 border-dashed rounded-md flex flex-col items-center justify-center border-gray-300"
          style={{ cursor: 'pointer' }}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClick={handleClick} // Trigger file input on click
        >
          {formData.image ? (
            <img
              src={formData.image.startsWith("storage") ? "https://api.tamkeen.center/" + formData.image : formData.image} // Display the Base64 image
              alt="Uploaded"
              className="w-full h-full object-cover rounded-md"
            />
          ) : (
            <>
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 448 512"
                className="text-gray-400 mb-2"
                height="24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"></path>
              </svg>
              <p className="text-gray-500">Click or drag image here</p>
            </>
          )}
          <input
            ref={fileInputRef} // Set reference to the file input
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
        </div>

        {/* Remove Image Button */}
        {formData.image && (
          <button
            type="button"
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
            onClick={removeImage}
          >
            Remove Image
          </button>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="mt-4 bg-blue-500 text-white p-2 rounded"
        disabled={loading} // Disable the button when loading
      >
        {loading ? (
          <span>Submitting...</span> // Show "Submitting..." when loading
        ) : (
          <span>Submit Banner</span>
        )}
      </button>
    </form>
  );
}
