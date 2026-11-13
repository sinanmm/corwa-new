'use client';

import { useState, useEffect, useMemo } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { useAppStore } from '@/store/useStore';
import { TalukInfo, TalukEvent, TalukImage } from '@/data/taluksData';
import {
  getTalukEvents,
  addTalukEvent,
  updateTalukEvent,
  deleteTalukEvent,
  getTalukGallery,
  addTalukImage,
  deleteTalukImage,
  getTalukSession,
  loginTalukAuth,
  logoutTalukAuth,
  TalukSession,
} from '@/utils/talukStorage';
import { associationsData } from '@/data/associations';
import { getAffiliatedAssociationLabel, isAffiliatedAssociation } from '@/utils/affiliatedAssociations';
import { slugify } from '@/data/associationData';
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
  ChevronRight,
  ArrowLeft,
  X,
  Star,
  CheckCircle2,
  AlertCircle,
  Search,
  ExternalLink,
  Sparkles,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface TalukClientProps {
  taluk: TalukInfo;
}

export default function TalukClient({ taluk }: TalukClientProps) {
  const { language } = useAppStore();
  const isMalayalam = language === 'malayalam';

  // State
  const [activeTab, setActiveTab] = useState<'events' | 'gallery' | 'associations' | 'committee'>('events');
  const [events, setEvents] = useState<TalukEvent[]>([]);
  const [gallery, setGallery] = useState<TalukImage[]>([]);
  const [session, setSession] = useState<TalukSession | null>(null);

  // Modals state
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Event modal state
  const [showEventModal, setShowEventModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState<TalukEvent | null>(null);
  const [eventTitle, setEventTitle] = useState('');
  const [eventCategory, setEventCategory] = useState<TalukEvent['category']>('General Body');
  const [eventDate, setEventDate] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [eventVenue, setEventVenue] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventImage, setEventImage] = useState('/1.jpeg');

  // Gallery modal state
  const [showGalleryModal, setShowGalleryModal] = useState(false);
  const [galleryTitle, setGalleryTitle] = useState('');
  const [galleryCaption, setGalleryCaption] = useState('');
  const [galleryUrl, setGalleryUrl] = useState('/1.jpeg');
  const [galleryDate, setGalleryDate] = useState('');

  // Lightbox modal state
  const [lightboxImage, setLightboxImage] = useState<TalukImage | null>(null);

  // Delete confirm modal state
  const [deleteConfirm, setDeleteConfirm] = useState<{
    type: 'event' | 'image';
    id: string;
    title: string;
  } | null>(null);

  // Search in associations tab
  const [assocSearch, setAssocSearch] = useState('');

  // Toast / notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Load taluk-specific data on mount
  useEffect(() => {
    setEvents(getTalukEvents(taluk.slug));
    setGallery(getTalukGallery(taluk.slug));
    setSession(getTalukSession(taluk.slug));
  }, [taluk.slug]);

  const isAdmin = Boolean(session && session.talukSlug === taluk.slug);

  // Filter RWAs belonging to this taluk
  const talukAssociations = useMemo(() => {
    return associationsData.filter(
      (a) => a.taluk.toLowerCase() === taluk.name.toLowerCase()
    );
  }, [taluk.name]);

  const filteredAssociations = useMemo(() => {
    if (!assocSearch.trim()) return talukAssociations;
    const query = assocSearch.toLowerCase();
    return talukAssociations.filter(
      (a) =>
        a.name.toLowerCase().includes(query) ||
        (a.nameEn && a.nameEn.toLowerCase().includes(query))
    );
  }, [talukAssociations, assocSearch]);

  const affiliatedCount = useMemo(() => {
    return talukAssociations.filter(isAffiliatedAssociation).length;
  }, [talukAssociations]);

  // Auth Handlers
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    const res = loginTalukAuth(taluk.slug, loginUsername, loginPassword);
    if (res.success && res.session) {
      setSession(res.session);
      setShowLoginModal(false);
      setLoginUsername('');
      setLoginPassword('');
      showToast(isMalayalam ? 'വിജയകരമായി ലോഗിൻ ചെയ്തു!' : `Welcome to ${taluk.name} Taluk Admin Portal!`);
    } else {
      setLoginError(res.message);
    }
  };

  const handleLogout = () => {
    logoutTalukAuth(taluk.slug);
    setSession(null);
    showToast(isMalayalam ? 'ലോഗ്ഔട്ട് ചെയ്തു' : 'Logged out successfully');
  };

  // Event Handlers
  const handleOpenAddEvent = () => {
    setEditingEvent(null);
    setEventTitle('');
    setEventCategory('General Body');
    setEventDate(new Date().toISOString().split('T')[0]);
    setEventTime('10:00 AM - 01:00 PM');
    setEventVenue(`${taluk.name} Community Hall`);
    setEventDescription('');
    setEventImage('/1.jpeg');
    setShowEventModal(true);
  };

  const handleOpenEditEvent = (ev: TalukEvent) => {
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
      updateTalukEvent(taluk.slug, editingEvent.id, {
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
      addTalukEvent(taluk.slug, {
        title: eventTitle,
        category: eventCategory,
        date: eventDate,
        time: eventTime,
        venue: eventVenue,
        description: eventDescription,
        imageUrl: eventImage,
      });
      showToast(isMalayalam ? 'പുതിയ പരിപാടി ചേർത്തു' : 'New event added successfully');
    }

    setEvents(getTalukEvents(taluk.slug));
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

    addTalukImage(taluk.slug, {
      title: galleryTitle,
      caption: galleryCaption,
      imageUrl: galleryUrl,
      date: galleryDate || new Date().toISOString().split('T')[0],
    });

    setGallery(getTalukGallery(taluk.slug));
    setShowGalleryModal(false);
    showToast(isMalayalam ? 'ചിത്രം ചേർത്തു' : 'Photo added to gallery');
  };

  // Delete Action Execution
  const executeDelete = () => {
    if (!deleteConfirm) return;

    if (deleteConfirm.type === 'event') {
      deleteTalukEvent(taluk.slug, deleteConfirm.id);
      setEvents(getTalukEvents(taluk.slug));
      showToast(isMalayalam ? 'പരിപാടി നീക്കം ചെയ്തു' : 'Event deleted');
    } else {
      deleteTalukImage(taluk.slug, deleteConfirm.id);
      setGallery(getTalukGallery(taluk.slug));
      showToast(isMalayalam ? 'ചിത്രം നീക്കം ചെയ്തു' : 'Image deleted');
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
          {/* Top Breadcrumb & Back Link */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <Link
              href="/associations"
              className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-200/90 hover:text-white bg-white/10 hover:bg-white/15 px-3.5 py-1.5 rounded-full transition-all border border-white/10"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{isMalayalam ? 'അസോസിയേഷനുകളുടെ പട്ടികയിലേക്ക്' : 'Back to Associations Directory'}</span>
            </Link>

            {/* UPPER RIGHT ADMIN LOGIN / STATUS BUTTON */}
            <div className="flex items-center gap-3">
              {isAdmin ? (
                <div className="flex items-center gap-2 bg-emerald-950/80 border border-emerald-500/40 px-3.5 py-1.5 rounded-2xl backdrop-blur-md">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-semibold text-emerald-200">
                    {isMalayalam ? `${taluk.name} അഡ്മിൻ` : `${taluk.name} Admin Active`}
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
                  <span>{isMalayalam ? 'താലൂക്ക് ലോഗിൻ' : 'Taluk Admin Login'}</span>
                </button>
              )}
            </div>
          </div>

          {/* Main Title & Details */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="space-y-4 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/10 text-xs font-medium text-[#DCAE1D]">
                <MapPin className="w-3.5 h-3.5" />
                <span>
                  {taluk.district} District, {taluk.state} • HQ: {taluk.headquarters}
                </span>
              </div>

              <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
                {taluk.name} <span className="text-[#DCAE1D] font-medium text-2xl md:text-3xl">({taluk.nameMl})</span>
              </h1>

              <p className="text-base text-emerald-100/90 leading-relaxed font-light">
                {isMalayalam ? taluk.descriptionMl : taluk.description}
              </p>

              {/* Stats Counters */}
              <div className="flex flex-wrap gap-3 pt-2">
                <div className="bg-white/10 backdrop-blur-md border border-white/10 px-4 py-2 rounded-2xl">
                  <div className="text-xl font-bold text-white">{talukAssociations.length}</div>
                  <div className="text-[11px] text-emerald-200/80 uppercase tracking-wider">
                    {isMalayalam ? 'അസോസിയേഷനുകൾ' : 'Registered RWAs'}
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-md border border-white/10 px-4 py-2 rounded-2xl">
                  <div className="text-xl font-bold text-[#DCAE1D]">{affiliatedCount}</div>
                  <div className="text-[11px] text-emerald-200/80 uppercase tracking-wider">
                    {isMalayalam ? 'അഫിലിയേറ്റഡ്' : 'Affiliated RWAs'}
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-md border border-white/10 px-4 py-2 rounded-2xl">
                  <div className="text-xl font-bold text-white">{events.length}</div>
                  <div className="text-[11px] text-emerald-200/80 uppercase tracking-wider">
                    {isMalayalam ? 'പരിപാടികൾ' : 'Events & Programs'}
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-md border border-white/10 px-4 py-2 rounded-2xl">
                  <div className="text-xl font-bold text-white">{gallery.length}</div>
                  <div className="text-[11px] text-emerald-200/80 uppercase tracking-wider">
                    {isMalayalam ? 'ചിത്രങ്ങൾ' : 'Gallery Photos'}
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
                  <span>Admin Actions</span>
                </div>
                <div className="space-y-2">
                  <button
                    onClick={handleOpenAddEvent}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white text-[#0A3D2E] hover:bg-emerald-50 font-bold text-xs shadow-md transition-all"
                  >
                    <Plus className="w-4 h-4" />
                    <span>{isMalayalam ? 'പുതിയ പരിപാടി ചേർക്കുക' : 'Add New Event'}</span>
                  </button>

                  <button
                    onClick={handleOpenAddGallery}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/20 hover:bg-white/30 text-white font-bold text-xs border border-white/20 transition-all"
                  >
                    <Plus className="w-4 h-4" />
                    <span>{isMalayalam ? 'ചിത്രം ചേർക്കുക' : 'Add Gallery Photo'}</span>
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
              <span>{isMalayalam ? 'പരിപാടികൾ' : 'Events & Programs'}</span>
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
              <span>{isMalayalam ? 'ചിത്രശാല' : 'Photo Gallery'}</span>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-white/20 font-mono">
                {gallery.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('associations')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs md:text-sm font-bold whitespace-nowrap transition-all ${
                activeTab === 'associations'
                  ? 'bg-[#0A3D2E] text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <Building className="w-4 h-4" />
              <span>{isMalayalam ? 'അസോസിയേഷനുകൾ' : 'Registered RWAs'}</span>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-white/20 font-mono">
                {talukAssociations.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('committee')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs md:text-sm font-bold whitespace-nowrap transition-all ${
                activeTab === 'committee'
                  ? 'bg-[#0A3D2E] text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>{isMalayalam ? 'കമ്മിറ്റി & ഓഫീസ്' : 'Committee & Office'}</span>
            </button>
          </div>
        </div>
      </section>

      {/* MAIN TAB CONTENT */}
      <main className="flex-1 container mx-auto max-w-7xl px-6 py-10">
        {/* TAB 1: EVENTS */}
        {activeTab === 'events' && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {isMalayalam ? `${taluk.name} താലൂക്ക് പരിപാടികൾ` : `${taluk.name} Taluk Events`}
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  {isMalayalam
                    ? 'ഈ താലൂക്കിലെ ഔദ്യോഗിക യോഗങ്ങളും സാമൂഹിക പ്രവർത്തനങ്ങളും'
                    : 'Official meetings, social drives, and workshops organized for this taluk.'}
                </p>
              </div>

              {isAdmin && (
                <button
                  onClick={handleOpenAddEvent}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0A3D2E] hover:bg-[#072c21] text-white text-xs font-bold shadow-md transition-all"
                >
                  <Plus className="w-4 h-4" />
                  <span>{isMalayalam ? 'പരിപാടി ചേർക്കുക' : 'Add Event'}</span>
                </button>
              )}
            </div>

            {events.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 shadow-sm space-y-4">
                <CalendarDays className="w-16 h-16 text-gray-300 mx-auto" />
                <h3 className="text-lg font-bold text-gray-700">No Events Scheduled</h3>
                <p className="text-gray-500 text-sm max-w-md mx-auto">
                  {isMalayalam
                    ? 'ഈ താലൂക്കിൽ നിലവിൽ പരിപാടികൾ രേഖപ്പെടുത്തിയിട്ടില്ല.'
                    : 'No events or meetings have been published for this taluk yet.'}
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

                      {/* Admin action overlays */}
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

        {/* TAB 2: GALLERY */}
        {activeTab === 'gallery' && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {isMalayalam ? `${taluk.name} താലൂക്ക് ചിത്രങ്ങൾ` : `${taluk.name} Photo Gallery`}
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  {isMalayalam
                    ? 'ഈ താലൂക്കിലെ പരിപാടികളുടെയും പ്രവർത്തനങ്ങളുടെയും ചിത്രങ്ങൾ'
                    : 'Photographs and memories from activities conducted in this taluk.'}
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
                    ? 'ഈ താലൂക്കിലേക്ക് ഇതുവരെ ചിത്രങ്ങൾ ചേർത്തിട്ടില്ല.'
                    : 'No gallery pictures uploaded for this taluk yet.'}
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

        {/* TAB 3: ASSOCIATIONS IN THIS TALUK */}
        {activeTab === 'associations' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {isMalayalam
                    ? `${taluk.name} താലൂക്കിലെ അസോസിയേഷനുകൾ`
                    : `Registered Associations in ${taluk.name}`}
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Showing {filteredAssociations.length} of {talukAssociations.length} resident associations
                </p>
              </div>

              {/* Search within this taluk */}
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  placeholder={isMalayalam ? 'അസോസിയേഷൻ തിരയുക...' : 'Search within taluk...'}
                  value={assocSearch}
                  onChange={(e) => setAssocSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0A3D2E]/40"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAssociations.map((assoc, idx) => {
                const affiliatedLabel = getAffiliatedAssociationLabel(assoc.name);
                const isAffiliated = Boolean(affiliatedLabel);
                const assocSlug = slugify(assoc.nameEn || assoc.name);

                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.02 }}
                    className={`relative rounded-3xl p-6 border shadow-sm hover:shadow-lg transition-all group cursor-pointer ${
                      isAffiliated
                        ? 'bg-gradient-to-br from-amber-50 via-white to-white border-amber-200 hover:border-amber-300'
                        : 'bg-white border-gray-100 hover:border-emerald-200'
                    }`}
                  >
                    <Link
                      href={`/associations/${assocSlug}`}
                      className="absolute inset-0 z-0 rounded-3xl"
                      title={`View ${assoc.name} Details`}
                    />

                    <div className="relative z-10 pointer-events-none">
                      <div className="flex items-start justify-between mb-3">
                        <div
                          className={`p-3 rounded-2xl ${
                            isAffiliated
                              ? 'bg-amber-100 text-amber-900'
                              : 'bg-emerald-50 text-[#0A3D2E]'
                          }`}
                        >
                          <Building className="w-5 h-5 text-[#0A3D2E]" />
                        </div>
                        {isAffiliated && (
                          <div className="inline-flex items-center gap-1 rounded-full border border-amber-200 bg-white/90 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-700 shadow-sm">
                            <Star className="h-3 w-3 fill-current text-amber-500" />
                            Affiliated
                          </div>
                        )}
                      </div>

                      <div className="space-y-1.5">
                        <h3 className="text-base font-bold text-gray-900 group-hover:text-[#0A3D2E] transition-colors leading-snug">
                          {assoc.name}
                        </h3>
                        {assoc.nameEn && (
                          <p className="text-xs text-gray-500 font-medium">{assoc.nameEn}</p>
                        )}
                        {affiliatedLabel && (
                          <p className="text-xs text-amber-900/80 font-medium">{affiliatedLabel}</p>
                        )}
                      </div>
                    </div>

                    <div className="relative z-10 flex items-center justify-between gap-2 mt-4 pt-4 border-t border-gray-100 pointer-events-none">
                      <div className="flex flex-wrap gap-2">
                        <span className="px-2.5 py-1 bg-yellow-50 text-yellow-800 text-[11px] font-semibold rounded-full border border-yellow-100 flex items-center gap-1">
                          <MapPin className="w-3 h-3" /> {assoc.taluk}
                        </span>
                        <span className="px-2.5 py-1 bg-gray-50 text-gray-600 text-[11px] font-semibold rounded-full border border-gray-100">
                          {assoc.district}
                        </span>
                      </div>

                      <span className="text-xs font-bold text-[#0A3D2E] group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                        <span>View Page</span>
                        <span>→</span>
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 4: COMMITTEE & CONTACT */}
        {activeTab === 'committee' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Committee Office Bearers */}
            <div className="lg:col-span-2 space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {isMalayalam
                  ? `${taluk.name} താലൂക്ക് ഭാരവാഹികൾ`
                  : `${taluk.name} Taluk Executive Committee`}
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
                    <h3 className="text-lg font-bold text-gray-900 mt-0.5">{taluk.president}</h3>
                    <p className="text-xs text-gray-500 mt-1">CoRWA {taluk.name} Committee</p>
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
                    <h3 className="text-lg font-bold text-gray-900 mt-0.5">{taluk.secretary}</h3>
                    <p className="text-xs text-gray-500 mt-1">CoRWA {taluk.name} Committee</p>
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
                    <h3 className="text-lg font-bold text-gray-900 mt-0.5">{taluk.treasurer}</h3>
                    <p className="text-xs text-gray-500 mt-1">CoRWA {taluk.name} Committee</p>
                  </div>
                </div>
              </div>

              {/* Committee Mission Statement */}
              <div className="bg-gradient-to-br from-[#0A3D2E] to-[#041f17] text-white rounded-3xl p-8 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-[#DCAE1D]">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Taluk Mission</span>
                </div>
                <h3 className="text-2xl font-bold">Empowering Resident Communities in {taluk.name}</h3>
                <p className="text-emerald-100/90 text-sm leading-relaxed font-light">
                  The {taluk.name} Taluk Committee acts as a unified platform bridging residential welfare
                  societies and government local bodies. We coordinate civic grievances, lead waste management
                  campaigns, and organize cultural, environmental, and healthcare initiatives across the taluk.
                </p>
              </div>
            </div>

            {/* Office & Contact Info */}
            <div className="space-y-6">
              <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-6">
                <h3 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-4">
                  {isMalayalam ? 'ഓഫീസ് വിലാസം' : 'Official Office & Contact'}
                </h3>

                <div className="space-y-4 text-xs">
                  <div className="flex items-start gap-3">
                    <div className="p-2.5 rounded-xl bg-emerald-50 text-[#0A3D2E] shrink-0">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">Headquarters Address</p>
                      <p className="text-gray-600 mt-0.5 leading-relaxed">{taluk.officeAddress}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2.5 rounded-xl bg-emerald-50 text-[#0A3D2E] shrink-0">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">Telephone / Helpline</p>
                      <p className="text-gray-600 mt-0.5 font-mono">{taluk.contactPhone}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2.5 rounded-xl bg-emerald-50 text-[#0A3D2E] shrink-0">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">Official Email</p>
                      <p className="text-gray-600 mt-0.5">{taluk.contactEmail}</p>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <a
                    href={`https://wa.me/919447012341?text=Hello%20CoRWA%20${encodeURIComponent(
                      taluk.name
                    )}%20Taluk%20Committee`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all"
                  >
                    <span>Connect on WhatsApp</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
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
                  <h3 className="text-2xl font-bold text-gray-900">
                    {taluk.name} Taluk Admin Portal
                  </h3>
                  <p className="text-xs text-gray-500">
                    Sign in to publish, edit, and manage events and gallery images for {taluk.name} Taluk.
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
                      placeholder={`e.g. ${taluk.credentials.username}`}
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
                      placeholder="Enter taluk password"
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A3D2E]/40"
                    />
                  </div>

                  {/* Credentials helper hint */}
                  <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-[11px] space-y-1">
                    <span className="font-bold">Default Credentials for {taluk.name}:</span>
                    <div className="font-mono text-[10px] text-amber-800">
                      Username: <strong>{taluk.credentials.username}</strong> | Password:{' '}
                      <strong>{taluk.credentials.passwordPlain}</strong>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-2xl bg-[#0A3D2E] hover:bg-[#072c21] text-white font-bold text-sm shadow-xl transition-all"
                  >
                    Sign In to {taluk.name} Portal
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
                  {editingEvent ? 'Edit Event' : 'Add New Event'} ({taluk.name} Taluk)
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
                    placeholder="e.g. Taluk Committee Meeting"
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
                        setEventCategory(e.target.value as TalukEvent['category'])
                      }
                      className="w-full px-3 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#0A3D2E]/40"
                    >
                      <option value="General Body">General Body</option>
                      <option value="Workshop">Workshop</option>
                      <option value="Community">Community</option>
                      <option value="Health Camp">Health Camp</option>
                      <option value="Meeting">Meeting</option>
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
                      placeholder="e.g. 10:00 AM - 01:00 PM"
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
                      placeholder="Hall or Colony Ground"
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
                    placeholder="Details about agenda, key speakers, or participants..."
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
                  Add Photo to {taluk.name} Gallery
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
                    placeholder="e.g. Committee Meeting Photo"
                    className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0A3D2E]/40"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Caption / Notes
                  </label>
                  <input
                    type="text"
                    value={galleryCaption}
                    onChange={(e) => setGalleryCaption(e.target.value)}
                    placeholder="Short description of the moment"
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
                {taluk.name} Taluk records?
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

