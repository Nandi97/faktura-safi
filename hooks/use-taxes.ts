import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Tax } from '@/constants/types';

const getTaxes = async () => {
	const response = await axios.get('/api/tax/get');
	return response.data;
};

export const useTaxes = () => {
	return useQuery<Tax[]>({
		queryFn: getTaxes,
		queryKey: ['taxes'],
	});
};
