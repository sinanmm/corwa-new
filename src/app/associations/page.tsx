import type { Metadata } from 'next';
import AssociationsClient from './AssociationsClient';

export const metadata: Metadata = {
  title: 'Associations Directory',
  description:
    'Browse and search 100+ Resident Welfare Associations across Malappuram district. Filter by Taluk – Eranad, Ponnani, Tirur, Perinthalmanna, and more.',
  alternates: {
    canonical: 'https://corwa.in/associations',
  },
  openGraph: {
    title: 'Associations Directory | CoRWA',
    description:
      'Browse and search 100+ Resident Welfare Associations across Malappuram district. Filter by Taluk.',
    url: 'https://corwa.in/associations',
  },
};

export default function AssociationsPage() {
  return <AssociationsClient />;
}
