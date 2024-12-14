import React, { useState } from 'react';

const PlanForm: React.FC = () => {
    const [levelName, setLevelName] = useState<string>('Platinum');
    const [planDescription, setPlanDescription] = useState<string>('gjghfghfgjf');
    const [monthlyFee, setMonthlyFee] = useState<number>(54.98);
    const [planColor, setPlanColor] = useState<string>('#c20000');
    const [iconPreview, setIconPreview] = useState<string | null>(null);

    const handleIconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setIconPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Submit logic
        console.log({
            levelName,
            planDescription,
            monthlyFee,
            planColor,
            iconPreview,
        });
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
                            name="planDescription"
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
                            name="monthlyFee"
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
                    <h3 className="text-2xl font-bold mb-2" style={{ color: planColor }}>
                        {levelName}
                    </h3>
                    <p className="text-lg mb-2" style={{ color: planColor }}>
                        Monthly Fee: ${monthlyFee}
                    </p>
                    <p className="text-base text-center" style={{ color: planColor }}>
                        {planDescription}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PlanForm;
