'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useAssociations } from '@/hooks/useAssociations';
import { useDebounce } from '@/hooks/useDebounce';
import { useAppStore } from '@/store/useStore';
import { getAffiliatedAssociationLabel, isAffiliatedAssociation } from '@/utils/affiliatedAssociations';
import { ALL_INDIAN_STATES, INDIA_STATES_AND_DISTRICTS, MALAPPURAM_TALUKS } from '@/data/indiaLocations';
import {
  Search,
  MapPin,
  Building,
  ChevronLeft,
  ChevronRight,
  Activity,
  Star,
  Filter,
  RotateCcw,
  Globe2,
  ChevronDown,
  X,
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function AssociationsClient() {
  const { language } = useAppStore();
  const isMalayalam = language === 'malayalam';

  const [selectedState, setSelectedState] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedTaluk, setSelectedTaluk] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 500);
  const [page, setPage] = useState(1);
  const limit = 12;

  const availableDistricts = useMemo(() => {
    if (!selectedState) return [];
    return INDIA_STATES_AND_DISTRICTS[selectedState] || [];
  }, [selectedState]);

  const isMalappuramDistrict = selectedDistrict === 'Malappuram';

  const { data, isLoading, error } = useAssociations({
    page,
    limit,
    search: debouncedSearch,
    state: selectedState || undefined,
    district: selectedDistrict || undefined,
    taluk: selectedTaluk || undefined,
  });

  const handleStateChange = (stateName: string) => {
    setSelectedState(stateName);
    setSelectedDistrict('');
    setSelectedTaluk('');
    setPage(1);
  };

  const handleDistrictChange = (districtName: string) => {
    setSelectedDistrict(districtName);
    setSelectedTaluk('');
    setPage(1);
  };

  const handleTalukSelect = (taluk: string) => {
    setSelectedTaluk(taluk === selectedTaluk ? '' : taluk);
    setPage(1);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setPage(1);
  };

  const handleResetFilters = () => {
    setSelectedState('');
    setSelectedDistrict('');
    setSelectedTaluk('');
    setSearchTerm('');
    setPage(1);
  };

  const associations = data?.data?.associations || [];
  const pagination = data?.data?.pagination;
  const affiliatedVisibleCount = associations.filter(isAffiliatedAssociation).length;
  const hasActiveFilters = Boolean(selectedState || selectedDistrict || selectedTaluk || searchTerm);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50/30">
      <Header />

      {/* Header Banner */}
      <div className="bg-[#0A3D2E] pt-12 pb-24 px-6 rounded-b-[3rem] shadow-md">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-emerald-100 text-xs font-semibold mb-4 backdrop-blur-sm border border-white/10">
            <Globe2 className="w-3.5 h-3.5 text-[#DCAE1D]" />
            <span>{isMalayalam ? 'അഖിലേന്ത്യാ ഡയറക്ടറി' : 'All-India Directory'}</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-6">
            {isMalayalam ? 'അസോസിയേഷനുകളുടെ ഡയറക്ടറി' : 'Associations Directory'}
          </h1>
          <p className="text-emerald-100/80 mb-6 text-lg max-w-2xl mx-auto font-light">
            {isMalayalam
              ? 'സംസ്ഥാനം, ജില്ല, താലൂക്ക് അടിസ്ഥാനത്തിൽ അസോസിയേഷനുകൾ കണ്ടെത്തുക'
              : 'Filter and connect with Resident Welfare Associations starting from State, to District, to Taluk level.'}
          </p>
        </div>
      </div>

      <main className="flex-1 container mx-auto px-6 -mt-10 mb-24 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="w-full lg:w-1/4">
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 sticky top-24 space-y-6">
              {/* Filter Section Header */}
              <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                  <Filter className="w-5 h-5 text-[#DCAE1D]" />
                  {isMalayalam ? 'ഫിൽട്ടറുകൾ' : 'Location Filter'}
                </h3>
                {hasActiveFilters && (
                  <button
                    onClick={handleResetFilters}
                    className="text-xs text-red-600 hover:text-red-700 font-medium flex items-center gap-1 transition-colors"
                  >
                    <RotateCcw className="w-3 h-3" />
                    {isMalayalam ? 'റീസെറ്റ്' : 'Reset'}
                  </button>
                )}
              </div>

              {/* 1. STATE FILTER */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center justify-between">
                  <span>1. {isMalayalam ? 'സംസ്ഥാനം' : 'State'}</span>
                  {selectedState && (
                    <span className="text-[11px] font-normal text-[#0A3D2E] bg-emerald-50 px-2 py-0.5 rounded-full">
                      {selectedState}
                    </span>
                  )}
                </label>
                <div className="relative">
                  <select
                    value={selectedState}
                    onChange={(e) => handleStateChange(e.target.value)}
                    className="w-full appearance-none px-4 py-3 bg-gray-50 hover:bg-gray-100/80 border border-gray-200 rounded-xl text-sm font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#0A3D2E]/40 focus:border-[#0A3D2E] transition-all pr-10 cursor-pointer"
                  >
                    <option value="">
                      {isMalayalam ? 'എല്ലാ സംസ്ഥാനങ്ങളും (All India)' : 'All States (All India)'}
                    </option>
                    {ALL_INDIAN_STATES.map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* 2. DISTRICT FILTER */}
              <div className="space-y-2 pt-2 border-t border-gray-100">
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center justify-between">
                  <span>2. {isMalayalam ? 'ജില്ല' : 'District'}</span>
                  {selectedDistrict && (
                    <span className="text-[11px] font-normal text-[#0A3D2E] bg-emerald-50 px-2 py-0.5 rounded-full">
                      {selectedDistrict}
                    </span>
                  )}
                </label>
                <div className="relative">
                  <select
                    disabled={!selectedState}
                    value={selectedDistrict}
                    onChange={(e) => handleDistrictChange(e.target.value)}
                    className="w-full appearance-none px-4 py-3 bg-gray-50 hover:bg-gray-100/80 disabled:opacity-50 disabled:cursor-not-allowed border border-gray-200 rounded-xl text-sm font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#0A3D2E]/40 focus:border-[#0A3D2E] transition-all pr-10 cursor-pointer"
                  >
                    <option value="">
                      {!selectedState
                        ? isMalayalam
                          ? 'ആദ്യം സംസ്ഥാനം തിരഞ്ഞെടുക്കുക'
                          : 'Select State First'
                        : isMalayalam
                          ? `എല്ലാ ജില്ലകളും (${selectedState})`
                          : `All Districts (${selectedState})`}
                    </option>
                    {availableDistricts.map((district) => (
                      <option key={district} value={district}>
                        {district}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* 3. TALUK FILTER (Available for Malappuram district) */}
              <div className="space-y-2 pt-2 border-t border-gray-100">
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
                  3. {isMalayalam ? 'താലൂക്ക്' : 'Taluk'}
                </label>

                {isMalappuramDistrict || (!selectedState && !selectedDistrict) || (selectedState === 'Kerala' && !selectedDistrict) ? (
                    <div className="flex flex-wrap gap-2 lg:flex-col lg:gap-2 pt-1 max-h-72 overflow-y-auto pr-1">
                      <button
                        onClick={() => handleTalukSelect('')}
                      className={`px-3.5 py-2 text-xs rounded-xl font-medium transition-all text-left w-full border ${selectedTaluk === ''
                            ? 'bg-[#0A3D2E] text-white border-[#0A3D2E] shadow-sm'
                            : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border-transparent hover:border-gray-200'
                      }`}
                    >
                      {isMalayalam ? 'എല്ലാ താലൂക്കുകളും (പട്ടിക)' : 'All Taluks (Filter)'}
                    </button>
                    {MALAPPURAM_TALUKS.map((t) => (
                      <Link
                        key={t}
                        href={`/taluks/${t.toLowerCase()}`}
                        className="px-3.5 py-2.5 text-xs rounded-xl font-medium transition-all text-left w-full flex items-center justify-between group bg-gray-50 text-gray-800 hover:bg-[#0A3D2E] hover:text-white border border-gray-100 hover:border-[#0A3D2E] shadow-xs"
                        title={`Open ${t} Taluk Page`}
                      >
                        <span className="font-semibold">{t}</span>
                        <span className="inline-flex items-center gap-1 text-[11px] text-gray-400 group-hover:text-emerald-200 font-medium">
                          <span>{isMalayalam ? 'പേജ് കാണുക' : 'View Page'}</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </span>
                      </Link>
                ))}
              </div>
              ) : (
              <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-xl text-xs text-amber-800 space-y-2">
                <p>
                  {isMalayalam
                    ? 'നിലവിൽ മലപ്പുറം ജില്ലയിലെ താലൂക്കുകളാണ് ലഭ്യമായിട്ടുള്ളത്.'
                    : 'Taluk-level directory is currently available for Malappuram district.'}
                </p>
              </div>
                )}
            </div>

            {/* SEARCH OPTION */}
            <div className="pt-2 border-t border-gray-100">
              <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2 flex items-center gap-2">
                <Search className="w-3.5 h-3.5 text-[#DCAE1D]" />
                {isMalayalam ? 'തിരയുക' : 'Search by Name'}
              </h3>
              <div className="relative w-full rounded-xl">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder={isMalayalam ? 'അസോസിയേഷൻ തിരയുക...' : 'Search association...'}
                  value={searchTerm}
                  onChange={handleSearch}
                  className="block w-full pl-9 pr-8 py-2.5 bg-gray-50 border border-gray-200 text-gray-900 rounded-xl shadow-inner focus:ring-2 focus:ring-[#0A3D2E]/50 focus:border-[#0A3D2E] transition-all text-xs outline-none"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Results Grid */}
        <div className="w-full lg:w-3/4 pt-8 lg:pt-0">
          {/* Active Hierarchy Breadcrumb */}
          <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm mb-6 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-gray-600">
              <span className="text-gray-400 font-semibold">{isMalayalam ? 'വഴി:' : 'Filter:'}</span>
              <span
                onClick={() => handleStateChange('')}
                className={`cursor-pointer px-2.5 py-1 rounded-lg border ${!selectedState
                  ? 'bg-[#0A3D2E] text-white border-[#0A3D2E]'
                  : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                  }`}
              >
                All India
              </span>
              {selectedState && (
                <>
                  <span className="text-gray-300">/</span>
                  <span
                    onClick={() => handleDistrictChange('')}
                    className={`cursor-pointer px-2.5 py-1 rounded-lg border ${selectedState && !selectedDistrict
                      ? 'bg-[#0A3D2E] text-white border-[#0A3D2E]'
                      : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                      }`}
                  >
                    {selectedState}
                  </span>
                </>
              )}
              {selectedDistrict && (
                <>
                  <span className="text-gray-300">/</span>
                  <span
                    onClick={() => handleTalukSelect('')}
                    className={`cursor-pointer px-2.5 py-1 rounded-lg border ${selectedDistrict && !selectedTaluk
                      ? 'bg-[#0A3D2E] text-white border-[#0A3D2E]'
                      : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                      }`}
                  >
                    {selectedDistrict}
                  </span>
                </>
              )}
              {selectedTaluk && (
                <>
                  <span className="text-gray-300">/</span>
                  <span className="px-2.5 py-1 rounded-lg border bg-[#0A3D2E] text-white border-[#0A3D2E]">
                    {selectedTaluk}
                  </span>
                </>
              )}
            </div>

            {hasActiveFilters && (
              <button
                onClick={handleResetFilters}
                className="text-xs font-semibold text-gray-500 hover:text-red-600 flex items-center gap-1 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                {isMalayalam ? 'എല്ലാം മാറ്റുക' : 'Clear All'}
              </button>
            )}
          </div>

          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                {isMalayalam ? 'അസോസിയേഷനുകൾ' : 'Registered Associations'}
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                {pagination
                  ? `Showing ${associations.length} of ${pagination.total} results`
                  : 'Loading results...'}
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
                <div
                  key={i}
                  className="animate-pulse bg-white p-6 rounded-3xl border border-gray-100 shadow-sm"
                >
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
              <p className="text-sm opacity-80 mt-1">
                Please try again later or check your connection.
              </p>
            </div>
          ) : associations.length === 0 ? (
            <div className="bg-white p-12 rounded-3xl text-center border border-gray-100 shadow-sm flex flex-col items-center">
              <Building className="w-16 h-16 text-gray-300 mb-4" />
              <h3 className="text-lg font-bold text-gray-700">No Associations Found</h3>
              <p className="text-gray-500 mt-2 max-w-md">
                {selectedDistrict && selectedDistrict !== 'Malappuram'
                  ? `No registered associations found in ${selectedDistrict}. Association directory data is currently registered for Malappuram district.`
                  : selectedState && selectedState !== 'Kerala'
                    ? `No registered associations found in ${selectedState}. Association directory data is currently registered for Kerala.`
                    : 'Could not find any associations matching your search or filter.'}
              </p>
              {(selectedState || selectedDistrict || selectedTaluk) && (
                <button
                  onClick={handleResetFilters}
                  className="mt-6 px-5 py-2.5 bg-[#0A3D2E] text-white text-xs font-semibold rounded-xl shadow-md hover:bg-[#082b20] transition-colors"
                >
                  {isMalayalam ? 'എല്ലാ അസോസിയേഷനുകളും കാണിക്കുക' : 'Show All Associations'}
                </button>
              )}
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
                    transition={{ delay: i * 0.04 }}
                    key={assoc._id}
                    className={`rounded-3xl p-6 border shadow-sm hover:shadow-xl transition-all group ${isAffiliated
                      ? 'bg-gradient-to-br from-amber-50 via-white to-white border-amber-200 shadow-amber-100/70'
                      : 'bg-white border-gray-100'
                      }`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div
                        className={`p-3 rounded-2xl transition-colors ${isAffiliated
                          ? 'bg-amber-100 text-amber-900 group-hover:bg-amber-200'
                          : 'bg-emerald-50 group-hover:bg-[#0A3D2E] group-hover:text-white'
                          }`}
                      >
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
                        {isAffiliated && (
                          <Star className="mt-1 h-4 w-4 shrink-0 fill-current text-amber-500" />
                        )}
                        <span>{assoc.name}</span>
                      </h3>
                      {affiliatedLabel && (
                        <p className="text-xs leading-relaxed text-amber-900/80">
                          {affiliatedLabel}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-2 mt-4">
                      <Link
                        href={`/taluks/${assoc.taluk.toLowerCase()}`}
                        className="px-3 py-1 bg-yellow-50 hover:bg-yellow-100 text-yellow-800 text-xs font-semibold rounded-full flex items-center gap-1 border border-yellow-200 transition-colors shadow-xs"
                        title={`Open ${assoc.taluk} Taluk Page`}
                      >
                        <MapPin className="w-3 h-3 text-[#DCAE1D]" /> {assoc.taluk} ↗
                      </Link>
                      <span className="px-3 py-1 bg-gray-50 text-gray-600 text-xs font-semibold rounded-full border border-gray-100">
                        {assoc.district}
                      </span>
                      <span className="px-3 py-1 bg-emerald-50 text-emerald-800 text-xs font-semibold rounded-full border border-emerald-100">
                        {assoc.state || 'Kerala'}
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
                  if (
                    i + 1 === page ||
                    i + 1 === page - 1 ||
                    i + 1 === page + 1 ||
                    i + 1 === 1 ||
                    i + 1 === pagination.totalPages
                  ) {
                    return (
                      <button
                        key={i}
                        onClick={() => setPage(i + 1)}
                        className={`w-10 h-10 rounded-xl text-sm font-semibold transition-all ${page === i + 1
                          ? 'bg-[#0A3D2E] text-white shadow-md'
                          : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                          }`}
                      >
                        {i + 1}
                      </button>
                    );
                  }
                  if (i + 1 === page - 2 || i + 1 === page + 2) {
                    return (
                      <span key={i} className="text-gray-400">
                        ...
                      </span>
                    );
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
      </main >

    <Footer />
    </div >
  );
}
