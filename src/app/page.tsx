import type { Metadata } from 'next';
import HomeClient from './HomeClient';

export const metadata: Metadata = {
  title: 'CoRWA – Empowering Resident Welfare Associations in Kerala',
  description:
    'CoRWA connects 100+ Resident Welfare Associations across Kerala with premium healthcare, tourism, and business benefits. Join the Kerala State Committee today.',
  alternates: {
    canonical: 'https://corwa.in',
  },
  openGraph: {
    title: 'CoRWA – Empowering Resident Welfare Associations in Kerala',
    description:
      'CoRWA connects 100+ Resident Welfare Associations across Kerala with premium healthcare, tourism, and business benefits.',
    url: 'https://corwa.in',
  },
};

export default function Home() {
  return <HomeClient />;
}
