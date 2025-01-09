export function getTax() {
	return [
		{
			name: 'GST Alberta',
			rate: 5,
			description: 'Goods and Services Tax (GST) applicable in Alberta.',
			isActive: true,
		},
		{
			name: 'HST Ontario',
			rate: 13,
			description: 'Harmonized Sales Tax (HST) applicable in Ontario.',
			isActive: true,
		},
		{
			name: 'HST Nova Scotia',
			rate: 15,
			description: 'Harmonized Sales Tax (HST) applicable in Nova Scotia.',
			isActive: true,
		},
		{
			name: 'GST British Columbia',
			rate: 5,
			description: 'Goods and Services Tax (GST) applicable in British Columbia.',
			isActive: true,
		},
		{
			name: 'QST Quebec',
			rate: 9.975,
			description: 'Quebec Sales Tax (QST) applicable in Quebec in addition to GST.',
			isActive: true,
		},
		{
			name: 'No Tax',
			rate: 0,
			description: 'No tax applicable for certain exempt services or products.',
			isActive: true,
		},
	];
}
