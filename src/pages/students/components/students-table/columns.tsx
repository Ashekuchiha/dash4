// import { Checkbox } from '@/components/ui/checkbox';
import { Employee } from '@/constants/data';
import { ColumnDef } from '@tanstack/react-table';
// import { CellAction } from './cell-action';

export const columns: ColumnDef<Employee>[] = [
  // {
  //   id: 'select',
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={table.getIsAllPageRowsSelected()}
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false
  // },
  {
    accessorKey: 'id',
    header: 'ID'
  },
  {
    accessorKey: 'order_id',
    header: 'ORDER ID'
  },
  {
    accessorKey: 'user_name',
    header: 'CUSTOMER'
  },
  {
    accessorKey: 'product_name',
    header: 'PRODUCT'
  },
  {
    accessorKey: 'date',
    header: 'DATE'
  },
  {
    accessorKey: 'payment_method',
    header: 'PAYMENT METHOD'
  },
  {
    accessorKey: 'amount',
    header: 'AMOUNT'
  },
  {
    accessorKey: 'quantity',
    header: 'QUANTITY'
  },
  // {
  //   id: 'actions',
  //   cell: ({ row }) => <CellAction data={row.original} />,
  //   header: 'Actions'
  // }
];
