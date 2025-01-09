'use client';

import { searchParams } from '@/lib/searchparams';
import { useQueryState } from 'nuqs';
import { useCallback, useMemo } from 'react';

export const STATUS_OPTIONS = [
	{ value: 'Pending', label: 'Pending' },
	{ value: 'Approved', label: 'Approved' },
	{ value: 'Rejected', label: 'Rejected' },
	{ value: 'Expired', label: 'Expired' },
];

export function useQuotationTableFilters() {
	const [searchQuery, setSearchQuery] = useQueryState(
		'q',
		searchParams.q.withOptions({ shallow: false, throttleMs: 1000 }).withDefault('')
	);

	const [statusFilter, setStatusFilter] = useQueryState(
		'quoteStatus',
		searchParams.quoteStatus.withOptions({ shallow: false }).withDefault('')
	);

	const [page, setPage] = useQueryState('page', searchParams.page.withDefault(1));

	const resetFilters = useCallback(() => {
		setSearchQuery(null);
		setStatusFilter(null);
		setPage(1);
	}, [setSearchQuery, setStatusFilter, setPage]);

	const isAnyFilterActive = useMemo(() => {
		return !!searchQuery || !!statusFilter;
	}, [searchQuery, statusFilter]);

	return {
		searchQuery,
		setSearchQuery,
		statusFilter,
		setStatusFilter,
		page,
		setPage,
		resetFilters,
		isAnyFilterActive,
	};
}
