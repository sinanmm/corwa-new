import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/store/useStore';
import { generateWhatsappLink } from '@/utils/whatsapp';
import { AlertCircle } from 'lucide-react';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').trim(),
  phone: z.string().min(10, 'Valid phone number is required').regex(/^[0-9+\s\-()]+$/, 'Must be a valid mobile format').trim(),
  message: z.string().min(10, 'Message must be at least 10 characters').trim(),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function ContactForm() {
  const { language } = useAppStore();
  const isMalayalam = language === 'malayalam';

  const [status, setStatus] = useState<'idle' | 'select-whatsapp'>('idle');
  const [formData, setFormData] = useState<ContactFormValues | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = (data: ContactFormValues) => {
    // Save valid form data and show WhatsApp send selection
    setFormData(data);
    setStatus('select-whatsapp');
  };

  const handleWhatsappSend = (recipientNumber: string) => {
    if (!formData) return;
    const link = generateWhatsappLink({ ...formData, recipientNumber });
    window.open(link, '_blank');
    
    // Clean up after triggering external app
    reset();
    setStatus('idle');
    setFormData(null);
  };

  return (
    <section id="contact" className="py-24 bg-white relative">
      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        <div className="bg-white rounded-[2.5rem] shadow-2xl border border-gray-100 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-5">
            
            {/* Left side context (Actions/Contact Cards) */}
            <div className="md:col-span-2 bg-[#0A3D2E] p-10 text-white flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-20 -mt-20"></div>
              
              <div className="relative z-10 mb-8">
                <h3 className="text-3xl font-bold mb-4">
                  {isMalayalam ? 'ഞങ്ങളുമായി ബന്ധപ്പെടുക' : 'Get in Touch'}
                </h3>
                <p className="text-emerald-100/80 leading-relaxed font-light">
                  {isMalayalam 
                    ? 'CoRWA യുമായി ബന്ധപ്പെട്ട സംശയങ്ങൾക്കും അംഗത്വ വിശദ വിവരങ്ങൾക്കും ബന്ധപ്പെടുക.' 
                    : 'Have questions about affiliations or available benefits? Call or message us directly.'}
                </p>
              </div>

              {/* Call Now Action Cards */}
              <div className="space-y-4 relative z-10 w-full mt-auto">
                <h4 className="text-xs font-semibold text-emerald-200 uppercase tracking-widest mb-4">Call Direct Lines</h4>
                
                <a href="tel:+919895008998" className="flex items-center space-x-4 p-4 bg-white/10 hover:bg-white/20 border border-white/10 rounded-2xl transition-all group backdrop-blur-sm cursor-pointer hover:scale-[1.02]">
                  <div className="w-12 h-12 bg-white/10 group-hover:bg-[#DCAE1D] group-hover:shadow-[0_0_15px_rgba(220,174,29,0.5)] rounded-xl flex items-center justify-center transition-all flex-shrink-0">
                     <svg className="w-6 h-6 text-white group-hover:text-[#0A3D2E] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                  </div>
                  <div>
                    <p className="font-bold text-white group-hover:text-[#DCAE1D] transition-colors">Call Noushad</p>
                    <p className="text-[13px] text-emerald-100/70 font-medium tracking-wide">+91 9895008998</p>
                  </div>
                </a>

                <a href="tel:+919447678494" className="flex items-center space-x-4 p-4 bg-white/10 hover:bg-white/20 border border-white/10 rounded-2xl transition-all group backdrop-blur-sm cursor-pointer hover:scale-[1.02]">
                  <div className="w-12 h-12 bg-white/10 group-hover:bg-[#DCAE1D] group-hover:shadow-[0_0_15px_rgba(220,174,29,0.5)] rounded-xl flex items-center justify-center transition-all flex-shrink-0">
                     <svg className="w-6 h-6 text-white group-hover:text-[#0A3D2E] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                  </div>
                  <div>
                    <p className="font-bold text-white group-hover:text-[#DCAE1D] transition-colors">Call Muralidharan</p>
                    <p className="text-[13px] text-emerald-100/70 font-medium tracking-wide">+91 9447678494</p>
                  </div>
                </a>
              </div>
            </div>

            {/* Form Area */}
            <div className="md:col-span-3 p-10 flex flex-col justify-center">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                     {isMalayalam ? 'പേര്' : 'Full Name'}
                  </label>
                  <input
                    {...register('name')}
                    type="text"
                    disabled={status === 'select-whatsapp'}
                    className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-[#DCAE1D]/30 focus:border-[#DCAE1D] focus:outline-none transition-all placeholder-gray-400 disabled:opacity-60"
                    placeholder="Enter your name"
                  />
                  {errors.name && <p className="mt-2 text-sm text-red-500 font-medium flex items-center gap-1"><AlertCircle className="w-4 h-4"/>{errors.name.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {isMalayalam ? 'ഫോൺ നമ്പർ' : 'Phone Number'}
                  </label>
                  <input
                    {...register('phone')}
                    type="tel"
                    disabled={status === 'select-whatsapp'}
                    className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-[#DCAE1D]/30 focus:border-[#DCAE1D] focus:outline-none transition-all placeholder-gray-400 disabled:opacity-60"
                    placeholder="+91 XXXXX XXXXX"
                  />
                  {errors.phone && <p className="mt-2 text-sm text-red-500 font-medium flex items-center gap-1"><AlertCircle className="w-4 h-4"/>{errors.phone.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {isMalayalam ? 'വിശദാംശങ്ങൾ' : 'Message'}
                  </label>
                  <textarea
                    {...register('message')}
                    rows={4}
                    disabled={status === 'select-whatsapp'}
                    className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-[#DCAE1D]/30 focus:border-[#DCAE1D] focus:outline-none transition-all resize-none placeholder-gray-400 disabled:opacity-60"
                    placeholder="How can we help you?"
                  ></textarea>
                  {errors.message && <p className="mt-2 text-sm text-red-500 font-medium flex items-center gap-1"><AlertCircle className="w-4 h-4"/>{errors.message.message}</p>}
                </div>

                <div className="pt-2">
                  <AnimatePresence mode="wait">
                    {status === 'select-whatsapp' ? (
                      <motion.div 
                        key="whatsapp-select"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-3 p-5 bg-emerald-50 rounded-2xl border border-emerald-100"
                      >
                        <p className="text-sm font-semibold text-center text-emerald-900 mb-3 tracking-wide">
                          Where would you like to send this enquiry?
                        </p>
                        <button 
                          type="button"
                          onClick={() => handleWhatsappSend('919895008998')}
                          className="w-full py-3.5 bg-[#25D366] hover:bg-[#1ebe57] text-white font-bold rounded-xl transition-all shadow-md hover:shadow-lg flex justify-center items-center gap-2 group"
                        >
                          <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
                          WhatsApp Noushad
                        </button>
                        <button 
                          type="button"
                          onClick={() => handleWhatsappSend('919447678494')}
                          className="w-full py-3.5 bg-[#25D366] hover:bg-[#1ebe57] text-white font-bold rounded-xl transition-all shadow-md hover:shadow-lg flex justify-center items-center gap-2 group"
                        >
                          <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
                          WhatsApp Muralidharan
                        </button>
                        <button
                          type="button"
                          onClick={() => setStatus('idle')}
                          className="w-full py-2.5 text-sm font-medium text-emerald-800 hover:text-emerald-950 transition-colors mt-1"
                        >
                          Cancel
                        </button>
                      </motion.div>
                    ) : (
                      <motion.button
                        key="submit-btn"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        type="submit"
                        className="w-full py-4 bg-[#0A3D2E] hover:bg-[#072a20] text-white font-bold rounded-xl transition-all shadow-md hover:shadow-lg flex justify-center items-center gap-2 relative overflow-hidden group"
                      >
                         <span className="absolute inset-0 w-full h-full bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                         <span className="relative">{isMalayalam ? 'സന്ദേശം മാറ്റുക' : 'Proceed to Send'}</span>
                      </motion.button>
                    )}
                  </AnimatePresence>
                </div>
              </form>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
}
