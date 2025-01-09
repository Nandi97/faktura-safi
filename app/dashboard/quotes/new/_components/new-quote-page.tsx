import PageContainer from '@/components/layout/page-container';

import React from 'react';
import QuotationCreateForm from '../../_components/quotation-form';

const NewQuote = () => {
	return (
		<PageContainer scrollable>
			<QuotationCreateForm />
		</PageContainer>
	);
};

export default NewQuote;
