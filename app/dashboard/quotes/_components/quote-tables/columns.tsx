'use client';
import { Checkbox } from '@/components/ui/checkbox';
import { Quote } from '@/constants/types';
import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';

export const columns: ColumnDef<Quote>[] = [
	{
		id: 'select',
		header: ({ table }) => (
			<Checkbox
				checked={table.getIsAllPageRowsSelected()}
				onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
				aria-label="Select all"
			/>
		),
		cell: ({ row }) => (
			<Checkbox
				checked={row.getIsSelected()}
				onCheckedChange={(value) => row.toggleSelected(!!value)}
				aria-label="Select row"
			/>
		),
		enableSorting: false,
		enableHiding: false,
	},
	{
		accessorKey: 'customer.name',
		header: 'CUSTOMER NAME',
	},
	{
		accessorKey: 'quoteNumber',
		header: 'QUOTE#',
	},
	{
		accessorKey: 'createdAt',
		header: 'DATE',
	},
	{
		accessorKey: 'total',
		header: 'AMOUNT',
	},
	{
		accessorKey: 'quoteStatus.name',
		header: 'STATUS',
	},
	{
		accessorKey: 'comment',
		header: 'COMMENT',
	},
	{
		id: 'actions',
		cell: ({ row }) => <CellAction data={row.original} />,
	},
];
