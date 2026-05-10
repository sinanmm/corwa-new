'use client';

import { motion } from 'framer-motion';
import { MapPin, Tag, ExternalLink, Globe } from 'lucide-react';
import { Organization } from '@/data/sectors';

interface OrganizationCardProps {
  organization: Organization;
  index: number;
}

export default function OrganizationCard({ organization, index }: OrganizationCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all group"
    >
      <div className="flex flex-col h-full">
        <h3 className="text-lg font-bold text-gray-800 mb-3 group-hover:text-[#0A3D2E] transition-colors">
          {organization.name}
        </h3>
        
        <div className="mt-auto pt-6 space-y-4">
          <div className="space-y-2">
            {organization.location && (
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <MapPin className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>{organization.location}</span>
              </div>
            )}
            
            {organization.tag && (
              <div className="flex items-center gap-2 text-sm">
                <Tag className="w-4 h-4 text-[#DCAE1D] flex-shrink-0" />
                <span className="px-2 py-0.5 bg-yellow-50 text-yellow-800 rounded-md font-medium text-xs border border-yellow-100">
                  {organization.tag}
                </span>
              </div>
            )}
          </div>

          {organization.website ? (
            <a 
              href={organization.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 bg-white border border-[#0A3D2E]/20 text-[#0A3D2E] text-sm font-bold rounded-xl hover:bg-[#0A3D2E] hover:text-white transition-all group/btn shadow-sm hover:shadow-md"
            >
              <span>Visit Website</span>
              <ExternalLink className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
            </a>
          ) : (
            <div className="flex items-center justify-center gap-2 w-full py-3 bg-gray-50 border border-gray-100 text-gray-400 text-[11px] font-bold uppercase tracking-wider rounded-xl cursor-default">
              <Globe className="w-3.5 h-3.5 opacity-50" />
              <span>Official Website Coming Soon</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
