'use client';

import { useParams, notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SectorPageTemplate from '@/components/Sectors/SectorPageTemplate';
import { sectors } from '@/data/sectors';
import { useAppStore } from '@/store/useStore';

export default function SectorPage() {
  const { slug } = useParams();
  const { language } = useAppStore();
  const isMalayalam = language === 'malayalam';

  // useParams returns a string or string array, handle safely
  const sectorSlug = Array.isArray(slug) ? slug[0] : slug;
  const sector = sectors.find(s => s.slug === sectorSlug);

  if (!sector) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <SectorPageTemplate sector={sector} isMalayalam={isMalayalam} />
      </main>
      <Footer />
    </div>
  );
}
