'use client';
import PageContainer from '@/components/layout/page-container';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { useMenus } from '@/hooks/use-menus';
import DashCard from './card';

export default function OverViewPage() {
	const { data: menus, isLoading, error } = useMenus();

	if (isLoading) return <p>Loading menus...</p>;
	if (error) return <p>Error loading menus</p>;
	return (
		<PageContainer scrollable>
			<div className="space-y-2">
				<div className="flex items-center justify-between space-y-2">
					<h2 className="text-2xl font-bold tracking-tight">Hi, Welcome back 👋</h2>
				</div>
				<Tabs defaultValue="apps" className="space-y-4">
					<TabsList>
						<TabsTrigger value="apps">Apps</TabsTrigger>
						<TabsTrigger value="analytics" disabled>
							Analytics
						</TabsTrigger>
					</TabsList>
					<TabsContent value="apps" className="space-y-4">
						<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
							{menus &&
								menus.map((menu) => (
									<DashCard
										key={menu.listOrder}
										illustration={menu.illustration}
										title={menu.title}
										altText={menu.title}
										description={menu.description}
										link={menu.link}
										buttonText={menu.buttonText}
									/>
								))}
						</div>
					</TabsContent>
				</Tabs>
			</div>
		</PageContainer>
	);
}
