import React from 'react';
import { quotationSchema, type QuotationFormValues } from '@/schemas/quotation-form-schema';
import { Space_Mono, IBM_Plex_Mono } from 'next/font/google';
import { format } from 'date-fns';
import { useUOMs } from '@/hooks/use-uoms';

const spaceMono = Space_Mono({
	weight: ['400', '700'],
	style: ['normal', 'italic'],
	display: 'swap',
	subsets: ['latin'],
	variable: '--space-mono',
});

const ibmPlexMono = IBM_Plex_Mono({
	weight: [
		'100',
		'200',
		'300',
		'400',
		'500',
		'600',
		'700',
		'100',
		'200',
		'300',
		'400',
		'500',
		'600',
		'700',
	],
	style: ['normal', 'italic'],
	subsets: ['latin'],
	variable: '--ibm-plex-mono',
});

interface QuotationPreviewData {
	previewData: QuotationFormValues;
}
const QuotationPreview: React.FC<QuotationPreviewData> = ({ previewData }) => {
	const units = useUOMs().data;
	return (
		<div
			className={`${ibmPlexMono.variable} light:shadow-black flex flex-col space-y-5 rounded-sm p-5 text-sm shadow dark:shadow-white`}
		>
			<div className="w-full">
				<div className="light:bg-slate-200 flex h-20 w-20 items-center justify-center rounded-sm dark:bg-slate-900">
					<span className="text-4xl font-extrabold">FS</span>
				</div>
			</div>
			<div className="flex w-full justify-between">
				<div className="">Quotation no: {previewData?.quoteNumber}</div>
				<div className="">Issue Date: 10/22/2025</div>
				<div className="">
					Valid Until Date:{' '}
					{previewData?.validUntil ? format(previewData.validUntil, 'MM/dd/yyyy') : ''}
				</div>
			</div>
			<div className="flex w-full">
				<div className="flex w-1/2 flex-col">
					<span className="pb-3 font-semibold">From</span>
					<p>
						Alvin Kigen AKM <br />
						Email: alvinkigen@outlook.com
						<br />
						Phone: (123) 456-7890
						<br />
						Address: 123 Main St, Anytown, USA
						<br />
						Post Code: L8N 3X2
					</p>
				</div>
				<div className="flex w-1/2 flex-col">
					<span className="pb-3 font-semibold">To</span>
					<p>
						{previewData?.customer?.fullName}
						<br />
						{previewData?.customer?.email}
						<br />
						{previewData?.customer?.phone}
						<br />
						{previewData?.customer?.street}
						<br />
						{`${previewData?.customer?.city}, ${previewData?.customer?.state}, ${previewData?.customer?.country}`}
						<br />
						{previewData?.customer?.postalCode}
					</p>
				</div>
			</div>
			<div className="w-full">
				<table className="w-full text-left text-sm dark:text-gray-400 rtl:text-right">
					<thead className="border-b border-gray-700 text-xs uppercase dark:border-gray-50 dark:text-gray-400">
						<tr>
							<th scope="col" className="py-3">
								Description
							</th>
							<th scope="col" className="px-6 py-3">
								Quantity
							</th>
							<th scope="col" className="px-6 py-3">
								Unit Price
							</th>
							<th scope="col" className="py-3 text-right">
								Total
							</th>
						</tr>
					</thead>
					<tbody>
						{previewData?.quoteItems?.map((item, i) => (
							<tr key={i}>
								<th
									scope="row"
									className="truncate whitespace-nowrap py-4 font-medium"
								>
									{`${item?.product} - ${item?.description}`}
								</th>
								<td className="px-6 py-4">{`${item?.quantity} ${units?.find((i) => i.id === item.unitId)?.name}`}</td>
								<td className="px-6 py-4">${item?.unitPrice}</td>

								<td className="py-4 text-right">
									<span className="font-medium">${item?.totalPrice}</span>
								</td>
							</tr>
						))}
					</tbody>
					<tfoot className="border-t border-gray-700 text-xs uppercase dark:border-gray-50 dark:text-gray-400">
						<tr className="text-right">
							<th colSpan={3} className="py-3">
								Subtotal
							</th>
							<td className="py-3 text-right">${previewData?.subtotal}</td>
						</tr>
						<tr className="text-right">
							<th colSpan={3} className="py-3">
								Sales Tax
							</th>
							<td className="py-3 text-right">${`previewData?.`}</td>
						</tr>
						<tr className="text-right">
							<th colSpan={3} className="py-3">
								Total
							</th>
							<td className="py-3 text-right font-medium">${previewData?.total}</td>
						</tr>
					</tfoot>
				</table>
			</div>
		</div>
	);
};

export default QuotationPreview;
