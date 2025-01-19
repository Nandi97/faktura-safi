import * as z from 'zod';

export const customerSchema = z.object({
	fullName: z
		.string()
		.min(3, { message: 'Full name must be at least 3 characters long.' })
		.max(100, { message: 'Full name must be less than 100 characters.' })
		.regex(/^[a-zA-Z\s]+$/, { message: 'Full name can only contain letters and spaces.' }),

	email: z.string().email({ message: 'Invalid email address.' }),

	phone: z
		.string()
		.min(10, { message: 'Phone number must be at least 10 digits.' })
		.max(15, { message: 'Phone number must be less than 15 digits.' })
		.regex(/^\+?[0-9\s-]+$/, {
			message: 'Phone number must contain only numbers, spaces, or hyphens.',
		}),

	companyName: z
		.string()
		.max(100, { message: 'Company name must be less than 100 characters.' })
		.optional(),

	street: z
		.string()
		.max(100, { message: 'Street address must be less than 100 characters.' })
		.optional(),

	city: z.string().max(50, { message: 'City name must be less than 50 characters.' }).optional(),

	state: z
		.string()
		.max(50, { message: 'State name must be less than 50 characters.' })
		.optional(),

	postalCode: z
		.string()
		.regex(/^[A-Za-z0-9\s-]+$/, {
			message: 'Postal code can only contain letters, numbers, spaces, and hyphens.',
		})
		.max(10, { message: 'Postal code must be less than 10 characters.' })
		.optional(),

	country: z
		.string()
		.max(50, { message: 'Country name must be less than 50 characters.' })
		.optional(),

	notes: z.string().max(500, { message: 'Notes must be less than 500 characters.' }).optional(),

	isActive: z.boolean().default(true),
});

export const quoteItemSchema = z.object({
	product: z
		.string()
		.min(1, { message: 'Product name is required.' })
		.max(100, { message: 'Product name must be less than 100 characters.' }),

	description: z
		.string()
		.max(500, { message: 'Description must be less than 500 characters.' })
		.optional(),

	unitId: z.string().cuid({ message: 'Invalid unit ID.' }),

	quantity: z
		.number()
		.int({ message: 'Quantity must be an integer.' })
		.min(1, { message: 'Quantity must be at least 1.' }),

	unitPrice: z.number().positive({ message: 'Unit price must be greater than 0.' }),

	totalPrice: z.number().min(0, 'Total price must be at least 0'),

	quoteId: z.string().uuid({ message: 'Invalid quote ID.' }).optional(),
});

export const quotationSchema = z.object({
	quoteNumber: z.string().regex(/^Q-\d{8}-\d{4}$/, {
		message: 'Quote number must follow the format Q-YYYYMMDD-XXXX.',
	}),

	customerId: z.string().uuid({ message: 'Invalid customer ID.' }).optional(),

	customer: customerSchema.optional(), // Create a new customer

	taxId: z.string().cuid({ message: 'Invalid tax ID.' }).optional().nullable(),

	subtotal: z.number().nonnegative({ message: 'Subtotal must be a non-negative number.' }),

	total: z.number().nonnegative({ message: 'Total must be a non-negative number.' }),

	quoteStatusId: z.string().uuid({ message: 'Invalid quote status ID.' }).optional().nullable(),

	comment: z
		.string()
		.max(500, { message: 'Comment must be less than 500 characters.' })
		.default('Pending Approval'),

	validUntil: z.string().date().optional().nullable(),

	tags: z
		.array(
			z.object({
				id: z.string().max(20, { message: 'Each tag must be less than 20 characters.' }),
				text: z.string(),
			})
		)
		.optional(),
	quoteItems: z.array(quoteItemSchema),
});

export type QuotationFormValues = z.infer<typeof quotationSchema>;
