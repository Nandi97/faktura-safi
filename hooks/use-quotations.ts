import { Quote } from '@/constants/types';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import axios from 'axios';

const getQuotations = async (page: number, limit: number, search: string) => {
	const response = await axios.get('/api/quotes/get', {
		params: { page, limit, search },
	});
	return response.data;
};

export const useQuotations = (page: number, limit: number, search: string) => {
	return useQuery<{
		success: boolean;
		time: string;
		message: string;
		total_quotes: number;
		offset: number;
		limit: number;
		quotes: Quote[];
		isPlaceholderData: unknown;
	}>({
		queryKey: ['quotations', page, limit, search],
		queryFn: () => getQuotations(page, limit, search),
		placeholderData: keepPreviousData, // Preserve previous data while fetching new data
	});
};
