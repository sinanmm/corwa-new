import Link from 'next/link';
import { Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#051c14] text-gray-300 py-12 border-t border-white/10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center space-x-2">
              <span className="text-[#DCAE1D]">CoRWA</span>
            </h2>
            <p className="text-sm leading-relaxed text-gray-400 bg-white/5 p-4 rounded-xl border border-white/10">
              Confederation of Resident Welfare Associations (CoRWA-M) is a unified platform empowering communities, promoting welfare, and establishing beneficial associations across districts in Kerala.
            </p>
            <div className="mt-6 flex items-center space-x-4">
              <Link href="https://www.instagram.com/corwa_organisation/" target="_blank" rel="noopener noreferrer" className="bg-gradient-to-tr from-pink-500 via-red-500 to-yellow-500 p-2.5 rounded-full text-white hover:scale-110 transition-transform shadow-lg shadow-pink-500/30" aria-label="Instagram">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </Link>
              <Link href="https://www.facebook.com/share/1931PLEPyA/" target="_blank" rel="noopener noreferrer" className="bg-[#1877F2] p-2.5 rounded-full text-white hover:scale-110 transition-transform shadow-lg shadow-blue-500/30" aria-label="Facebook">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </Link>
              <Link href="https://youtube.com/@corwampm?si=1GIDQZT8Q9sD8mZv" target="_blank" rel="noopener noreferrer" className="bg-[#FF0000] p-2.5 rounded-full text-white hover:scale-110 transition-transform shadow-lg shadow-red-500/30" aria-label="YouTube">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M23.5 6.2a3 3 0 0 0-2.1-2.12C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.58A3 3 0 0 0 .5 6.2 31.2 31.2 0 0 0 0 12a31.2 31.2 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.12c1.9.58 9.4.58 9.4.58s7.5 0 9.4-.58a3 3 0 0 0 2.1-2.12A31.2 31.2 0 0 0 24 12a31.2 31.2 0 0 0-.5-5.8ZM9.6 15.7V8.3l6.4 3.7-6.4 3.7Z" />
                </svg>
              </Link>
              <Link href="mailto:corwampm@gmail.com" className="bg-white/10 border border-white/15 p-2.5 rounded-full text-white hover:scale-110 hover:bg-white/15 transition-transform shadow-lg" aria-label="Email CoRWA">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="m3 7 9 6 9-6" />
                </svg>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-6 uppercase tracking-wider text-sm">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link href="/" className="hover:text-[#DCAE1D] transition-colors text-sm flex items-center">Home</Link></li>
              <li><Link href="/#events" className="hover:text-[#DCAE1D] transition-colors text-sm flex items-center">Events</Link></li>
              <li><Link href="/associations" className="hover:text-[#DCAE1D] transition-colors text-sm flex items-center">Find Associations</Link></li>
              <li><Link href="/#services" className="hover:text-[#DCAE1D] transition-colors text-sm flex items-center">Services & Benefits</Link></li>
              <li><Link href="/#contact" className="hover:text-[#DCAE1D] transition-colors text-sm flex items-center">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-6 uppercase tracking-wider text-sm">Contact Info</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3 text-sm">
                <Phone className="text-[#DCAE1D] mt-0.5" size={18} />
                <div>
                  <p className="font-medium text-white">Noushad (Malappuram)</p>
                  <p className="text-gray-400">9895008998</p>
                </div>
              </li>
              <li className="flex items-start space-x-3 text-sm">
                <Phone className="text-[#DCAE1D] mt-0.5" size={18} />
                <div>
                  <p className="font-medium text-white">Muraleedharan Puthukkudi</p>
                  <p className="text-gray-400">9447678494</p>
                </div>
              </li>
              <li className="flex items-start space-x-3 text-sm mt-4 pt-4 border-t border-white/10">
                <MapPin className="text-[#DCAE1D] mt-0.5" size={18} />
                <p className="text-gray-400 leading-relaxed">Kerala, India<br/>Headquarters Representation</p>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 text-center text-xs text-gray-500 font-medium">
          <p>&copy; {new Date().getFullYear()} CoRWA - Confederation of Resident Welfare Associations. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
