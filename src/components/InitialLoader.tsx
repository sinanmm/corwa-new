'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function InitialLoader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#0A3D2E]"
        >
          <div className="flex flex-col items-center">
            {/* Elegant pulse ring around the logo */}
            <div className="relative flex items-center justify-center mb-6">
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute w-24 h-24 rounded-full bg-[#DCAE1D] blur-xl"
              />
              
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="w-16 h-16 bg-white rounded-full p-1 shadow-2xl relative z-10 overflow-hidden"
              >
                 <img src="/logo.png" alt="CoRWA Initializing Logo" className="w-full h-full object-contain" />
              </motion.div>
            </div>
            
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="flex items-center space-x-1"
            >
              <h1 className="text-2xl font-bold tracking-widest text-[#DCAE1D]">CoRWA</h1>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-8 flex gap-2"
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{ y: [0, -8, 0] }}
                  transition={{ 
                    duration: 1, 
                    repeat: Infinity, 
                    delay: i * 0.15,
                    ease: "easeInOut"
                  }}
                  className="w-2 h-2 rounded-full bg-emerald-200"
                />
              ))}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
