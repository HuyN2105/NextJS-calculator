import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { SpeedInsights } from '@vercel/speed-insights/next';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: "HuyN's NextJS calculator",
	description:
		'Developed in the summer before getting into university because HuyN is bored.',
	icons: './assets/images/ico.png',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<SpeedInsights />

			<body className={inter.className}>{children}</body>
		</html>
	);
}
