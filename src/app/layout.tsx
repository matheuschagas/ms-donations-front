import type { Metadata, Viewport } from 'next';
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

export const viewport: Viewport = {
	width: 'device-width',
	initialScale: 1,
	maximumScale: 1,
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={cn(
					'flex min-h-[100dvh] flex-col items-center bg-background font-sans antialiased',
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
