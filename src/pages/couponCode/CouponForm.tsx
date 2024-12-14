// import React, { useState } from "react";
// // import { Button, Input, Label, RadioGroup, RadioGroupItem } from "@/components/ui";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

// interface CouponFormProps {
//   onSubmit: (data: Record<string, any>) => void;
// }

// const CouponForm: React.FC<CouponFormProps> = ({ onSubmit }) => {
//   const [formData, setFormData] = useState({
//     name: "",
//     couponType: "",
//     promotionCode: "",
//     expiredAt: "",
//     discountType: "percentage",
//     percentage: 4,
//     useFor: "product",
//     numberOfUses: 1,
//   });

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({ ...prevData, [name]: value }));
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     onSubmit(formData); // Pass formData to the parent component
//   };

//   return (
//     <form
//       className="w-full md:w-2/3 mx-auto space-y-6 p-4"
//       onSubmit={handleSubmit}
//     >
//       {/* Coupon Name */}
//       <div className="space-y-2">
//         <Label className="font-bold text-md" htmlFor="name">Coupon Name</Label>
//         <Input
//           id="name"
//           name="name"
//           placeholder="Enter name of coupon"
//           value={formData.name}
//           onChange={handleInputChange}
//         />
//       </div>

//       {/* Coupon Type */}
//       <div className="space-y-2">
//         <Label className="font-bold text-md" htmlFor="couponType">Coupon Type</Label>
//         <Input
//           id="couponType"
//           name="couponType"
//           placeholder="Enter type (Gift card, Voucher, Cashback, Discount)"
//           value={formData.couponType}
//           onChange={handleInputChange}
//         />
//       </div>

//       {/* Promotion Code */}
//       <div className="space-y-2">
//         <Label className="font-bold text-md" htmlFor="promotionCode">Promotion Code</Label>
//         <Input
//           id="promotionCode"
//           name="promotionCode"
//           placeholder="Enter promo code"
//           value={formData.promotionCode}
//           onChange={handleInputChange}
//         />
//       </div>

//       {/* Expiration Date */}
//       <div className="space-y-2">
//         <Label className="font-bold text-md" htmlFor="expiredAt">Expiration Date</Label>
//         <Input
//           type="date"
//           id="expiredAt"
//           name="expiredAt"
//           value={formData.expiredAt}
//           onChange={handleInputChange}
//         />
//       </div>

//       {/* Discount Type */}
//       <div className="space-y-2">
//         <Label className="font-bold text-md">Discount Type</Label>
//         <RadioGroup
//           defaultValue={formData.discountType}
//           onValueChange={(value) =>
//             setFormData((prevData) => ({
//               ...prevData,
//               discountType: value,
//             }))
//           }
//           className="flex space-x-4"
//         >
//           <div className="flex items-center space-x-2">
//             <RadioGroupItem id="percentage" value="percentage" />
//             <Label  htmlFor="percentage">Percentage</Label>
//           </div>
//           <div className="flex items-center space-x-2">
//             <RadioGroupItem id="fixed" value="fixed" />
//             <Label  htmlFor="fixed">Fixed Amount</Label>
//           </div>
//         </RadioGroup>
//       </div>

//       {/* Percentage */}
//       {formData.discountType === "percentage" && (
//         <div className="space-y-2">
//           <Label  htmlFor="percentage">Percentage (%)</Label>
//           <Input
//             type="number"
//             id="percentage"
//             name="percentage"
//             placeholder="Enter the discount percentage"
//             value={formData.percentage}
//             onChange={handleInputChange}
//           />
//         </div>
//       )}

//       {/* Use For */}
//       <div className="space-y-2">
//         <Label className="font-bold text-md">Use For</Label>
//         <RadioGroup
//           defaultValue={formData.useFor}
//           onValueChange={(value) =>
//             setFormData((prevData) => ({ ...prevData, useFor: value }))
//           }
//           className="flex flex-wrap gap-4"
//         >
//           {["product", "package", "basket", "order"].map((use) => (
//             <div key={use} className="flex items-center space-x-2">
//               <RadioGroupItem id={use} value={use} />
//               <Label htmlFor={use}>
//                 {use.charAt(0).toUpperCase() + use.slice(1)}
//               </Label>
//             </div>
//           ))}
//         </RadioGroup>
//       </div>

//       {/* Number of Uses */}
//       <div className="space-y-2">
//         <Label className="font-bold text-md" htmlFor="numberOfUses">Number of Uses</Label>
//         <Input
//           type="number"
//           id="numberOfUses"
//           name="numberOfUses"
//           placeholder="Enter the number of uses"
//           value={formData.numberOfUses}
//           onChange={handleInputChange}
//         />
//       </div>

//       {/* Submit Button */}
//       <Button type="submit" className="w-full bg-blue-400 hover:bg-blue-500">
//         Add New Coupon
//       </Button>
//     </form>
//   );
// };

// export default CouponForm;


// import React, { useState } from "react";
// import Swal from "sweetalert2"; // Import SweetAlert2
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

// interface CouponFormProps {
//   onSubmit: (data: Record<string, any>) => void;
// }

