import React, { useState } from "react";
import CouponForm from "./CouponForm";
import CouponPreview from "./CouponPreview";
import PageHead from "@/components/shared/page-head";

const CouponManager: React.FC = () => {
  const [couponData, setCouponData] = useState({
    name: "",
    promotionCode: "",
    expiredAt: "YYYY-MM-DD",
    discountType: "percentage",
    percentage: 10,
  });

  // Handle form submission and update the preview data
  const handleFormSubmit = (data: Record<string, any>) => {
    setCouponData({
      name: data.name || "",
      promotionCode: data.promotionCode || "",
      expiredAt: data.expiredAt || "YYYY-MM-DD",
      discountType: data.discountType,
      percentage: data.percentage,
    });
  };

  return (
    <div >
      <PageHead title="Create Coupon | App" />
      <CouponForm onSubmit={handleFormSubmit} />
      <CouponPreview
        title={couponData.name}
        code={couponData.promotionCode}
        expiryDate={couponData.expiredAt}
        discount={
          couponData.discountType === "percentage"
            ? `${couponData.percentage}%`
            : `$${couponData.percentage}`
        }
      />
    </div>

    // <div className="container mx-auto p-6">
      
    // </div>
  );
};

export default CouponManager;
