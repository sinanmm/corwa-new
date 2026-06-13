import Link from 'next/link';
import { Mail, Phone, MapPin } from 'lucide-react';

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
              Confederation of Resident Welfare Associations (CoRWA–M) is a unified platform empowering communities, promoting welfare, and establishing beneficial associations across districts in Kerala.
            </p>
            <div className="mt-6 flex items-center space-x-4">
              <Link href="https://www.instagram.com/corwa_organisation/" target="_blank" rel="noopener noreferrer" className="bg-gradient-to-tr from-pink-500 via-red-500 to-yellow-500 p-2.5 rounded-full text-white hover:scale-110 transition-transform shadow-lg shadow-pink-500/30">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </Link>
              <Link href="#" className="bg-[#1877F2] p-2.5 rounded-full text-white hover:scale-110 transition-transform shadow-lg shadow-blue-500/30">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </Link>
              <Link href="#" className="bg-black border border-gray-700 p-2.5 rounded-full text-white hover:scale-110 transition-transform shadow-lg">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13.6823 10.6218L20.2391 3H18.6854L12.9921 9.61788L8.44486 3H3.2002L10.0765 13.0074L3.2002 21H4.75404L10.7663 14.0113L15.5685 21H20.8131L13.6819 10.6218H13.6823ZM11.5541 13.0956L10.8574 12.0991L5.31391 4.16971H7.70053L12.1742 10.5689L12.8709 11.5655L18.6861 19.8835H16.2995L11.5541 13.096V13.0956Z" fill="currentColor"/>
                </svg>
              </Link>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-white mb-6 uppercase tracking-wider text-sm">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link href="/" className="hover:text-[#DCAE1D] transition-colors text-sm flex items-center">› Home</Link></li>
              <li><Link href="/associations" className="hover:text-[#DCAE1D] transition-colors text-sm flex items-center">› Find Associations</Link></li>
              <li><Link href="/#services" className="hover:text-[#DCAE1D] transition-colors text-sm flex items-center">› Services & Benefits</Link></li>
              <li><Link href="/#contact" className="hover:text-[#DCAE1D] transition-colors text-sm flex items-center">› Contact Us</Link></li>
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
