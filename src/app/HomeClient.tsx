'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactForm from '@/components/ContactForm';
import AboutMediaSection from '@/components/AboutMediaSection';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useAppStore } from '@/store/useStore';
import { ChevronRight, ShieldCheck, HeartPulse, Building2, Users, Leaf, Palmtree, Briefcase, TreePine, GraduationCap, Car, ArrowUpRight, ExternalLink } from 'lucide-react';
import { sectors } from '@/data/sectors';

export default function HomeClient() {
  const { language } = useAppStore();

  const isMalayalam = language === 'malayalam';

  // Map icon names to Lucide components
  const iconMap: Record<string, React.ReactNode> = {
    HeartPulse: <HeartPulse className="w-8 h-8 text-[#DCAE1D]" />,
    Leaf: <Leaf className="w-8 h-8 text-emerald-500" />,
    Palmtree: <Palmtree className="w-8 h-8 text-blue-400" />,
    Briefcase: <Briefcase className="w-8 h-8 text-amber-500" />,
    Users: <Users className="w-8 h-8 text-purple-400" />,
    TreePine: <TreePine className="w-8 h-8 text-green-500" />,
    GraduationCap: <GraduationCap className="w-8 h-8 text-indigo-400" />,
    Building2: <Building2 className="w-8 h-8 text-slate-400" />,
    Car: <Car className="w-8 h-8 text-red-400" />,
    ShieldCheck: <ShieldCheck className="w-8 h-8 text-green-400" />,
  };

  return (
    <div className="flex flex-col min-h-screen font-sans bg-gray-50/50">
      <Header />

      {/* HERO SECTION */}
      <section className="relative overflow-hidden min-h-screen flex flex-col justify-center text-white pt-32 pb-24 shadow-[inset_0_-20px_40px_rgba(0,0,0,0.1)] border-b border-white/10">
        {/* Pro-Level Aerial Background */}
        <div className="absolute inset-0 z-0">
          <motion.div
            initial={{ scale: 1.05 }}
            animate={{ scale: 1 }}
            transition={{ duration: 15, ease: "easeOut" }}
            className="w-full h-full"
          >
            <img src="/hero-bg.jpg" alt="Malappuram Downhill Aerial View" className="w-full h-full object-cover object-[center_30%]" />
          </motion.div>

          {/* Deepened Elegant Gradient Overlays for High-End Cinematic Look */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A3D2E]/90 via-[#0A3D2E]/70 to-[#041f17]/95 mix-blend-multiply" />
          <div className="absolute inset-0 bg-black/40" />

          {/* Subtle noise grain pattern to add technical/modern touch - using CSS only */}
          <div className="absolute inset-0 opacity-[0.04] mix-blend-overlay" style={{backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")"}}></div>

          {/* Lighting Flare */}
          <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-[#DCAE1D]/10 rounded-full blur-[150px] mix-blend-screen pointer-events-none"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full max-w-4xl"
          >
            {/* Premium Glassmorphism Container */}
            <div className="backdrop-blur-xl bg-[#0A3D2E]/30 border border-white/10 p-8 md:p-14 rounded-[2.5rem] shadow-2xl relative overflow-hidden text-center">

              {/* Decorative Top Accent Line */}
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#DCAE1D] to-transparent opacity-60"></div>

              {/* Organization Trust Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8 shadow-sm"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-[#DCAE1D] animate-pulse shadow-[0_0_8px_#DCAE1D]"></span>
                <span className="text-[11px] font-bold tracking-[0.2em] text-[#DCAE1D] uppercase">Kerala State Committee</span>
              </motion.div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-8 leading-[1.1] text-white">
                {isMalayalam ? 'റെസിഡന്റ്സ് അസോസിയേഷനുകളുടെ ക്ഷേമത്തിനായി' : 'Empowering Welfare and Unity for Associations'}
              </h1>

              <p className="text-lg md:text-xl text-gray-200 mb-10 leading-relaxed font-light mx-auto max-w-3xl">
                {isMalayalam
                  ? 'CoRWA (Confederation of Resident Welfare Associations) – നിങ്ങളുടെ അസോസിയേഷൻ മെച്ചപ്പെടുത്തുന്നതിനായി നിരവധി ആരോഗ്യ, യാത്രാ, വാണിജ്യ ആനുകൂല്യങ്ങൾ ഞങ്ങൾ നൽകുന്നു.'
                  : 'CoRWA connects Resident Welfare Associations providing premium healthcare, tourism, and business benefits. Join us to strengthen your community network.'}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
                <Link href="/associations" className="group px-8 py-4 bg-gradient-to-r from-[#DCAE1D] to-yellow-500 text-[#0A3D2E] font-extrabold rounded-full shadow-[0_0_20px_rgba(220,174,29,0.3)] hover:shadow-[0_0_30px_rgba(220,174,29,0.6)] hover:scale-105 hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto flex items-center justify-center gap-2">
                  {isMalayalam ? 'അസോസിയേഷനുകൾ തിരയുക' : 'Find Associations'}
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link href="#services" className="px-8 py-4 bg-white/5 text-white font-semibold rounded-full border border-white/20 hover:bg-white/10 hover:border-white/40 transition-all duration-300 backdrop-blur-md w-full sm:w-auto hover:-translate-y-1 shadow-xl">
                  {isMalayalam ? 'സേവനങ്ങൾ കാണുക' : 'View Benefits'}
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="mt-12 pt-8 border-t border-white/10 flex flex-wrap justify-center gap-6 md:gap-10 text-sm text-gray-300 font-medium">
                <div className="flex items-center gap-2"><span className="text-[#DCAE1D] font-bold text-2xl">100+</span> <span>Associations</span></div>
                <div className="flex items-center gap-2"><span className="text-[#DCAE1D] font-bold text-2xl">5+</span> <span>Sectors</span></div>
                <div className="flex items-center gap-2"><span className="text-[#DCAE1D] font-bold text-2xl">14</span> <span>Districts</span></div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ABOUT & MEDIA SECTION */}
      <AboutMediaSection />

      {/* SERVICES SECTION */}
      <section id="services" className="py-24 bg-gray-50/50">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[#0A3D2E] mb-4">
              {isMalayalam ? 'ലഭ്യമായ ആനുകൂല്യങ്ങളും സ്ഥാപനങ്ങളും' : 'Our Associated Sectors & Benefits'}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {isMalayalam
                ? 'CoRWA അംഗങ്ങൾക്ക് താഴെപ്പറയുന്ന സ്ഥാപനങ്ങളിൽ നിശ്ചിത ശതമാനം ആനുകൂല്യങ്ങൾ ലഭ്യമാണ്.'
                : 'CoRWA members receive excusive discounts and benefits across top medical, tourism, and governmental institutions.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sectors.map((sector, index) => {
              const organization = sector.organizations.length === 1 ? sector.organizations[0] : null;
              const hasExternalLink = organization && organization.website;

              return (
                <Link key={sector.slug} href={hasExternalLink ? organization.website! : `/sectors/${sector.slug}`} target={hasExternalLink ? "_blank" : undefined} rel={hasExternalLink ? "noopener noreferrer" : undefined}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-white border border-gray-100 p-8 rounded-[2rem] shadow-sm hover:shadow-xl transition-all group relative overflow-hidden h-full flex flex-col cursor-pointer"
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50/50 rounded-bl-[4rem] -mr-16 -mt-16 transition-all group-hover:scale-150 group-hover:bg-emerald-100"></div>

                    <div className="bg-gray-50 w-16 h-16 rounded-2xl shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-white group-hover:rotate-3 transition-all duration-300 relative z-10">
                      {iconMap[sector.iconName] || <ShieldCheck className="w-8 h-8 text-gray-400" />}
                    </div>

                    <div className="relative z-10 flex-grow">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-bold text-gray-800 transition-colors group-hover:text-[#0A3D2E]">
                          {isMalayalam ? (sector.titleMl || sector.title) : sector.title}
                        </h3>
                        {hasExternalLink ? (
                          <ExternalLink className="w-5 h-5 text-[#DCAE1D] group-hover:scale-110 transition-transform" />
                        ) : (
                          <ArrowUpRight className="w-5 h-5 text-gray-300 group-hover:text-[#DCAE1D] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                        )}
                      </div>

                      <p className="text-sm text-gray-500 line-clamp-2 mb-6 leading-relaxed">
                        {isMalayalam ? (sector.descriptionMl || sector.description) : sector.description}
                      </p>

                      <div className="space-y-2.5">
                        {sector.organizations.slice(0, 3).map((org, i) => (
                          <div key={i} className="text-xs text-gray-600 flex items-center gap-2 font-medium">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#DCAE1D]"></div>
                            <span className="truncate">{org.name}</span>
                          </div>
                        ))}
                        {sector.organizations.length > 3 && (
                          <div className="text-[11px] text-[#0A3D2E] font-bold mt-2 uppercase tracking-wider">
                            + {sector.organizations.length - 3} {isMalayalam ? 'കൂടുതൽ സ്ഥാപനങ്ങൾ' : 'more organizations'}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-gray-50 flex items-center justify-between text-[#0A3D2E] font-bold text-sm opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0 text-left">
                      <span>
                        {hasExternalLink
                          ? (isMalayalam ? 'വെബ്സൈറ്റ് സന്ദർശിക്കുക' : 'Visit Official Website')
                          : (isMalayalam ? 'സ്ഥാപനങ്ങൾ കാണുക' : 'View Organizations')}
                      </span>
                      {hasExternalLink ? <ExternalLink className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                    </div>
                  </motion.div>
                </Link>
              );
            })}
          </div>

          <div className="mt-16 text-center">
            <div className="inline-block bg-yellow-50 border border-yellow-200 rounded-2xl p-6 shadow-sm">
              <p className="font-medium text-yellow-800">
                {isMalayalam
                  ? 'കുറിപ്പ്: ഡിസ്കൗണ്ടുകളും ആനുകൂല്യങ്ങളും ലഭിക്കുന്നതിനായി CoRWA അംഗത്വം അഫീലിയെഷൻ ചെയ്യേണ്ടതാണ്.'
                  : 'Note: To avail these discounts and benefits, affiliation to CoRWA membership is mandatory.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-24 bg-gradient-to-br from-[#0A3D2E] to-[#041f17] text-white">
        <div className="container mx-auto px-6 text-center">
             <h2 className="text-3xl md:text-5xl font-bold mb-8">
               Ready to Register Your Association?
             </h2>
             <p className="text-gray-300 max-w-2xl mx-auto mb-10 text-lg">
                Join hundreds of other associations across Malappuram, Ernakulam, Wayanad and more.
             </p>
             <Link href="/associations" className="px-8 py-4 bg-white text-[#0A3D2E] font-bold rounded-full shadow-lg hover:bg-gray-100 transition-all inline-block hover:-translate-y-1">
                Explore Associations Directory
             </Link>
        </div>
      </section>

      <ContactForm />
      <Footer />
    </div>
  );
}
