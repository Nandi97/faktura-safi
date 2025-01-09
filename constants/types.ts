import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

export type Quote = Prisma.QuoteGetPayload<{
	include: {
		customer: true;
	};
}>;
