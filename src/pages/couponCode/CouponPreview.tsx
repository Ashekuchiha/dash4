import React from "react";

interface CouponPreviewProps {
  title?: string;
  code?: string;
  expiryDate?: string;
  discount?: string;
  onButtonClick?: () => void;
}

const CouponPreview: React.FC<CouponPreviewProps> = ({
  title = "", // Default to an empty string
  code = "",
  expiryDate = "YYYY-MM-DD",
  discount = "",
  onButtonClick,
}) => {
  return (
    <div className="mt-10 self-center justify-center">
      <h3 className="text-xl font-bold mb-4 text-center">Coupon Preview</h3>
      <div className="relative w-96 border border-primary p-6 rounded-2xl shadow-md overflow-hidden transform transition-transform hover:shadow-lg text-black justify-self-center">
        <div className="absolute top-0 -z-10 -right-10 h-32 w-32 bg-blue-200 opacity-30 rounded-full"></div>
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-2xl font-bold text-blue-400">
            {title || "Use code:"}
          </h3>
          {onButtonClick && (
            <button
              onClick={onButtonClick}
              className="p-2 btn btn-circle btn-primary btn-outline hover:text-white rounded-full text-white focus:outline-none transition-colors shadow-lg"
            >
              Apply
            </button>
          )}
        </div>
        <p className="text-lg font-medium text-primary">
          Use code: <span className="font-bold text-blue-400">{code}</span>
        </p>
        <p className="text-sm text-gray-600 mb-1">Expires on: {expiryDate}</p>
        <p className="text-lg font-semibold text-blue-400">{discount} off</p>
      </div>
    </div>
  );
};

export default CouponPreview;
