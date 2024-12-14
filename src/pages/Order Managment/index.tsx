import * as React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Swal from "sweetalert2";  // Import Swal for the popup
// Import necessary icons
import { CalendarIcon } from "lucide-react";

// Import table components from the custom UI library
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Import Popover components
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// Import reusable Button component
import { Button } from "@/components/ui/button";

// Import Calendar component
import { Calendar } from "@/components/ui/calendar";

// Import Pagination components
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

// Define API endpoint
const API_URL = "https://api.tamkeen.center/api/orders";

const OrderManagment: React.FC = () => {
  // State hooks
  const [showModal, setShowModal] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const [activeButton, setActiveButton] = useState<string>('Confirmed');
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [orderId, setOrderId] = useState(null);

  const navigate = useNavigate();

  // Fetch orders on component mount
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");

        const response = await fetch(API_URL, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();

        if (response.ok) {
          setOrders(data.orders);
          setFilteredOrders(data.orders);
        } else {
          setError(data.message || "Failed to fetch orders.");
        }
      } catch (err) {
        setError("An error occurred while fetching orders.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleOrder = (order_id: any, status: string) => {
    if (status !== 'pending') {
      navigate("/invoice/" + order_id);
    } else {
      setOrderId(order_id);
      setShowModal(true);
    }
  };

  const handleUpdate = async () => {
    if (!selectedStatus) {
      alert('Please select a status');
      return;
    }

    try {
      const url = `https://api.tamkeen.center/api/orders/${orderId}/${selectedStatus}`;
      const response = await axios.put(url);
      console.log("Order status updated:", response.data);
      setShowModal(false); // Close the modal after the update

      // Triggering real-time page refresh
      Swal.fire({
        title: 'Order status updated successfully!',
        icon: 'success',
        showConfirmButton: false,
        timer: 1500
      }).then(() => {
        // Refreshing orders after update
        setLoading(true);
        const token = localStorage.getItem("token");

        fetch(API_URL, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => res.json())
        .then((data) => {
          setOrders(data.orders);
          setFilteredOrders(data.orders);
          setLoading(false);
        });
      });

    } catch (error) {
      console.error("Error updating order:", error);
      alert('Failed to update order status');
    }
  };

  // Handle search input and filter logic
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    const filtered = orders.filter(order =>
      order.id.toString().includes(value)
    );
    setFilteredOrders(filtered);
  };

  return (
    <div className="p-4">
      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2 mb-4">
        {['All', 'Pending', 'Confirmed', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].map(status => (
          <button
            key={status}
            className={`mx-1 underline underline-offset-2 ${activeButton === status ? 'text-primary' : 'text-blue-400'}`}
            onClick={() => setActiveButton(status)}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Search Input Section */}
      <div className="mb-4 flex items-center">
        <input
          type="text"
          placeholder="Search by Order ID"
          value={searchTerm}
          onChange={handleSearch}
          className="border rounded-md p-2 w-64"
        />
      </div>

      {/* Table Section */}
      <div className="overflow-auto">
        <Table className="w-full caption-bottom text-sm">
          <TableHeader>
            <TableRow className="border-b transition-colors hover:bg-muted/50">
              {['Order ID', 'Created', 'Customer ID', 'Profit', 'Total', 'Order Status','Action'].map(header => (
                <TableCell key={header} className="h-12 px-4 text-left align-middle text-muted-foreground font-semibold">
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.length > 0 ? (
              filteredOrders.map(order => (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{new Date(order.created_at).toLocaleDateString()}</TableCell>
                  <TableCell>{order.user_id}</TableCell>
                  <TableCell>{order.profit || "0.00"}</TableCell>
                  <TableCell>{order.total_price}</TableCell>
                  <TableCell>{order.order_status}</TableCell>
                  <TableCell><Button onClick={() => handleOrder(order.id, order.order_status)}>{order.order_status === "pending" ? "Manage" : "View Details"}</Button></TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center">
                  No orders found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Modal for updating order status */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-bold mb-4">Update Order Status</h3>
            <div className="flex flex-col space-y-4">
              <label>
                <input
                  type="radio"
                  name="status"
                  value="cancel"
                  onChange={(e) => setSelectedStatus(e.target.value)}
                />
                Cancel Order
              </label>
              <label>
                <input
                  type="radio"
                  name="status"
                  value="approve"
                  onChange={(e) => setSelectedStatus(e.target.value)}
                />
                Approve Order
              </label>
              <label>
                <input
                  type="radio"
                  name="status"
                  value="pending"
                  onChange={(e) => setSelectedStatus(e.target.value)}
                />
                Pending
              </label>
              <label>
                <input
                  type="radio"
                  name="status"
                  value="complete"
                  onChange={(e) => setSelectedStatus(e.target.value)}
                />
                Complete Order
              </label>
            </div>
            <div className="flex justify-between mt-4">
              <button
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700"
                onClick={() => setShowModal(false)} // Cancel button functionality
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                onClick={handleUpdate}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Pagination Section */}
      <div className="flex justify-between mt-auto flex-wrap items-center">
        <nav className="flex items-center -space-x-px" aria-label="Pagination">
          <Pagination>
            <PaginationPrevious>Previous</PaginationPrevious>
            <PaginationContent>
              {[1, 2, 3].map(num => (
                <PaginationItem key={num}>
                  <PaginationLink>{num}</PaginationLink>
                </PaginationItem>
              ))}
            </PaginationContent>
            <PaginationNext>Next</PaginationNext>
          </Pagination>
        </nav>
      </div>
    </div>
  );
};

export default OrderManagment;
