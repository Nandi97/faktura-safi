/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Tag, TagInput } from 'emblor';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Heading } from '@/components/ui/custom/heading';
import { Input } from '@/components/ui/input';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { quotationSchema, type QuotationFormValues } from '@/schemas/form-schemas';
// import { profileSchema, type ProfileFormValues } from '@/schemas/form-schemas';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertTriangleIcon, Trash, Trash2Icon } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { SubmitHandler, useFieldArray, useForm, useWatch } from 'react-hook-form';
import { Textarea } from '@/components/ui/textarea';
import { useTaxes } from '@/hooks/use-taxes';
import { format } from 'date-fns';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useUOMs } from '@/hooks/use-uoms';
import { useQuoteItems } from '@/hooks/use-quote-items';

interface ProfileFormType {
	initialData?: any | null;
	categories?: any;
}
const QuotationCreateForm: React.FC<ProfileFormType> = ({ initialData, categories }) => {
	const [tags, setTags] = useState<Tag[]>([]);
	const params = useParams();
	const router = useRouter();
	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);
	const [quoteNumber, setQuoteNumber] = useState<string>('');
	const [imgLoading, setImgLoading] = useState(false);
	const title = initialData ? 'Edit Quote' : 'Create A Quote';
	const description = initialData
		? 'Edit a Quote.'
		: 'To create your quote,fill in all the information';
	const toastMessage = initialData ? 'Quote updated.' : 'Quote created.';
	const action = initialData ? 'Save changes' : 'Create';
	const [previousStep, setPreviousStep] = useState(0);
	const [currentStep, setCurrentStep] = useState(0);
	const [data, setData] = useState({});
	const delta = currentStep - previousStep;
	const getDefaultValidUntilDate = (): Date => {
		const today = new Date();
		const oneWeekFromNow = new Date(today.setDate(today.getDate() + 7));
		return oneWeekFromNow;
	};
	const defaultValues = {
		quoteItems: [
			{
				product: '',
				description: '',
				unitId: '',
				quantity: 0,
				unitPrice: 0,
				totalPrice: 0,
			},
		],
	};

	const form = useForm<QuotationFormValues>({
		resolver: zodResolver(quotationSchema),
		defaultValues: {
			quoteItems: initialData?.quoteItems || [
				{
					product: '',
					description: '',
					unitId: '',
					quantity: 1,
					unitPrice: 0,
					totalPrice: 0,
				},
			],
		},
		mode: 'onChange',
	});

	const {
		control,
		formState: { errors },
		setValue,
	} = form;

	const { append, remove, fields } = useFieldArray({
		control,
		name: 'quoteItems',
	});

	// console.log('Data', data);

	const onSubmit = async (data: QuotationFormValues) => {
		try {
			setLoading(true);
			if (initialData) {
				// await axios.post(`/api/products/edit-product/${initialData._id}`, data);
			} else {
				// const res = await axios.post(`/api/products/create-product`, data);
				// console.log("product", res);
			}
			router.refresh();
			router.push(`/dashboard/products`);
		} catch (error: any) {
		} finally {
			setLoading(false);
		}
	};

	const onDelete = async () => {
		try {
			setLoading(true);
			//   await axios.delete(`/api/${params.storeId}/products/${params.productId}`);
			router.refresh();
			router.push(`/${params.storeId}/products`);
		} catch (error: any) {
		} finally {
			setLoading(false);
			setOpen(false);
		}
	};

	const processForm: SubmitHandler<QuotationFormValues> = (data) => {
		console.log('data ==>', data);
		setData(data);
		// api call and reset
		// form.reset();
	};

	type FieldName = keyof QuotationFormValues;

	const steps = [
		{
			id: 'Step 1',
			name: 'Customer Information',
			fields: [
				'customer.fullName',
				'customer.email',
				'customer.phone',
				'customer.companyName',
				'customer.street',
				'customer.city',
				'customer.state',
				'customer.postalCode',
				'customer.country',
				'customer.notes',
				'customer.isActive',
			],
		},
		{
			id: 'Step 2',
			name: 'Quote Details',
			fields: [
				'quoteNumber',
				'taxId',
				// 'subtotal',
				// 'total',
				// 'quoteStatusId',
				'comment',
				'validUntil',
				// 'tags',
			],
		},
		{
			id: 'Step 3',
			name: 'Quote Items', // fields are mapping and flattening for the error to be trigger  for the dynamic fields
			fields: fields
				?.map((_, index) => [
					`quoteItems.${index}.product`,
					`quoteItems.${index}.description`,
					`quoteItems.${index}.unitId`,
					`quoteItems.${index}.quantity`,
					`quoteItems.${index}.unitPrice`,
					`quoteItems.${index}.totalPrice`,
					// Add other field names as needed
				])
				.flat(),
		},
	];
	// Watch all quote items at once

	// function generateQuoteNumber(): string {
	// 	const today = new Date();
	// 	const yyyy = today.getFullYear();
	// 	const mm = String(today.getMonth() + 1).padStart(2, '0');
	// 	const dd = String(today.getDate()).padStart(2, '0');
	// 	const randomDigits = String(Math.floor(1000 + Math.random() * 9000));
	// 	return `Q-${yyyy}${mm}${dd}-${randomDigits}`;
	// }

	// Use custom hook to watch quoteItems
	const quoteItems = useQuoteItems(control);

	// Compute total prices dynamically
	React.useEffect(() => {
		quoteItems.forEach((item, index) => {
			const totalPrice = item.quantity * item.unitPrice || 0;
			setValue(`quoteItems.${index}.totalPrice`, totalPrice);
		});
	}, [quoteItems, setValue]);

	// Generate quote number
	React.useEffect(() => {
		if (initialData?.quoteNumber) {
			setQuoteNumber(initialData.quoteNumber);
			setValue('quoteNumber', initialData.quoteNumber);
		} else {
			const today = new Date();
			const quoteNum = `Q-${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, '0')}${String(today.getDate()).padStart(2, '0')}-${Math.floor(1000 + Math.random() * 9000)}`;
			setQuoteNumber(quoteNum);
			setValue('quoteNumber', quoteNum);
		}
	}, [initialData, setValue]);

	const next = async () => {
		const fields = steps[currentStep].fields;

		const output = await form.trigger(fields as FieldName[], {
			shouldFocus: true,
		});

		if (!output) return;

		console.log('What Is Step', fields);
		if (currentStep < steps.length - 1) {
			// if (currentStep === steps.length - 3) {
			// 	await form.handleSubmit(processForm)();
			// }
			setPreviousStep(currentStep);
			setCurrentStep((step) => step + 1);
		}
	};

	const prev = () => {
		if (currentStep > 0) {
			setPreviousStep(currentStep);
			setCurrentStep((step) => step - 1);
		}
	};

	const countries = [{ id: 'canada', name: 'canada' }];
	const cities = [{ id: 'hamilton', name: 'Hamilton' }];
	const states = [{ id: 'ontario', name: 'Ontario - ON' }];
	const taxes = useTaxes().data;
	const units = useUOMs().data;

	return (
		<>
			<div className="flex items-center justify-between">
				<Heading title={title} description={description} />
				{initialData && (
					<Button
						disabled={loading}
						variant="destructive"
						size="sm"
						onClick={() => setOpen(true)}
					>
						<Trash className="h-4 w-4" />
					</Button>
				)}
			</div>
			<Separator />
			<div className="flex w-full py-4">
				<div className="flex flex-col md:w-1/2">
					<div className="space-y-4">
						<ul className="flex gap-4">
							{steps.map((step, index) => (
								<li key={step.name} className="md:flex-1">
									{currentStep > index ? (
										<div className="group flex w-full flex-col border-l-4 border-sky-600 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
											<span className="text-sm font-medium text-sky-600 transition-colors">
												{step.id}
											</span>
											<span className="text-sm font-medium">{step.name}</span>
										</div>
									) : currentStep === index ? (
										<div
											className="flex w-full flex-col border-l-4 border-sky-600 py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4"
											aria-current="step"
										>
											<span className="text-sm font-medium text-sky-600">
												{step.id}
											</span>
											<span className="text-sm font-medium">{step.name}</span>
										</div>
									) : (
										<div className="group flex h-full w-full flex-col border-l-4 border-gray-200 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
											<span className="text-sm font-medium text-gray-500 transition-colors">
												{step.id}
											</span>
											<span className="text-sm font-medium">{step.name}</span>
										</div>
									)}
								</li>
							))}
						</ul>
					</div>

					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(processForm)}
							className="w-full space-y-8"
						>
							<div className="w-full gap-8 md:grid md:grid-cols-3">
								{currentStep === 0 && (
									<>
										<FormField
											control={form.control}
											name="customer.fullName"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Full Name</FormLabel>
													<FormControl>
														<Input
															disabled={loading}
															placeholder="John Doe"
															{...field}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name="customer.email"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Email</FormLabel>
													<FormControl>
														<Input
															disabled={loading}
															placeholder="johndoe@gmail.com"
															{...field}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name="customer.phone"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Phone Number</FormLabel>
													<FormControl>
														<Input
															type="number"
															placeholder="Enter you contact number"
															disabled={loading}
															{...field}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name="customer.companyName"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Company Name?</FormLabel>
													<FormControl>
														<Input
															disabled={loading}
															placeholder="Company Name"
															{...field}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>

										<FormField
											control={form.control}
											name="customer.country"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Country</FormLabel>
													<Select
														disabled={loading}
														onValueChange={field.onChange}
														value={field.value}
														defaultValue={field.value}
													>
														<FormControl>
															<SelectTrigger>
																<SelectValue
																	defaultValue={field.value}
																	placeholder="Select a country"
																/>
															</SelectTrigger>
														</FormControl>
														<SelectContent>
															{countries.map((country) => (
																<SelectItem
																	key={country.id}
																	value={country.id}
																>
																	{country.name}
																</SelectItem>
															))}
														</SelectContent>
													</Select>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name="customer.state"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Province</FormLabel>
													<Select
														disabled={loading}
														onValueChange={field.onChange}
														value={field.value}
														defaultValue={field.value}
													>
														<FormControl>
															<SelectTrigger>
																<SelectValue
																	defaultValue={field.value}
																	placeholder="Select a Province"
																/>
															</SelectTrigger>
														</FormControl>
														<SelectContent>
															{states.map((state) => (
																<SelectItem
																	key={state.id}
																	value={state.id}
																>
																	{state.name}
																</SelectItem>
															))}
														</SelectContent>
													</Select>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name="customer.city"
											render={({ field }) => (
												<FormItem>
													<FormLabel>City/Town</FormLabel>
													<Select
														disabled={loading}
														onValueChange={field.onChange}
														value={field.value}
														defaultValue={field.value}
													>
														<FormControl>
															<SelectTrigger>
																<SelectValue
																	defaultValue={field.value}
																	placeholder="Select a city"
																/>
															</SelectTrigger>
														</FormControl>
														<SelectContent>
															{cities.map((city) => (
																<SelectItem
																	key={city.id}
																	value={city.id}
																>
																	{city.name}
																</SelectItem>
															))}
														</SelectContent>
													</Select>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name="customer.street"
											render={({ field }) => (
												<FormItem className="md:col-span-2">
													<FormLabel>Street Address</FormLabel>
													<FormControl>
														<Input
															type="text"
															placeholder="Enter street address"
															disabled={loading}
															{...field}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name="customer.postalCode"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Postal Code</FormLabel>
													<FormControl>
														<Input
															type="text"
															placeholder="XXX XXX"
															disabled={loading}
															{...field}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name="customer.notes"
											render={({ field }) => (
												<FormItem className="md:col-span-full">
													<FormLabel>Notes?</FormLabel>
													<FormControl>
														<Textarea
															placeholder="Enter you contact number"
															disabled={loading}
															{...field}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
									</>
								)}
								{currentStep === 1 && (
									<>
										<FormField
											control={form.control}
											name="quoteNumber"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Quote#</FormLabel>
													<FormControl>
														<Input
															disabled
															defaultValue={field.value}
															{...field}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name="taxId"
											render={({ field }) => (
												<FormItem>
													<FormLabel>City/Town</FormLabel>
													<Select
														disabled={loading}
														onValueChange={field.onChange}
														value={field.value as string}
														defaultValue={field.value as string}
													>
														<FormControl>
															<SelectTrigger>
																<SelectValue
																	defaultValue={
																		field.value as string
																	}
																	placeholder="Select tax"
																/>
															</SelectTrigger>
														</FormControl>
														<SelectContent>
															{taxes?.map((tax) => (
																<SelectItem
																	key={tax?.id}
																	value={tax?.id}
																>
																	{`${tax?.rate}% - ${tax?.name}`}
																</SelectItem>
															))}
														</SelectContent>
													</Select>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name="validUntil"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Valid Until</FormLabel>
													<FormControl>
														<Input
															type="date"
															placeholder="Valid until"
															disabled={loading}
															{...field}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name="comment"
											render={({ field }) => (
												<FormItem className="col-span-full">
													<FormLabel>Comment</FormLabel>
													<FormControl>
														<Input
															placeholder="Comment"
															disabled={loading}
															{...field}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										{/* <FormField
											control={form.control}
											name="tags"
											render={({ field }) => (
												<FormItem className="col-span-full">
													<FormLabel>Tag</FormLabel>
													<FormControl>
														<TagInput
															{...field}
															placeholder="Enter a topic"
															tags={tags}
															className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
															setTags={(newTags) => {
																setTags(newTags);
																form.setValue(
																	'tags',
																	newTags as [Tag, ...Tag[]]
																);
															}}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/> */}
									</>
								)}
								{currentStep === 2 && (
									<>
										{fields?.map((field, index) => (
											<Accordion
												type="single"
												collapsible
												defaultValue="item-1"
												className="col-span-full"
												key={field.id}
											>
												<AccordionItem value="item-1">
													<AccordionTrigger
														className={cn(
															'relative !no-underline [&[data-state=closed]>button]:hidden [&[data-state=open]>.alert]:hidden',
															errors?.quoteItems?.[index] &&
																'text-red-700'
														)}
													>
														{`Quotation Item ${index + 1}`}

														<Button
															variant="outline"
															size="icon"
															className="absolute right-8"
															onClick={() => remove(index)}
														>
															<Icon
																icon="lucide:trash-2"
																className="h-4 w-4"
															/>
														</Button>
														{errors?.quoteItems?.[index] && (
															<span className="alert absolute right-8">
																<AlertTriangleIcon className="h-4 w-4 text-red-700" />
															</span>
														)}
													</AccordionTrigger>
													<AccordionContent>
														<div
															className={cn(
																'relative mb-4 gap-8 rounded-md border p-4 md:grid md:grid-cols-3'
															)}
														>
															<FormField
																control={form.control}
																name={`quoteItems.${index}.product`}
																render={({ field }) => (
																	<FormItem>
																		<FormLabel>
																			Product
																		</FormLabel>
																		<FormControl>
																			<Input
																				type="text"
																				disabled={loading}
																				{...field}
																			/>
																		</FormControl>
																		<FormMessage />
																	</FormItem>
																)}
															/>
															<FormField
																control={form.control}
																name={`quoteItems.${index}.description`}
																render={({ field }) => (
																	<FormItem className="col-span-2">
																		<FormLabel>
																			Description
																		</FormLabel>
																		<FormControl>
																			<Input
																				type="text"
																				disabled={loading}
																				{...field}
																			/>
																		</FormControl>
																		<FormMessage />
																	</FormItem>
																)}
															/>
															<div className="flex items-center md:col-span-1">
																<FormField
																	control={form.control}
																	name={`quoteItems.${index}.unitId`}
																	render={({ field }) => (
																		<FormItem className="w-2/5">
																			<FormLabel>
																				UOM
																			</FormLabel>
																			<Select
																				disabled={loading}
																				onValueChange={
																					field.onChange
																				}
																				value={
																					field.value as string
																				}
																				defaultValue={
																					field.value as string
																				}
																			>
																				<FormControl>
																					<SelectTrigger className="rounded-r-none p-1">
																						<SelectValue
																							defaultValue={
																								field.value as string
																							}
																							placeholder="Select tax"
																						/>
																					</SelectTrigger>
																				</FormControl>
																				<SelectContent>
																					{units?.map(
																						(tax) => (
																							<SelectItem
																								key={
																									tax?.id
																								}
																								value={
																									tax?.id
																								}
																							>
																								{
																									tax?.name
																								}
																							</SelectItem>
																						)
																					)}
																				</SelectContent>
																			</Select>
																			<FormMessage />
																		</FormItem>
																	)}
																/>
																<FormField
																	control={form.control}
																	name={`quoteItems.${index}.quantity`}
																	render={({ field }) => (
																		<FormItem className="w-3/5">
																			<FormLabel>
																				Quantity
																			</FormLabel>
																			<FormControl>
																				<Input
																					type="number"
																					className="rounded-l-none"
																					min={1}
																					disabled={
																						loading
																					}
																					{...field}
																				/>
																			</FormControl>
																			<FormMessage />
																		</FormItem>
																	)}
																/>
															</div>
															<FormField
																control={form.control}
																name={`quoteItems.${index}.unitPrice`}
																render={({ field }) => (
																	<FormItem>
																		<FormLabel>Price</FormLabel>
																		<FormControl>
																			<Input
																				type="number"
																				disabled={loading}
																				{...field}
																			/>
																		</FormControl>
																		<FormMessage />
																	</FormItem>
																)}
															/>
															<FormField
																control={form.control}
																name={`quoteItems.${index}.totalPrice`}
																render={({ field }) => (
																	<FormItem>
																		<FormLabel>Total</FormLabel>
																		<FormControl>
																			<Input
																				type="number"
																				disabled
																				{...field}
																			/>
																		</FormControl>
																		<FormMessage />
																	</FormItem>
																)}
															/>
														</div>
													</AccordionContent>
												</AccordionItem>
											</Accordion>
										))}
									</>
								)}
							</div>
						</form>
					</Form>

					{/* Navigation */}
					<div className="mt-8 pt-5">
						<div className="flex justify-between">
							<button
								type="button"
								onClick={prev}
								disabled={currentStep === 0}
								className="rounded bg-white px-2 py-1 text-sm font-semibold text-sky-900 shadow-sm ring-1 ring-inset ring-sky-300 hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-50"
							>
								<span className="sr-only">Previous Step</span>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth="1.5"
									stroke="currentColor"
									className="h-6 w-6"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M15.75 19.5L8.25 12l7.5-7.5"
									/>
								</svg>
							</button>
							<button
								type="button"
								onClick={next}
								disabled={currentStep === steps.length - 1}
								className="rounded bg-white px-2 py-1 text-sm font-semibold text-sky-900 shadow-sm ring-1 ring-inset ring-sky-300 hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-50"
							>
								<span className="sr-only">Next Step</span>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth="1.5"
									stroke="currentColor"
									className="h-6 w-6"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M8.25 4.5l7.5 7.5-7.5 7.5"
									/>
								</svg>
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default QuotationCreateForm;
