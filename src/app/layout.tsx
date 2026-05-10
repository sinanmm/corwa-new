import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Providers from './Providers';
import InitialLoader from '@/components/InitialLoader';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

const siteUrl = 'https://corwa.in';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'CoRWA – Confederation of Resident Welfare Associations',
    template: '%s | CoRWA',
  },
  description:
    'Official portal for CoRWA (Confederation of Resident Welfare Associations) – Kerala State Committee. Access healthcare, tourism, and business benefits across 100+ associations in Malappuram and beyond.',
  keywords: [
    'CoRWA',
    'Confederation of Resident Welfare Associations',
    'Resident Welfare Association',
    'Malappuram',
    'Kerala',
    'RWA benefits',
    'association directory',
    'community welfare',
  ],
  authors: [{ name: 'CoRWA Kerala' }],
  creator: 'CoRWA Kerala',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: siteUrl,
    siteName: 'CoRWA – Confederation of Resident Welfare Associations',
    title: 'CoRWA – Confederation of Resident Welfare Associations',
    description:
      'Official portal for CoRWA – Kerala State Committee. Healthcare, tourism, and business benefits for 100+ resident welfare associations.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'CoRWA – Confederation of Resident Welfare Associations',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CoRWA – Confederation of Resident Welfare Associations',
    description:
      'Official portal for CoRWA – Kerala State Committee. Healthcare, tourism, and business benefits for resident welfare associations.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: siteUrl,
  },
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
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
