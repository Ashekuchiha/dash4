import { Table, TableBody, TableHead, TableHeader, TableRow, TableCell } from "@/components/ui/table"; // Ensure TableCell is imported
import axios from "axios";
import { useEffect, useState } from "react";

interface Product {
  id: number;
  name: string;
  color: string;
  base_price: number;
  price: number;
  size: string;
  style: string;
  capacity: string;
  weight: string;
}

export default function ShowProducts() {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]); // State to hold product data

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get("https://api.tamkeen.center/api/products", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProducts(res.data.data); // Assuming the API returns the products in `data`
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      {loading ? (
        <p>Loading products...</p>
      ) : (
        <Table className="mt-4">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Color</TableHead>
              <TableHead>Base Price</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Size</TableHead>
              <TableHead>Style</TableHead>
              <TableHead>Capacity</TableHead>
              <TableHead>Weight</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.id}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.color}</TableCell>
                <TableCell>{product.base_price}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>{product.size}</TableCell>
                <TableCell>{product.style}</TableCell>
                <TableCell>{product.capacity}</TableCell>
                <TableCell>{product.weight}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
