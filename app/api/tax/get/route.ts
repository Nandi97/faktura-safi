/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // Ensure this points to your Prisma client instance

export async function GET(request: NextRequest) {
	try {
		// Fetch the taxes ordered by 'listOrder' in ascending order
		const taxes = await prisma.tax.findMany({});

		// Return the fetched taxes with a 200 status
		return NextResponse.json(taxes, { status: 200 });
	} catch (error) {
		console.error('Error fetching taxes:', error);

		// Return an error response with a 500 status
		return NextResponse.json(
			{ error: 'An error occurred while fetching taxes' },
			{ status: 500 }
		);
	}
}
