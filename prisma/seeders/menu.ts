export function getMenus() {
	return [
		{
			title: 'Quotations',
			description:
				'Create and manage customer quotations with dynamic pricing and export options.',
			illustration: '/assets/images/quotation.svg',
			link: '/dashboard/quotes',
			buttonText: 'View Quotations',
			listOrder: 1,
		},
		{
			title: 'Invoices',
			description: 'Track invoices with payment status and generate PDF receipts.',
			illustration: '/assets/images/invoice.svg',
			link: '/dashboard/invoices',
			buttonText: 'View Invoices',
			listOrder: 2,
		},
		{
			title: 'Inventory Management',
			description:
				'Manage stock levels, track product movement, and set alerts for low inventory.',
			illustration: '/assets/images/inventory.svg',
			link: '/dashboard/inventory',
			buttonText: 'Manage Inventory',
			listOrder: 3,
		},
		{
			title: 'Customer Management',
			description:
				'Maintain customer records, track interactions, and improve customer satisfaction.',
			illustration: '/assets/images/customer.svg',
			link: '/dashboard/customers',
			buttonText: 'View Customers',
			listOrder: 4,
		},
		{
			title: 'Reports & Analytics',
			description: 'View detailed reports and analytics for sales, performance, and more.',
			illustration: '/assets/images/analytics.svg',
			link: '/dashboard/reports',
			buttonText: 'View Reports',
			listOrder: 5,
		},
	];
}
