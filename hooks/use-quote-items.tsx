import { useWatch, Control } from 'react-hook-form';
import { QuotationFormValues } from '@/schemas/form-schemas';

export function useQuoteItems(control: Control<QuotationFormValues>) {
	return useWatch({ control, name: 'quoteItems' }) || [];
}
