import React from 'react';
import PageContainer from '@/components/layout/page-container';

export const metadata = {
	title: 'Dashboard : Quote Id',
};
const Dashboard = () => {
	return (
		<PageContainer scrollable>
			<div className="space-y-2">
				<div className="flex items-center justify-between space-y-2">
					<h2 className="text-2xl font-bold tracking-tight">Hi, Welcome Quote id</h2>
				</div>
			</div>
		</PageContainer>
	);
};

export default Dashboard;
