import type { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { ReactQueryProvider } from '@/app/query-provider';
import { Header } from '@/components/Header';
import { Container } from '@/components/Container';

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
			<body
				className={cn(
					'min-h-screen bg-background font-sans antialiased',
					fontSans.variable,
				)}
			>
				<ReactQueryProvider>
					<Header />
					<Container>{children}</Container>
				</ReactQueryProvider>
			</body>
		</html>
	);
}
