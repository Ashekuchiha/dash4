import React, { useState, useEffect, useRef } from 'react';
import { useGetProducts } from '../queries/queries';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import convertToBase64 from '../../../../src/pages/addProduct/index'
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { Check, Edit, Trash2 } from 'lucide-react';
interface Product {
  id: number; name: string; price: number, size: any, color: any, style: any, capacity: any, material: any, weight: any
}
export default function PackageForm() {
  const [formData, setFormData] = useState({
    packageName: '',
    totalPrice: '',
    profitLevel1: '',
    profitLevel2: '',
    profitLevel3: '',
    numberOfUses: '',
    bImages: [] as String[],
    images: [] as File[], // Image upload
    products: [] as { id: number; name: string; price: number, size: any, color: any, style: any, capacity: any, material: any, weight: any }[], // List of products
    selectedProducts: [] as { id: number; name: string; price: number; quantity: number, isEditing: boolean }[], // Selected products with quantity
  });


  const [showProductDialog, setShowProductDialog] = useState(false); // State to show product dialog
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [quantity, setQuantity] = useState(1); // To set the quantity of the selected product
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const navigate = useNavigate(); // Initialize navigate

  // Fetch products from API
  useEffect(() => {
    if (showProductDialog) {
      fetchProducts(); // Fetch products only when dialog is open
    }
  }, [showProductDialog]);

  // Simulating API call
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const fetchProducts = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get('https://api.tamkeen.center/api/products', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res.data);
      setFormData((prevData) => ({
        ...prevData,
        products: res.data || [],
      }));
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  console.log('formdata', formData)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setFormData({
        ...formData,
        images: [...formData.images, ...Array.from(files)],
      });
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files) {
      setFormData({
        ...formData,
        images: [...formData.images, ...Array.from(files)],
      });
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Enable editing mode for the selected row
  const enableEdit = (index) => {
    const updatedProducts = [...formData.selectedProducts];
    updatedProducts[index].isEditing = true;
    setFormData({ ...formData, selectedProducts: updatedProducts });
  };

  // Save the changes made to the product and exit editing mode
  const saveProductEdit = (index) => {
    const updatedProducts = [...formData.selectedProducts];
    updatedProducts[index].isEditing = false;
    setFormData({ ...formData, selectedProducts: updatedProducts });
  };

  // Update the product field (price or quantity)
  const updateProductField = (index, field, value) => {
    const updatedProducts = [...formData.selectedProducts];
    updatedProducts[index][field] = value;
    setFormData({ ...formData, selectedProducts: updatedProducts });
  };

  // Remove a product
  const removeProduct = (index) => {
    const updatedProducts = [...formData.selectedProducts];
    updatedProducts.splice(index, 1);
    setFormData({ ...formData, selectedProducts: updatedProducts });
  };


  const removeImage = (index: number) => {
    const updatedImages = formData.images.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      images: updatedImages,
    });
  };

  const openProductDialog = () => {
    setShowProductDialog(true); // Show the dialog when the button is clicked
  };

  const closeProductDialog = () => {
    setShowProductDialog(false); // Close the dialog
    setSelectedProducts([]); // Reset the selected product
    setQuantity(1); // Reset the quantity
  };

  const handleProductSelect = (product: Product) => {
    setSelectedProducts((prev) =>
      prev.some((p) => p.id === product.id)
        ? prev.filter((p) => p.id !== product.id)
        : [...prev, product]
    );
  };
  
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(Number(e.target.value)); // Set the quantity
  };
  const convertToBase64 = (files: File[] | null): Promise<(string | null)[]> => {
    console.log("file null " + files?.length);
    return new Promise((resolve, reject) => {
      if (!files || files.length === 0) {
        console.log("file null");

        resolve([]); // If no files are provided, return an empty array
        return; // Exit early to avoid attempting to read an empty array
      }

      const base64Promises = files.map((file) => {
        return new Promise<string | null>((fileResolve, fileReject) => {
          const reader = new FileReader();

          reader.onloadend = () => fileResolve(reader.result as string); // Resolve with base64 string for each file
          reader.onerror = fileReject; // Reject if there is an error

          reader.readAsDataURL(file); // Start reading the file
        });
      });

      // Wait for all file conversion promises to resolve
      Promise.all(base64Promises)
        .then(resolve) // Resolve with an array of Base64 strings
        .catch(reject); // Reject if any file conversion fails
    });
  };


  const addProductsToTable = () => {
    if (selectedProducts.length > 0) {
      const newProducts = selectedProducts.map((product) => ({
        ...product,
        quantity,
        isEditing: false, // Add the required property
      }));
  
      setFormData((prevData) => ({
        ...prevData,
        selectedProducts: [...prevData.selectedProducts, ...newProducts],
      }));
  
      setSelectedProducts([]); // Clear selected products after adding
      closeProductDialog(); // Close the dialog after adding the products
    } else {
      alert("Please select at least one product to add.");
    }
  };
  
  
  const [submitting, setSubmitting] = useState(false); // Add submitting state


  // // Remove product from selectedProducts
  // const removeProduct = (index: number) => {
  //   const updatedSelectedProducts = formData.selectedProducts.filter((_, i) => i !== index);
  //   setFormData({
  //     ...formData,
  //     selectedProducts: updatedSelectedProducts,
  //   });
  // };
  const addBasket = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.packageName) {
      // alert("Package Name is required");
      Swal.fire("Package Name is required");

      return;
    }
    // if (!formData.totalPrice || isNaN(Number(formData.totalPrice)) || Number(formData.totalPrice) <= 0) {
    //   Swal.fire("Total Price must be a valid number greater than 0");

    //   return;
    // }
    // if (!formData.profitLevel1 || isNaN(Number(formData.profitLevel1)) || Number(formData.profitLevel1) < 0) {
    //   Swal.fire("Profit Level 1 must be a valid number greater than or equal to 0");
    //   return;
    // }
    // if (!formData.profitLevel2 || isNaN(Number(formData.profitLevel2)) || Number(formData.profitLevel2) < 0) {
    //   Swal.fire("Profit Level 2 must be a valid number greater than or equal to 0");
    //   return;
    // }
    // if (!formData.profitLevel3 || isNaN(Number(formData.profitLevel3)) || Number(formData.profitLevel3) < 0) {
    //   Swal.fire("Profit Level 3 must be a valid number greater than or equal to 0");
    //   return;
    // }
    // if (!formData.numberOfUses || isNaN(Number(formData.numberOfUses)) || Number(formData.numberOfUses) <= 0) {
    //   Swal.fire("Number of Uses must be a valid number greater than 0");
    //   return;
    // }
    if (!formData.selectedProducts || formData.selectedProducts.length === 0) {
      Swal.fire("Please select a product to add");
      return;
    }
    if (quantity <= 0 || isNaN(quantity)) {
      Swal.fire("Quantity must be a valid number greater than 0");
      return;
    }

    setSubmitting(true);

    // Check if an image is provided, and convert it to Base64 if so
    if (formData.images) {
      try {
        const base64Image = await convertToBase64(formData.images);
        console.log("Converted Image to Base64:", base64Image);

        // Filter out null values
        const filteredBase64Images = base64Image.filter((image) => image !== null) as string[];

        console.log("Filtered Base64 Images:", filteredBase64Images);



        const formattedData = {
          package_name: formData.packageName,
          total_price: formData.totalPrice,
          profit_percentage_in_level_1: formData.profitLevel1,
          profit_percentage_in_level_2: formData.profitLevel2,
          profit_percentage_in_level_3: formData.profitLevel3,
          number_of_uses: formData.numberOfUses,
          products: formData.selectedProducts.map((product) => ({
            id: product.id,
            quantity: product.quantity,
            price:parseInt(product.price),
          })),
          images: filteredBase64Images, // Base64 strings for images
        };

        console.log(formattedData);

        const token = localStorage.getItem("token");
        // Send the POST request
        const response = await fetch('https://api.tamkeen.center/api/packages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formattedData),
        });


        console.log(response.body);

        if (!response.ok) {
          throw new Error('Failed to add basket');
        }

        const responseData = await response.json();
        console.log("Server Response:", responseData);
        toast.success('Basket added successfully');
        navigate('/viewBaskets'); // Redirect to product list

        // Handle the server response
      } catch (error) {
        console.error("Error converting image to Base64:", error);
        console.log(error);
        toast.error("Failed to convert image. Please try again.");
      } finally {
        setSubmitting(false); // Reset submitting state to false
      }
    }

    // Proceed to close the dialog
    closeProductDialog();
  };

  return (
    <form className="flex flex-col gap-8 p-4">
      {/* Package Name */}
      <label className="flex flex-col mb-4">
        <span className="text-sm font-medium">Package Name:</span>
        <input
          type="text"
          placeholder="Package Name"
          className="border p-2 mt-1"
          required
          name="packageName"
          value={formData.packageName}
          onChange={handleChange}
        />
      </label>


      <div hidden>
        {/* Total Price */}
        <label className="flex flex-col mb-4">
          <span className="text-sm font-medium">Total Price:</span>
          <input
            type="number"
            placeholder="Total Price"
            className="border p-2 mt-1"
            required
            name="totalPrice"
            value={formData.totalPrice}
            onChange={handleChange}
          />
        </label>

        {/* Profit Level 1 */}
        <label className="flex flex-col mb-4">
          <span className="text-sm font-medium">Profit Percentage in Level 1:</span>
          <input
            type="number"
            placeholder="Profit Percentage Level 1"
            className="border p-2 mt-1"
            required
            name="profitLevel1"
            value={formData.profitLevel1}
            onChange={handleChange}
          />
        </label>

        {/* Profit Level 2 */}
        <label className="flex flex-col mb-4">
          <span className="text-sm font-medium">Profit Percentage in Level 2:</span>
          <input
            type="number"
            placeholder="Profit Percentage Level 2"
            className="border p-2 mt-1"
            required
            name="profitLevel2"
            value={formData.profitLevel2}
            onChange={handleChange}
          />
        </label>

        {/* Profit Level 3 */}
        <label className="flex flex-col mb-4">
          <span className="text-sm font-medium">Profit Percentage in Level 3:</span>
          <input
            type="number"
            placeholder="Profit Percentage Level 3"
            className="border p-2 mt-1"
            required
            name="profitLevel3"
            value={formData.profitLevel3}
            onChange={handleChange}
          />
        </label>

        {/* Number of Uses */}
        <label className="flex flex-col mb-4 "  >
          <span className="text-sm font-medium">Number of Uses:</span>
          <input
            type="number"
            placeholder="Number of Uses"
            className="border p-2 mt-1"
            required
            name="numberOfUses"
            value={formData.numberOfUses}
            onChange={handleChange}
          />
        </label>
      </div>
      {/* Image Upload Section */}
      <div className="flex flex-col mb-4">
        <div
          className="w-full h-32 border-2 border-dashed rounded-md flex flex-col items-center justify-center border-gray-300 mt-4"
          style={{ cursor: 'pointer' }}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClick={handleClick} // Trigger file input on click
        >
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 448 512"
            className="text-gray-400 mb-2"
            height="24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"></path>
          </svg>
          <p className="text-gray-500">Click or drag images here</p>
          <input
            ref={fileInputRef} // Set reference to the file input
            type="file"
            multiple
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
        </div>

        {/* Display the uploaded images as previews */}
        {formData.images.length > 0 && (
          <div className="mt-4">
            <h4 className="text-sm font-medium">Uploaded Images</h4>
            <div className="flex gap-2 mt-2">
              {formData.images.map((file, index) => (
                <div key={index} className="relative">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                    className="w-24 h-24 object-cover rounded"
                  />
                  <button
                    type="button"
                    className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full"
                    onClick={() => removeImage(index)} // Remove image
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Product Table */}
      <div className="flex flex-col mb-4">
        <table className="w-full border">
          <thead>
            <tr>
              <th className="border p-2">Product</th>
              <th className="border p-2">Price</th>
              <th className="border p-2">Quantity</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {formData.selectedProducts.map((product, index) => (
              <tr key={index}>
                <td className="border p-2">{product.name}</td>
                <td className="border p-2">
                  {product.isEditing ? (
                    <input
                      type="number"
                      value={product.price}
                      onChange={(e) => updateProductField(index, 'price', e.target.value)}
                      className="w-full p-1 border rounded"
                    />
                  ) : (
                    `$${product.price}`
                  )}
                </td>
                <td className="border p-2">
                  {product.isEditing ? (
                    <input
                      type="number"
                      value={product.quantity}
                      onChange={(e) => updateProductField(index, 'quantity', e.target.value)}
                      className="w-full p-1 border rounded"
                    />
                  ) : (
                    product.quantity
                  )}
                </td>
                <td className="border p-2 flex items-center space-x-2">
                  {product.isEditing ? (
                    <button
                      onClick={() => saveProductEdit(index)}
                      className="text-green-500 flex items-center"
                    >
                      <Check size={16} className="mr-1" /> Save
                    </button>
                  ) : (
                    <button
                      onClick={() => enableEdit(index)}
                      className="text-blue-500 flex items-center"
                    >
                      <Edit size={16} className="mr-1" /> Edit
                    </button>
                  )}
                  <button
                    onClick={() => removeProduct(index)}
                    className="text-red-500 flex items-center"
                  >
                    <Trash2 size={16} className="mr-1" /> Delete
                  </button>
                </td>
              </tr>
            ))}
            <tr>
              <td
                colSpan={4}
                className="border p-2 text-center text-blue-500 cursor-pointer"
                onClick={openProductDialog}
              >
                + Add Product
              </td>
            </tr>
          </tbody>
        </table>
      </div>



      {/* Submit Button */}
      <button className="mt-4 bg-blue-500 text-white p-2 rounded" onClick={addBasket} disabled={submitting}>
        {submitting ? 'Adding...' : 'Add to Basket'}
      </button>

      {/* Product Dialog */}
      {showProductDialog && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-[80vw] h-[80vh] flex flex-col">
            <h3 className="text-xl font-bold mb-4">Select Products</h3>

            {/* Search Section */}
            <div className="mb-4">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border p-2 w-full rounded-md"
              />
            </div>

            {/* Scrollable table section */}
            <div className="flex-1 overflow-auto">
              {loading ? (
                <p>Loading products...</p>
              ) : (
                <table className="w-full caption-bottom text-sm min-w-full bg-white">
                  <thead className="[&amp;_tr]:border-b">
                    <tr className="border-b transition-colors hover:bg-muted/50">
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                        Select
                      </th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                        Name
                      </th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                        Color
                      </th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                        Price
                      </th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                        Size
                      </th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                        Style
                      </th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                        Capacity
                      </th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                        Weight
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {formData.products
                      .filter((product) =>
                        product.name?.toLowerCase().includes(searchTerm.toLowerCase())
                      )
                      .map((product) => (
                        <tr
                          key={product.id}
                          className={`border-b transition-colors hover:bg-gray-100 ${selectedProducts.some(
                            (p) => p.id === product.id
                          )
                            ? 'bg-blue-100'
                            : ''
                            }`}
                        >
                          <td className="p-4 align-middle">
                            <input
                              type="checkbox"
                              checked={selectedProducts.some((p) => p.id === product.id)}
                              onChange={() => handleProductSelect(product)}
                            />
                          </td>
                          <td className="p-4 align-middle">{product.name}</td>
                          <td className="p-4 align-middle">
                            <div
                              className="w-6 h-6 rounded-full"
                              style={{ backgroundColor: product.color }}
                            ></div>
                          </td>
                          <td className="p-4 align-middle">${product.price}</td>
                          <td className="p-4 align-middle">{product.size}</td>
                          <td className="p-4 align-middle">{product.style}</td>
                          <td className="p-4 align-middle">{product.capacity}</td>
                          <td className="p-4 align-middle">{product.weight}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              )}
            </div>

            {/* Fixed quantity and add product section */}
            <div className="mt-4">
              <label className="flex flex-col mb-4">
                <span className="text-sm font-medium">Quantity:</span>
                <input
                  type="number"
                  value={quantity}
                  onChange={handleQuantityChange}
                  min="1"
                  className="border p-2 mt-1"
                />
              </label>

              <div className="flex justify-end mt-4">
                <button
                  onClick={addProductsToTable}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                  Add Selected Products
                </button>
                <button
                  onClick={closeProductDialog}
                  className="ml-2 bg-gray-300 text-black px-4 py-2 rounded-md"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}




    </form>
  );
}
