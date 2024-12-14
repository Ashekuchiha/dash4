import React, { useState, useEffect } from 'react';
import PageHead from '@/components/shared/page-head';
import { useGetCustomers } from './queries/queries';
import StudentsTable from './components/students-table';
import { useSearchParams } from 'react-router-dom';
import { DataTableSkeleton } from '@/components/shared/data-table-skeleton';
import { Breadcrumbs } from '@/components/shared/breadcrumbs';
import { format } from 'date-fns';

export default function CustomersPage() {
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get('page') || 1);
  const pageLimit = Number(searchParams.get('limit') || 10);
  const search = searchParams.get('search') || null;
  const offset = (page - 1) * pageLimit;

  // Search term state
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const { data, isLoading } = useGetCustomers(offset, pageLimit, search);
  const users = data?.users || [];
  const totalUsers = data?.pagination?.total || 0;
  const pageCount = Math.ceil(totalUsers / pageLimit);

  const columns = [
    {
      accessorKey: 'name',
      header: 'Name',
    },
    {
      accessorKey: 'email',
      header: 'Email',
    },
    {
      accessorKey: 'gender',
      header: 'Gender',
    },
    {
      accessorKey: 'phone',
      header: 'Phone',
    },
    {
      accessorKey: 'created_at',
      header: 'Created At',
      cell: ({ row }: any) => format(new Date(row.original.created_at), 'dd-MM-yyyy'),
    },
  ];

  // Filter users based on the search term
  useEffect(() => {
    if (searchTerm) {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      const filtered = users.filter((user) => {
        const name = user.name?.toLowerCase() || ''; // Safe null handling
        const email = user.email?.toLowerCase() || '';
        const phone = user.phone || '';
        return (
          name.includes(lowerCaseSearchTerm) ||
          email.includes(lowerCaseSearchTerm) ||
          phone.includes(lowerCaseSearchTerm)
        );
      });
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers(users);
    }
  }, [searchTerm, users]);
  

  if (isLoading) {
    return (
      <div className="p-5">
        <DataTableSkeleton
          columnCount={5}
          filterableColumnCount={2}
          searchableColumnCount={1}
        />
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8">
      <PageHead title="Customers | App" />
      <Breadcrumbs
        items={[
          { title: 'Dashboard', link: '/' },
          { title: 'Customers', link: '/customers' },
        ]}
      />

      {/* Search Bar */}
      <div className="my-4 flex w-1/2 items-center">
  {/* <input
    type="text"
    placeholder="Search by name, email, or phone"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className="border rounded-lg p-3 flex-1 text-gray-700 shadow-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-200"
  /> */}
</div>


      {/* Table */}
      <StudentsTable
        users={filteredUsers} // Pass filtered users here
        page={page}
        totalUsers={searchTerm ? filteredUsers.length : totalUsers} // Adjust total count based on search
        pageCount={searchTerm ? Math.ceil(filteredUsers.length / pageLimit) : pageCount} // Adjust pagination
        columns={columns}
      />
    </div>
  );
}
