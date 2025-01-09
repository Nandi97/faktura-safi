import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
	try {
		const { searchParams } = new URL(request.url);
		const page = parseInt(searchParams.get('page') || '1', 10);
		const limit = parseInt(searchParams.get('limit') || '10', 10);
		const search = searchParams.get('search') || '';

		const offset = (page - 1) * limit;

		// Filter by customer name or quote number if search is provided
		const where = search
			? {
					OR: [
						{ customer: { name: { contains: search, mode: 'insensitive' } } },
						{ quoteNumber: { contains: search } },
					],
				}
			: {};

		// Fetch total count of quotes
		const totalQuotes = await prisma.quote.count({ where });

		// Fetch paginated quotes
		const paginatedQuotes = await prisma.quote.findMany({
			where,
			orderBy: { quoteNumber: 'asc' },
			include: {
				customer: true,
				items: true,
				quoteStatus: true,
				invoice: true,
				tax: true,
			},
			skip: offset,
			take: limit,
		});

		const currentTime = new Date().toISOString();

		// Return paginated data
		return NextResponse.json(
			{
				success: true,
				time: currentTime,
				message: '',
				total_quotes: totalQuotes,
				offset,
				limit,
				quotes: paginatedQuotes,
			},
			{ status: 200 }
		);
	} catch (error) {
		console.error('Error fetching quotations:', error);

		// Return an error response
		return NextResponse.json(
			{ error: 'An error occurred while fetching quotations' },
			{ status: 500 }
		);
	}
}
