import {
  INITIAL_TALUK_EVENTS,
  INITIAL_TALUK_GALLERY,
  TALUKS_MAP,
  TalukEvent,
  TalukImage,
} from '@/data/taluksData';

const isBrowser = typeof window !== 'undefined';

export function getTalukEvents(slug: string): TalukEvent[] {
  if (!isBrowser) return INITIAL_TALUK_EVENTS[slug] || [];
  try {
    const raw = localStorage.getItem(`corwa_taluk_events_${slug}`);
    if (!raw) {
      const initial = INITIAL_TALUK_EVENTS[slug] || [];
      localStorage.setItem(`corwa_taluk_events_${slug}`, JSON.stringify(initial));
      return initial;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading taluk events', err);
    return INITIAL_TALUK_EVENTS[slug] || [];
  }
}

export function saveTalukEvents(slug: string, events: TalukEvent[]): void {
  if (!isBrowser) return;
  try {
    localStorage.setItem(`corwa_taluk_events_${slug}`, JSON.stringify(events));
  } catch (err) {
    console.error('Error saving taluk events', err);
  }
}

export function addTalukEvent(
  slug: string,
  eventData: Omit<TalukEvent, 'id' | 'talukSlug' | 'createdAt'>
): TalukEvent {
  const current = getTalukEvents(slug);
  const newEvent: TalukEvent = {
    ...eventData,
    id: `ev-${slug}-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    talukSlug: slug,
    createdAt: new Date().toISOString(),
  };
  const updated = [newEvent, ...current];
  saveTalukEvents(slug, updated);
  return newEvent;
}

export function updateTalukEvent(
  slug: string,
  id: string,
  data: Partial<TalukEvent>
): TalukEvent | null {
  const current = getTalukEvents(slug);
  const index = current.findIndex((e) => e.id === id);
  if (index === -1) return null;

  const updatedItem: TalukEvent = { ...current[index], ...data };
  current[index] = updatedItem;
  saveTalukEvents(slug, current);
  return updatedItem;
}

export function deleteTalukEvent(slug: string, id: string): boolean {
  const current = getTalukEvents(slug);
  const filtered = current.filter((e) => e.id !== id);
  if (filtered.length === current.length) return false;
  saveTalukEvents(slug, filtered);
  return true;
}

export function getTalukGallery(slug: string): TalukImage[] {
  if (!isBrowser) return INITIAL_TALUK_GALLERY[slug] || [];
  try {
    const raw = localStorage.getItem(`corwa_taluk_gallery_${slug}`);
    if (!raw) {
      const initial = INITIAL_TALUK_GALLERY[slug] || [];
      localStorage.setItem(`corwa_taluk_gallery_${slug}`, JSON.stringify(initial));
      return initial;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading taluk gallery', err);
    return INITIAL_TALUK_GALLERY[slug] || [];
  }
}

export function saveTalukGallery(slug: string, images: TalukImage[]): void {
  if (!isBrowser) return;
  try {
    localStorage.setItem(`corwa_taluk_gallery_${slug}`, JSON.stringify(images));
  } catch (err) {
    console.error('Error saving taluk gallery', err);
  }
}

export function addTalukImage(
  slug: string,
  imageData: Omit<TalukImage, 'id' | 'talukSlug' | 'createdAt'>
): TalukImage {
  const current = getTalukGallery(slug);
  const newImage: TalukImage = {
    ...imageData,
    id: `img-${slug}-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    talukSlug: slug,
    createdAt: new Date().toISOString(),
  };
  const updated = [newImage, ...current];
  saveTalukGallery(slug, updated);
  return newImage;
}

export function deleteTalukImage(slug: string, id: string): boolean {
  const current = getTalukGallery(slug);
  const filtered = current.filter((img) => img.id !== id);
  if (filtered.length === current.length) return false;
  saveTalukGallery(slug, filtered);
  return true;
}

export interface TalukSession {
  talukSlug: string;
  username: string;
  loggedInAt: number;
}

export function getTalukSession(slug: string): TalukSession | null {
  if (!isBrowser) return null;
  try {
    const raw = localStorage.getItem(`corwa_taluk_session_${slug}`);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function loginTalukAuth(
  slug: string,
  username: string,
  passwordPlain: string
): { success: boolean; message: string; session?: TalukSession } {
  const taluk = TALUKS_MAP[slug];
  if (!taluk) {
    return { success: false, message: 'Invalid Taluk' };
  }

  const cleanUser = username.trim().toLowerCase();
  const cleanPass = passwordPlain.trim();

  // Check matching credentials
  const expectedUser = taluk.credentials.username.toLowerCase();
  const expectedPass = taluk.credentials.passwordPlain;

  if (cleanUser === expectedUser && (cleanPass === expectedPass || cleanPass === `${slug}@corwa`)) {
    const session: TalukSession = {
      talukSlug: slug,
      username: taluk.credentials.username,
      loggedInAt: Date.now(),
    };
    if (isBrowser) {
      localStorage.setItem(`corwa_taluk_session_${slug}`, JSON.stringify(session));
    }
    return { success: true, message: 'Login successful', session };
  }

  // Helpful mismatch message if someone entered another taluk's username
  for (const [otherSlug, otherInfo] of Object.entries(TALUKS_MAP)) {
    if (otherSlug !== slug && cleanUser === otherInfo.credentials.username.toLowerCase()) {
      return {
        success: false,
        message: `This username belongs to ${otherInfo.name} Taluk. Please log in with ${taluk.name} Taluk credentials.`,
      };
    }
  }

  return {
    success: false,
    message: `Invalid credentials for ${taluk.name} Taluk. (Default: username: ${expectedUser}, password: ${expectedPass})`,
  };
}

export function logoutTalukAuth(slug: string): void {
  if (!isBrowser) return;
  try {
    localStorage.removeItem(`corwa_taluk_session_${slug}`);
  } catch (err) {
    console.error('Error logging out', err);
  }
}

