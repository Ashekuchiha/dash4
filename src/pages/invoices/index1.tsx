
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Eye } from "lucide-react";

interface Invoice {
  order_id: number;
  amount: string;
  status: string;
  date: string;
  payment_method: null | string;
}

const Invoices = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [invoices, setInvoices] = useState([]);
  const [filteredInvoices, setFilteredInvoices] = useState([]);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get("https://api.tamkeen.center/api/getInvoices", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setInvoices(response.data.invoices);
        setFilteredInvoices(response.data.invoices);
      } catch (error) {
        console.error("Error fetching invoices:", error);
      }
    };
    fetchInvoices();
  }, [itemsPerPage]);

  const handleSearchChange = (event) => {

  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handleItemsPerPageChange = (event) => {
    const newItemsPerPage = parseInt(event.target.value, 10);
    setItemsPerPage(newItemsPerPage);
    // Update filtered items
    setFilteredInvoices(invoices.slice(0, newItemsPerPage));
  };
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);

    const filtered = invoices.filter((invoice: Invoice) =>
      invoice.order_id.toString()==value
    );
    setFilteredInvoices(filtered);
  };
  const navigate=useNavigate();
  const handleViewInvoice = (invoiceId: number) => {
    // Assuming you have a route for viewing invoices
    navigate(`/invoice/${invoiceId}`);
  };
  return (
    <div className="m-4">
      <div className="flex flex-wrap gap-4 justify-between items-center mb-4 sm:flex-nowrap sm:flex-row">
        <div className="flex flex-col w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search by Order ID"
            className="border rounded p-2 w-full sm:w-full"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
      </div>

      <div className="overflow-auto">
        <div className="relative w-full overflow-auto">
          <Table className="w-full caption-bottom text-sm">
            <TableHeader>
              <TableRow className="border-b transition-colors hover:bg-muted/50">
                <TableCell className="h-12 px-4 text-left align-middle text-muted-foreground font-semibold">
                  Order ID
                </TableCell>
                <TableCell className="h-12 px-4 text-left align-middle text-muted-foreground font-semibold">
                  Amount
                </TableCell>
                <TableCell className="h-12 px-4 text-left align-middle text-muted-foreground font-semibold">
                  Status
                </TableCell>
                <TableCell className="h-12 px-4 text-left align-middle text-muted-foreground font-semibold">
                  Date
                </TableCell>
                <TableCell className="h-12 px-4 text-left align-middle text-muted-foreground font-semibold">
                  Payment Method
                </TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInvoices.length > 0 ? (
                filteredInvoices.map((invoice: Invoice) => (
                  <TableRow key={invoice.order_id} className="border-b transition-colors hover:bg-muted/50">
                    <TableCell>{invoice.order_id}</TableCell>
                    <TableCell>{invoice.amount}</TableCell>
                    <TableCell>{invoice.status}</TableCell>
                    <TableCell>{invoice.date}</TableCell>
                    <TableCell>{invoice.payment_method || "Cash"}</TableCell>
                    <TableCell>
                      <button
                        type="button"
                        className="inline-flex items-center px-2 py-1 text-xs font-bold leading-tight rounded shadow-sm hover:bg-blue-500 hover:text-white"
                        onClick={() => handleViewInvoice(invoice.order_id)}
                      >
                        <Eye/>
                        View
                      </button>


                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow className="border-b transition-colors hover:bg-muted/50">
                  <TableCell className="p-4 align-middle text-center" colSpan={5}>
                    No orders found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Invoices;
