import type { Metadata } from 'next';
import { sectors } from '@/data/sectors';
import SectorClient from './SectorClient';

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const sector = sectors.find(s => s.slug === slug);

  if (!sector) {
    return { title: 'Sector Not Found' };
  }

  const orgNames = sector.organizations
    .slice(0, 3)
    .map(o => o.name)
    .join(', ');

  return {
    title: `${sector.title} – CoRWA Partner Sector`,
    description: `${sector.description} Partner organizations include ${orgNames} and more. Exclusive discounts for CoRWA members.`,
    alternates: {
      canonical: `https://corwa.in/sectors/${slug}`,
    },
    openGraph: {
      title: `${sector.title} | CoRWA`,
      description: sector.description,
      url: `https://corwa.in/sectors/${slug}`,
    },
  };
}

export function generateStaticParams() {
  return sectors.map(s => ({ slug: s.slug }));
}

export default function SectorPage() {
  return <SectorClient />;
}
