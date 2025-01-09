import { PrismaClient } from '@prisma/client';
import { getMenus } from './seeders/menu';
import { getQuoteStatus, getInvoiceStatus } from './seeders/quote-invoice-status';
import { getUnitData } from './seeders/uom';
import { getTax } from './seeders/tax';

const prisma = new PrismaClient();

async function main() {
	const menus = getMenus();
	const quoteStatus = getQuoteStatus();
	const invoiceStatus = getInvoiceStatus();
	const unitData = getUnitData();

	try {
		// Menus
		for (const menu of menus) {
			const existingMenu = await prisma.menu.findUnique({ where: { title: menu.title } });
			if (!existingMenu) {
				const newData = await prisma.menu.create({ data: { ...menu } });
				console.log(`Created menu item: ${newData.title}`);
			} else {
				const updatedData = await prisma.menu.update({
					where: { id: existingMenu.id },
					data: { ...menu },
				});
				console.log(`Updated menu Item: ${updatedData.title}`);
			}
		}

		// Quote status
		for (const status of quoteStatus) {
			const existingStatus = await prisma.quoteStatus.findUnique({
				where: { name: status.name },
			});
			if (!existingStatus) {
				const newData = await prisma.quoteStatus.create({ data: { ...status } });
				console.log(`Created quote status: ${newData.name}`);
			} else {
				const updatedData = await prisma.quoteStatus.update({
					where: { id: existingStatus.id },
					data: { ...quoteStatus },
				});
				console.log(`Quote status already exists: ${updatedData.name}`);
			}
		}

		// Invoice status
		for (const status of invoiceStatus) {
			const existingStatus = await prisma.invoiceStatus.findUnique({
				where: { name: status.name },
			});
			if (!existingStatus) {
				const newData = await prisma.invoiceStatus.create({ data: { ...status } });
				console.log(`Created invoice status: ${newData.name}`);
			} else {
				const updatedData = await prisma.invoiceStatus.update({
					where: { id: existingStatus.id },
					data: { ...invoiceStatus },
				});
				console.log(`Invoice status already exists: ${updatedData.name}`);
			}
		}
		// Unit data
		for (const unit of unitData) {
			const existingUnit = await prisma.unit.findUnique({ where: { name: unit.name } });
			if (!existingUnit) {
				const newData = await prisma.unit.create({ data: { ...unit } });
				console.log(`Created unit: ${newData.name}`);
			} else {
				const updatedData = await prisma.unit.update({
					where: { id: existingUnit.id },
					data: { ...unit },
				});
				console.log(`Unit already exists: ${updatedData.name}`);
			}
		}
		// Tax
		for (const tax of getTax()) {
			const existingTax = await prisma.tax.findUnique({ where: { name: tax.name } });
			if (!existingTax) {
				const newData = await prisma.tax.create({
					data: { ...tax },
				});
				console.log(`Created tax: ${newData.name}`);
			} else {
				const updatedData = await prisma.tax.update({
					where: { id: existingTax.id },
					data: { name: tax.name, rate: tax.rate },
				});
				console.log(`Tax already exists: ${updatedData.name}`);
			}
		}
		console.log('Seeder execution completed successfully.');
	} catch (error) {
		console.error('Error occurred during seeding:', error);
	} finally {
		await prisma.$disconnect();
	}
}

main().catch((error) => {
	console.error('Unhandled error in seeder:', error);
	process.exit(1);
});
