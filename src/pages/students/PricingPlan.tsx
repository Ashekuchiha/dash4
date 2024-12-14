
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Skeleton } from '@/components/ui/skeleton';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface PricingPlan {
    id: number;
    level_name: string;
    monthly_fee: number;
    description: string;
    condition_1: string;
    condition_2: string;
    icon: string;
    created_at: string;
    updated_at: string;
    percentage_in_level_1: number;
    percentage_in_level_2: number;
    percentage_in_level_3: number;
    color: string;
    users_count: number;
}


const PricingPlanList: React.FC = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [plans, setPlans] = useState<PricingPlan[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        level_name: '',
        monthly_fee: '',
        condition_1: '',
        condition_2: '',
        description: '',
        percentage_in_level_1: '',
        percentage_in_level_2: '',
        percentage_in_level_3: '',

    });
    const [selectedPlan, setSelectedPlan] = useState<PricingPlan | null>(null); // State to store selected plan

    const navigate = useNavigate();
    //plane view
    useEffect(() => {
        const fetchPlans = async () => {
            try {
                const response = await axios.get('https://api.tamkeen.center/api/membership-levels');
                setPlans(response.data);
                setIsLoading(false);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to fetch plans');
                setIsLoading(false);
            }
        };

        fetchPlans();
    }, []);


    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (selectedPlan) {
            try {
                // Send PUT request to update plan
                const updatedPlan = {
                    ...selectedPlan,
                    level_name: formData.level_name,
                    monthly_fee: parseInt(formData.monthly_fee),
                    condition_1: String(formData.condition_1),  // Ensure it's a string
                    condition_2: String(formData.condition_2),  // Ensure it's a string]
                    percentage_in_level_3: formData.percentage_in_level_3,
                    percentage_in_level_2: formData.percentage_in_level_2,
                    percentage_in_level_1: formData.percentage_in_level_1,
                    description: formData.description,
                };
                await axios.put(
                    `https://api.tamkeen.center/api/membership-levels/${selectedPlan.id}`,
                    updatedPlan
                );
                // Update the local plans state after successful update
                setPlans(plans.map((plan) => (plan.id === selectedPlan.id ? updatedPlan : plan)));
                setSelectedPlan(null); // Reset selected plan
                setIsDialogOpen(false);

            } catch (err) {
                console.error('Failed to update plan:', err);
            }
        }
    };
    //click edit button and show data
    const handleEdit = (plan: PricingPlan) => {
        setSelectedPlan(plan);
        setFormData({
            level_name: plan.level_name,
            monthly_fee: plan.monthly_fee.toString(),
            condition_1: plan.condition_1,
            condition_2: plan.condition_2,
            description: plan.description,
            percentage_in_level_1: plan.percentage_in_level_1 + "",
            percentage_in_level_2: plan.percentage_in_level_2 + "",
            percentage_in_level_3: plan.percentage_in_level_3 + "",
        });
        setIsDialogOpen(true);

    };

    const handleDelete = async (id: number) => {
        try {
            await axios.delete(`https://api.tamkeen.center/api/membership-levels/${id}`);
            setPlans(plans.filter(plan => plan.id !== id));
        } catch (err) {
            console.error('Failed to delete plan:', err);
        }
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <div className="mb-4 flex justify-end">
                <button
                    onClick={() => navigate('/add-plan')}
                    className="px-4 py-2 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
                >
                    Add New Plan
                </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
                {isLoading
                    ? Array.from({ length: 6 }).map((_, index) => (
                        <div
                            key={index}
                            className="rounded-xl bg-card shadow p-4 min-w-[300px] border-2 text-[#CA9666] border-[#CA9666]"
                        >
                            <div className="space-y-1.5 p-6 flex flex-col items-center">
                                <Skeleton className="w-16 h-16 rounded-full mb-4" />
                                <Skeleton className="w-2/3 h-6 rounded" />
                                <Skeleton className="w-1/3 h-4 rounded" />
                            </div>
                            <div className="p-6 flex flex-col gap-3">
                                <Skeleton className="h-4 w-1/2 rounded" />
                                <Skeleton className="h-4 w-full rounded" />
                                <Skeleton className="h-4 w-full rounded" />
                                <Skeleton className="h-4 w-1/3 rounded" />
                            </div>
                            <div className="p-6 pt-0 flex justify-evenly">
                                <Skeleton className="w-24 h-10 rounded" />
                                <Skeleton className="w-24 h-10 rounded" />
                            </div>
                        </div>
                    ))
                    : plans.map((plan: PricingPlan) => (
                        <div
                            key={plan.id}
                            className="rounded-xl bg-card shadow p-4 min-w-[300px] border-2 text-[#CA9666] border-[#CA9666]"
                        >
                            <div className="space-y-1.5 p-6 flex flex-col items-center">
                                <img src={"https://api.tamkeen.center/" + plan.icon} alt={plan.level_name} className="w-16 h-16 rounded-full mb-4" />
                                <h2 className="text-2xl font-semibold text-[#CA9666]">{plan.level_name}</h2>
                            </div>
                            <div className="p-6 flex flex-col gap-3 text-gray-800">
                                <p className="text-xl font-bold">${plan.monthly_fee}/mo</p>
                                <p>{plan.description}</p>
                                <ul className="list-disc pl-4 text-gray-700">
                                    <li>{plan.condition_1}</li>
                                    <li>{plan.condition_2}</li>
                                </ul>
                                <p>
                                    Number of users: <span className="font-semibold">{plan.users_count}</span>
                                </p>
                            </div>
                            <div className="p-6 pt-0 flex justify-evenly items-center">
                                {/* <Dialog>
                                      <DialogTrigger asChild>
                                          <Button className="my-5 text-blue-400" variant="outline" onClick={() => handleEdit(plan)}>
                                              Edit
                                          </Button>
                                      </DialogTrigger>
                                      <DialogContent className="max-h-[80vh] max-w-[912px] overflow-auto rounded-lg bg-white p-6 shadow-lg">
                                          <DialogHeader>
                                              <DialogTitle>Edit Plan</DialogTitle>
                                          </DialogHeader>
                                          <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
                                              <div className="flex flex-col my-4">
                                                  <label htmlFor="name" className="mb-1 font-semibold">
                                                      Plan Name
                                                  </label>
                                                  <input
                                                      type="text"
                                                      id="name"
                                                      name="name"
                                                      placeholder="Enter plan name"
                                                      className="border rounded p-2"
                                                      value={formData.name}
                                                      onChange={handleInputChange}
                                                  />
                                              </div>
                                              <div className="flex flex-col my-4">
                                                  <label htmlFor="pricePerMo" className="mb-1 font-semibold">
                                                      Price per Month
                                                  </label>
                                                  <input
                                                      type="text"
                                                      id="pricePerMo"
                                                      name="pricePerMo"
                                                      placeholder="Enter price per month"
                                                      className="border rounded p-2"
                                                      value={formData.pricePerMo}
                                                      onChange={handleInputChange}
                                                  />
                                              </div>
                                              <button
                                                  className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-[#27AAE1] h-10 px-4 py-2"
                                                  type="submit"
                                              >
                                                  Save Changes
                                              </button>
                                          </form>
                                      </DialogContent>
                                  </Dialog> */}
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button
                                            className="my-5 text-blue-400"
                                            variant="outline"
                                            onClick={() => handleEdit(plan)}
                                        >
                                            Edit
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-md max-h-[80vh] overflow-auto bg-white rounded-lg shadow-lg p-6">
                                        <DialogHeader>
                                            <DialogTitle>Edit Plan</DialogTitle>
                                            <DialogDescription>
                                                Modify the details of the selected plan below.
                                            </DialogDescription>
                                        </DialogHeader>
                                        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                                            <div className="flex flex-col gap-2">
                                                <Label htmlFor="name">Plan Name</Label>
                                                <Input
                                                    id="name"
                                                    name="name"
                                                    placeholder="Enter plan name"
                                                    value={formData?.level_name || ""}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <Label htmlFor="description">Description</Label>
                                                <Input
                                                    id="description"
                                                    name="description"
                                                    placeholder="Enter plan description"
                                                    value={formData?.description || ""}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <Label htmlFor="monthly_fee">Monthly Fee</Label>
                                                <Input
                                                    id="monthly_fee"
                                                    name="monthly_fee"
                                                    placeholder="Enter monthly fee"
                                                    value={formData?.monthly_fee || ""}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <Label htmlFor="level_name">Level Name</Label>
                                                <Input
                                                    id="level_name"
                                                    name="level_name"
                                                    placeholder="Enter level name"
                                                    value={formData?.level_name || ""}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <Label htmlFor="percentage_in_level_1">Percentage in Level 1</Label>
                                                <Input
                                                    id="percentage_in_level_1"
                                                    name="percentage_in_level_1"
                                                    placeholder="Enter percentage in level 1"
                                                    value={formData?.percentage_in_level_1 || ""}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <Label htmlFor="percentage_in_level_2">Percentage in Level 2</Label>
                                                <Input
                                                    id="percentage_in_level_2"
                                                    name="percentage_in_level_2"
                                                    placeholder="Enter percentage in level 2"
                                                    value={formData?.percentage_in_level_2 || ""}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <Label htmlFor="percentage_in_level_3">Percentage in Level 3</Label>
                                                <Input
                                                    id="percentage_in_level_3"
                                                    name="percentage_in_level_3"
                                                    placeholder="Enter percentage in level 3"
                                                    value={formData?.percentage_in_level_3 || ""}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <Label htmlFor="condition_1">Condition 1</Label>
                                                <Input
                                                    id="condition_1"
                                                    name="condition_1"
                                                    placeholder="Enter condition 1"
                                                    value={formData?.condition_1 || ""}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <Label htmlFor="condition_2">Condition 2</Label>
                                                <Input
                                                    id="condition_2"
                                                    name="condition_2"
                                                    placeholder="Enter condition 2"
                                                    value={formData?.condition_2 || ""}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                            <DialogFooter>
                                                <DialogClose asChild>
                                                    <Button type="submit" variant="default">
                                                        Save Changes
                                                    </Button>
                                                </DialogClose>
                                            </DialogFooter>
                                        </form>
                                    </DialogContent>
                                </Dialog>


                                <Button onClick={() => handleDelete(plan.id)} className="bg-red-500 text-white">
                                    Delete
                                </Button>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default PricingPlanList;
