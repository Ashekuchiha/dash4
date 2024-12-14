import PageHead from '@/components/shared/page-head';
import {  useGetProducts } from './students/queries/queries';
import StudentsTable from './students/components/students-table';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { DataTableSkeleton } from '@/components/shared/data-table-skeleton';
import { Breadcrumbs } from '@/components/shared/breadcrumbs';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import Swal from 'sweetalert2';

export default function ProductList() {
    const [searchParams] = useSearchParams();
    const page = Number(searchParams.get('page') || 1);
    const pageLimit = Number(searchParams.get('limit') || 10);
    const search = searchParams.get('search') || null;
    const offset = (page - 1) * pageLimit;
    const { data, isLoading, refetch} = useGetProducts(offset, pageLimit, search);
    const users = data;
    const totalUsers = data?.pagination?.total;
    const pageCount = Math.ceil(totalUsers / pageLimit);

    const handleDelete = async (product) => {
        // const url = `https://api.tamkeen.center/api/packages/${product}/${storeId}`;
        const url = `https://api.tamkeen.center/api/products/${product}`;
        const token = localStorage.getItem("token");
    
        try {
          const response = await fetch(url, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${token}`, // Add token to the Authorization header
              'Content-Type': 'application/json', // Optional, if needed
            },
          });
    
          if (response.ok) {
            console.log(`Package ${product} deleted successfully.`);
            refetch(); // Refetch the data after deletion
            Swal.fire("Delete");

          } else {
            console.error('Failed to delete the package:', response.statusText);
          }
        } catch (error) {
          console.error('An error occurred:', error);
        }
      };
    const columns = [
        {
            accessorKey: 'name',
            header: 'Name',
        },
        {
            accessorKey: 'color',
            header: 'Color',
            cell: ({ getValue }) => (
                <div
                    style={{
                        backgroundColor: getValue(),
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        border: '1px solid #ccc',
                    }}
                    title={getValue()} // Tooltip showing the color code
                ></div>
            ),
        },
        {
            accessorKey: 'price',
            header: 'Price',
            cell: ({ getValue }) => `$${getValue()}`, // Format price with a dollar sign
        },
        {
            accessorKey: 'size',
            header: 'Size',
        },
        {
            accessorKey: 'style',
            header: 'Style',
        },
        {
            accessorKey: 'capacity',
            header: 'Capacity',
            cell: ({ getValue }) => `${getValue()}L`, // Assuming capacity is in liters
        },
        {
            accessorKey: 'weight',
            header: 'Weight',
            cell: ({ getValue }) => `${getValue()}kg`, // Assuming weight is in kilograms
        },
        {
            header: 'Action',
            cell:({ row }) => {
              const payment = row.original
              const navigate =useNavigate();
              return (
                <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => navigate(`/editProduct/${payment.id}`)}>Edit</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleDelete(payment.id)}>Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              )
            }
          }
    ];

    //Price	Size	Style	Capacity	Weight
    if (isLoading) {
        return (
            <div className="p-5">
                <DataTableSkeleton
                    columnCount={8}
                    filterableColumnCount={2}
                    searchableColumnCount={1}
                />
            </div>
        );
    } else {
        console.log(data);
    }



    return (

        <div className="p-4 md:p-8">
            <PageHead title="Customers | App" />
            <Breadcrumbs
                items={[
                    { title: 'Dashboard', link: '/' },
                    { title: 'Products', link: '/productsList' },
                ]}
            />
            <StudentsTable
                users={users}
                page={page}
                totalUsers={totalUsers}
                pageCount={pageCount}
                columns={columns}
            />
        </div>
    );
}
