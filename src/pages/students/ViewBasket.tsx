import PageHead from '@/components/shared/page-head';
import { useGetBaskets } from './queries/queries';
import StudentsTable from './components/students-table';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { DataTableSkeleton } from '@/components/shared/data-table-skeleton';
import { Breadcrumbs } from '@/components/shared/breadcrumbs';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import Swal from 'sweetalert2';
import EditBasket from './EditBasket';

export default function ViewBasket() {
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get('page') || 1);
  const pageLimit = Number(searchParams.get('limit') || 10);
  const search = searchParams.get('search') || null;
  const offset = (page - 1) * pageLimit;
  const { data, isLoading,refetch  } = useGetBaskets(offset, pageLimit, search);
  const users = data;
  const totalUsers = data?.pagination?.total;
  const pageCount = Math.ceil(totalUsers / pageLimit);

  const handleDelete = async (packageId, storeId) => {
    const url = `https://api.tamkeen.center/api/packages/${packageId}/${storeId}`;
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
        console.log(`Package ${packageId} deleted successfully.`);
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
      accessorKey: 'total_price',
      header: 'Total Price',
    },
    {
      accessorKey: 'number_of_uses',
      header: 'No. of Usages',
    },
    {
      header: 'Action',
      cell:({ row }) => {
        const payment = row.original
        const navigate = useNavigate();
        return (
          <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => navigate(`/editBasket/${payment.id}/${payment.store_id}`)}>Edit</DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleDelete(payment.id, payment.store_id)}>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        )
      }
    }
    
  ];

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
  }else{
    console.log(data);
  }

  return (
    
    <div className="p-4 md:p-8">
      <PageHead title="Customers | App" />
      <Breadcrumbs
        items={[
          { title: 'Dashboard', link: '/' },
          { title: 'Baskets', link: '/viewBaskets' },
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
