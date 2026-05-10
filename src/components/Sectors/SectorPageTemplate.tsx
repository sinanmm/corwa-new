'use client';

import { useState } from 'react';
import { Sector } from '@/data/sectors';
import SectorHero from './SectorHero';
import OrganizationCard from './OrganizationCard';
import { Search, Info, Phone, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface SectorPageTemplateProps {
  sector: Sector;
  isMalayalam: boolean;
}

export default function SectorPageTemplate({ sector, isMalayalam }: SectorPageTemplateProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredOrgs = sector.organizations.filter(org => 
    org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (org.location && org.location.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gray-50/50">
      <SectorHero 
        title={isMalayalam ? (sector.titleMl || sector.title) : sector.title} 
        description={isMalayalam ? (sector.descriptionMl || sector.description) : sector.description}
        isMalayalam={isMalayalam}
      />

      <section className="py-12 -mt-10 relative z-20">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            
            {/* Search and Benefit Note */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
              <div className="lg:col-span-2">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input 
                    type="text"
                    placeholder={isMalayalam ? 'സ്ഥാപനങ്ങൾ തിരയുക...' : 'Search organizations...'}
                    className="w-full pl-12 pr-6 py-4 bg-white border border-gray-100 rounded-2xl shadow-sm focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              
              {(sector.benefitNote || sector.benefitNoteMl) && (
                <div className="bg-emerald-50 border border-emerald-100 p-5 rounded-2xl flex items-start gap-4">
                   <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center flex-shrink-0">
                      <Info className="w-5 h-5 text-emerald-600" />
                   </div>
                   <p className="text-sm text-emerald-800 leading-relaxed font-medium">
                      {isMalayalam ? (sector.benefitNoteMl || sector.benefitNote) : sector.benefitNote}
                   </p>
                </div>
              )}
            </div>

            {/* Organizations Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
              {filteredOrgs.map((org, index) => (
                <OrganizationCard key={index} organization={org} index={index} />
              ))}
              
              {filteredOrgs.length === 0 && (
                <div className="col-span-full py-20 text-center">
                   <p className="text-gray-500 text-lg">
                      {isMalayalam ? 'ഫലങ്ങളൊന്നും കണ്ടെത്തിയില്ല.' : 'No organizations found matching your search.'}
                   </p>
                </div>
              )}
            </div>

            {/* Support CTA */}
            <div className="bg-gradient-to-br from-[#0A3D2E] to-[#041f17] rounded-[2.5rem] p-10 md:p-16 text-white text-center relative overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
               <div className="relative z-10">
                  <h2 className="text-3xl md:text-4xl font-bold mb-6">
                    {isMalayalam ? 'കൂടുതൽ വിവരങ്ങൾ വേണോ?' : 'Need more assistance?'}
                  </h2>
                  <p className="text-emerald-100/80 mb-10 max-w-2xl mx-auto text-lg font-light">
                    {isMalayalam 
                      ? 'അഫിലിയേഷനെക്കുറിച്ചോ അംഗത്വ ആനുകൂല്യങ്ങളെക്കുറിച്ചോ സംശയമുണ്ടോ? ഞങ്ങളെ ബന്ധപ്പെടുക.' 
                      : 'Have questions about affiliation, specific discounts, or member benefits? Our team is ready to help.'}
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <a href="/#contact" className="px-8 py-4 bg-white text-[#0A3D2E] font-bold rounded-full hover:bg-gray-100 transition-all w-full sm:w-auto flex items-center justify-center gap-2">
                       <Phone className="w-5 h-5" />
                       {isMalayalam ? 'ബന്ധപ്പെടുക' : 'Contact Now'}
                    </a>
                    <a href="https://wa.me/919895008998" target="_blank" className="px-8 py-4 bg-[#25D366] text-white font-bold rounded-full hover:bg-[#1ebe57] transition-all w-full sm:w-auto flex items-center justify-center gap-2">
                       <MessageCircle className="w-5 h-5" />
                       {isMalayalam ? 'വാട്ട്‌സ്ആപ്പ് ചെയ്യുക' : 'WhatsApp Us'}
                    </a>
                  </div>
               </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
