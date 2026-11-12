'use client';

import Link from 'next/link';
import { Menu, X, Globe } from 'lucide-react';
import { useState } from 'react';
import { useAppStore } from '../store/useStore';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { language, toggleLanguage } = useAppStore();

  const navLinks = [
    { name: language === 'english' ? 'Home' : 'ഹോം', path: '/' },
    { name: language === 'english' ? 'About' : 'കുറിച്ച്', path: '/#about' },
    { name: language === 'english' ? 'Events' : 'ഇവന്റുകൾ', path: '/#events' },
    { name: language === 'english' ? 'Associations' : 'അസോസിയേഷനുകൾ', path: '/associations' },
    { name: language === 'english' ? 'Services' : 'സേവനങ്ങൾ', path: '/#services' },
    { name: language === 'english' ? 'Contact' : 'ബന്ധപ്പെടുക', path: '/#contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#0A3D2E]/80 backdrop-blur-2xl shadow-sm border-b border-white/10 text-white transition-all duration-300">
      <div className="container mx-auto px-6 py-5 flex justify-between items-center relative">
        <Link href="/" className="flex items-center space-x-3">
          <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center bg-white rounded-full shadow-md overflow-hidden">
            <img src="/logo.png" alt="CoRWA Logo" className="w-full h-full object-contain" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white leading-tight">CoRWA</h1>
            <p className="text-[10px] text-yellow-500 font-semibold uppercase tracking-wider hidden sm:block">
              Confederation of Resident Welfare Associations
            </p>
          </div>
        </Link>

        <nav className="hidden md:flex items-center space-x-2">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.path}
              className="text-[13px] font-bold tracking-wide uppercase px-4 py-2 rounded-full hover:bg-white/5 hover:text-[#DCAE1D] transition-all relative group"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <button
            onClick={toggleLanguage}
            className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider px-5 py-2.5 bg-gradient-to-r from-white/10 to-white/5 border border-white/10 hover:border-white/30 rounded-full hover:bg-white/20 transition-all hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]"
          >
            <Globe size={14} className="text-[#DCAE1D]" />
            <span>{language === 'english' ? 'മലയാളം' : 'ENG'}</span>
          </button>
        </div>

        <button
          className="md:hidden p-2 text-white hover:text-yellow-400 transition"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div
        className={`md:hidden absolute top-full left-0 w-full bg-[#082b20] transition-all duration-300 ease-in-out overflow-hidden shadow-xl ${
          isOpen ? 'max-h-96 border-t border-white/10' : 'max-h-0'
        }`}
      >
        <nav className="flex flex-col px-6 py-4 space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.path}
              onClick={() => setIsOpen(false)}
              className="text-base font-medium py-2 hover:text-[#DCAE1D] transition-colors border-b border-white/5"
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-2">
            <button
              onClick={() => {
                toggleLanguage();
                setIsOpen(false);
              }}
              className="flex justify-center items-center space-x-2 text-sm font-semibold w-full py-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
            >
              <Globe size={16} />
              <span>{language === 'english' ? 'Switch to Malayalam' : 'Switch to English'}</span>
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}