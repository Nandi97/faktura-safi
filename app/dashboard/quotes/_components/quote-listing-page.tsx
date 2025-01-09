'use client';
/* eslint-disable @typescript-eslint/no-unused-vars */
import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/custom/heading';
import { buttonVariants } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Icon } from '@iconify/react/dist/iconify.js';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { searchParamsCache } from '@/lib/searchparams';
import React from 'react';
import QuotationTable from './quote-tables';
import { Quote } from '@/constants/types';
import { fakeUsers } from '@/constants/mock-api';
import { useQuotationTableFilters } from './quote-tables/use-quotation-table-filters';
import { useQuotations } from '@/hooks/use-quotations';

type TQuoteListingPage = {};
const QuoteListingPage = ({}: TQuoteListingPage) => {
	const {
		searchQuery,
		setSearchQuery,
		statusFilter,
		setStatusFilter,
		page,
		setPage,
		resetFilters,
		isAnyFilterActive,
	} = useQuotationTableFilters();

	const limit = 10; // Set a default limit for items per page

	// Fetch data using React Query
	const { data, isLoading, error } = useQuotations(page, limit, searchQuery);
	return (
		<PageContainer scrollable>
			<div className="space-y-4">
				<div className="flex items-start justify-between">
					<Heading
						// title={`Quotes (${totalUsers})`}
						title={`Quotes`}
						description="Manage Quotes (Server side table functionalities.)"
					/>

					<Link
						href={'/dashboard/quotes/new'}
						className={cn(buttonVariants({ variant: 'default' }))}
					>
						<Icon icon={`lucide:plus`} className="mr-2 h-4 w-4" /> Add New
					</Link>
				</div>
				<Separator />
				{error && <p className="text-red-500">Error loading quotations: {error.message}</p>}
				{isLoading ? (
					<p>Loading quotations...</p>
				) : (
					<QuotationTable
						data={data?.quotes || []}
						totalData={data?.total_quotes || 0}
						page={page}
						limit={limit}
						onPageChange={setPage}
					/>
				)}
			</div>
		</PageContainer>
	);
};

export default QuoteListingPage;
