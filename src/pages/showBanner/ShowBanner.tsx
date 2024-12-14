import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

// Main Component
const ShowBanner = () => {
  const [banners, setBanners] = useState([]);
  const [filteredBanners, setFilteredBanners] = useState([]);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [currentBanner, setCurrentBanner] = useState(null);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("https://api.tamkeen.center/api/banners", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBanners(response.data);
        setFilteredBanners(response.data);
      } catch (error) {
        console.error("Error fetching banners:", error);
      }
    };
    fetchBanners();
  }, []);
const navigate=useNavigate();
  const handleEditOpen = (banner) => {
    // setCurrentBanner({
    //   ...banner,
    //   slug_name: banner.slug_name || '',
    // });
    // setEditModalOpen(true);
    navigate(`/editBanner/${banner.id}`);
  };

  const handleEditClose = () => {
    setEditModalOpen(false);
    setCurrentBanner(null);
  };

  const handleSaveEdit = async () => {
    try {
      const token = localStorage.getItem("token");
      
      // Swal confirmation for Edit
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "Save changes to this banner?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Save",
      });

      if (result.isConfirmed) {
        await axios.put(
          `https://api.tamkeen.center/api/banners/${currentBanner.id}`,
          {
            title: currentBanner.title,
            description: currentBanner.description,
            slug_name: currentBanner.slug_name,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const updatedBanners = banners.map((item) =>
          item.id === currentBanner.id ? currentBanner : item
        );

        setBanners(updatedBanners);
        setFilteredBanners(updatedBanners);

        setEditModalOpen(false);

        Swal.fire({
          icon: "success",
          title: "Saved",
          text: "Banner saved successfully!",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: "Failed to save changes.",
      });
      console.error("Save failed", error);
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to recover this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`https://api.tamkeen.center/api/banners/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const updatedBanners = banners.filter((banner) => banner.id !== id);
        setBanners(updatedBanners);
        setFilteredBanners(updatedBanners);

        Swal.fire({
          icon: "success",
          title: "Deleted",
          text: "Banner has been deleted!",
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops!",
          text: "Error while trying to delete.",
        });
        console.error("Error during delete", error);
      }
    }
  };

  return (
    <div className="m-4">
      <div className="overflow-auto">
        <div className="relative w-full overflow-auto">
          <Table className="w-full caption-bottom text-sm">
            <TableHeader>
              <TableRow className="border-b transition-colors hover:bg-muted/50">
                <TableCell className="h-12 px-4 text-left align-middle text-muted-foreground font-semibold">ID</TableCell>
                <TableCell className="h-12 px-4 text-left align-middle text-muted-foreground font-semibold">Title</TableCell>
                <TableCell className="h-12 px-4 text-left align-middle text-muted-foreground font-semibold">Description</TableCell>
                <TableCell className="h-12 px-4 text-left align-middle text-muted-foreground font-semibold">Image</TableCell>
                <TableCell className="h-12 px-4 text-left align-middle text-muted-foreground font-semibold">Actions</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBanners.length > 0 ? (
                filteredBanners.map((banner) => (
                  <TableRow key={banner.id} className="border-b transition-colors hover:bg-muted/50">
                    <TableCell>{banner.id}</TableCell>
                    <TableCell>{banner.title}</TableCell>
                    <TableCell>{banner.description}</TableCell>
                    <TableCell>
                      <img
                        src={`https://api.tamkeen.center/${banner.image}`}
                        alt={banner.title}
                        className="w-16 h-16 object-cover rounded"
                      />
                    </TableCell>
                    <TableCell className="flex space-x-2">
                      <button
                        onClick={() => handleEditOpen(banner)}
                        className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(banner.id)}
                        className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow className="border-b transition-colors hover:bg-muted/50">
                  <TableCell className="p-4 align-middle text-center" colSpan={5}>
                    No banners found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && currentBanner && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg w-1/3">
            <h2 className="text-lg font-bold mb-4">Edit Banner</h2>
            <div className="mb-4">
              <label htmlFor="title" className="block text-sm font-medium mb-2">Title</label>
              <input
                id="title"
                type="text"
                className="border rounded px-2 py-1 w-full"
                placeholder="Enter Title"
                value={currentBanner.title}
                onChange={(e) => setCurrentBanner({ ...currentBanner, title: e.target.value })}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="block text-sm font-medium mb-2">Description</label>
              <input
                id="description"
                type="text"
                className="border rounded px-2 py-1 w-full"
                placeholder="Enter Description"
                value={currentBanner.description}
                onChange={(e) => setCurrentBanner({ ...currentBanner, description: e.target.value })}
              />
            </div>
            <div className="flex justify-between mt-2">
              <button
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                onClick={handleEditClose}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={handleSaveEdit}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowBanner;
