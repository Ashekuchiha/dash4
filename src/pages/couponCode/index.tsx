// import PageHead from "@/components/shared/page-head";
// import { Button } from "@/components/ui/button";
// import { useNavigate } from "react-router-dom";
// import CouponCard from "./CouponCard";
// import { useEffect, useState } from "react";
// import axios from "axios";

// const initialCoupons = [
//   {
//     id: '1',
//     title: 'Anas',
//     code: 'ads',
//     expiryDate: '2025-06-26 00:00:00',
//     discount: '12.00%',
//   },
//   {
//     id: '2',
//     title: 'Summer Sale',
//     code: 'SUMMER2024',
//     expiryDate: '2024-09-15 23:59:59',
//     discount: '20.00%',
//   },]

// export default function CouponCode() {
//   const [coupons, setCoupons] = useState([]);

//   useEffect(() => {
//     // Fetch coupon data from API
//     axios.get('/api/coupons') // Adjust the API endpoint
//       .then(response => setCoupons(response.data))
//       .catch(error => console.error('Error fetching coupons:', error));
//   }, []);

//   const handleDelete = (id: string) => {
//     // Delete request to API
//     axios.delete(`/api/coupons/${id}`)
//       .then(() => setCoupons(coupons.filter(coupon => coupon.id !== id)))
//       .catch(error => console.error('Error deleting coupon:', error));
//   };

//   const navigate = useNavigate();

//   // Navigation data object
//   const couponPage = {
//     title: 'Coupon Manager',
//     href: '/couponManager',
//   };

//   const handleAddClick = () => {
//     navigate(couponPage.href);  // Use the href from the object
//   };

//   return (
//     <div className="p-4 md:p-8">
//       <PageHead title={`${couponPage.title} | App`} />
//       <Button
//         type="button" 
//         className="w-full bg-blue-400 hover:bg-blue-500 text-white py-2 px-4 rounded"
//         onClick={handleAddClick}
//       >
//         Add New Coupon
//       </Button>
//       <div className="grid grid-cols-1 gap-4">
//       {coupons.map(coupon => (
//         <CouponCard 
//           key={coupon.id}
//           id={coupon.id}
//           title={coupon.title}
//           code={coupon.code}
//           expiryDate={coupon.expiryDate}
//           discount={coupon.discount}
//           onDelete={handleDelete}
//         />
//       ))}
//     </div>
//     </div>
//   );
// }



// import React, { useState } from 'react';
// import CouponCard from './CouponCard';
// import PageHead from '@/components/shared/page-head';
// import { Button } from '@/components/ui/button';
// import { useNavigate } from 'react-router-dom';

// const initialCoupons = [
//   {
//     id: '1',
//     title: 'Anas',
//     code: 'ads',
//     expiryDate: '2025-06-26 00:00:00',
//     discount: '12.00%',
//   },
//   {
//     id: '2',
//     title: 'Summer Sale',
//     code: 'SUMMER2024',
//     expiryDate: '2024-09-15 23:59:59',
//     discount: '20.00%',
//   },
//   {
//     id: '3',
//     title: 'Welcome Bonus',
//     code: 'WELCOME10',
//     expiryDate: '2024-12-31 23:59:59',
//     discount: '10.00%',
//   },
// ];

// const CouponList: React.FC = () => {
//     const navigate = useNavigate();

//   // Navigation data object
//   const couponPage = {
//     title: 'Coupon Manager',
//     href: '/couponManager',
//   };

//   const handleAddClick = () => {
//     navigate(couponPage.href);  // Use the href from the object
//   };
//   const [coupons, setCoupons] = useState(initialCoupons);

//   const handleDelete = (id: string) => {
//     setCoupons(coupons.filter((coupon) => coupon.id !== id));
//   };

//   return (
//        <div className="p-4 md:p-8">

//     <PageHead title={`${couponPage.title} | App`} />
//        <Button
//          type="button" 
//          className="w-full bg-blue-400 hover:bg-blue-500 text-white py-2 px-4 rounded mb-4"
//          onClick={handleAddClick}
//        >
//          Add New Coupon
//        </Button>
//     <div className="flex flex-wrap gap-4 justify-center items-center">
//       {coupons.map((coupon) => (
//         <CouponCard
//           key={coupon.id}
//           id={coupon.id}
//           title={coupon.title}
//           code={coupon.code}
//           expiryDate={coupon.expiryDate}
//           discount={coupon.discount}
//           onDelete={handleDelete}
//         />
//       ))}
//     </div>
//     </div>
//   );
// };

// export default CouponList;


import React, { useState, useEffect } from 'react';
import CouponCard from './CouponCard';
import PageHead from '@/components/shared/page-head';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Ensure Axios is installed and imported

const CouponList: React.FC = () => {
  const navigate = useNavigate();

  const [coupons, setCoupons] = useState([]); // Initialize with an empty array
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state

  // Navigation data object
  const couponPage = {
    title: 'Coupon Manager',
    href: '/couponManager',
  };

  // Fetch coupons from API
  useEffect(() => {
    const fetchCoupons = async () => {
      const token = localStorage.getItem("token");

      try {
        setLoading(true);
        const response = await axios.get('https://api.tamkeen.center/api/coupons', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Map API response to match your CouponCard props
        const fetchedCoupons = response.data.coupons.map((coupon: any) => ({
          id: coupon.id.toString(),
          title: coupon.name,
          code: coupon.promotion_code,
          expiryDate: coupon.expired_at,
          discount: coupon.discount_type === 'percentage' ? `${coupon.percentage}%` : 'N/A',
        }));

        setCoupons(fetchedCoupons);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch coupons');
        setLoading(false);
      }
    };

    fetchCoupons();
  }, []);

  const handleAddClick = () => {
    navigate(couponPage.href); // Use the href from the object
  };

  const handleDelete = (id: string) => {
    setCoupons(coupons.filter((coupon) => coupon.id !== id));
  };

  return (
    <div className="p-4 md:p-8">
      <PageHead title={`${couponPage.title} | App`} />
      <Button
        type="button"
        className="w-full bg-blue-400 hover:bg-blue-500 text-white py-2 px-4 rounded mb-4"
        onClick={handleAddClick}
      >
        Add New Coupon
      </Button>
      {loading && <p>Loading coupons...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <div className="flex flex-wrap gap-4 justify-center items-center">
        {!loading &&
          !error &&
          coupons.map((coupon) => (
            <CouponCard
              key={coupon.id}
              id={coupon.id}
              title={coupon.title}
              code={coupon.code}
              expiryDate={coupon.expiryDate}
              discount={coupon.discount}
              onDelete={handleDelete}
            />
          ))}
      </div>
    </div>
  );
};

export default CouponList;
