import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const PlanForm: React.FC = () => {
    const navigate = useNavigate();
    const [levelName, setLevelName] = useState<string>('Diamond');
    const [planDescription, setPlanDescription] = useState<string>('');
    const [monthlyFee, setMonthlyFee] = useState<number>();
    const [planColor, setPlanColor] = useState<string>('#c20000');
    const [percentageLevel1, setPercentageLevel1] = useState<number>();
    const [percentageLevel2, setPercentageLevel2] = useState<number>();
    const [percentageLevel3, setPercentageLevel3] = useState<number>();
    const [condition1, setCondition1] = useState<string>('');
    const [condition2, setCondition2] = useState<string>('');
    const [iconPreview, setIconPreview] = useState<string | null>(null);
    const [icon, setIcon]=useState<File>();

    const handleIconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setIcon(file);
            const reader = new FileReader();
            reader.onload = () => {
                setIconPreview(reader.result as string);
            };
            reader.readAsDataURL(file);

        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // Create a new FormData object to handle multipart/form-data
        const formData = new FormData();
        formData.append('level_name', levelName);
        formData.append('monthly_fee', monthlyFee+"");  // Ensure numbers are converted to strings
        formData.append('description', planDescription);
        formData.append('percentage_in_level_1', percentageLevel1+"");
        formData.append('percentage_in_level_2', percentageLevel2+"");
        formData.append('percentage_in_level_3', percentageLevel3+"");
        formData.append('condition_1', condition1);
        formData.append('condition_2', condition2);
        formData.append('color', planColor);
        
        // Append the icon file if it's provided
        if (icon) {
            formData.append('icon', icon);
        }
    
        try {
            const response = await fetch('https://api.tamkeen.center/api/membership-levels', {
                method: 'POST',
                body: formData, // Pass formData directly, no need to stringify
            });
    
            if (response.ok) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Plan added successfully!',
                }).then(() => {
                    navigate('/pricing-plan');
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                });
            }
        } catch (error) {
            console.error('Error:', error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'An error occurred while adding the plan.',
            });
        }
    };
    
    return (
        <div className="flex flex-col md:flex-row gap-8 mt-8 ps-4">
            {/* Form Section */}
            <div className="flex flex-col gap-4 w-full md:w-1/2">
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    {/* Plan Level */}
                    <div className="flex flex-col">
                        <label htmlFor="levelName" className="mb-1 font-semibold">
                            Plan Level
                        </label>
                        <select
                            id="levelName"
                            className="border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={levelName}
                            onChange={(e) => setLevelName(e.target.value)}
                            required
                        >
                            <option value="Diamond">Diamond</option>
                            <option value="Platinum">Platinum</option>
                            <option value="Gold">Gold</option>
                            <option value="Silver">Silver</option>
                            <option value="Bronze">Bronze</option>
                        </select>
                    </div>

                    {/* Plan Description */}
                    <div className="flex flex-col">
                        <label htmlFor="planDescription" className="mb-1 font-semibold">
                            Plan Description
                        </label>
                        <input
                            type="text"
                            id="planDescription"
                            placeholder="Enter plan description"
                            className="border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={planDescription}
                            onChange={(e) => setPlanDescription(e.target.value)}
                            required
                        />
                    </div>

                    {/* Monthly Fee */}
                    <div className="flex flex-col">
                        <label htmlFor="monthlyFee" className="mb-1 font-semibold">
                            Monthly Fee ($)
                        </label>
                        <input
                            type="number"
                            id="monthlyFee"
                            placeholder="Enter monthly fee"
                            className="border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            min="0"
                            step="0.01"
                            value={monthlyFee}
                            onChange={(e) => setMonthlyFee(parseFloat(e.target.value))}
                            required
                        />
                    </div>

                    {/* Plan Color */}
                    <div className="flex flex-col">
                        <label htmlFor="planColor" className="mb-1 font-semibold">
                            Plan Color
                        </label>
                        <input
                            type="color"
                            id="planColor"
                            className="w-12 h-12 p-0 border-none cursor-pointer"
                            value={planColor}
                            onChange={(e) => setPlanColor(e.target.value)}
                            required
                        />
                    </div>

                    {/* Percentage Levels */}
                    <div className="flex flex-col">
                        <label htmlFor="percentageLevel1" className="mb-1 font-semibold">
                            Percentage Level 1 (%)
                        </label>
                        <input
                            type="number"
                            id="percentageLevel1"
                            placeholder="Enter percentage for Level 1"
                            className="border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                             min="0"
                            step="0.01"
                            value={percentageLevel1}
                            onChange={(e) => setPercentageLevel1(parseFloat(e.target.value))}
                            required
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="percentageLevel2" className="mb-1 font-semibold">
                            Percentage Level 2 (%)
                        </label>
                        <input
                            type="number"
                            id="percentageLevel2"
                            placeholder="Enter percentage for Level 2"
                            className="border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            min="0"
                            step="0.01"
                            value={percentageLevel2}
                            onChange={(e) => setPercentageLevel2(parseFloat(e.target.value))}
                            required
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="percentageLevel3" className="mb-1 font-semibold">
                            Percentage Level 3 (%)
                        </label>
                        <input
                            type="number"
                            id="percentageLevel3"
                            placeholder="Enter percentage for Level 3"
                            className="border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                             min="0"
                            step="0.01"
                            value={percentageLevel3}
                            onChange={(e) => setPercentageLevel3(parseFloat(e.target.value))}
                            required
                        />
                    </div>

                    {/* Conditions */}
                    <div className="flex flex-col">
                        <label htmlFor="condition1" className="mb-1 font-semibold">
                            Condition 1
                        </label>
                        <textarea
                            id="condition1"
                            placeholder="Enter condition 1"
                            className="border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={condition1}
                            onChange={(e) => setCondition1(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="condition2" className="mb-1 font-semibold">
                            Condition 2
                        </label>
                        <textarea
                            id="condition2"
                            placeholder="Enter condition 2"
                            className="border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={condition2}
                            onChange={(e) => setCondition2(e.target.value)}
                        />
                    </div>

                     {/* Icon */}
                     <div className="flex flex-col">
                        <label htmlFor="icon" className="mb-1 font-semibold">
                            Icon of Plan
                        </label>
                        <input
                            type="file"
                            id="icon"
                            accept="image/*"
                            className="border rounded p-2"
                            onChange={handleIconChange}
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-[#27AAE1] h-10 px-4 py-2 bg-blue-500 text-white mt-4 w-full md:w-auto"
                    >
                        Add New Plan
                    </button>
                </form>
            </div>

            {/* Live Preview Section */}
            <div className="w-full md:w-1/2">
                <h2 className="text-xl font-semibold mb-4">Live Preview</h2>
                <div
                    className="rounded-lg w-1/2 aspect-square flex flex-col items-center justify-center p-6"
                    style={{ boxShadow: `${planColor} 0px 0px 0px 2px` }}
                >
                    {iconPreview ? (
                        <img
                            src={iconPreview}
                            alt="Plan Icon"
                            className="w-16 h-16 mb-4 object-contain"
                        />
                    ) : (
                        <div className="w-16 h-16 mb-4 bg-gray-200 flex items-center justify-center rounded-full">
                            No Icon
                        </div>
                    )}
                    <h3 className="text-2xl font-bold" style={{ color: planColor }}>
                        {levelName}
                    </h3>
                    <p className="text-lg text-gray-700">
                        Monthly Fee: ${monthlyFee ? monthlyFee.toFixed(2) : '0.00'}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PlanForm;
