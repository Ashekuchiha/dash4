import DataTable from '@/components/shared/data-table';

type TStudentsTableProps = {
  users: any;
  page: number;
  totalUsers: number;
  pageCount: number;
  columns: any; // Added columns prop
};

export default function StudentsTable({
  users,
  pageCount,
  columns, // Destructure columns from props
}: TStudentsTableProps) {
  console.log(users);
  return (
    <>
      {users && (
        <DataTable columns={columns} data={users} pageCount={pageCount} />
      )}
    </>
  );
}
