import { searchParamsCache } from '@/lib/searchparams';
import { SearchParams } from 'nuqs/parsers';
import React from 'react';
import QuoteListingPage from './_components/quote-listing-page';

type pageProps = {
	searchParams: SearchParams;
};
export const metadata = {
	title: 'Dashboard : Quote',
};
const Page = ({ searchParams }: pageProps) => {
	// Allow nested RSCs to access the search params (in a type-safe way)
	searchParamsCache.parse(searchParams);
	return <QuoteListingPage />;
};

export default Page;
