import React, { useState } from 'react';
import { useGetCategories } from '../queries/queries';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

interface FormData {
    name: string;
    color: string;
    parentCategory: string;
    images: { file: File; preview: string }[]; // Store file and preview URL
}

const CategoryForm: React.FC = () => {
    const navigate =useNavigate();
    const [formData, setFormData] = useState<FormData>({
        name: '',
        color: '#000000',
        parentCategory: '',
        images: [],
    });

    // Fetch categories using the custom hook
    const { data: categories, isLoading, error } = useGetCategories();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files);
            const newImages = files.map((file) => ({
                file,
                preview: URL.createObjectURL(file), // Generate preview URL
            }));
            setFormData((prevState) => ({
                ...prevState,
                images: [...prevState.images, ...newImages],
            }));
        }
    };

    const removeImage = (index: number) => {
        setFormData((prevState) => ({
            ...prevState,
            images: prevState.images.filter((_, i) => i !== index),
        }));
    };

    // const handleSubmit = async (e: React.FormEvent) => {
    //     e.preventDefault();
    
    //     const apiData = {
    //         category_name: formData.name,
    //         parent_id: formData.parentCategory || 0,
    //         color: formData.color,
    //     };
    
    //     try {
    //         const response = await fetch('https://api.tamkeen.center/api/categories', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify(apiData),
    //         });
    
    //         if (response.ok) {
    //             Swal.fire({
    //                 icon: "success",
    //                 title: "Success",
    //                 text: "Category added successfully!",
    //             }).then(() => {
    //                 navigate('/categories'); // Adjust the path based on your routing
    //             });
    //         } else {
    //             throw new Error(`Error: ${response.statusText}`);
    //         }
    //     } catch (error) {
    //         Swal.fire({
    //             icon: "error",
    //             title: "Oops...",
    //             text: "Something went wrong!",
    //             footer: '<a href="#">Why do I have this issue?</a>',
    //         });
    //         console.error('Failed to add category:', error);
    //     }
    // };
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
        // Create API payload conditionally including parent_id if selected
        const apiData: { category_name: string; parent_id?: string; color: string } = {
            category_name: formData.name,
            color: formData.color,
        };
    
        if (formData.parentCategory) {
            apiData.parent_id = formData.parentCategory;
        }
    
        try {
            const response = await fetch('https://api.tamkeen.center/api/categories', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(apiData),
            });
    
            if (response.ok) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Category added successfully!',
                }).then(() => {
                    navigate('/categories'); // Adjust the path based on your routing
                });
            } else {
                throw new Error(`Error: ${response.statusText}`);
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
                footer: '<a href="#">Why do I have this issue?</a>',
            });
            console.error('Failed to add category:', error);
        }
    };
    
    return (
        <form
            className="flex flex-col bg-slate-100 rounded-sm shadow-md p-10 justify-center self-start w-full max-w-md gap-6"
            onSubmit={handleSubmit}
        >
            <div className="flex flex-col my-4">
                <label htmlFor="name" className="mb-1 font-semibold">
                    Category Name
                </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter name of category"
                    className="border rounded p-2"
                    value={formData.name}
                    onChange={handleInputChange}
                />
            </div>

            <div className="flex flex-col">
                <label htmlFor="color" className="font-semibold mb-1">
                    Category Color
                </label>
                <input
                    type="color"
                    id="color"
                    name="color"
                    className="w-12 h-12 p-0 border-none"
                    value={formData.color}
                    onChange={handleInputChange}
                />
            </div>

            <div className="font-semibold">Parent Category</div>
            {isLoading ? (
                <p>Loading categories...</p>
            ) : error ? (
                <p>Error loading categories: {error.message}</p>
            ) : (
                <select
                    name="parentCategory"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={formData.parentCategory}
                    onChange={handleInputChange}
                >
                    <option value="" >Select a category</option>
                    {categories
                        ?.filter((category) => !category.parentId) // Adjust based on your data structure
                        .map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.category_name}
                            </option>
                        ))}
                </select>
            )}

            <div className="flex flex-col">
                <label className="font-semibold mb-2">Upload Images</label>
                <div className="grid grid-cols-3 gap-4">
                    {formData.images.map((image, index) => (
                        <div
                            key={index}
                            className="relative w-32 h-32 border rounded-md overflow-hidden"
                        >
                            <img
                                src={image.preview}
                                alt={`Uploaded ${index + 1}`}
                                className="w-full h-full object-cover"
                            />
                            <button
                                type="button"
                                onClick={() => removeImage(index)}
                                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 text-xs"
                                title="Remove Image"
                            >
                                ×
                            </button>
                        </div>
                    ))}
                    <label
                        htmlFor="image-upload"
                        className="flex items-center justify-center w-32 h-32 border-2 border-dashed border-gray-400 rounded-md cursor-pointer hover:border-blue-500 transition-colors"
                    >
                        <div className="text-gray-400 text-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 mx-auto mb-2"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                            </svg>
                            <span className="text-sm">Add Image</span>
                        </div>
                        <input
                            type="file"
                            id="image-upload"
                            accept="image/*"
                            multiple
                            className="hidden"
                            onChange={handleFileUpload}
                        />
                    </label>
                </div>
            </div>

            <button
                type="submit"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-[#27AAE1] h-10 px-4 py-2"
            >
                Add New Category
            </button>
        </form>
    );
};

export default CategoryForm;