// const CouponForm: React.FC<CouponFormProps> = ({ onSubmit }) => {
//   const [formData, setFormData] = useState({
//     name: "",
//     couponType: "",
//     promotionCode: "",
//     expiredAt: "",
//     discountType: "percentage",
//     percentage: 4,
//     useFor: "product",
//     numberOfUses: 1,
//   });

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({ ...prevData, [name]: value }));
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();

//     // Basic validation
//     const { name, couponType, promotionCode, expiredAt, numberOfUses } = formData;
//     if (!name || !couponType || !promotionCode || !expiredAt || numberOfUses <= 0) {
//       Swal.fire({
//         title: "Incomplete Form!",
//         text: "Please fill out all required fields and ensure 'Number of Uses' is greater than 0.",
//         icon: "error",
//       });
//       return;
//     }

//     onSubmit(formData); // Pass formData to the parent component
//   };

//   return (
//     <form className="w-full md:w-2/3 mx-auto space-y-6 p-4" onSubmit={handleSubmit}>
//       {/* Coupon Name */}
//       <div className="space-y-2">
//         <Label className="font-bold text-md" htmlFor="name">Coupon Name</Label>
//         <Input
//           id="name"
//           name="name"
//           placeholder="Enter name of coupon"
//           value={formData.name}
//           onChange={handleInputChange}
//         />
//       </div>

//       {/* Coupon Type */}
//       <div className="space-y-2">
//         <Label className="font-bold text-md" htmlFor="couponType">Coupon Type</Label>
//         <Input
//           id="couponType"
//           name="couponType"
//           placeholder="Enter type (Gift card, Voucher, Cashback, Discount)"
//           value={formData.couponType}
//           onChange={handleInputChange}
//         />
//       </div>

//       {/* Promotion Code */}
//       <div className="space-y-2">
//         <Label className="font-bold text-md" htmlFor="promotionCode">Promotion Code</Label>
//         <Input
//           id="promotionCode"
//           name="promotionCode"
//           placeholder="Enter promo code"
//           value={formData.promotionCode}
//           onChange={handleInputChange}
//         />
//       </div>

//       {/* Expiration Date */}
//       <div className="space-y-2">
//         <Label className="font-bold text-md" htmlFor="expiredAt">Expiration Date</Label>
//         <Input
//           type="date"
//           id="expiredAt"
//           name="expiredAt"
//           value={formData.expiredAt}
//           onChange={handleInputChange}
//         />
//       </div>

//       {/* Discount Type */}
//       <div className="space-y-2">
//         <Label className="font-bold text-md">Discount Type</Label>
//         <RadioGroup
//           defaultValue={formData.discountType}
//           onValueChange={(value) =>
//             setFormData((prevData) => ({ ...prevData, discountType: value }))
//           }
//           className="flex space-x-4"
//         >
//           <div className="flex items-center space-x-2">
//             <RadioGroupItem id="percentage" value="percentage" />
//             <Label htmlFor="percentage">Percentage</Label>
//           </div>
//           <div className="flex items-center space-x-2">
//             <RadioGroupItem id="fixed" value="fixed" />
//             <Label htmlFor="fixed">Fixed Amount</Label>
//           </div>
//         </RadioGroup>
//       </div>

//       {/* Percentage */}
//       {formData.discountType === "percentage" && (
//         <div className="space-y-2">
//           <Label htmlFor="percentage">Percentage (%)</Label>
//           <Input
//             type="number"
//             id="percentage"
//             name="percentage"
//             placeholder="Enter the discount percentage"
//             value={formData.percentage}
//             onChange={handleInputChange}
//           />
//         </div>
//       )}

//       {/* Number of Uses */}
//       <div className="space-y-2">
//         <Label className="font-bold text-md" htmlFor="numberOfUses">Number of Uses</Label>
//         <Input
//           type="number"
//           id="numberOfUses"
//           name="numberOfUses"
//           placeholder="Enter the number of uses"
//           value={formData.numberOfUses}
//           onChange={handleInputChange}
//         />
//       </div>

//       {/* Submit Button */}
//       <Button type="submit" className="w-full bg-blue-400 hover:bg-blue-500">
//         Add New Coupon
//       </Button>
//     </form>
//   );
// };

// export default CouponForm;


import React, { useState } from "react";
import Swal from "sweetalert2"; // Import SweetAlert2
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface CouponFormProps {
  onSubmit: (data: Record<string, any>) => void;
}

