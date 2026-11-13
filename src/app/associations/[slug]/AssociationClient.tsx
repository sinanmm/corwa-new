'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { useAppStore } from '@/store/useStore';
import {
  AssociationDetail,
  AssociationEvent,
  AssociationImage,
  AssociationSocials,
} from '@/data/associationData';
import {
  getAssociationEvents,
  addAssociationEvent,
  updateAssociationEvent,
  deleteAssociationEvent,
  getAssociationGallery,
  addAssociationImage,
  deleteAssociationImage,
  getAssociationSocials,
  saveAssociationSocials,
  getAssociationSession,
  loginAssociationAuth,
  logoutAssociationAuth,
  AssociationSession,
} from '@/utils/associationStorage';
import {
  MapPin,
  CalendarDays,
  Clock,
  Plus,
  Pencil,
  Trash2,
  Lock,
  LogOut,
  ShieldCheck,
  Building,
  Image as ImageIcon,
  Users,
  Phone,
  Mail,
  ArrowLeft,
  X,
  Star,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Share2,
  Globe,
  Home,
  MessageCircle,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AssociationClientProps {
  assoc: AssociationDetail;
}

export default function AssociationClient({ assoc }: AssociationClientProps) {
  const { language } = useAppStore();
  const isMalayalam = language === 'malayalam';

  // Tabs
  const [activeTab, setActiveTab] = useState<'events' | 'gallery' | 'socials' | 'profile'>('events');

  // Scoped Data State
  const [events, setEvents] = useState<AssociationEvent[]>([]);
  const [gallery, setGallery] = useState<AssociationImage[]>([]);
  const [socials, setSocials] = useState<AssociationSocials>({});
  const [session, setSession] = useState<AssociationSession | null>(null);

  // Auth Modal State
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Event Modal State
  const [showEventModal, setShowEventModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState<AssociationEvent | null>(null);
  const [eventTitle, setEventTitle] = useState('');
  const [eventCategory, setEventCategory] = useState<AssociationEvent['category']>('General Body');
  const [eventDate, setEventDate] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [eventVenue, setEventVenue] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventImage, setEventImage] = useState('/1.jpeg');

  // Gallery Modal State
  const [showGalleryModal, setShowGalleryModal] = useState(false);
  const [galleryTitle, setGalleryTitle] = useState('');
  const [galleryCaption, setGalleryCaption] = useState('');
  const [galleryUrl, setGalleryUrl] = useState('/1.jpeg');
  const [galleryDate, setGalleryDate] = useState('');

  // Socials Modal State
  const [showSocialModal, setShowSocialModal] = useState(false);
  const [socialForm, setSocialForm] = useState<AssociationSocials>({});

  // Lightbox & Delete Modals
  const [lightboxImage, setLightboxImage] = useState<AssociationImage | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<{
    type: 'event' | 'image' | 'social';
    id: string;
    title: string;
  } | null>(null);

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Load association data
  useEffect(() => {
    setEvents(getAssociationEvents(assoc.slug));
    setGallery(getAssociationGallery(assoc.slug));
    setSocials(getAssociationSocials(assoc.slug));
    setSession(getAssociationSession(assoc.slug));
  }, [assoc.slug]);

  const isAdmin = Boolean(session && session.assocSlug === assoc.slug);

  // Authentication Handlers
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    const res = loginAssociationAuth(assoc.slug, loginUsername, loginPassword);
    if (res.success && res.session) {
      setSession(res.session);
      setShowLoginModal(false);
      setLoginUsername('');
      setLoginPassword('');
      showToast(isMalayalam ? 'വിജയകരമായി ലോഗിൻ ചെയ്തു!' : `Welcome to ${assoc.name} Admin Portal!`);
    } else {
      setLoginError(res.message);
    }
  };

  const handleLogout = () => {
    logoutAssociationAuth(assoc.slug);
    setSession(null);
    showToast(isMalayalam ? 'ലോഗ്ഔട്ട് ചെയ്തു' : 'Logged out successfully');
  };

  // Event Handlers
  const handleOpenAddEvent = () => {
    setEditingEvent(null);
    setEventTitle('');
    setEventCategory('General Body');
    setEventDate(new Date().toISOString().split('T')[0]);
    setEventTime('07:30 PM - 09:30 PM');
    setEventVenue(`Community Hall, ${assoc.name}`);
    setEventDescription('');
    setEventImage('/1.jpeg');
    setShowEventModal(true);
  };

  const handleOpenEditEvent = (ev: AssociationEvent) => {
    setEditingEvent(ev);
    setEventTitle(ev.title);
    setEventCategory(ev.category);
    setEventDate(ev.date);
    setEventTime(ev.time || '');
    setEventVenue(ev.venue);
    setEventDescription(ev.description);
    setEventImage(ev.imageUrl || '/1.jpeg');
    setShowEventModal(true);
  };

  const handleSaveEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventTitle.trim() || !eventVenue.trim()) return;

    if (editingEvent) {
      updateAssociationEvent(assoc.slug, editingEvent.id, {
        title: eventTitle,
        category: eventCategory,
        date: eventDate,
        time: eventTime,
        venue: eventVenue,
        description: eventDescription,
        imageUrl: eventImage,
      });
      showToast(isMalayalam ? 'പരിപാടി അപ്ഡേറ്റ് ചെയ്തു' : 'Event updated successfully');
    } else {
      addAssociationEvent(assoc.slug, {
        title: eventTitle,
        category: eventCategory,
        date: eventDate,
        time: eventTime,
        venue: eventVenue,
        description: eventDescription,
        imageUrl: eventImage,
      });
      showToast(isMalayalam ? 'പുതിയ പരിപാടി ചേർത്തു' : 'New event published');
    }

    setEvents(getAssociationEvents(assoc.slug));
    setShowEventModal(false);
  };

  // Gallery Handlers
  const handleOpenAddGallery = () => {
    setGalleryTitle('');
    setGalleryCaption('');
    setGalleryUrl('/1.jpeg');
    setGalleryDate(new Date().toISOString().split('T')[0]);
    setShowGalleryModal(true);
  };

  const handleSaveGallery = (e: React.FormEvent) => {
    e.preventDefault();
    if (!galleryTitle.trim() || !galleryUrl.trim()) return;

    addAssociationImage(assoc.slug, {
      title: galleryTitle,
      caption: galleryCaption,
      imageUrl: galleryUrl,
      date: galleryDate || new Date().toISOString().split('T')[0],
    });

    setGallery(getAssociationGallery(assoc.slug));
    setShowGalleryModal(false);
    showToast(isMalayalam ? 'ചിത്രം ചേർത്തു' : 'Photo added to gallery');
  };

  // Socials Handlers
  const handleOpenSocialModal = () => {
    setSocialForm({ ...socials });
    setShowSocialModal(true);
  };

  const handleSaveSocials = (e: React.FormEvent) => {
    e.preventDefault();
    saveAssociationSocials(assoc.slug, socialForm);
    setSocials(socialForm);
    setShowSocialModal(false);
    showToast(isMalayalam ? 'സോഷ്യൽ മീഡിയ ലിങ്കുകൾ പുതുക്കി' : 'Social media links updated');
  };

  // Delete Handlers
  const executeDelete = () => {
    if (!deleteConfirm) return;

    if (deleteConfirm.type === 'event') {
      deleteAssociationEvent(assoc.slug, deleteConfirm.id);
      setEvents(getAssociationEvents(assoc.slug));
      showToast(isMalayalam ? 'പരിപാടി നീക്കം ചെയ്തു' : 'Event deleted');
    } else if (deleteConfirm.type === 'image') {
      deleteAssociationImage(assoc.slug, deleteConfirm.id);
      setGallery(getAssociationGallery(assoc.slug));
      showToast(isMalayalam ? 'ചിത്രം നീക്കം ചെയ്തു' : 'Image deleted');
    } else if (deleteConfirm.type === 'social') {
      const updated = { ...socials };
      delete (updated as Record<string, string | undefined>)[deleteConfirm.id];
      saveAssociationSocials(assoc.slug, updated);
      setSocials(updated);
      showToast('Social link removed');
    }
    setDeleteConfirm(null);
  };

  const presetImages = ['/1.jpeg', '/2.jpeg', '/3.jpeg', '/4.jpeg', '/5.jpeg', '/6.jpeg'];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50/60">
      <Header />

      {/* Floating Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-24 right-6 z-50 flex items-center gap-3 bg-[#0A3D2E] text-white px-5 py-3 rounded-2xl shadow-2xl border border-[#DCAE1D]/40 text-sm font-semibold"
          >
            <CheckCircle2 className="w-5 h-5 text-[#DCAE1D]" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0A3D2E] via-[#082b20] to-[#041f17] text-white pt-8 pb-16 px-6 shadow-xl border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(220,174,29,0.18),transparent_50%)] pointer-events-none" />

        <div className="container mx-auto max-w-7xl relative z-10">
          {/* Top Breadcrumb & Upper Right Login/Action */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-2">
              <Link
                href="/associations"
                className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-200/90 hover:text-white bg-white/10 hover:bg-white/15 px-3.5 py-1.5 rounded-full transition-all border border-white/10"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>{isMalayalam ? 'അസോസിയേഷനുകൾ' : 'All Associations'}</span>
              </Link>

              <span className="text-white/30 text-xs">/</span>

              <Link
                href={`/taluks/${assoc.taluk.toLowerCase()}`}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#DCAE1D] hover:underline"
              >
                <MapPin className="w-3 h-3" />
                <span>{assoc.taluk} Taluk</span>
              </Link>
            </div>

            {/* UPPER RIGHT LOGIN / STATUS BUTTON */}
            <div className="flex items-center gap-3">
              {isAdmin ? (
                <div className="flex items-center gap-2 bg-emerald-950/80 border border-emerald-500/40 px-3.5 py-1.5 rounded-2xl backdrop-blur-md">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-semibold text-emerald-200 truncate max-w-[200px]">
                    {assoc.name} Admin Active
                  </span>
                  <button
                    onClick={handleLogout}
                    title="Logout"
                    className="ml-2 p-1 text-red-300 hover:text-white hover:bg-red-500/20 rounded-lg transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setLoginError('');
                    setShowLoginModal(true);
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-[#DCAE1D] hover:bg-amber-400 text-[#0A3D2E] font-bold text-xs uppercase tracking-wider shadow-lg hover:shadow-[#DCAE1D]/20 transition-all active:scale-95 border border-amber-300"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>{isMalayalam ? 'അസോസിയേഷൻ ലോഗിൻ' : 'Association Admin Login'}</span>
                </button>
              )}
            </div>
          </div>

          {/* Main Title & Badges */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="space-y-4 max-w-3xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-white/10 border border-white/10 text-xs font-medium text-emerald-200">
                  {assoc.category}
                </span>

                <Link
                  href={`/taluks/${assoc.taluk.toLowerCase()}`}
                  className="px-3 py-1 rounded-full bg-[#DCAE1D]/20 border border-[#DCAE1D]/40 text-xs font-bold text-[#DCAE1D] hover:bg-[#DCAE1D]/30 transition-colors flex items-center gap-1"
                >
                  <MapPin className="w-3 h-3" />
                  <span>{assoc.taluk} Taluk</span>
                </Link>

                <span className="px-3 py-1 rounded-full bg-white/10 border border-white/10 text-xs font-medium text-emerald-200">
                  {assoc.district}, {assoc.state}
                </span>

                {assoc.affiliated && (
                  <span className="inline-flex items-center gap-1 rounded-full border border-amber-300/80 bg-gradient-to-r from-amber-400/20 to-yellow-400/30 px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber-200">
                    <Star className="w-3.5 h-3.5 fill-current text-[#DCAE1D]" />
                    Affiliated
                  </span>
                )}
              </div>

              <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
                {assoc.name}
              </h1>

              <div className="text-xl md:text-2xl font-medium text-[#DCAE1D]">
                {assoc.nameMl}
              </div>

              <p className="text-base text-emerald-100/90 leading-relaxed font-light">
                {isMalayalam ? assoc.descriptionMl : assoc.description}
              </p>

              {/* SOCIAL MEDIA QUICK BAR IN HERO */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2">
                  {socials.whatsapp && (
                    <a
                      href={socials.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="WhatsApp Chat / Group"
                      className="p-2.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-400/30 transition-all hover:scale-105"
                    >
                      <MessageCircle className="w-4 h-4" />
                    </a>
                  )}

                  {socials.facebook && (
                    <a
                      href={socials.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Facebook Page"
                      className="p-2.5 rounded-xl bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 border border-blue-400/30 transition-all hover:scale-105"
                    >
                      <Globe className="w-4 h-4" />
                    </a>
                  )}

                  {socials.instagram && (
                    <a
                      href={socials.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Instagram Profile"
                      className="p-2.5 rounded-xl bg-pink-500/20 hover:bg-pink-500/30 text-pink-300 border border-pink-400/30 transition-all hover:scale-105"
                    >
                      <Share2 className="w-4 h-4" />
                    </a>
                  )}

                  {socials.youtube && (
                    <a
                      href={socials.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="YouTube Channel"
                      className="p-2.5 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-400/30 transition-all hover:scale-105"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}

                  {socials.website && (
                    <a
                      href={socials.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Website"
                      className="p-2.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-400/30 transition-all hover:scale-105"
                    >
                      <Globe className="w-4 h-4" />
                    </a>
                  )}

                  {socials.phone && (
                    <a
                      href={`tel:${socials.phone}`}
                      title="Phone Helpline"
                      className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/10 transition-all hover:scale-105"
                    >
                      <Phone className="w-4 h-4" />
                    </a>
                  )}
                </div>

                {isAdmin && (
                  <button
                    onClick={handleOpenSocialModal}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#DCAE1D] hover:bg-amber-400 text-[#0A3D2E] text-xs font-bold transition-all shadow-md"
                  >
                    <Pencil className="w-3 h-3" />
                    <span>Manage Social Media</span>
                  </button>
                )}
              </div>

              {/* Stats Counters */}
              <div className="flex flex-wrap gap-3 pt-4">
                <div className="bg-white/10 backdrop-blur-md border border-white/10 px-4 py-2 rounded-2xl">
                  <div className="text-xl font-bold text-white">{assoc.householdsCount}+</div>
                  <div className="text-[11px] text-emerald-200/80 uppercase tracking-wider">
                    {isMalayalam ? 'കുടുംബങ്ങൾ' : 'Member Households'}
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-md border border-white/10 px-4 py-2 rounded-2xl">
                  <div className="text-xl font-bold text-white">{events.length}</div>
                  <div className="text-[11px] text-emerald-200/80 uppercase tracking-wider">
                    {isMalayalam ? 'പരിപാടികൾ' : 'Events Published'}
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-md border border-white/10 px-4 py-2 rounded-2xl">
                  <div className="text-xl font-bold text-white">{gallery.length}</div>
                  <div className="text-[11px] text-emerald-200/80 uppercase tracking-wider">
                    {isMalayalam ? 'ചിത്രങ്ങൾ' : 'Gallery Photos'}
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-md border border-white/10 px-4 py-2 rounded-2xl">
                  <div className="text-xl font-bold text-[#DCAE1D]">Est. {assoc.establishedYear}</div>
                  <div className="text-[11px] text-emerald-200/80 uppercase tracking-wider">
                    {isMalayalam ? 'രജിസ്ട്രേഷൻ' : 'Registered RWA'}
                  </div>
                </div>
              </div>
            </div>

            {/* Admin Action Box when Logged In */}
            {isAdmin && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white/10 backdrop-blur-xl border border-white/20 p-5 rounded-3xl space-y-3 min-w-[280px]"
              >
                <div className="flex items-center gap-2 text-xs font-bold text-[#DCAE1D] uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Association Controls</span>
                </div>
                <div className="space-y-2">
                  <button
                    onClick={handleOpenAddEvent}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white text-[#0A3D2E] hover:bg-emerald-50 font-bold text-xs shadow-md transition-all"
                  >
                    <Plus className="w-4 h-4" />
                    <span>{isMalayalam ? 'പരിപാടി ചേർക്കുക' : 'Post New Event'}</span>
                  </button>

                  <button
                    onClick={handleOpenAddGallery}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/20 hover:bg-white/30 text-white font-bold text-xs border border-white/20 transition-all"
                  >
                    <Plus className="w-4 h-4" />
                    <span>{isMalayalam ? 'ചിത്രം ചേർക്കുക' : 'Add Photo'}</span>
                  </button>

                  <button
                    onClick={handleOpenSocialModal}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-[#DCAE1D]/20 hover:bg-[#DCAE1D]/30 text-[#DCAE1D] font-bold text-xs border border-[#DCAE1D]/30 transition-all"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>{isMalayalam ? 'സോഷ്യൽ മീഡിയ എഡിറ്റ് ചെയ്യുക' : 'Edit Social Media'}</span>
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* NAVIGATION TABS */}
      <section className="sticky top-20 z-30 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="flex space-x-1 md:space-x-4 overflow-x-auto py-3 no-scrollbar">
            <button
              onClick={() => setActiveTab('events')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs md:text-sm font-bold whitespace-nowrap transition-all ${
                activeTab === 'events'
                  ? 'bg-[#0A3D2E] text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <CalendarDays className="w-4 h-4" />
              <span>{isMalayalam ? 'പരിപാടികൾ' : 'Events & Activities'}</span>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-white/20 font-mono">
                {events.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('gallery')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs md:text-sm font-bold whitespace-nowrap transition-all ${
                activeTab === 'gallery'
                  ? 'bg-[#0A3D2E] text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <ImageIcon className="w-4 h-4" />
              <span>{isMalayalam ? 'ചിത്രങ്ങൾ' : 'Photo Gallery'}</span>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-white/20 font-mono">
                {gallery.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('socials')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs md:text-sm font-bold whitespace-nowrap transition-all ${
                activeTab === 'socials'
                  ? 'bg-[#0A3D2E] text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <Share2 className="w-4 h-4" />
              <span>{isMalayalam ? 'സോഷ്യൽ മീഡിയ' : 'Social Media & Links'}</span>
            </button>

            <button
              onClick={() => setActiveTab('profile')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs md:text-sm font-bold whitespace-nowrap transition-all ${
                activeTab === 'profile'
                  ? 'bg-[#0A3D2E] text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <Building className="w-4 h-4" />
              <span>{isMalayalam ? 'പ്രൊഫൈൽ & കമ്മിറ്റി' : 'Profile & Committee'}</span>
            </button>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 container mx-auto max-w-7xl px-6 py-10">
        {/* TAB 1: EVENTS */}
        {activeTab === 'events' && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {isMalayalam ? `${assoc.name} പരിപാടികൾ` : `${assoc.name} Events & Activities`}
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  {isMalayalam
                    ? 'ഈ അസോസിയേഷന്റെ യോഗങ്ങളും കോളനി വികസന പ്രവർത്തനങ്ങളും'
                    : 'Exclusive meetings, cleanup drives, and community gatherings organized by this association.'}
                </p>
              </div>

              {isAdmin && (
                <button
                  onClick={handleOpenAddEvent}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0A3D2E] hover:bg-[#072c21] text-white text-xs font-bold shadow-md transition-all"
                >
                  <Plus className="w-4 h-4" />
                  <span>{isMalayalam ? 'പരിപാടി ചേർക്കുക' : 'Post Event'}</span>
                </button>
              )}
            </div>

            {events.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 shadow-sm space-y-4">
                <CalendarDays className="w-16 h-16 text-gray-300 mx-auto" />
                <h3 className="text-lg font-bold text-gray-700">No Events Listed Yet</h3>
                <p className="text-gray-500 text-sm max-w-md mx-auto">
                  {isMalayalam
                    ? 'ഈ അസോസിയേഷൻ ഇതുവരെ പരിപാടികൾ പ്രസിദ്ധീകരിച്ചിട്ടില്ല.'
                    : 'No upcoming or concluded events have been published by this association yet.'}
                </p>
                {isAdmin && (
                  <button
                    onClick={handleOpenAddEvent}
                    className="mt-2 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0A3D2E] text-white text-xs font-bold"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Create First Event</span>
                  </button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map((ev, i) => (
                  <motion.div
                    key={ev.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all flex flex-col group"
                  >
                    {/* Event Banner */}
                    <div className="relative h-44 w-full bg-slate-900 overflow-hidden">
                      <img
                        src={ev.imageUrl || '/1.jpeg'}
                        alt={ev.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      <div className="absolute top-3 left-3">
                        <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/90 backdrop-blur-sm text-[#0A3D2E] shadow-sm">
                          {ev.category}
                        </span>
                      </div>

                      {/* Admin Controls */}
                      {isAdmin && (
                        <div className="absolute top-3 right-3 flex items-center gap-1.5">
                          <button
                            onClick={() => handleOpenEditEvent(ev)}
                            title="Edit Event"
                            className="p-2 rounded-xl bg-white/90 hover:bg-white text-gray-800 shadow-md transition-all hover:scale-105"
                          >
                            <Pencil className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() =>
                              setDeleteConfirm({
                                type: 'event',
                                id: ev.id,
                                title: ev.title,
                              })
                            }
                            title="Delete Event"
                            className="p-2 rounded-xl bg-red-600/90 hover:bg-red-600 text-white shadow-md transition-all hover:scale-105"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}

                      <div className="absolute bottom-3 left-3 right-3 text-white">
                        <div className="flex items-center gap-2 text-xs font-semibold text-[#DCAE1D]">
                          <CalendarDays className="w-3.5 h-3.5" />
                          <span>{ev.date}</span>
                          {ev.time && (
                            <>
                              <span className="opacity-60">•</span>
                              <Clock className="w-3.5 h-3.5" />
                              <span>{ev.time}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-2">
                        <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#0A3D2E] transition-colors leading-snug">
                          {ev.title}
                        </h3>
                        <div className="flex items-start gap-1.5 text-xs text-gray-500 font-medium">
                          <MapPin className="w-3.5 h-3.5 text-[#DCAE1D] shrink-0 mt-0.5" />
                          <span>{ev.venue}</span>
                        </div>
                        <p className="text-xs text-gray-600 leading-relaxed line-clamp-3">
                          {ev.description}
                        </p>
                      </div>

                      {isAdmin && (
                        <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                          <span className="text-[11px] text-emerald-800 font-semibold bg-emerald-50 px-2 py-0.5 rounded-md">
                            Admin Edit Mode
                          </span>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleOpenEditEvent(ev)}
                              className="text-emerald-800 hover:underline font-bold"
                            >
                              Edit
                            </button>
                            <span className="text-gray-300">•</span>
                            <button
                              onClick={() =>
                                setDeleteConfirm({
                                  type: 'event',
                                  id: ev.id,
                                  title: ev.title,
                                })
                              }
                              className="text-red-600 hover:underline font-bold"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: PHOTO GALLERY */}
        {activeTab === 'gallery' && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {isMalayalam ? `${assoc.name} ചിത്രങ്ങൾ` : `${assoc.name} Photo Gallery`}
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Photographs and moments captured from colony programs and welfare projects.
                </p>
              </div>

              {isAdmin && (
                <button
                  onClick={handleOpenAddGallery}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0A3D2E] hover:bg-[#072c21] text-white text-xs font-bold shadow-md transition-all"
                >
                  <Plus className="w-4 h-4" />
                  <span>{isMalayalam ? 'ചിത്രം ചേർക്കുക' : 'Add Photo'}</span>
                </button>
              )}
            </div>

            {gallery.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 shadow-sm space-y-4">
                <ImageIcon className="w-16 h-16 text-gray-300 mx-auto" />
                <h3 className="text-lg font-bold text-gray-700">No Photos Added Yet</h3>
                <p className="text-gray-500 text-sm max-w-md mx-auto">
                  {isMalayalam
                    ? 'ഈ അസോസിയേഷൻ ഇതുവരെ ചിത്രങ്ങൾ ചേർത്തിട്ടില്ല.'
                    : 'No gallery pictures uploaded for this association yet.'}
                </p>
                {isAdmin && (
                  <button
                    onClick={handleOpenAddGallery}
                    className="mt-2 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0A3D2E] text-white text-xs font-bold"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Upload First Photo</span>
                  </button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {gallery.map((img, i) => (
                  <motion.div
                    key={img.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.04 }}
                    className="group relative bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all"
                  >
                    <div
                      onClick={() => setLightboxImage(img)}
                      className="cursor-pointer relative h-64 w-full overflow-hidden bg-slate-900"
                    >
                      <img
                        src={img.imageUrl}
                        alt={img.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                      <div className="absolute bottom-4 left-4 right-4 text-white space-y-1">
                        <h4 className="font-bold text-sm leading-snug">{img.title}</h4>
                        {img.caption && (
                          <p className="text-xs text-gray-300 line-clamp-2">{img.caption}</p>
                        )}
                        {img.date && (
                          <p className="text-[10px] text-[#DCAE1D] font-mono">{img.date}</p>
                        )}
                      </div>
                    </div>

                    {isAdmin && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setDeleteConfirm({
                            type: 'image',
                            id: img.id,
                            title: img.title,
                          });
                        }}
                        title="Delete Image"
                        className="absolute top-3 right-3 p-2 rounded-xl bg-red-600 text-white shadow-lg transition-transform hover:scale-110"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: SOCIAL MEDIA (Specifically Requested by User) */}
        {activeTab === 'socials' && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {isMalayalam ? 'സോഷ്യൽ മീഡിയ & കമ്മ്യൂണിറ്റി ലിങ്കുകൾ' : 'Social Media & Community Channels'}
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Connect directly with {assoc.name} through their verified social channels and community groups.
                </p>
              </div>

              {isAdmin && (
                <button
                  onClick={handleOpenSocialModal}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0A3D2E] hover:bg-[#072c21] text-white text-xs font-bold shadow-md transition-all"
                >
                  <Pencil className="w-4 h-4" />
                  <span>{isMalayalam ? 'ലിങ്കുകൾ മാറ്റുക' : 'Edit / Add Socials'}</span>
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* WhatsApp Card */}
              {socials.whatsapp ? (
                <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-4 hover:shadow-lg transition-all flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                      <MessageCircle className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-900">WhatsApp Group / Help</h3>
                      <p className="text-xs text-gray-500 mt-0.5">
                        Direct communication channel for colony residents and emergency alerts.
                      </p>
                    </div>
                  </div>
                  <div className="pt-2 flex items-center justify-between">
                    <a
                      href={socials.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs font-bold text-emerald-700 hover:text-emerald-900 bg-emerald-50 hover:bg-emerald-100 px-4 py-2 rounded-xl transition-all"
                    >
                      <span>Join WhatsApp</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    {isAdmin && (
                      <button
                        onClick={() =>
                          setDeleteConfirm({
                            type: 'social',
                            id: 'whatsapp',
                            title: 'WhatsApp link',
                          })
                        }
                        className="text-xs text-red-500 hover:text-red-700 font-semibold"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </div>
              ) : null}

              {/* Facebook Card */}
              {socials.facebook ? (
                <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-4 hover:shadow-lg transition-all flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                      <Globe className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-900">Facebook Page</h3>
                      <p className="text-xs text-gray-500 mt-0.5">
                        Follow official public announcements, photo stories, and community events.
                      </p>
                    </div>
                  </div>
                  <div className="pt-2 flex items-center justify-between">
                    <a
                      href={socials.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs font-bold text-blue-700 hover:text-blue-900 bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-xl transition-all"
                    >
                      <span>Visit Facebook</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    {isAdmin && (
                      <button
                        onClick={() =>
                          setDeleteConfirm({
                            type: 'social',
                            id: 'facebook',
                            title: 'Facebook link',
                          })
                        }
                        className="text-xs text-red-500 hover:text-red-700 font-semibold"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </div>
              ) : null}

              {/* Instagram Card */}
              {socials.instagram ? (
                <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-4 hover:shadow-lg transition-all flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-2xl bg-pink-50 text-pink-600 flex items-center justify-center">
                      <Share2 className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-900">Instagram</h3>
                      <p className="text-xs text-gray-500 mt-0.5">
                        Photos, reels, and youth activities from neighborhood celebrations.
                      </p>
                    </div>
                  </div>
                  <div className="pt-2 flex items-center justify-between">
                    <a
                      href={socials.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs font-bold text-pink-700 hover:text-pink-900 bg-pink-50 hover:bg-pink-100 px-4 py-2 rounded-xl transition-all"
                    >
                      <span>Follow on Instagram</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    {isAdmin && (
                      <button
                        onClick={() =>
                          setDeleteConfirm({
                            type: 'social',
                            id: 'instagram',
                            title: 'Instagram link',
                          })
                        }
                        className="text-xs text-red-500 hover:text-red-700 font-semibold"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </div>
              ) : null}

              {/* YouTube Card */}
              {socials.youtube ? (
                <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-4 hover:shadow-lg transition-all flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center">
                      <ExternalLink className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-900">YouTube Channel</h3>
                      <p className="text-xs text-gray-500 mt-0.5">
                        Event video highlights, cultural programs, and general body recordings.
                      </p>
                    </div>
                  </div>
                  <div className="pt-2 flex items-center justify-between">
                    <a
                      href={socials.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs font-bold text-red-700 hover:text-red-900 bg-red-50 hover:bg-red-100 px-4 py-2 rounded-xl transition-all"
                    >
                      <span>Watch YouTube</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    {isAdmin && (
                      <button
                        onClick={() =>
                          setDeleteConfirm({
                            type: 'social',
                            id: 'youtube',
                            title: 'YouTube link',
                          })
                        }
                        className="text-xs text-red-500 hover:text-red-700 font-semibold"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </div>
              ) : null}

              {/* Website Card */}
              {socials.website ? (
                <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-4 hover:shadow-lg transition-all flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center">
                      <Globe className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-900">Official Web Page</h3>
                      <p className="text-xs text-gray-500 mt-0.5">
                        Verified resident portal, circulars, and notices on CoRWA registry.
                      </p>
                    </div>
                  </div>
                  <div className="pt-2 flex items-center justify-between">
                    <a
                      href={socials.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs font-bold text-amber-800 hover:text-amber-900 bg-amber-50 hover:bg-amber-100 px-4 py-2 rounded-xl transition-all"
                    >
                      <span>Open Website</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    {isAdmin && (
                      <button
                        onClick={() =>
                          setDeleteConfirm({
                            type: 'social',
                            id: 'website',
                            title: 'Website link',
                          })
                        }
                        className="text-xs text-red-500 hover:text-red-700 font-semibold"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </div>
              ) : null}

              {/* Direct Helpline Phone */}
              {socials.phone ? (
                <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-4 hover:shadow-lg transition-all flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-2xl bg-slate-50 text-slate-700 flex items-center justify-center">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-900">Direct Helpline</h3>
                      <p className="text-xs text-gray-500 mt-0.5">
                        Reach out to the general secretary or executive desk for assistance.
                      </p>
                    </div>
                  </div>
                  <div className="pt-2 flex items-center justify-between">
                    <a
                      href={`tel:${socials.phone}`}
                      className="inline-flex items-center gap-2 text-xs font-bold text-slate-800 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-xl transition-all"
                    >
                      <span>{socials.phone}</span>
                      <Phone className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              ) : null}
            </div>

            {isAdmin && (
              <div className="p-6 rounded-3xl bg-emerald-50 border border-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <h4 className="font-bold text-sm text-emerald-950">Add or Edit Social Media Channels</h4>
                  <p className="text-xs text-emerald-800">
                    As an authenticated admin of {assoc.name}, you can add new links, edit handles, or remove inactive accounts.
                  </p>
                </div>
                <button
                  onClick={handleOpenSocialModal}
                  className="px-5 py-2.5 rounded-xl bg-[#0A3D2E] text-white text-xs font-bold shadow-md hover:bg-[#072c21] shrink-0"
                >
                  Manage Social Media
                </button>
              </div>
            )}
          </div>
        )}

        {/* TAB 4: PROFILE & COMMITTEE */}
        {activeTab === 'profile' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {isMalayalam ? 'അസോസിയേഷൻ കമ്മിറ്റി ഭാരവാഹികൾ' : 'Executive Committee Office Bearers'}
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#0A3D2E] flex items-center justify-center font-bold text-lg">
                    P
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider">
                      President
                    </span>
                    <h3 className="text-lg font-bold text-gray-900 mt-0.5">{assoc.president}</h3>
                    <p className="text-xs text-gray-500 mt-1">{assoc.name}</p>
                  </div>
                </div>

                <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-800 flex items-center justify-center font-bold text-lg">
                    S
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider">
                      Secretary
                    </span>
                    <h3 className="text-lg font-bold text-gray-900 mt-0.5">{assoc.secretary}</h3>
                    <p className="text-xs text-gray-500 mt-1">{assoc.name}</p>
                  </div>
                </div>

                <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-800 flex items-center justify-center font-bold text-lg">
                    T
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-blue-800 uppercase tracking-wider">
                      Treasurer
                    </span>
                    <h3 className="text-lg font-bold text-gray-900 mt-0.5">{assoc.treasurer}</h3>
                    <p className="text-xs text-gray-500 mt-1">{assoc.name}</p>
                  </div>
                </div>
              </div>

              {/* Colony Profile Box */}
              <div className="bg-gradient-to-br from-[#0A3D2E] to-[#041f17] text-white rounded-3xl p-8 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-[#DCAE1D]">
                  <Home className="w-3.5 h-3.5" />
                  <span>Residential Colony Profile</span>
                </div>
                <h3 className="text-2xl font-bold">{assoc.name} Overview</h3>
                <p className="text-emerald-100/90 text-sm leading-relaxed font-light">
                  {assoc.name} is a formally organized resident society in {assoc.taluk} Taluk,
                  Malappuram district, registered under CoRWA. The committee oversees municipal grievance
                  redressal, colony road maintenance, door-to-door waste collection protocols, street lighting,
                  and neighborhood festivals.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-white/10 text-xs">
                  <div>
                    <span className="text-emerald-300/70 block">Registration Code</span>
                    <span className="font-mono font-bold text-white text-xs">{assoc.regNo}</span>
                  </div>
                  <div>
                    <span className="text-emerald-300/70 block">Taluk Division</span>
                    <span className="font-bold text-white">{assoc.taluk} Taluk</span>
                  </div>
                  <div>
                    <span className="text-emerald-300/70 block">Household Units</span>
                    <span className="font-bold text-white">{assoc.householdsCount}+ Families</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Office & Official Contact */}
            <div className="space-y-6">
              <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-6">
                <h3 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-4">
                  Official Communication
                </h3>

                <div className="space-y-4 text-xs">
                  <div className="flex items-start gap-3">
                    <div className="p-2.5 rounded-xl bg-emerald-50 text-[#0A3D2E] shrink-0">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">Office Location</p>
                      <p className="text-gray-600 mt-0.5 leading-relaxed">{assoc.officeAddress}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2.5 rounded-xl bg-emerald-50 text-[#0A3D2E] shrink-0">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">Phone</p>
                      <p className="text-gray-600 mt-0.5 font-mono">{assoc.contactPhone}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2.5 rounded-xl bg-emerald-50 text-[#0A3D2E] shrink-0">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">Official Email</p>
                      <p className="text-gray-600 mt-0.5">{assoc.contactEmail}</p>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    href={`/taluks/${assoc.taluk.toLowerCase()}`}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-[#0A3D2E] hover:bg-[#072c21] text-white font-bold text-xs shadow-md transition-all"
                  >
                    <span>View {assoc.taluk} Taluk Portal</span>
                    <ArrowLeft className="w-3.5 h-3.5 rotate-180" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* LOGIN MODAL */}
      <AnimatePresence>
        {showLoginModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl border border-gray-100 relative overflow-hidden"
            >
              <button
                onClick={() => setShowLoginModal(false)}
                className="absolute top-5 right-5 p-2 rounded-xl text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="inline-flex p-3 rounded-2xl bg-[#0A3D2E] text-[#DCAE1D]">
                    <Lock className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 leading-tight">
                    {assoc.name} Admin Login
                  </h3>
                  <p className="text-xs text-gray-500">
                    Sign in to manage and edit events, photos, and social media channels for {assoc.name}.
                  </p>
                </div>

                {loginError && (
                  <div className="p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{loginError}</span>
                  </div>
                )}

                <form onSubmit={handleLoginSubmit} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Username
                    </label>
                    <input
                      type="text"
                      required
                      value={loginUsername}
                      onChange={(e) => setLoginUsername(e.target.value)}
                      placeholder={`e.g. ${assoc.slug}`}
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A3D2E]/40"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Password
                    </label>
                    <input
                      type="password"
                      required
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="Enter association password"
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A3D2E]/40"
                    />
                  </div>

                  {/* Credentials hint */}
                  <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-[11px] space-y-1">
                    <span className="font-bold">Default Credentials for {assoc.name}:</span>
                    <div className="font-mono text-[10px] text-amber-800">
                      Username: <strong>{assoc.slug}</strong> | Password:{' '}
                      <strong>{assoc.slug}123</strong>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-2xl bg-[#0A3D2E] hover:bg-[#072c21] text-white font-bold text-sm shadow-xl transition-all"
                  >
                    Sign In as Association Admin
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* EVENT ADD / EDIT MODAL */}
      <AnimatePresence>
        {showEventModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-lg w-full p-8 shadow-2xl border border-gray-100 my-8 space-y-6"
            >
              <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                <h3 className="text-xl font-bold text-gray-900">
                  {editingEvent ? 'Edit Event' : 'Add New Event'} ({assoc.name})
                </h3>
                <button
                  onClick={() => setShowEventModal(false)}
                  className="p-2 rounded-xl text-gray-400 hover:text-gray-700 hover:bg-gray-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveEvent} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Event Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={eventTitle}
                    onChange={(e) => setEventTitle(e.target.value)}
                    placeholder="e.g. Colony Cleanliness Drive"
                    className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A3D2E]/40"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Category
                    </label>
                    <select
                      value={eventCategory}
                      onChange={(e) =>
                        setEventCategory(e.target.value as AssociationEvent['category'])
                      }
                      className="w-full px-3 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#0A3D2E]/40"
                    >
                      <option value="General Body">General Body</option>
                      <option value="Cleanliness Drive">Cleanliness Drive</option>
                      <option value="Health Camp">Health Camp</option>
                      <option value="Cultural Fest">Cultural Fest</option>
                      <option value="Meeting">Meeting</option>
                      <option value="Festival">Festival</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={eventDate}
                      onChange={(e) => setEventDate(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-gray-50 border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#0A3D2E]/40"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Time
                    </label>
                    <input
                      type="text"
                      value={eventTime}
                      onChange={(e) => setEventTime(e.target.value)}
                      placeholder="e.g. 07:30 PM - 09:30 PM"
                      className="w-full px-3 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#0A3D2E]/40"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Venue / Location *
                    </label>
                    <input
                      type="text"
                      required
                      value={eventVenue}
                      onChange={(e) => setEventVenue(e.target.value)}
                      placeholder="Colony Hall or Avenue"
                      className="w-full px-3 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#0A3D2E]/40"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Description
                  </label>
                  <textarea
                    rows={3}
                    value={eventDescription}
                    onChange={(e) => setEventDescription(e.target.value)}
                    placeholder="Details about program schedule, agenda, or attendance..."
                    className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#0A3D2E]/40"
                  />
                </div>

                {/* Event Image Picker */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Select Event Poster / Image
                  </label>
                  <div className="flex items-center gap-2 overflow-x-auto pb-1">
                    {presetImages.map((img) => (
                      <button
                        key={img}
                        type="button"
                        onClick={() => setEventImage(img)}
                        className={`relative h-14 w-14 shrink-0 rounded-xl overflow-hidden border-2 transition-all ${
                          eventImage === img ? 'border-[#0A3D2E] scale-105 shadow-md' : 'border-transparent opacity-60'
                        }`}
                      >
                        <img src={img} alt="preset" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowEventModal(false)}
                    className="px-4 py-2.5 rounded-xl text-xs font-semibold text-gray-600 hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-[#0A3D2E] text-white text-xs font-bold shadow-md hover:bg-[#072c21]"
                  >
                    {editingEvent ? 'Save Changes' : 'Publish Event'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* GALLERY ADD MODAL */}
      <AnimatePresence>
        {showGalleryModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl border border-gray-100 space-y-6"
            >
              <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                <h3 className="text-xl font-bold text-gray-900">
                  Add Photo to {assoc.name} Gallery
                </h3>
                <button
                  onClick={() => setShowGalleryModal(false)}
                  className="p-2 rounded-xl text-gray-400 hover:text-gray-700 hover:bg-gray-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveGallery} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Photo Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={galleryTitle}
                    onChange={(e) => setGalleryTitle(e.target.value)}
                    placeholder="e.g. Colony Meeting Photo"
                    className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A3D2E]/40"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Caption / Description
                  </label>
                  <input
                    type="text"
                    value={galleryCaption}
                    onChange={(e) => setGalleryCaption(e.target.value)}
                    placeholder="Details about the activity"
                    className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#0A3D2E]/40"
                  />
                </div>

                {/* Preset Image Picker */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Select Photograph
                  </label>
                  <div className="flex items-center gap-2 overflow-x-auto pb-1">
                    {presetImages.map((img) => (
                      <button
                        key={img}
                        type="button"
                        onClick={() => setGalleryUrl(img)}
                        className={`relative h-14 w-14 shrink-0 rounded-xl overflow-hidden border-2 transition-all ${
                          galleryUrl === img ? 'border-[#0A3D2E] scale-105 shadow-md' : 'border-transparent opacity-60'
                        }`}
                      >
                        <img src={img} alt="preset" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowGalleryModal(false)}
                    className="px-4 py-2.5 rounded-xl text-xs font-semibold text-gray-600 hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-[#0A3D2E] text-white text-xs font-bold shadow-md hover:bg-[#072c21]"
                  >
                    Upload Photo
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MANAGE SOCIAL MEDIA MODAL */}
      <AnimatePresence>
        {showSocialModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-lg w-full p-8 shadow-2xl border border-gray-100 my-8 space-y-6"
            >
              <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                <div className="space-y-0.5">
                  <h3 className="text-xl font-bold text-gray-900">
                    Manage Social Media ({assoc.name})
                  </h3>
                  <p className="text-xs text-gray-500">
                    Add or update your association&rsquo;s official social profiles and community links.
                  </p>
                </div>
                <button
                  onClick={() => setShowSocialModal(false)}
                  className="p-2 rounded-xl text-gray-400 hover:text-gray-700 hover:bg-gray-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveSocials} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                    <span>WhatsApp Link (Chat or Group Invite)</span>
                  </label>
                  <input
                    type="url"
                    value={socialForm.whatsapp || ''}
                    onChange={(e) =>
                      setSocialForm({ ...socialForm, whatsapp: e.target.value })
                    }
                    placeholder="https://chat.whatsapp.com/... or https://wa.me/..."
                    className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#0A3D2E]/40"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-blue-600" />
                    <span>Facebook Profile or Page URL</span>
                  </label>
                  <input
                    type="url"
                    value={socialForm.facebook || ''}
                    onChange={(e) =>
                      setSocialForm({ ...socialForm, facebook: e.target.value })
                    }
                    placeholder="https://facebook.com/your-association"
                    className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#0A3D2E]/40"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
                    <Share2 className="w-3.5 h-3.5 text-pink-600" />
                    <span>Instagram Profile URL</span>
                  </label>
                  <input
                    type="url"
                    value={socialForm.instagram || ''}
                    onChange={(e) =>
                      setSocialForm({ ...socialForm, instagram: e.target.value })
                    }
                    placeholder="https://instagram.com/your-association"
                    className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#0A3D2E]/40"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
                    <ExternalLink className="w-3.5 h-3.5 text-red-600" />
                    <span>YouTube Channel URL</span>
                  </label>
                  <input
                    type="url"
                    value={socialForm.youtube || ''}
                    onChange={(e) =>
                      setSocialForm({ ...socialForm, youtube: e.target.value })
                    }
                    placeholder="https://youtube.com/@your-channel"
                    className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#0A3D2E]/40"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-amber-600" />
                    <span>Official Website URL</span>
                  </label>
                  <input
                    type="url"
                    value={socialForm.website || ''}
                    onChange={(e) =>
                      setSocialForm({ ...socialForm, website: e.target.value })
                    }
                    placeholder="https://yourcolony.org or portal link"
                    className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#0A3D2E]/40"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-slate-600" />
                      <span>Helpline Phone</span>
                    </label>
                    <input
                      type="text"
                      value={socialForm.phone || ''}
                      onChange={(e) =>
                        setSocialForm({ ...socialForm, phone: e.target.value })
                      }
                      placeholder="+91 94470..."
                      className="w-full px-3 py-2 rounded-xl bg-gray-50 border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#0A3D2E]/40"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-slate-600" />
                      <span>Official Email</span>
                    </label>
                    <input
                      type="email"
                      value={socialForm.email || ''}
                      onChange={(e) =>
                        setSocialForm({ ...socialForm, email: e.target.value })
                      }
                      placeholder="contact@colony.org"
                      className="w-full px-3 py-2 rounded-xl bg-gray-50 border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#0A3D2E]/40"
                    />
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowSocialModal(false)}
                    className="px-4 py-2.5 rounded-xl text-xs font-semibold text-gray-600 hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-[#0A3D2E] text-white text-xs font-bold shadow-md hover:bg-[#072c21]"
                  >
                    Save Social Media Links
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* LIGHTBOX MODAL */}
      <AnimatePresence>
        {lightboxImage && (
          <div
            onClick={() => setLightboxImage(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md cursor-pointer"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-4xl w-full bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-white/10"
            >
              <div className="relative max-h-[75vh] w-full flex items-center justify-center bg-black">
                <img
                  src={lightboxImage.imageUrl}
                  alt={lightboxImage.title}
                  className="max-h-[75vh] w-auto object-contain"
                />
                <button
                  onClick={() => setLightboxImage(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-black/60 text-white hover:bg-black/90"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6 text-white bg-slate-900 space-y-1">
                <h4 className="text-lg font-bold">{lightboxImage.title}</h4>
                {lightboxImage.caption && (
                  <p className="text-sm text-gray-300">{lightboxImage.caption}</p>
                )}
                {lightboxImage.date && (
                  <p className="text-xs text-[#DCAE1D] font-mono">{lightboxImage.date}</p>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* DELETE CONFIRMATION DIALOG */}
      <AnimatePresence>
        {deleteConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-gray-100 space-y-4"
            >
              <div className="flex items-center gap-3 text-red-600">
                <div className="p-3 rounded-2xl bg-red-50">
                  <Trash2 className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-base text-gray-900">Confirm Deletion</h4>
                  <p className="text-xs text-gray-500">This action cannot be undone.</p>
                </div>
              </div>

              <p className="text-xs text-gray-700 leading-relaxed">
                Are you sure you want to delete &ldquo;<strong>{deleteConfirm.title}</strong>&rdquo; from{' '}
                {assoc.name} records?
              </p>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-600 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  onClick={executeDelete}
                  className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-md"
                >
                  Delete Permanently
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}

