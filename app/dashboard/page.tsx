import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import PageContainer from '@/components/layout/page-container';

export const metadata = {
	// title: 'Dashboard : Overview',
	title: 'Dashboard ',
};
export default async function Dashboard() {
	const session = await auth();

	if (!session?.user) {
		return redirect('/');
	} else {
		<PageContainer scrollable>
					<div className="space-y-2">
						<div className="flex items-center justify-between space-y-2">
							<h2 className="text-2xl font-bold tracking-tight">Hi, Welcome back 👋</h2>
						</div>
					</div>
				</PageContainer>
	}
}
