import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X } from 'lucide-react';
import { useAppStore } from '@/store/useStore';

const videoIds = [
  'Xk8pEATc0Ws', '-FXyBlyhqz8', 'y2IEn9sfMDQ', '_4Sy45ilnQA', 
  'lQWjqL1s1ik', 'WEp-t2870uc', 'VZZZpGoZJR4', 'yAB6cBcRRt0', 
  'B_FPtCSYNWo', 'JvbSW0Bw9Bw', 'fs5eCzEGrk0', 'a7yFOtxApe0', '3JyEDn4bgmk'
];

const galleryImages = [
  '/WhatsApp Image 2026-03-30 at 4.43.32 PM (1).jpeg',
  '/WhatsApp Image 2026-03-30 at 4.43.32 PM.jpeg'
];

export default function AboutMediaSection() {
  const { language } = useAppStore();
  const isMalayalam = language === 'malayalam';
  
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  return (
    <section id="about" className="py-24 bg-white relative">
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-[#0A3D2E] mb-6"
          >
            {isMalayalam ? 'ഞങ്ങളെക്കുറിച്ച്' : 'About CoRWA'}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed"
          >
            {isMalayalam 
              ? 'CoRWA (Confederation of Resident Welfare Associations) സമൂഹത്തിലെ വിവിധ അസോസിയേഷനുകളെ ഒരുമിപ്പിച്ചു ക്ഷേമപ്രവർത്തനങ്ങൾ ലക്ഷ്യമിടുന്ന ഒരു കൂട്ടായ്മയാണ്.' 
              : 'CoRWA is an apex body of Resident Welfare Associations, focused on building stronger communities, driving societal welfare, and unifying residents across the state.'}
          </motion.p>
        </div>

        {/* Highlight Image Gallery */}
        <div className="mb-20 grid grid-cols-1 md:grid-cols-2 gap-8">
          {galleryImages.map((src, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              className="relative aspect-video lg:aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl group"
            >
              <img 
                src={src} 
                alt="CoRWA Highlight Event" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </motion.div>
          ))}
        </div>

        {/* Video Gallery with Lazy Load Thumbnails (Pro Developer Pattern) */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-[#0A3D2E] mb-8 flex items-center gap-3">
             <span className="w-8 h-1 bg-[#DCAE1D] rounded-full"></span>
             {isMalayalam ? 'വീഡിയോ ഗാലറി' : 'Video Gallery & Highlights'}
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {videoIds.map((id, index) => (
              <motion.div
                key={id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="group relative rounded-2xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-all aspect-video bg-gray-100"
                onClick={() => setActiveVideo(id)}
              >
                {/* Fallback to hqdefault for better format handling avoiding dead maxres thresholds */}
                <img 
                  src={`https://img.youtube.com/vi/${id}/hqdefault.jpg`} 
                  alt="Video Thumbnail" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                   <div className="w-12 h-12 rounded-full bg-[#DCAE1D] text-[#0A3D2E] flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                      <Play className="w-5 h-5 ml-1" fill="currentColor" />
                   </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>

      {/* Video Modal Overhead */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <button 
              onClick={() => setActiveVideo(null)}
              className="absolute top-6 right-6 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-5xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl relative"
            >
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              ></iframe>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
