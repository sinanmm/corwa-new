import {
  AssociationDetail,
  AssociationEvent,
  AssociationImage,
  AssociationSocials,
  getAssociationBySlug,
  getInitialEventsForAssociation,
  getInitialGalleryForAssociation,
  getInitialSocialsForAssociation,
} from '@/data/associationData';

const isBrowser = typeof window !== 'undefined';

// --- EVENTS ---
export function getAssociationEvents(slug: string): AssociationEvent[] {
  const assoc = getAssociationBySlug(slug);
  const defaultEvents = assoc ? getInitialEventsForAssociation(slug, assoc) : [];

  if (!isBrowser) return defaultEvents;
  try {
    const raw = localStorage.getItem(`corwa_assoc_events_${slug}`);
    if (!raw) {
      localStorage.setItem(`corwa_assoc_events_${slug}`, JSON.stringify(defaultEvents));
      return defaultEvents;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading association events', err);
    return defaultEvents;
  }
}

export function saveAssociationEvents(slug: string, events: AssociationEvent[]): void {
  if (!isBrowser) return;
  try {
    localStorage.setItem(`corwa_assoc_events_${slug}`, JSON.stringify(events));
  } catch (err) {
    console.error('Error saving association events', err);
  }
}

export function addAssociationEvent(
  slug: string,
  eventData: Omit<AssociationEvent, 'id' | 'assocSlug' | 'createdAt'>
): AssociationEvent {
  const current = getAssociationEvents(slug);
  const newEvent: AssociationEvent = {
    ...eventData,
    id: `ev-asc-${slug}-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    assocSlug: slug,
    createdAt: new Date().toISOString(),
  };
  const updated = [newEvent, ...current];
  saveAssociationEvents(slug, updated);
  return newEvent;
}

export function updateAssociationEvent(
  slug: string,
  id: string,
  data: Partial<AssociationEvent>
): AssociationEvent | null {
  const current = getAssociationEvents(slug);
  const index = current.findIndex((e) => e.id === id);
  if (index === -1) return null;

  const updatedItem: AssociationEvent = { ...current[index], ...data };
  current[index] = updatedItem;
  saveAssociationEvents(slug, current);
  return updatedItem;
}

export function deleteAssociationEvent(slug: string, id: string): boolean {
  const current = getAssociationEvents(slug);
  const filtered = current.filter((e) => e.id !== id);
  if (filtered.length === current.length) return false;
  saveAssociationEvents(slug, filtered);
  return true;
}

// --- GALLERY ---
export function getAssociationGallery(slug: string): AssociationImage[] {
  const assoc = getAssociationBySlug(slug);
  const defaultGallery = assoc ? getInitialGalleryForAssociation(slug, assoc) : [];

  if (!isBrowser) return defaultGallery;
  try {
    const raw = localStorage.getItem(`corwa_assoc_gallery_${slug}`);
    if (!raw) {
      localStorage.setItem(`corwa_assoc_gallery_${slug}`, JSON.stringify(defaultGallery));
      return defaultGallery;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading association gallery', err);
    return defaultGallery;
  }
}

export function saveAssociationGallery(slug: string, images: AssociationImage[]): void {
  if (!isBrowser) return;
  try {
    localStorage.setItem(`corwa_assoc_gallery_${slug}`, JSON.stringify(images));
  } catch (err) {
    console.error('Error saving association gallery', err);
  }
}

export function addAssociationImage(
  slug: string,
  imageData: Omit<AssociationImage, 'id' | 'assocSlug' | 'createdAt'>
): AssociationImage {
  const current = getAssociationGallery(slug);
  const newImage: AssociationImage = {
    ...imageData,
    id: `img-asc-${slug}-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    assocSlug: slug,
    createdAt: new Date().toISOString(),
  };
  const updated = [newImage, ...current];
  saveAssociationGallery(slug, updated);
  return newImage;
}

export function deleteAssociationImage(slug: string, id: string): boolean {
  const current = getAssociationGallery(slug);
  const filtered = current.filter((img) => img.id !== id);
  if (filtered.length === current.length) return false;
  saveAssociationGallery(slug, filtered);
  return true;
}

// --- SOCIAL MEDIA ---
export function getAssociationSocials(slug: string): AssociationSocials {
  const assoc = getAssociationBySlug(slug);
  const defaultSocials = assoc ? getInitialSocialsForAssociation(slug, assoc) : {};

  if (!isBrowser) return defaultSocials;
  try {
    const raw = localStorage.getItem(`corwa_assoc_socials_${slug}`);
    if (!raw) {
      localStorage.setItem(`corwa_assoc_socials_${slug}`, JSON.stringify(defaultSocials));
      return defaultSocials;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading association socials', err);
    return defaultSocials;
  }
}

export function saveAssociationSocials(slug: string, socials: AssociationSocials): void {
  if (!isBrowser) return;
  try {
    localStorage.setItem(`corwa_assoc_socials_${slug}`, JSON.stringify(socials));
  } catch (err) {
    console.error('Error saving association socials', err);
  }
}

// --- AUTH & SESSION ---
export interface AssociationSession {
  assocSlug: string;
  assocName: string;
  username: string;
  loggedInAt: number;
}

export function getAssociationSession(slug: string): AssociationSession | null {
  if (!isBrowser) return null;
  try {
    const raw = localStorage.getItem(`corwa_assoc_session_${slug}`);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function loginAssociationAuth(
  slug: string,
  username: string,
  passwordPlain: string
): { success: boolean; message: string; session?: AssociationSession } {
  const assoc = getAssociationBySlug(slug);
  if (!assoc) {
    return { success: false, message: 'Association not found' };
  }

  const cleanUser = username.trim().toLowerCase();
  const cleanPass = passwordPlain.trim();

  // Match association username or slug
  const validUsernames = [
    slug.toLowerCase(),
    assoc.name.toLowerCase().replace(/[^a-z0-9]/g, ''),
    `assoc-${slug}`,
  ];

  const validPasswords = [
    `${slug}123`,
    `${slug}@corwa`,
    'corwa123',
    'assoc123',
  ];

  if (
    validUsernames.includes(cleanUser) &&
    (validPasswords.includes(cleanPass) || cleanPass === `${cleanUser}123`)
  ) {
    const session: AssociationSession = {
      assocSlug: slug,
      assocName: assoc.name,
      username: cleanUser,
      loggedInAt: Date.now(),
    };
    if (isBrowser) {
      localStorage.setItem(`corwa_assoc_session_${slug}`, JSON.stringify(session));
    }
    return { success: true, message: 'Login successful', session };
  }

  return {
    success: false,
    message: `Invalid credentials for ${assoc.name}. (Default: username: ${slug}, password: ${slug}123)`,
  };
}

export function logoutAssociationAuth(slug: string): void {
  if (!isBrowser) return;
  try {
    localStorage.removeItem(`corwa_assoc_session_${slug}`);
  } catch (err) {
    console.error('Error logging out', err);
  }
}

