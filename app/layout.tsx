import { auth } from '@/auth';
import type { Metadata } from 'next';
import Providers from '@/components/layout/providers';
import { Toaster } from '@/components/ui/custom/sonner';
import { Lato } from 'next/font/google';
import './globals.css';
import NextTopLoader from 'nextjs-toploader';

const lato = Lato({
	subsets: ['latin'],
	weight: ['400', '700', '900'],
	display: 'swap',
});
export const metadata: Metadata = {
	title: 'Fakturi Safi',
	description: 'Generated remarkable invoices',
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const session = await auth();
	return (
		<html lang="en" className={`${lato.className}`} suppressHydrationWarning={true}>
			<body className={'overflow-hidden'}>
				<NextTopLoader showSpinner={false} />
				<Providers session={session}>
					<Toaster />
					{children}
				</Providers>
			</body>
		</html>
	);
}
