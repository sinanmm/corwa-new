'use client';

import { motion } from 'framer-motion';
import { ChevronRight, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface SectorHeroProps {
  title: string;
  description: string;
  isMalayalam: boolean;
}

export default function SectorHero({ title, description, isMalayalam }: SectorHeroProps) {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden bg-[#0A3D2E] text-white">
      {/* Background patterns */}
      <div className="absolute inset-0 z-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
           <defs>
             <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
               <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5"/>
             </pattern>
           </defs>
           <rect width="100" height="100" fill="url(#grid)" />
        </svg>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <Link 
          href="/#services" 
          className="inline-flex items-center gap-2 text-emerald-200 hover:text-[#DCAE1D] mb-8 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">{isMalayalam ? 'തിരികെ സേവനങ്ങളിലേക്ക്' : 'Back to Services'}</span>
        </Link>

        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           className="max-w-4xl"
        >
          <div className="flex items-center gap-4 mb-4">
             <div className="h-1 w-12 bg-[#DCAE1D] rounded-full"></div>
             <span className="text-[#DCAE1D] font-bold tracking-widest uppercase text-xs">Sector Details</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
            {title}
          </h1>
          <p className="text-lg md:text-xl text-emerald-100/80 leading-relaxed font-light">
            {description}
          </p>
        </motion.div>
      </div>
      
      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] translate-y-1">
          <svg className="relative block w-[calc(100%+1.3px)] h-[50px] fill-gray-50/50" viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
          </svg>
      </div>
    </section>
  );
}
