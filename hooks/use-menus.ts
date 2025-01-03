import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import {  Prisma } from '@prisma/client';



type Menu = Prisma.MenuGetPayload<object>
const fetchMenus = async () => {
	const response = await axios.get('/api/menus/get');
	return response.data;
};

export const useMenus = () => {
	return useQuery<Menu[], Error>({
		queryFn: fetchMenus,
		queryKey: ['menus'],
	});
};
