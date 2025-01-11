import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Unit } from '@/constants/types';

const getUOMs = async () => {
	const response = await axios.get('/api/uom/get');
	return response.data;
};

export const useUOMs = () => {
	return useQuery<Unit[]>({
		queryFn: getUOMs,
		queryKey: ['uoms'],
	});
};
