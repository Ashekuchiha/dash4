import React from 'react';
import Swal from 'sweetalert2'; // Make sure to install SweetAlert2
import { useNavigate } from 'react-router-dom'; // For navigation

interface CouponCardProps {
  id: string; // Assuming each coupon has a unique ID
  title: string;
  code: string;
  expiryDate: string;
  discount: string;
  onDelete: (id: string) => void; // Delete function from parent component
}

const CouponCard: React.FC<CouponCardProps> = ({ id, title, code, expiryDate, discount, onDelete }) => {
  const navigate = useNavigate();

  const handleInfoClick = () => {
    Swal.fire({
      title: `${title} Coupon Info`,
      html: `<strong>Code:</strong> ${code}<br><strong>Expires on:</strong> ${expiryDate}<br><strong>Discount:</strong> ${discount}`,
      icon: 'info',
    });
  };

  const handleEditClick = () => {
    navigate(`/edit-coupon/${id}`); // Adjust the route as needed
  };

  const handleDeleteClick = () => {
    onDelete(id);
  };

  return (
    <div className="relative w-96 border border-primary p-6 rounded-2xl shadow-md overflow-hidden transform transition-transform hover:shadow-lg text-black">
      <div className="absolute top-0 -z-10 -right-10 h-32 w-32 bg-blue-200 opacity-30 rounded-full"></div>
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-2xl font-bold text-blue-400">{title}</h3>
      </div>
      <p className="text-lg font-medium text-blue-400">
        Use code: <span className="font-bold">{code}</span>
      </p>
      <p className="text-sm text-gray-600 mb-1">Expires on: {expiryDate}</p>
      <p className="text-lg font-semibold text-blue-400">{discount} off</p>
      <div className="absolute top-2 right-2 flex justify-end gap-2">
        <button className="text-blue-600" aria-label="Info" onClick={handleInfoClick}>
        <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="16" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12.01" y2="8"></line>
          </svg>
        </button>
        <button className="text-red-600" aria-label="Delete" onClick={handleDeleteClick}>
        <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
          </svg>
        </button>
        <button className="text-green-600" aria-label="Edit" onClick={handleEditClick} hidden>
        <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default CouponCard;
