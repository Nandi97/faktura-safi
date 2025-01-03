import { Card, CardContent, CardFooter } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface CardContent {
	illustration: string;
	title: string;
	altText: string;
	description?: string|null;
	link: string;
	buttonText: string;
}

const DashCard = ({ illustration, altText, title, description, link, buttonText }: CardContent) => {
	return (
		<Card className="flex flex-col rounded-md border border-border shadow-lg transition-shadow duration-300 hover:shadow-xl">
			<CardContent className="flex items-center justify-center p-4">
				<Image
					src={illustration}
					width={300} // Adjusted for better responsiveness
					height={300}
					alt={altText}
					className="object-contain"
				/>
			</CardContent>
			<CardFooter className="flex flex-col items-center p-4">
				<h3 className="mb-2 text-center text-lg font-semibold">{title}</h3>
				<p className="mb-4 text-center text-sm text-muted-foreground">{description}</p>
				<Link
					href={link}
					className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
				>
					{buttonText}
				</Link>
			</CardFooter>
		</Card>
	);
};

export default DashCard;
