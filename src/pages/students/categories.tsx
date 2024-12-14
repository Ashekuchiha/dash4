import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import { AlertModal } from '@/components/shared/alert-modal';
import { Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";



interface Category {
  id: string;
  category_name: string;
  products_count: number;
}

interface Product {
  id: string;
  name: string;
  price: number;
}

const BookCategoryGrid: React.FC = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<string | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [productToDeleteId, setProductToDeleteId] = useState<string | null>(null);

  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  // Fetch categories
  const fetchCategories = async () => {
    setLoadingCategories(true);
    try {
      const res = await axios.get("https://api.tamkeen.center/api/categories");
      setCategories(res.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoadingCategories(false);
    }
  };

  // Fetch products for a category
  const fetchProducts = async (categoryId: string) => {
    setLoadingProducts(true);
    try {
      const res = await axios.get(
        `https://api.tamkeen.center/api/categories/${categoryId}/products`
      );
      setProducts(res.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoadingProducts(false);
    }
  };
  const openDeleteModal = (productId: string) => {
    setIsDeleteModalOpen(true);
    setProductToDeleteId(productId);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setProductToDeleteId(null);
  };
  const handleDeleteProduct = async () => {
    if (!productToDeleteId) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `https://api.tamkeen.center/api/products/${productToDeleteId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Real-time update: Remove product from the state directly
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== productToDeleteId)
      );

      Swal.fire({
        icon: "success",
        title: "Deleted Successfully",
        text: "The product has been deleted.",
      });
      closeDeleteModal();
      window.location.reload();
    } catch (error) {
      console.error("Error deleting product:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Could not delete the product.",
      });
    }
  };





  // Handle edit modal opening
  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setIsEditModalOpen(true);
  };

  // Save edited product changes
  const saveProductChanges = async () => {
    if (!editingProduct?.name || editingProduct.price <= 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Validation Error',
        text: 'Please provide a valid name and price.',
      });
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `https://api.tamkeen.center/api/products/${editingProduct?.id}`,
        {
          name: editingProduct?.name,
          price: editingProduct?.price,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update local state
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === editingProduct?.id ? editingProduct : product
        )
      );

      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Product updated successfully!',
      });
      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Error updating product:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Unable to save changes.',
      });
    }
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setEditingProduct(null);
  };



  // Category Delete
  const handleDelete = async () => {
    if (!categoryToDelete) return;

    setLoadingProducts(true);
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`https://api.tamkeen.center/api/categories/${categoryToDelete}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Update categories state to reflect deletion
      setCategories((prevCategories) =>
        prevCategories.filter((category) => category.id !== categoryToDelete)
      );

      // Success Alert
      Swal.fire({
        icon: 'success',
        title: 'Deleted Successfully',
        text: 'The category has been deleted.',
      });
    } catch (error) {
      console.error("Error deleting category:", error);

      // Error Alert
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Unable to delete the category. Please try again.',
      });
    } finally {
      setLoadingProducts(false);
      closeAlertModal();
    }
  };

  // Alert Modal Open/Close Logic
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<string | null>(null);

  // Open Alert Modal
  const openAlertModal = (categoryId: string) => {
    setCategoryToDelete(categoryId);
    setIsAlertOpen(true);
  };

  // Close Alert Modal
  const closeAlertModal = () => {
    setCategoryToDelete(null);
    setIsAlertOpen(false);
  };

  // Open dialog and fetch products
  const handleCategoryClick = async (categoryId: string, categoryName: string) => {
    setCurrentCategory(categoryName);
    setDialogOpen(true);
    await fetchProducts(categoryId);
  };

  // Close dialog
  const handleCloseDialog = () => {
    setDialogOpen(false);
    setProducts([]);
    setCurrentCategory(null);
  };

  // Fetch categories on mount
  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAddCategory = () => {
    navigate('/add-category'); // Navigate to the "Add Category" page



  };
  return (
    <div className="container mx-auto p-4">
      {/* Add Category Button */}
      <div className="mb-4 flex justify-end">
        <button
          className="px-4 py-2 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
          onClick={handleAddCategory}
        >
          Add New Category
        </button>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4">
        {loadingCategories
          ? [...Array(6)].map((_, index) => (
            <div
              key={index}
              className="bg-white shadow-md border rounded-lg p-4 animate-pulse"
            >
              <div className="w-3/4 h-6 bg-gray-300 rounded mb-4"></div>
              <div className="w-16 h-8 bg-gray-300 rounded"></div>
            </div>
          ))
          : categories.map((category) => (
            <div
              key={category.id}
              className="bg-white shadow-md border rounded-lg"
            >
              <div className="p-4 flex justify-between items-center">
                <div>
                  <p className="text-lg font-semibold text-blue-800">
                    {category.category_name}
                  </p>
                  <p className="text-sm text-gray-600">
                    Products in Category
                  </p>
                </div>
                <div className="flex flex-col gap-2 md:flex-row">
                  <button
                    className="px-4 py-2 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
                    onClick={() =>
                      handleCategoryClick(
                        category.id,
                        category.category_name
                      )
                    }
                  >
                    Show Products
                  </button>

                  <button
                    className="px-4 py-2 bg-red-800 text-white text-sm rounded hover:bg-red-600"
                    onClick={() => openAlertModal(category.id)}
                  >
                    Delete
                  </button>

                </div>
              </div>
              <div className="p-5 rounded-b-lg bg-gray-50">
                <hr className="border-gray-300 mb-3" />
                <div className="flex items-center">
                  <p className="text-xl font-bold text-gray-800">
                    {category.products_count}
                  </p>
                  <span className="text-lg text-gray-600 ml-2">Products</span>
                </div>
              </div>
            </div>
          ))}
      </div>

      {dialogOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10"
          onClick={handleCloseDialog}
        >
          <div
            className="bg-white rounded-lg p-6 w-3/4 max-w-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">{currentCategory} - Products</h2>
              <button
                onClick={handleCloseDialog}
                className="text-gray-600 hover:text-black"
              >
                &#10005;
              </button>
            </div>

            {loadingProducts ? (
              <p>Loading products...</p>
            ) : products.length === 0 ? (
              <p>No products found for this category.</p>
            ) : (
              <table className="w-full border-collapse border border-gray-300">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="border border-gray-300 p-2 text-left">Name</th>
                    <th className="border border-gray-300 p-2 text-left">Price</th>
                    <th className="border border-gray-300 p-2 text-left">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id}>
                      <td className="border border-gray-300 p-2">
                        {product.name}
                      </td>
                      <td className="border border-gray-300 p-2">
                        ${product.price}
                      </td>
                      <td className="border border-gray-300 p-2 flex gap-2">
                        {/* Edit Button */}
                        <button
                          onClick={() => handleEdit(product)}
                          className="text-blue-500 hover:text-blue-700"
                        >
                          <Pencil1Icon className="w-5 h-5" />
                        </button>

                        {/* Delete Button */}
                        <button
                  className="p-1 text-red-500 hover:text-red-700"
                  onClick={() => openDeleteModal(product.id)}
                >
                  <TrashIcon className="w-5 h-5" />
                </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {isEditModalOpen && editingProduct && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 ">
            <h2 className="text-lg font-bold mb-4">Edit Product</h2>
            <input
              type="text"
              value={editingProduct.name}
              onChange={(e) =>
                setEditingProduct({ ...editingProduct, name: e.target.value })
              }
              className="border p-2 mb-4 w-full"
            />
            <input
              type="number"
              value={editingProduct.price}
              onChange={(e) =>
                setEditingProduct({ ...editingProduct, price: parseFloat(e.target.value) })
              }
              className="border p-2 mb-4 w-full"
            />
            <div className="flex justify-end gap-4">
              <button
                onClick={handleCloseEditModal}
                className="px-4 py-2 bg-gray-500 text-white rounded"
              >
                Cancel
              </button>
              <button
                onClick={saveProductChanges}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

   {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h2 className="text-lg font-bold mb-4">Are you sure you want to delete this product?</h2>
            <div className="flex justify-end space-x-4">
              <button
                onClick={closeDeleteModal}
                className="px-4 py-2 bg-gray-500 text-white rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteProduct}
                className="px-4 py-2 bg-red-500 text-white rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}


      {/* Category Delete Modal */}
      <AlertModal
        isOpen={isAlertOpen}
        onClose={closeAlertModal}
        onConfirm={handleDelete}
        loading={loadingProducts}
        title="Delete Category"
        description="Are you sure you want to delete this category? This action cannot be undone."
      />


    </div>
  );
};

export default BookCategoryGrid;
