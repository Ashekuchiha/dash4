import React, { useState, useEffect } from 'react';
import ImageUpload from '@/components/shared/ashik/ImageUpload';
import DynamicImageUpload from '@/components/shared/ashik/DynamicImageUpload';
import CategorySelect from '@/components/shared/ashik/CategorySelect'; 
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from '@/components/ui/table';
import AddVariant from './AddVariant';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Trash } from 'lucide-react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

export default function AddProduct() {
  // const [sizes, setSizes] = useState<string[]>([]); // State for storing sizes
  // const [isImage, setIsImage] = useState(true);

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false); // State to track API call progress
  const [variants, setVariants] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    productName: '',
    productDescription: '',
    categories: [],
    backgroundImage: null as File | null,
    coverImage: null as File | null,
    itemImages: [] as File[],
  });
  const navigate = useNavigate(); // Initialize navigate

//get category from api
  useEffect(() => {
    async function fetchCategories() {
      const response = await fetch('https://api.tamkeen.center/api/categories');
      const data = await response.json();
      setCategories(
        data.map((category) => ({
          id: category.id,
          name: category.category_name,
          children: category.children?.map((child) => ({
            id: child.id,
            name: child.category_name,
          })),
        }))
      );
    }
    fetchCategories();
  }, []);

  const handleVariantData = (variantData: any) => {
    console.log(variantData)
    setVariants((prevVariants) => [...prevVariants, variantData]);
    setIsDialogOpen(false);
  };

  //image and size
  // useEffect(() => {
  //   if (variants && variants.length > 0) {
  //     // Extract sizes when variants change
  //     // const extractedSizes = variants.map((variant) => variant.size);
  //     // setSizes(extractedSizes);

  //     if (variants.some((variant) => variant.image)) {
  //       setIsImage(false);
  //     } else {
  //       setIsImage(true);
  //     }
  //   }
  //   console.log(isImage)

  // }, [variants]);

  const handleDeleteVariant = (index: number) => {
    setVariants((prevVariants) => prevVariants.filter((_, i) => i !== index));
  };

  const handleImageChange = (name: string, image: File | null) => {
    setFormData((prev) => ({ ...prev, [name]: image }));
  };

  const handleDynamicImagesChange = (images: File[]) => {
    setFormData((prev) => ({ ...prev, itemImages: images }));
  };

  const validate = () => {
    let isValid = true;

    if (!formData.productName.trim()) {
      toast.error('Product Name is required.');
      isValid = false;
    }

    if (!formData.productDescription.trim()) {
      toast.error('Product Description is required.');
      isValid = false;
    }

    if (selectedCategories.length === 0) {
      toast.error('At least one category must be selected.');
      isValid = false;
    }

    if (!formData.backgroundImage) {
      toast.error('Background Image is required.');
      isValid = false;
    }

    if (!formData.coverImage) {
      toast.error('Cover Image is required.');
      isValid = false;
    }

    if (formData.itemImages.length === 0) {
      toast.error('At least one item image is required.');
      isValid = false;
    }

    if (variants.length === 0) {
      toast.error('At least one variant must be added.');
      isValid = false;
    }

    return isValid;
  };

  const convertToBase64 = (file: File | null): Promise<string | null> => {
    return new Promise((resolve, reject) => {
      if (!file) {
        console.log("file null");
        resolve(null); // If no file is provided, return null
        return; // Exit early to avoid attempting to read a null value
      }

      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string); // Resolve with base64 string
      reader.onerror = reject; // Reject if there is an error
      reader.readAsDataURL(file); // Start reading the file
    });
  };


  // Function to prepare API payload
  const convertToApiFormat = async (formData: any, variants: any) => {
    try {
      // Convert images to base64 asynchronously]
      setLoading(true); // Set loading to true before starting API call

      const coverImageBase64 = await convertToBase64(formData.coverImage);
      const backgroundImageBase64 = await convertToBase64(formData.backgroundImage);
      const itemImagesBase64 = await Promise.all(
        formData.itemImages.map((image: File) => convertToBase64(image))
      );

      // const itemImagesBase642 = await Promise.all (
      //   variants.map((variant) => convertToBase64(variant.image))
      // );

      const itemImagesBase642 = await Promise.all(
        variants.map(async (variant) => {
          if (Array.isArray(variant.itemImages)) {
            // Convert all images in the itemImages array to Base64
            const base64Images = await Promise.all(
              variant.itemImages.map((image) => convertToBase64(image))
            );
            return base64Images; // Return an array of Base64 strings
          }
          return []; // Return an empty array if no itemImages
        })
      );
      console.log("dsfgdfg ",itemImagesBase642);
      
      // Prepare the API payload
      const apiPayload = {
        name: formData.productName,
        description: formData.productDescription,
        category_ids: selectedCategories, // Selected categories
        cover_image: coverImageBase64,
        background_image: backgroundImageBase64,
        images: itemImagesBase64, // All item images in base64 format
        variants: variants.map((variant: any) => (
          {
          track_stock: variant.isTracking,
          stock_number: variant.trackStockNumber,
          barcode: variant.barcode, // Add barcode if available
          qr_code: variant.qr_code, // Add qr code if available
          serial_number: variant.serial_number, // Add serial number if available
          size: variant.size,
          gender: variant.gender,
          discount: variant.isDiscount,
          start_date: variant.startDate,
          end_date: variant.endDate,
          base_price: variant.basePrice,
          selling_price: variant.sellingPrice,
          material: variant.material,
          weight: variant.weight,
          style: variant.style,
          color: variant.color,
          capacity: variant.capacity,
          stock: variant.stock,
          images:  itemImagesBase642[0],

        }))
      };

      console.log("Prepared API Payload:", apiPayload);
      const token = localStorage.getItem("token");

      // Now send the data to the API using Axios
      const response = await axios.post(
        'https://api.tamkeen.center/api/products',
        apiPayload,
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          }
        }
      );

      toast.success('Product submitted successfully!');
      navigate('/productsList'); // Redirect to product list

    } catch (error) {
      toast.error('Error submitting the product.');
      console.error('API Error:', error);
    } finally {
      setLoading(false); // Set loading to false after API call completes
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!validate()) return;

    convertToApiFormat(formData, variants);
  };
  return (
    <div className="m-2 rounded-lg border-2 bg-white p-6">
      <h1 className="mb-4 text-lg font-medium">General Information</h1>
      <form >
        <label className="font-medium text-[#666666]">Product Name</label>
        <Input
          type="text"
          placeholder="Product Name"
          className="mb-4"
          name="productName"
          value={formData.productName}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, productName: e.target.value }))
          }
        />
        <label className="font-medium text-[#666666]">Product Description</label>
        <Textarea
          placeholder="Type your Description here."
          className="mb-4"
          name="productDescription"
          value={formData.productDescription}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              productDescription: e.target.value,
            }))
          }
        />

        <label className="font-medium text-[#666666]">Select Category</label>
        <CategorySelect
          categories={categories}
          onChange={setSelectedCategories}
        />
        <div className="mt-4">
          <strong>Selected Categories:</strong>{' '}
          {selectedCategories.length > 0
            ? selectedCategories
              .map((categoryId) => {
                const category = categories.find((cat) => cat.id === categoryId);
                return category ? category.name : null;
              })
              .filter(Boolean)
              .join(', ')
            : 'None'}
        </div>

        <ImageUpload
          label="Upload Background Image"
          name="backgroundImage"
          ww={100}
          onImageChange={(image: File | null) =>
            handleImageChange('backgroundImage', image)
          }
        />
        <ImageUpload
          label="Upload Cover Image"
          name="coverImage"
          ww={50}
          onImageChange={(image: File | null) =>
            handleImageChange('coverImage', image)
          }
        />

        <label className="block text-lg font-semibold text-black pb-4">
          Upload Item Images
        </label>
        <DynamicImageUpload onChange={handleDynamicImagesChange} />

        {/* Variants Table */}
        <Table className="mt-4">
          <TableHeader>
            <TableRow>
              <TableHead>Color</TableHead>
              <TableHead>Base Price</TableHead>
              <TableHead>Sell Price</TableHead>
              <TableHead>Size</TableHead>
              <TableHead>Style</TableHead>
              <TableHead>Capacity</TableHead>
              <TableHead>Weight</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {variants.map((variant, index) => (
              <TableRow key={index}>
                <TableCell>
                  <div
                    style={{
                      backgroundColor: variant.color,
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      border: '1px solid #ccc',
                    }}
                    title={variant.color}
                  ></div>
                </TableCell>
                <TableCell>{variant.basePrice}</TableCell>
                <TableCell>{variant.sellingPrice}</TableCell>
                <TableCell>{variant.size}</TableCell>
                <TableCell>{variant.style}</TableCell>
                <TableCell>{variant.capacity}</TableCell>
                <TableCell>{variant.weight}</TableCell>
                <TableCell>
                  <button
                    onClick={() => handleDeleteVariant(index)}
                    className="text-red-600 hover:text-red-800"
                    aria-label="Delete Variant"
                  >
                    <Trash className="h-5 w-5" />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="my-5" variant="outline">
              Add Variant +
            </Button>
          </DialogTrigger>
          <DialogContent className="max-h-[80vh] max-w-[912px] overflow-auto rounded-lg bg-white p-6 shadow-lg">
            <DialogHeader>
              <DialogTitle>Add Variant</DialogTitle>
            </DialogHeader>
            <AddVariant onSubmitVariant={handleVariantData}/>
          </DialogContent>
        </Dialog>

        <button
          onClick={handleSubmit}
          className={`w-full rounded-lg px-4 py-2 text-white ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          disabled={loading} // Disable button when loading
        >
          {loading ? 'Submitting...' : 'Submit'}
        </button>

      </form>
    </div>
  );
}