import React from 'react';
// import { SidebarTrigger } from '../ui/sidebar';
import { Separator } from '../ui/separator';
import { GalleryVerticalEnd } from 'lucide-react';
import { Breadcrumbs } from '../breadcrumbs';
import SearchInput from '../search-input';
import { UserNav } from './user-nav';
import ThemeToggle from './ThemeToggle/theme-toggle';

export const company = {
	name: 'Acme Inc',
	logo: GalleryVerticalEnd,
	plan: 'Enterprise',
};

export default function Header() {
	return (
		<header className="flex h-16 shrink-0 items-center justify-between gap-2 shadow-sm shadow-black transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 dark:shadow-white">
			<div className="flex items-center gap-2 px-4">
				{/* <SidebarTrigger className="-ml-1" /> */}
				<div className="text-sidebar-accent-foreground flex gap-2 py-2">
					<div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
						<company.logo className="size-4" />
					</div>
					<div className="grid flex-1 text-left text-sm leading-tight">
						<span className="truncate font-semibold">{company.name}</span>
						<span className="truncate text-xs">{company.plan}</span>
					</div>
				</div>
				<Separator orientation="vertical" className="mr-2 h-4" />
				<Breadcrumbs />
			</div>

			<div className="flex items-center gap-2 px-4">
				<div className="hidden md:flex">
					<SearchInput />
				</div>
				<UserNav />
				<ThemeToggle />
			</div>
		</header>
	);
}
