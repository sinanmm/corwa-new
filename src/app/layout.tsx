import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Providers from './Providers';
import InitialLoader from '@/components/InitialLoader';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

export const metadata: Metadata = {
  title: 'CoRWA – Confederation of Resident Welfare Associations (CoRWA–M)',
  description: 'Official portal for Confederation of Resident Welfare Associations, accessing benefits, networking, and community welfare.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-white text-gray-900 transition-colors duration-300`}>
        <Providers>
          <InitialLoader />
          {children}
        </Providers>
      </body>
    </html>
  );
}
