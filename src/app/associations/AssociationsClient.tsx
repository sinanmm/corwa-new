'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useAssociations } from '@/hooks/useAssociations';
import { useDebounce } from '@/hooks/useDebounce';
import { useAppStore } from '@/store/useStore';
import { getAffiliatedAssociationLabel, isAffiliatedAssociation } from '@/utils/affiliatedAssociations';
import { Search, MapPin, Building, ChevronLeft, ChevronRight, Activity, Star } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AssociationsClient() {
  const { language } = useAppStore();
  const isMalayalam = language === 'malayalam';

  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 500);
  const [selectedTaluk, setSelectedTaluk] = useState('');
  const [page, setPage] = useState(1);
  const limit = 12;

  const taluks = ['Eranad', 'Ponnani', 'Perinthalmanna', 'Tirur', 'Tirurangadi', 'Kondotty', 'Nilambur'];

  const { data, isLoading, error } = useAssociations({
    page,
    limit,
    search: debouncedSearch,
    taluk: selectedTaluk || undefined,
  });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setPage(1);
  };

  const handleTalukSelect = (taluk: string) => {
    setSelectedTaluk(taluk === selectedTaluk ? '' : taluk);
    setPage(1);
  };

  const associations = data?.data?.associations || [];
  const pagination = data?.data?.pagination;
  const affiliatedVisibleCount = associations.filter(isAffiliatedAssociation).length;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50/30">
      <Header />

      {/* Header */}
      <div className="bg-[#0A3D2E] pt-12 pb-24 px-6 rounded-b-[3rem] shadow-md">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-6">
            {isMalayalam ? 'അസോസിയേഷനുകളുടെ ഡയറക്ടറി' : 'Associations Directory'}
          </h1>
          <p className="text-emerald-100/80 mb-10 text-lg max-w-2xl mx-auto font-light">
            {isMalayalam
              ? 'തിരയുക, നിങ്ങളുടെ താലൂക്കിലെ അസോസിയേഷനുകൾ കണ്ടെത്തുക'
              : 'Search and connect with Resident Welfare Associations across various Taluks in Malappuram district.'}
          </p>
        </div>
      </div>

      <main className="flex-1 container mx-auto px-6 -mt-10 mb-24 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Filters Sidebar */}
          <div className="w-full lg:w-1/4">
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 sticky top-24">
              <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#DCAE1D]" />
                {isMalayalam ? 'താലൂക്കുകൾ' : 'Filter By Taluk'}
              </h3>
              <div className="flex flex-wrap gap-2 lg:flex-col lg:gap-3">
                <button
                  onClick={() => handleTalukSelect('')}
                  className={`px-4 py-3 text-sm rounded-xl font-medium transition-all text-left w-full border ${
                    selectedTaluk === ''
                      ? 'bg-[#0A3D2E] text-white border-[#0A3D2E] shadow-md'
                      : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border-transparent hover:border-gray-200'
                  }`}
                >
                  {isMalayalam ? 'എല്ലാം കാണുക' : 'All Taluks'}
                </button>
                {taluks.map((t) => (
                  <button
                    key={t}
                    onClick={() => handleTalukSelect(t)}
                    className={`px-4 py-3 text-sm rounded-xl font-medium transition-all text-left w-full border ${
                      selectedTaluk === t
                      ? 'bg-[#0A3D2E] text-white border-[#0A3D2E] shadow-md'
                      : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border-transparent hover:border-gray-200'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>

              {/* Search Option Under Taluks */}
              <div className="mt-8 pt-6 border-t border-gray-100">
                <h3 className="text-sm font-bold text-gray-800 mb-4 flex items-center gap-2 uppercase tracking-wider">
                  <Search className="w-4 h-4 text-[#DCAE1D]" />
                  {isMalayalam ? 'തിരയുക' : 'Search'}
                </h3>
                <div className="relative w-full rounded-xl">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder={isMalayalam ? 'അസോസിയേഷൻ തിരയുക...' : 'Search association...'}
                    value={searchTerm}
                    onChange={handleSearch}
                    className="block w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 text-gray-900 rounded-xl shadow-inner focus:ring-2 focus:ring-[#0A3D2E]/50 focus:border-[#0A3D2E] transition-all text-sm outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Results Grid */}
          <div className="w-full lg:w-3/4 pt-8 lg:pt-0">
            <div className="flex justify-between items-end mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  {isMalayalam ? 'അസോസിയേഷനുകൾ' : 'Registered Associations'}
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  {pagination ? `Showing ${associations.length} of ${pagination.total} results` : 'Loading results...'}
                </p>
              </div>
              {affiliatedVisibleCount > 0 && (
                <div className="hidden sm:flex items-center gap-2 rounded-full border border-amber-200 bg-gradient-to-r from-amber-50 via-white to-yellow-50 px-4 py-2 text-sm font-semibold text-amber-900 shadow-sm">
                  <Star className="h-4 w-4 fill-current text-amber-500" />
                  <span>{affiliatedVisibleCount} affiliated associations highlighted</span>
                </div>
              )}
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[...Array(6)].map((_, i) => (
                   <div key={i} className="animate-pulse bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                      <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                      <div className="h-3 bg-gray-100 rounded w-1/2 mb-6"></div>
                      <div className="flex gap-2">
                        <div className="h-6 w-16 bg-gray-100 rounded-full"></div>
                        <div className="h-6 w-16 bg-gray-100 rounded-full"></div>
                      </div>
                   </div>
                ))}
              </div>
            ) : error ? (
              <div className="bg-red-50 text-red-600 p-6 rounded-3xl text-center border border-red-100 flex flex-col items-center">
                <Activity className="w-12 h-12 mb-4 text-red-400" />
                <p className="font-semibold">Error loading associations</p>
                <p className="text-sm opacity-80 mt-1">Please try again later or check your connection.</p>
              </div>
            ) : associations.length === 0 ? (
              <div className="bg-white p-12 rounded-3xl text-center border border-gray-100 shadow-sm flex flex-col items-center">
                <Building className="w-16 h-16 text-gray-300 mb-4" />
                <h3 className="text-lg font-bold text-gray-700">No Associations Found</h3>
                <p className="text-gray-500 mt-2">Could not find any associations matching your search or filter.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {associations.map((assoc, i: number) => {
                  const affiliatedLabel = getAffiliatedAssociationLabel(assoc.name);
                  const isAffiliated = Boolean(affiliatedLabel);

                  return (
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      key={assoc._id}
                      className={`rounded-3xl p-6 border shadow-sm hover:shadow-xl transition-all group ${
                        isAffiliated
                          ? 'bg-gradient-to-br from-amber-50 via-white to-white border-amber-200 shadow-amber-100/70'
                          : 'bg-white border-gray-100'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-4">
                         <div className={`p-3 rounded-2xl transition-colors ${
                           isAffiliated
                             ? 'bg-amber-100 text-amber-900 group-hover:bg-amber-200'
                             : 'bg-emerald-50 group-hover:bg-[#0A3D2E] group-hover:text-white'
                         }`}>
                            <Building className="w-6 h-6 text-[#0A3D2E] group-hover:text-[#DCAE1D]" />
                         </div>
                         {isAffiliated && (
                           <div className="inline-flex items-center gap-1 rounded-full border border-amber-200 bg-white/90 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-amber-700 shadow-sm">
                             <Star className="h-3.5 w-3.5 fill-current text-amber-500" />
                             Affiliated
                           </div>
                         )}
                      </div>
                      <div className="space-y-2">
                        <h3 className="flex items-start gap-2 text-lg font-bold text-gray-900 leading-tight group-hover:text-[#0A3D2E] transition-colors">
                          {isAffiliated && <Star className="mt-1 h-4 w-4 shrink-0 fill-current text-amber-500" />}
                          <span>{assoc.name}</span>
                        </h3>
                        {affiliatedLabel && (
                          <p className="text-xs leading-relaxed text-amber-900/80">
                            {affiliatedLabel}
                          </p>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-2 mt-4">
                        <span className="px-3 py-1 bg-yellow-50 text-yellow-800 text-xs font-semibold rounded-full flex items-center gap-1 border border-yellow-100">
                          <MapPin className="w-3 h-3" /> {assoc.taluk}
                        </span>
                        <span className="px-3 py-1 bg-gray-50 text-gray-600 text-xs font-semibold rounded-full border border-gray-100">
                          {assoc.district}
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}

            {/* Pagination Controls */}
            {pagination && pagination.totalPages > 1 && (
              <div className="flex justify-center items-center mt-12 space-x-2">
                <button
                  disabled={page === 1}
                  onClick={() => setPage(page - 1)}
                  className="p-3 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm transition-all"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-600" />
                </button>
                <div className="flex items-center space-x-1 px-4">
                  {[...Array(pagination.totalPages)].map((_, i) => {
                     if (i + 1 === page || i + 1 === page - 1 || i + 1 === page + 1 || i + 1 === 1 || i + 1 === pagination.totalPages) {
                        return (
                          <button
                            key={i}
                            onClick={() => setPage(i + 1)}
                            className={`w-10 h-10 rounded-xl text-sm font-semibold transition-all ${
                              page === i + 1
                                ? 'bg-[#0A3D2E] text-white shadow-md'
                                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                            }`}
                          >
                            {i + 1}
                          </button>
                        );
                     }
                     if (i + 1 === page - 2 || i + 1 === page + 2) {
                        return <span key={i} className="text-gray-400">...</span>;
                     }
                     return null;
                  })}
                </div>
                <button
                  disabled={page === pagination.totalPages}
                  onClick={() => setPage(page + 1)}
                  className="p-3 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm transition-all"
                >
                  <ChevronRight className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
