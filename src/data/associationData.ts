import { associationsData } from './associations';
import { getAffiliatedAssociationLabel, isAffiliatedAssociation } from '@/utils/affiliatedAssociations';

export interface AssociationSocials {
  whatsapp?: string;
  facebook?: string;
  instagram?: string;
  youtube?: string;
  website?: string;
  telegram?: string;
  phone?: string;
  email?: string;
}

export interface AssociationEvent {
  id: string;
  assocSlug: string;
  title: string;
  date: string;
  time?: string;
  venue: string;
  category: 'General Body' | 'Cleanliness Drive' | 'Health Camp' | 'Cultural Fest' | 'Meeting' | 'Festival';
  description: string;
  imageUrl?: string;
  createdAt: string;
}

export interface AssociationImage {
  id: string;
  assocSlug: string;
  imageUrl: string;
  title: string;
  caption?: string;
  date?: string;
  createdAt: string;
}

export interface AssociationDetail {
  slug: string;
  name: string;
  nameMl: string;
  taluk: string;
  district: string;
  state: string;
  category: string;
  regNo: string;
  establishedYear: string;
  affiliated: boolean;
  affiliatedLabel: string | null;
  president: string;
  secretary: string;
  treasurer: string;
  contactPhone: string;
  contactEmail: string;
  officeAddress: string;
  description: string;
  descriptionMl: string;
  householdsCount: number;
}

export const slugify = (value: string): string =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N}]+/gu, '-')
    .replace(/^-+|-+$/g, '');

// Pre-built index of associations for fast lookup
export const ASSOCIATIONS_MAP: Map<string, AssociationDetail> = new Map();

associationsData.forEach((item, index) => {
  const slug = slugify(item.nameEn || item.name);
  const affiliated = isAffiliatedAssociation(item);
  const affiliatedLabel = getAffiliatedAssociationLabel(item.name);

  // Generate realistic representative data for each registered RWA
  const regNum = 1000 + (index + 1) * 3;
  const estYear = (1995 + (index % 28)).toString();
  const households = 45 + ((index * 7) % 250);

  const detail: AssociationDetail = {
    slug,
    name: item.nameEn || item.name,
    nameMl: item.name,
    taluk: item.taluk,
    district: item.district || 'Malappuram',
    state: 'Kerala',
    category: 'Resident Welfare Association',
    regNo: `KL/MLP/RWA/${regNum}/${estYear}`,
    establishedYear: estYear,
    affiliated,
    affiliatedLabel,
    president: `K. Narayanan (${item.taluk})`,
    secretary: `P. K. Abdurahiman`,
    treasurer: `M. Sivadasan`,
    contactPhone: `+91 94470 ${10000 + index}`,
    contactEmail: `${slug.replace(/-/g, '')}.corwa@gmail.com`,
    officeAddress: `Community Hall, ${item.nameEn || item.name}, ${item.taluk} Taluk, Malappuram - 676505`,
    description: `${item.nameEn || item.name} is a dedicated Resident Welfare Association in ${item.taluk} Taluk, Malappuram district, affiliated with the Confederation of Resident Welfare Associations (CoRWA). Working continuously for neighborhood safety, civic amenities, environmental hygiene, and community harmony.`,
    descriptionMl: `മലപ്പുറം ജില്ലയിലെ ${item.taluk} താലൂക്കിൽ പ്രവർത്തിക്കുന്ന സജീവമായ റസിഡന്റ്സ് വെൽഫെയർ അസോസിയേഷനാണ് ${item.name}. പൗരക്ഷേമം, പരിസ്ഥിതി സംരക്ഷണം, കോളനി റോഡ് വികസനം, മാലിന്യനിർമ്മാർജ്ജനം എന്നിവയിൽ മുന്നിൽ നിൽക്കുന്നു.`,
    householdsCount: households,
  };

  ASSOCIATIONS_MAP.set(slug, detail);
});

export function getAssociationBySlug(slug: string): AssociationDetail | null {
  return ASSOCIATIONS_MAP.get(slug.toLowerCase().trim()) || null;
}

export function getAllAssociationSlugs(): string[] {
  return Array.from(ASSOCIATIONS_MAP.keys());
}

export function getInitialEventsForAssociation(
  slug: string,
  assoc: AssociationDetail
): AssociationEvent[] {
  return [
    {
      id: `ev-${slug}-1`,
      assocSlug: slug,
      title: `${assoc.name} Monthly General Executive Committee Meeting`,
      date: '2026-11-25',
      time: '07:30 PM - 09:30 PM',
      venue: `Colony Community Hall, ${assoc.name}`,
      category: 'General Body',
      description: `Review of street light maintenance, CCTV surveillance updates, and monthly financial accounts of ${assoc.name}. All colony household representatives are requested to participate.`,
      imageUrl: '/1.jpeg',
      createdAt: '2026-11-01',
    },
    {
      id: `ev-${slug}-2`,
      assocSlug: slug,
      title: `Neighborhood Cleanliness & Waste Segregation Drive`,
      date: '2026-12-06',
      time: '08:00 AM - 11:30 AM',
      venue: `${assoc.name} Residential Avenues & Roads`,
      category: 'Cleanliness Drive',
      description: `Community volunteer drive for clearing plastic waste, roadside drainage cleaning, and distribution of bio-compost bins in collaboration with local health authorities.`,
      imageUrl: '/2.jpeg',
      createdAt: '2026-11-05',
    },
  ];
}

export function getInitialGalleryForAssociation(
  slug: string,
  assoc: AssociationDetail
): AssociationImage[] {
  return [
    {
      id: `img-${slug}-1`,
      assocSlug: slug,
      imageUrl: '/1.jpeg',
      title: `${assoc.name} Annual General Body`,
      caption: `Resident members gathered at the colony hall discussing civic development and local infrastructure.`,
      date: '2026-10-12',
      createdAt: '2026-10-12',
    },
    {
      id: `img-${slug}-2`,
      assocSlug: slug,
      imageUrl: '/4.jpeg',
      title: `Community Welfare & Medical Camp`,
      caption: `Free health checkup camp conducted in coordination with CoRWA medical team.`,
      date: '2026-10-24',
      createdAt: '2026-10-24',
    },
  ];
}

export function getInitialSocialsForAssociation(
  slug: string,
  assoc: AssociationDetail
): AssociationSocials {
  const cleanHandle = slug.replace(/-/g, '_');
  return {
    whatsapp: `https://wa.me/919447012345?text=Hello%20${encodeURIComponent(assoc.name)}%20RWA`,
    facebook: `https://facebook.com/corwa.${cleanHandle}`,
    instagram: `https://instagram.com/corwa_${cleanHandle}`,
    youtube: `https://youtube.com/@corwa_${cleanHandle}`,
    website: `https://corwa.in/associations/${slug}`,
    email: assoc.contactEmail,
    phone: assoc.contactPhone,
  };
}