const CouponForm: React.FC<CouponFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    couponType: "",
    promotionCode: "",
    expiredAt: "",
    discountType: "percentage",
    percentage: 4,
    useFor: "product",
    numberOfUses: 1,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    const { name, couponType, promotionCode, expiredAt, numberOfUses } = formData;
    if (!name || !couponType || !promotionCode || !expiredAt || numberOfUses <= 0) {
      Swal.fire({
        title: "Incomplete Form!",
        text: "Please fill out all required fields and ensure 'Number of Uses' is greater than 0.",
        icon: "error",
      });
      return;
    }

    setIsSubmitting(true);

    // const apiBody = {
    //   name: formData.name,
    //   coupon_type: formData.couponType,
    //   promotion_code: formData.promotionCode,
    //   expired_at: formData.expiredAt,
    //   discount_type: formData.discountType,
    //   percentage: formData.discountType === "percentage" ? Number(formData.percentage) : 0,
    //   status: "active",
    //   number_of_uses: Number(formData.numberOfUses),
    //   use_for: formData.useFor,
    // };
    const apiBody = {
      name: formData.name.trim(),
      coupon_type: formData.couponType.trim(),
      promotion_code: formData.promotionCode.trim(),
      expired_at: formData.expiredAt, // Should be in 'YYYY-MM-DD' format
      discount_type: formData.discountType,
      percentage: formData.discountType === "percentage" ? Number(formData.percentage) : 0,
      status: "active",
      number_of_uses: Number(formData.numberOfUses),
      use_for: formData.useFor,
    };


    try {
      const token = localStorage.getItem("token");

      const response = await fetch("https://api.tamkeen.center/api/coupons", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(apiBody),
      });

      if (response.ok) {
        const result = await response.json();
        Swal.fire({
          title: "Success!",
          text: "Coupon has been added successfully.",
          icon: "success",
        });
        onSubmit(result); // Notify parent about success
        setFormData({
          name: "",
          couponType: "",
          promotionCode: "",
          expiredAt: "",
          discountType: "percentage",
          percentage: 4,
          useFor: "product",
          numberOfUses: 1,
        });
      } else {
        const errorData = await response.json();
        Swal.fire({
          title: "Error!",
          text: errorData.message || "Failed to create the coupon.",
          icon: "error",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "An error occurred while creating the coupon.",
        icon: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="w-full md:w-2/3 mx-auto space-y-6 p-4" onSubmit={handleSubmit}>
      {/* Coupon Name */}
      <div className="space-y-2">
        <Label className="font-bold text-md" htmlFor="name">Coupon Name</Label>
        <Input
          id="name"
          name="name"
          placeholder="Enter name of coupon"
          value={formData.name}
          onChange={handleInputChange}
        />
      </div>

      {/* Coupon Type */}
      <div className="space-y-2">
        <Label className="font-bold text-md" htmlFor="couponType">Coupon Type</Label>
        <Input
          id="couponType"
          name="couponType"
          placeholder="Enter type (Gift card, Voucher, Cashback, Discount)"
          value={formData.couponType}
          onChange={handleInputChange}
        />
      </div>

      {/* Promotion Code */}
      <div className="space-y-2">
        <Label className="font-bold text-md" htmlFor="promotionCode">Promotion Code</Label>
        <Input
          id="promotionCode"
          name="promotionCode"
          placeholder="Enter promo code"
          value={formData.promotionCode}
          onChange={handleInputChange}
        />
      </div>

      {/* Expiration Date */}
      <div className="space-y-2">
        <Label className="font-bold text-md" htmlFor="expiredAt">Expiration Date</Label>
        <Input
          type="date"
          id="expiredAt"
          name="expiredAt"
          value={formData.expiredAt}
          onChange={handleInputChange}
        />
      </div>

      {/* Discount Type */}
      <div className="space-y-2">
        <Label className="font-bold text-md">Discount Type</Label>
        <RadioGroup
          defaultValue={formData.discountType}
          onValueChange={(value) =>
            setFormData((prevData) => ({ ...prevData, discountType: value }))
          }
          className="flex space-x-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem id="percentage" value="percentage" />
            <Label htmlFor="percentage">Percentage</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem id="fixed" value="fixed" />
            <Label htmlFor="fixed">Fixed Amount</Label>
          </div>
        </RadioGroup>
      </div>

      {/* Percentage */}
      {formData.discountType === "percentage" && (
        <div className="space-y-2">
          <Label htmlFor="percentage">Percentage (%)</Label>
          <Input
            type="number"
            id="percentage"
            name="percentage"
            placeholder="Enter the discount percentage"
            value={formData.percentage}
            onChange={handleInputChange}
          />
        </div>
      )}


      {/* Use For */}
      <div className="space-y-2">
        <Label className="font-bold text-md">Use For</Label>
        <RadioGroup
          defaultValue={formData.useFor}
          onValueChange={(value) =>
            setFormData((prevData) => ({ ...prevData, useFor: value }))
          }
          className="flex flex-wrap gap-4"
        >
          {["product", "package", "basket", "order"].map((use) => (
            <div key={use} className="flex items-center space-x-2">
              <RadioGroupItem id={use} value={use} />
              <Label htmlFor={use}>
                {use.charAt(0).toUpperCase() + use.slice(1)}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>


      {/* Number of Uses */}
      <div className="space-y-2">
        <Label className="font-bold text-md" htmlFor="numberOfUses">Number of Uses</Label>
        <Input
          type="number"
          id="numberOfUses"
          name="numberOfUses"
          placeholder="Enter the number of uses"
          value={formData.numberOfUses}
          onChange={handleInputChange}
        />
      </div>
      <Button type="submit" className="w-full bg-blue-400 hover:bg-blue-500" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Add New Coupon"}
      </Button>
    </form>
  );
};

export default CouponForm;
