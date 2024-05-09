import type { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { ReactQueryProvider } from '@/app/query-provider';
import { Container } from '@/components/Container';
import 'leaflet/dist/leaflet.css';
import { Toaster } from '@/components/ui/toaster';

const fontSans = FontSans({
	subsets: ['latin'],
	variable: '--font-sans',
});

export const metadata: Metadata = {
	title: 'MS Donations',
	description: 'A simple donation platform for victims of the big flood in Rio Grande do Sul.',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				{metadata.title && <title>{metadata.title.toString()}</title>}
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1, maximum-scale=1"
				/>
			</head>
			<body
				className={cn(
					'flex min-h-screen flex-col items-center bg-background font-sans antialiased',
					fontSans.variable,
				)}
			>
				<ReactQueryProvider>
					<Container>{children}</Container>
				</ReactQueryProvider>
				<Toaster />
			</body>
		</html>
	);
}
