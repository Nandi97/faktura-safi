import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // Ensure this points to your Prisma client instance

export async function GET(request: NextRequest) {
	try {
		// Fetch the menus ordered by 'listOrder' in ascending order
		const menus = await prisma.menu.findMany({
			orderBy: {
				listOrder: 'asc',
			},
		});

		// Return the fetched menus with a 200 status
		return NextResponse.json(menus, { status: 200 });
	} catch (error) {
		console.error('Error fetching menus:', error);

		// Return an error response with a 500 status
		return NextResponse.json(
			{ error: 'An error occurred while fetching menus' },
			{ status: 500 }
		);
	}
}
