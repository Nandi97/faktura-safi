'use client';

import { DataTable } from '@/components/ui/custom/table/data-table';
import { DataTableFilterBox } from '@/components/ui/custom/table/data-table-filter-box';
import { DataTableResetFilter } from '@/components/ui/custom/table/data-table-reset-filter';
import { DataTableSearch } from '@/components/ui/custom/table/data-table-search';
import { Quote } from '@/constants/types';
import { columns } from '../quote-tables/columns';
import { STATUS_OPTIONS, useQuotationTableFilters } from './use-quotation-table-filters';

export default function QuotationTable({ data, totalData }: { data: Quote[]; totalData: number }) {
	const {
		statusFilter,
		setStatusFilter,
		isAnyFilterActive,
		resetFilters,
		searchQuery,
		setPage,
		setSearchQuery,
	} = useQuotationTableFilters();

	return (
		<div className="space-y-4">
			<div className="flex flex-wrap items-center gap-4">
				<DataTableSearch
					searchKey="customer.name" // Adjusted to search by customer name
					searchQuery={searchQuery}
					setSearchQuery={setSearchQuery}
					setPage={setPage}
				/>
				<DataTableFilterBox
					filterKey="quoteStatus.name"
					title="Status"
					options={STATUS_OPTIONS}
					setFilterValue={setStatusFilter}
					filterValue={statusFilter}
				/>
				<DataTableResetFilter isFilterActive={isAnyFilterActive} onReset={resetFilters} />
			</div>
			<DataTable columns={columns} data={data} totalItems={totalData} />
		</div>
	);
}
