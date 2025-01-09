export function getQuoteStatus() {
	return [
		{
			name: 'Pending',
			description: 'The quote is awaiting approval.',
		},
		{
			name: 'Approved',
			description: 'The quote has been approved by the customer.',
		},
		{
			name: 'Rejected',
			description: 'The quote has been rejected by the customer.',
		},
		{
			name: 'Expired',
			description: 'The quote has expired and is no longer valid.',
		},
	];
}

export function getInvoiceStatus() {
	return [
		{
			name: 'Unpaid',
			description: 'The invoice has been issued but not yet paid.',
		},
		{
			name: 'Paid',
			description: 'The invoice has been fully paid.',
		},
		{
			name: 'Partially Paid',
			description: 'The invoice has been partially paid.',
		},
		{
			name: 'Overdue',
			description: 'The payment due date has passed, and the invoice is not fully paid.',
		},
	];
}
