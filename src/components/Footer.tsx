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
