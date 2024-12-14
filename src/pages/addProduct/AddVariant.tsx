import ImageUpload from '@/components/shared/ashik/ImageUpload';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { toast, ToastContainer } from "react-toastify"; // Import toast from react-toastify
import 'react-toastify/dist/ReactToastify.css';

type SizeOption = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL';
type GenderOption = 'Male' | 'Female' | 'Unisex';
type DiscountType = 'Percentage' | 'Value';

type AddVariantProps = {
  onSubmitVariant: (variantData: any) => void;
};

export default function AddVariant({ onSubmitVariant }: AddVariantProps) {

  const [isTracking, setIsTracking] = useState(false);
  const [trackStockNumber, setTrackStockNumber] = useState('');
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedGender, setSelectedGender] = useState(null);
  const [isDiscount, setIsDiscount] = useState(false);
  const [selectedDiscountType, setSelectedDiscountType] = useState(null);
  const [discountValue, setDiscountValue] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [basePrice, setBasePrice] = useState('');
  const [material, setMaterial] = useState('');
  const [style, setStyle] = useState('');
  const [capacity, setCapacity] = useState('');
  const [sellingPrice, setSellingPrice] = useState('');
  const [weight, setWeight] = useState('');
  const [color, setColor] = useState('');
  const [stock, setStock] = useState('');
  const [barcode, setBarcode] = useState('');
  const [qrCode, setQrCode] = useState('');
  const [serialNumber, setSerialNumber] = useState('');

  const sizes = ['S', 'M', 'L', 'XL'];
  const genders = ['Male', 'Female', 'Unisex'];
  const discounts = ['Percentage', 'Fixed Amount'];

  const handleSizeClick = (size,e) => {
    e.preventDefault();

    setSelectedSize(size);
  }
  const handleGenderChange = (gender) => setSelectedGender(gender);
  const handleDiscountChange = (discount) => setSelectedDiscountType(discount);

  // Function to handle image selection
  const [formData, setFormData] = useState<{
    coverImage1: File | null;
  }>({
    coverImage1: null,
  });

  const handleImageChange = (name: string, image: File | null) => {
    setFormData((prev) => ({ ...prev, [name]: image }));
  };
  const [errors, setErrors] = useState<any>({});  // Error state for validation

  const validateForm = () => {
    const newErrors: string[] = [];

    // Validate required fields based on conditions
    // if (!selectedSize) newErrors.push("Size is required");
    // if (!selectedGender) newErrors.push("Gender is required");
    if (!stock || isNaN(Number(stock))) newErrors.push("Stock is required and must be a number");

    // Conditional validations based on Track Stock and Discount
    if (isTracking && !trackStockNumber) {
      newErrors.push("Track Stock Number is required");
    }

    
 

    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formErrors = validateForm();

    if (formErrors.length > 0) {
      formErrors.forEach((error: string) => toast.error(error));
    } else {
      const variantData = {
        size: selectedSize,
        gender: selectedGender,
        basePrice,
        sellingPrice,
        weight,
        stock,
        isTracking,
        trackStockNumber,
        isDiscount,
        discountType: selectedDiscountType,
        discountValue,
        startDate,
        endDate,
        material,
        style,
        capacity,
        color,
        image: formData.coverImage1,
        barcode,
        qr_code:qrCode,
        serial_number:serialNumber,
      };

      console.log(variantData)
      // Pass the data to the parent component
      onSubmitVariant(variantData);

      // Optionally reset the form
      toast.success("Variant added successfully!");
    }
    
  };

  return (
    <form className="flex h-full w-full flex-col gap-3 p-6">

      <div className="flex h-full w-full flex-col gap-3 p-6">
        <div className="static flex h-fit w-full">
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              id="trackStock"
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              checked={isTracking}
              onChange={(e) => setIsTracking(e.target.checked)}
            />
            <label htmlFor="trackStock" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              Track Stock
            </label>
          </div>
          {isTracking && (
            <div className="absolute top-11 ml-[20%]">
              <label htmlFor="trackStockNumber" className="block font-medium text-[#666666] pb-3">
                Track Stock Number
              </label>
              <input
                type="text"
                id="trackStockNumber"
                value={trackStockNumber}
                onChange={(e) => setTrackStockNumber(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="Enter stock number"
                style={{
                  fontSize: '1rem',
                  background: '#edf5fd',
                  width: '15rem',
                  height: '2.5rem',
                  textAlign: 'center',
                }}
              />
            </div>
          )}
        </div>
        {/* Error messages */}
        <div className="text-red-500">
          {Object.keys(errors).map((key) => (
            <p key={key}>{errors[key]}</p>
          ))}
        </div>

        <div className="h-fit w-full">
          <label className="mt-4 block text-lg font-semibold text-black">Serialization</label>
          <br />
          <label className="block font-medium text-[#666666] pb-3">Bar Code</label>
          <input
            type="text"
            value={barcode}
            onChange={(e) => setBarcode(e.target.value)}
            placeholder="Bar Code"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            style={{
              fontSize: '.8rem',
              background: '#edf5fd',
              height: '2.5rem',
              textAlign: 'center',
              marginBottom: '10px',
            }}
          />
          <label className="block font-medium text-[#666666] pb-3">QR Code</label>
          <input
            type="text"
            value={qrCode}
            onChange={(e) => setQrCode(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            placeholder="QR Code"
            style={{
              fontSize: '.8rem',
              background: '#edf5fd',
              height: '2.5rem',
              textAlign: 'center',
              marginBottom: '10px',
            }}
          />
          <label className="block font-medium text-[#666666] pb-3">Serial Number</label>
          <input
            type="text"
            value={serialNumber}
            onChange={(e) => setSerialNumber(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            placeholder="Serial Number"
            style={{
              fontSize: '1rem',
              background: '#edf5fd',
              height: '2.5rem',
              textAlign: 'center',
              marginBottom: '10px',
            }}
          />
          <div className="mb-4 flex justify-between gap-4">
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-700">Size</h3>
              <div className="flex space-x-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={(e) => handleSizeClick(size, e)} // Passing the event to the handler
                    className={`rounded-md border px-4 py-2 text-sm font-medium ${selectedSize === size
                      ? 'bg-gray-800 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-700">Gender</h3>
              <div className="flex space-x-4">
                {genders.map((gender) => (
                  <label key={gender} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="gender"
                      value={gender}
                      checked={selectedGender === gender}
                      onChange={() => handleGenderChange(gender)}
                      className="h-4 w-4 border-gray-300 text-gray-800 focus:ring-gray-500"
                    />
                    <span className="text-sm text-gray-700">{gender}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                id="discount"
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                checked={isDiscount}
                onChange={(e) => setIsDiscount(e.target.checked)}
              />
              <label htmlFor="discount" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                Discount
              </label>
            </div>
            {isDiscount && (
              <div className="flex h-fit w-full">
                <div className="h-full w-1/2">
                  <div className="space-y-2">
                    <label className="mt-4 block font-medium text-[#666666] pb-3">Discount Type</label>
                    <div className="flex space-x-4">
                      {discounts.map((discount) => (
                        <label key={discount} className="flex items-center space-x-2">
                          <input
                            type="radio"
                            name="discount"
                            value={discount}
                            checked={selectedDiscountType === discount}
                            onChange={() => handleDiscountChange(discount)}
                            className="h-4 w-4 border-gray-300 text-gray-800 focus:ring-gray-500"
                          />
                          <span className="text-sm text-gray-700">{discount}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="h-full w-1/2">
                  <label className="mt-4 font-medium text-[#666666] pb-3">Discount Value</label>
                  <input
                    type="number"
                    value={discountValue}
                    onChange={(e) => setDiscountValue(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    placeholder="Discount Value"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-between gap-4">
          <div className="h-fit w-1/2">
            <label className="block font-medium text-[#666666] pb-3">Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>
          <div className="h-fit w-1/2">
            <label className="block font-medium text-[#666666] pb-3">End Date</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>
        </div>

        <div className="h-fit w-full">
          <label className="block text-lg font-semibold text-black">Pricing And Stock</label>
          <br />
          <div className="mb-4 flex justify-between gap-4">
            <div className="h-fit w-1/2">
              <label className="block font-medium text-[#666666] pb-3">Base Price</label>
              <input
                type="number"
                value={basePrice}
                onChange={(e) => setBasePrice(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                style={{
                  fontSize: '.8rem',
                  background: '#edf5fd',
                  height: '2.5rem',
                  textAlign: 'center',
                  marginBottom: '10px',
                }}
                placeholder="Base Price"
              />
              <label className="block font-medium text-[#666666] pb-3">Material</label>
              <input
                type="text"
                value={material}
                onChange={(e) => setMaterial(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                style={{
                  fontSize: '.8rem',
                  background: '#edf5fd',
                  height: '2.5rem',
                  textAlign: 'center',
                  marginBottom: '10px',
                }} placeholder="Material"
              />
              <label className="block font-medium text-[#666666] pb-3">Style</label>
              <input
                type="text"
                value={style}
                onChange={(e) => setStyle(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                style={{
                  fontSize: '.8rem',
                  background: '#edf5fd',
                  height: '2.5rem',
                  textAlign: 'center',
                  marginBottom: '10px',
                }} placeholder="Style"
              />
              <label className="block font-medium text-[#666666] pb-3">Capacity</label>
              <input
                type="number"
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                style={{
                  fontSize: '.8rem',
                  background: '#edf5fd',
                  height: '2.5rem',
                  textAlign: 'center',
                  marginBottom: '10px',
                }} placeholder="Capacity"
              />
            </div>
            <div className="h-fit w-1/2">
              <label className="block font-medium text-[#666666] pb-3">Selling Price</label>
              <input
                type="number"
                value={sellingPrice}
                onChange={(e) => setSellingPrice(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                style={{
                  fontSize: '.8rem',
                  background: '#edf5fd',
                  height: '2.5rem',
                  textAlign: 'center',
                  marginBottom: '10px',
                }} placeholder="Selling Price"
              />
              <label className="block font-medium text-[#666666] pb-3">Weight(KG)</label>
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                style={{
                  fontSize: '.8rem',
                  background: '#edf5fd',
                  height: '2.5rem',
                  textAlign: 'center',
                  marginBottom: '10px',
                }} placeholder="Weight"
              />
              <label className="block font-medium text-[#666666] pb-3">Color</label>
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-[2.6rem] h-[2.6rem] mb-2 border rounded"
              />
              <label className="block font-medium text-[#666666] pb-3">Stock</label>
              <input
                type="number"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                style={{
                  fontSize: '.8rem',
                  background: '#edf5fd',
                  height: '2.5rem',
                  textAlign: 'center',
                  marginBottom: '10px',
                }} placeholder="Stock"
              />
            </div>
          </div>
        </div>

        <div>
          <ImageUpload
            label="Upload Cover Image"
            name="coverImage1"
            ww={50}
            onImageChange={(image: File | null) => handleImageChange('coverImage1', image)}
            single={true}
          />

        </div>

      </div>

      <button
        className="mt-4 rounded-md bg-blue-500 py-2 px-4 text-white"
        onClick={handleSubmit}
      >
        Add Variant
      </button>
      <div className="absolute top-0 right-0">
      </div>
    </form>
  );
};
