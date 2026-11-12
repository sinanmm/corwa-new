import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { TALUKS_MAP } from '@/data/taluksData';
import TalukClient from './TalukClient';

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const taluk = TALUKS_MAP[slug.toLowerCase()];

  if (!taluk) {
    return { title: 'Taluk Not Found | CoRWA' };
  }

  return {
    title: `${taluk.name} Taluk Committee – CoRWA | Malappuram`,
    description: taluk.description,
    alternates: {
      canonical: `https://corwa.in/taluks/${slug}`,
    },
    openGraph: {
      title: `${taluk.name} Taluk Committee | CoRWA`,
      description: taluk.description,
      url: `https://corwa.in/taluks/${slug}`,
    },
  };
}

export function generateStaticParams() {
  return Object.keys(TALUKS_MAP).map((slug) => ({ slug }));
}

export default async function TalukPage({ params }: Props) {
  const { slug } = await params;
  const taluk = TALUKS_MAP[slug.toLowerCase()];

  if (!taluk) {
    notFound();
  }

  return <TalukClient taluk={taluk} />;
}

