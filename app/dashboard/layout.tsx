import KBar from '@/components/kbar';

import Header from '@/components/layout/header';
import type { Metadata } from 'next';
import { cookies } from 'next/headers';

export const metadata: Metadata = {
	title: 'Next Shadcn Dashboard Starter',
	description: 'Basic dashboard with Next.js and Shadcn',
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
	// Persisting the sidebar state in the cookie.
	const cookieStore = cookies();
	return (
		<KBar>
			{/* <AppSidebar /> */}
			
				<Header />
				{/* page main content */}
				{children}
				{/* page main content ends */}
			
		</KBar>
	);
}
