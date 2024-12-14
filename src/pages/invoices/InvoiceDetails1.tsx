import React, { useEffect, useRef, useState } from "react";
import jsPDF from "jspdf";
import { useParams } from "react-router-dom";
import axios from "axios";

const InvoiceDetails = () => {
    const componentRef = useRef<HTMLDivElement>(null);
    const { slug } = useParams();

    const [invoice, setInvoice] = useState();

    useEffect(() => {
        const fetchBanners = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get(`https://api.tamkeen.center/api/orders/${slug}/viewDetails`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setInvoice(response.data);
            } catch (error) {
                console.error("Error fetching invoie:", error);
            }
        };
        fetchBanners();
    }, []);

    const handleDownloadPDF = () => {
        if (componentRef.current) {
            const doc = new jsPDF("p", "pt", "a4");

            doc.html(componentRef.current, {
                callback: (doc) => {
                    doc.save(`Invoice ${slug}.pdf`);
                },
                x: 10,
                y: 10,
                width: 580,
                windowWidth: 800,
            });
        }
    };

    const orderId = "INV-1001";
    const user = "Jane Doe";
    const orderDate = "2024-12-01";
    const today = "2024-12-12";

    const products = [
        { name: "Wireless Mouse", quantity: 2, price: 25.0 },
        { name: "Keyboard", quantity: 1, price: 50.0 },
        { name: "USB Cable", quantity: 3, price: 10.0 },
    ];

    const discount = 10; // 10%
    const subtotal = products.reduce(
        (total, product) => total + product.price * product.quantity,
        0
    );
    const discountAmount = (subtotal * discount) / 100;
    const total = subtotal - discountAmount;

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
                                <p className="text-xs md:text-sm font-semibold md:font-bold">Invoice No: TMK{invoice?.invoice_number}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-xs md:text-sm font-semibold md:font-bold">Order Date: {invoice?.date_issued}</p>
                                <p className="text-xs md:text-sm font-semibold md:font-bold">Today's Date: {today}</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-between">
                        <div className="p-6">
                            <p className="text-lg font-medium text-gray-700">Customer Details</p>
                            <p className="text-sm text-gray-500 mt-1">Name: {invoice?.username}<br></br>Email: {invoice?.email}<br></br>Phone: {invoice?.phone}</p>
                        </div>
                        <div className="p-6">
                            <p className="text-lg font-medium text-gray-700">Store Details</p>
                            <p className="text-sm text-gray-500 mt-1">Name: {invoice?.store_name}<br></br>Email: {invoice?.store_email}<br></br>Phone: {invoice?.store_phone}</p>
                        </div>
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
                                {invoice?.items.map((product, index) => (
                                    <tr key={index} className="even:bg-gray-50">
                                        <td className="border-b px-4 py-2 text-gray-800">{product.product_name}</td>
                                        <td className="border-b px-4 py-2 text-center text-gray-800">
                                            {product.quantity}
                                        </td>
                                        <td className="border-b px-4 py-2 text-center text-gray-800">
                                            ${product.price}
                                        </td>
                                        <td className="border-b px-4 py-2 text-right text-gray-800">
                                            ${(product.price * product.quantity)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="bg-gray-50 p-6 flex justify-end">
                        <div className="w-full md:w-1/2">
                            {/* <div className="flex justify-between items-center py-2">
                <span className="text-sm text-gray-500">Subtotal:</span>
                <span className="text-sm text-gray-800">${subtotal.toFixed(2)}</span>
              </div> */}
                            {/* <div className="flex justify-between items-center py-2">
                <span className="text-sm text-gray-500">Discount ({discount}%):</span>
                <span className="text-sm text-gray-800">
                  -${discountAmount.toFixed(2)}
                </span>
              </div> */}
                            <div className="flex justify-between items-center font-bold border-t border-gray-300 pt-4">
                                <span className="text-lg text-gray-800">Total:</span>
                                <span className="text-lg text-indigo-500">${invoice?.total}</span>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white p-4">
                        <p className="text-center text-sm">
                            Thank you for shopping with us! If you have any questions, please
                            contact support.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InvoiceDetails;