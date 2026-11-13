import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAssociationBySlug, getAllAssociationSlugs } from '@/data/associationData';
import AssociationClient from './AssociationClient';

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const assoc = getAssociationBySlug(slug);

  if (!assoc) {
    return { title: 'Association Not Found | CoRWA' };
  }

  return {
    title: `${assoc.name} (${assoc.nameMl}) – CoRWA | ${assoc.taluk}`,
    description: assoc.description,
    alternates: {
      canonical: `https://corwa.in/associations/${slug}`,
    },
    openGraph: {
      title: `${assoc.name} | CoRWA`,
      description: assoc.description,
      url: `https://corwa.in/associations/${slug}`,
    },
  };
}

export function generateStaticParams() {
  return getAllAssociationSlugs().map((slug) => ({ slug }));
}

export default async function AssociationDetailPage({ params }: Props) {
  const { slug } = await params;
  const assoc = getAssociationBySlug(slug);

  if (!assoc) {
    notFound();
  }

  return <AssociationClient assoc={assoc} />;
}

