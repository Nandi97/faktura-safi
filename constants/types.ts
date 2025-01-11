/* eslint-disable @typescript-eslint/no-unused-vars */
import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

export type Quote = Prisma.QuoteGetPayload<{
	include: {
		customer: true;
	};
}>;

export type Tax = Prisma.TaxGetPayload<object>;
export type Unit = Prisma.UnitGetPayload<object>;
