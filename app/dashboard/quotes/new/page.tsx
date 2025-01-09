import { searchParamsCache } from '@/lib/searchparams';
import { SearchParams } from 'nuqs/parsers';
import React from 'react';
import NewQuote from './_components/new-quote-page';

type pageProps = {
	searchParams: SearchParams;
};
export const metadata = {
	title: 'Dashboard : Quote',
};
const page = ({ searchParams }: pageProps) => {
	searchParamsCache.parse(searchParams);
	return <NewQuote />;
};

export default page;
