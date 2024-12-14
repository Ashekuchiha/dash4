import React, { useRef, useEffect, useState } from "react";
import jsPDF from "jspdf";
import { useParams } from "react-router-dom";
import axios from "axios";

const Invoice = () => {
  const componentRef = useRef<HTMLDivElement>(null);
  const { orderId } = useParams();
  const [order, setOrder] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  // Retrieve token from localStorage or context
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(`https://api.tamkeen.center/api/orders/${orderId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
   
        
        if (response.data && response.data.order) {
          setOrder(response.data.order); // Safely extract the order object
          console.log(setOrder)
        } else {
          throw new Error("Invalid order data"); // Handle unexpected structure
        }
      } catch (err: any) {
        console.error("Error fetching order:", err.response?.data || err.message);
        setError(err.response?.data?.message || "Error fetching order data");
      }
    };
    fetchOrder();
  }, [orderId, token]);

  const handleDownloadPDF = () => {
    if (componentRef.current) {
      const doc = new jsPDF("p", "pt", "a4");
      doc.html(componentRef.current, {
        callback: (doc) => {
          doc.save("Invoice.pdf");
        },
        x: 10,
        y: 10,
        width: 580,
        windowWidth: 800,
      });
    }
  };

  if (error) return <div>{error}</div>;
  if (!order) return <div>Loading...</div>;

  // Safely destructure order data with fallbacks
  const user = order?.user || "Unknown User";
  const formattedOrderDate = new Date(order.created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });
  const products = order.items || [];
  const total = products.reduce((total, product) => total + parseFloat(product.price) * parseFloat(product.quantity), 0);
  
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="max-w-full mx-auto bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
      <div className="p-4 flex justify-center">
        <button
          onClick={handleDownloadPDF}
          className="px-4 py-2 bg-gradient-to-r from-green-500 to-[#17838d] text-white rounded hover:bg-green-700"
        >
          Download PDF
        </button>
      </div>
      <div ref={componentRef}>
        <div className="max-w-5xl my-4 mx-auto bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
          <div className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white p-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-xl md:text-2xl font-bold">Invoice</h1>
                <p className="text-xs md:text-sm font-semibold md:font-bold">
                  Order ID: {orderId}
                </p>
              </div>
              <div className="text-right">
              <p className="text-xs md:text-sm font-semibold md:font-bold">Order Date: {formattedOrderDate}</p>

                <p className="text-xs md:text-sm font-semibold md:font-bold">
                  Today's Date: {today}
                </p>
              </div>
            </div>
          </div>
          <div className="p-6">
            <p className="text-lg font-medium text-gray-700">Customer Details</p>
            <p className="text-sm text-gray-500 mt-1">Name: {user}</p>
          </div>
          <div className="p-6 overflow-x-auto">
            <table className="w-full table-auto border-collapse">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border-b px-4 py-2 text-left text-gray-600 font-medium">
                    Product Name
                  </th>
                  <th className="border-b px-4 py-2 text-center text-gray-600 font-medium">
                    Quantity
                  </th>
                  <th className="border-b px-4 py-2 text-center text-gray-600 font-medium">
                    Price
                  </th>
                  <th className="border-b px-4 py-2 text-right text-gray-600 font-medium">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody>
                {products.map((product: any, index: number) => (
                  <tr key={index} className="even:bg-gray-50">
                    <td className="border-b px-4 py-2 text-gray-800">{product.product_name}</td>
                    <td className="border-b px-4 py-2 text-center text-gray-800">
                      {product.quantity}
                    </td>
                    <td className="border-b px-4 py-2 text-center text-gray-800">
                      ${parseFloat(product.price).toFixed(2)}
                    </td>
                    <td className="border-b px-4 py-2 text-right text-gray-800">
                      ${(parseFloat(product.price) * parseFloat(product.quantity)).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="bg-gray-50 p-6 flex justify-end">
            <div className="w-full md:w-1/2">
              <div className="flex justify-between items-center font-bold border-t border-gray-300 pt-4">
                <span className="text-lg text-gray-800">Total:</span>
                <span className="text-lg text-indigo-500">${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white p-4">
            <p className="text-center text-sm">
              Thank you for shopping with us! If you have any questions, please contact support.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
