import Swal from "sweetalert2";
import { Input } from "@/components/ui/input";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import { ChevronLeftSquareIcon, ChevronRightSquareIcon } from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";


export default function ShopsManagement() {
  const [searchValue, setSearchValue] = useState<string>("");
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const [currentPage, setCurrentPage] = useState(1);
  const [stores, setStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);
  const [editedStoreName, setEditedStoreName] = useState<string>("");
  const [editedLocation, setEditedLocation] = useState<string>("");
  const [editedType, setEditedType] = useState<string>("");
  const [editedWorkHours, setEditedWorkHours] = useState<string>("");
  const [editedAdmin, setEditedAdmin] = useState<string>("");



  interface Store {
    id: number;
    store_name: string;
    location: string;
    type: string;
    working_hours: string;
    admin: string;
  }

  // Fetch stores from backend
  useEffect(() => {
    const fetchStores = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Authorization error");
        }

        const res = await axios.get("https://api.tamkeen.center/api/stores", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setStores(res.data.stores);
        setLoading(false);
      } catch (err: any) {
        setError(err.message || "Error fetching data.");
        setLoading(false);
      }
    };

    fetchStores();
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const filteredStores = stores.filter((store) =>
    store.store_name.toLowerCase().includes(searchValue.toLowerCase())
  );



  const handleEdit = (store: Store) => {
    setSelectedStore(store);
    setEditedStoreName(store.store_name);
    setEditedLocation(store.location || "");
    setEditedType(store.type || "");
    setEditedWorkHours(store.working_hours || "");
    setEditedAdmin(store.admin);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedStore(null);
  };

  const handleModalSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        Swal.fire("Error", "Unauthorized. No token found", "error");
        return;
      }

      await axios.put(
        `https://api.tamkeen.center/api/stores/${selectedStore?.id}`,
        {
          store_name: editedStoreName,
          location: editedLocation,
          working_hours: editedWorkHours,
          admin: editedAdmin,
          type: editedType,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      Swal.fire("Success", "Store updated successfully", "success");
      handleModalClose();
      const res = await axios.get("https://api.tamkeen.center/api/stores", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStores(res.data.stores);
    } catch (error) {
      console.error("Failed to edit store", error);
      Swal.fire("Error", "Failed to edit store.", "error");
    }
  };

  const handleDelete = async (store: Store) => {
    const token = localStorage.getItem("token");
    if (!token) {
      Swal.fire("Error", "Unauthorized. No token found", "error");
      return;
    }

    const confirmation = await Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (confirmation.isConfirmed) {
      try {
        await axios.delete(
          `https://api.tamkeen.center/api/stores/${store.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        Swal.fire("Deleted!", "Store deleted successfully.", "success");

        const res = await axios.get("https://api.tamkeen.center/api/stores", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStores(res.data.stores);
      } catch (error) {
        console.error("Failed to delete store", error);
        Swal.fire("Error", "Failed to delete store.", "error");
      }
    }
  };


  const totalPages = Math.ceil(filteredStores.length / rowsPerPage);

  const paginatedStores = filteredStores.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const handleRowsPerPageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value > 0) {
      setRowsPerPage(value);
      setCurrentPage(1); // Reset to the first page when rows-per-page changes
    }
  };
  return (
    <div className="flex flex-col justify-evenly gap-2 flex-wrap w-full items-center mb-4">
      {/* Search Section */}
      <div className="flex gap-4 flex-wrap justify-evenly w-[80%] mt-4">
        <Input
          type="text"
          placeholder="Search stores..."
          value={searchValue}
          onChange={handleInputChange}
          className="px-4 py-2 border rounded-md"
        />
      </div>

      {/* Main Table Section */}
      <div className="overflow-auto w-full">
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <div className="relative w-full overflow-auto">
            <Table className="w-full caption-bottom text-sm">
              <TableHeader>
                <TableRow className="border-b transition-colors hover:bg-muted/50">
                  <TableCell>ID</TableCell>
                  <TableCell>NAME</TableCell>
                  <TableCell>LOCATION</TableCell>
                  <TableCell>WORK HOURS</TableCell>
                  <TableCell>ADMIN</TableCell>
                  <TableCell>TYPE</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedStores.length > 0 ? (
                  paginatedStores.map((store) => (
                    <TableRow key={store.id} className="border-b transition-colors hover:bg-muted/50">
                      <TableCell>{store.id}</TableCell>
                      <TableCell>{store.store_name}</TableCell>
                      <TableCell>{store.location}</TableCell>
                      <TableCell>{store.working_hours}</TableCell>
                      <TableCell>{store.admin}</TableCell>
                      <TableCell>{store.type}</TableCell>
                      <TableCell>
                        <button
                          className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                          onClick={() => handleEdit(store)}
                        >
                          Edit
                        </button>
                        <button
                          className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 ml-2"
                          onClick={() => handleDelete(store)}
                        >
                          Delete
                        </button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow className="border-b transition-colors hover:bg-muted/50">
                    <TableCell colSpan={6} className="text-center">No entries found.</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
         {/* Edit Modal */}
         {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-md shadow-md w-96">
            <h2 className="text-lg font-semibold mb-4">Edit Store</h2>
            <label className="block mb-2">Store Name</label>
            <input
              type="text"
              value={editedStoreName}
              onChange={(e) => setEditedStoreName(e.target.value)}
              className="border px-2 py-1 rounded w-full mb-4"
            />
            <label className="block mb-2">Location</label>
            <input
              type="text"
              value={editedLocation}
              onChange={(e) => setEditedLocation(e.target.value)}
              className="border px-2 py-1 rounded w-full mb-4"
            />
            <label className="block mb-2">Work Hours</label> 
            <input
          type="text"
          value={editedWorkHours}
          onChange={(e) => setEditedWorkHours(e.target.value)}
          className="border px-2 py-1 rounded w-full mb-4"
        />
        <label className="block mb-2">Admin</label> 
        <input
      type="text"
      value={editedAdmin}
      onChange={(e) => setEditedAdmin(e.target.value)}
      className="border px-2 py-1 rounded w-full mb-4"
    />
              <label className="block mb-2">Type</label> 
              <input
            type="text"
            value={editedType}
            onChange={(e) => setEditedType(e.target.value)}
            className="border px-2 py-1 rounded w-full mb-4"
          />
            <div className="flex justify-end gap-2 mt-2">
              <button
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={handleModalClose}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={handleModalSubmit}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Pagination & Rows Per Page Section */}
      <div className="flex justify-between mt-auto flex-wrap items-center w-full">
        {/* Rows per Page Input */}
        <div className="flex gap-2 items-center">
          <span>Rows per page:</span>
          <input
            type="number"
            className="border rounded px-2 py-1 w-16"
            value={rowsPerPage}
            onChange={handleRowsPerPageChange}
          />
          <button
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
          >
            Set
          </button>
        </div>

        {/* Pagination Navigation */}
        <nav className="mt-2 flex items-center -space-x-px cursor-pointer" aria-label="Pagination">
          <Pagination>
            <PaginationPrevious
              className="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-1.5 text-sm rounded-s-lg border border-gray-200 text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none"
              onClick={() => handlePageChange(currentPage - 1)}
              aria-label="Previous"
            >
              <ChevronLeftSquareIcon className="text-black" height="15" width="15" />
            </PaginationPrevious>

            <PaginationContent>
              {Array.from({ length: totalPages }, (_, index) => (
                <PaginationItem key={index}>
                  <PaginationLink
                    className={`min-h-[38px] min-w-[38px] flex justify-center items-center border border-gray-200 py-2 px-3 text-sm ${currentPage === index + 1 ? "bg-blue-500 text-white" : ""}`}
                    onClick={() => handlePageChange(index + 1)}
                  >
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
            </PaginationContent>

            <PaginationNext
              className="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-1.5 text-sm rounded-e-lg border border-gray-200 text-gray-800 hover:bg-gray-100"
              onClick={() => handlePageChange(currentPage + 1)}
              aria-label="Next"
            >
              <ChevronRightSquareIcon className="text-gray-800" height="15" width="15" />
            </PaginationNext>
          </Pagination>
        </nav>
      </div>
    </div>
  );
}
