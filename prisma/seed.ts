import { PrismaClient } from '@prisma/client';
import { getMenus } from './seeders/menu';

const prisma = new PrismaClient();

async function main() {
    const menus = getMenus();
    
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