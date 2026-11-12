export interface TalukEvent {
  id: string;
  talukSlug: string;
  title: string;
  titleMl?: string;
  date: string;
  time?: string;
  venue: string;
  category: 'General Body' | 'Workshop' | 'Community' | 'Health Camp' | 'Meeting';
  description: string;
  imageUrl?: string;
  createdAt: string;
}

export interface TalukImage {
  id: string;
  talukSlug: string;
  imageUrl: string;
  title: string;
  caption?: string;
  date?: string;
  createdAt: string;
}

export interface TalukInfo {
  slug: string;
  name: string;
  nameMl: string;
  district: string;
  state: string;
  headquarters: string;
  description: string;
  descriptionMl: string;
  president: string;
  secretary: string;
  treasurer: string;
  contactPhone: string;
  contactEmail: string;
  officeAddress: string;
  credentials: {
    username: string;
    passwordPlain: string;
  };
}

export const TALUKS_MAP: Record<string, TalukInfo> = {
  eranad: {
    slug: 'eranad',
    name: 'Eranad',
    nameMl: 'ഏറനാട്',
    district: 'Malappuram',
    state: 'Kerala',
    headquarters: 'Manjeri',
    description: 'Eranad Taluk is a prominent administrative division in Malappuram district with active Resident Welfare Associations focusing on civic infrastructure, environmental cleanliness, and community welfare.',
    descriptionMl: 'പൗരക്ഷേമം, ശുചിത്വം, സാമൂഹിക ഐക്യം എന്നിവ മുൻനിർത്തി പ്രവർത്തിക്കുന്ന സജീവമായ റസിഡന്റ്സ് അസോസിയേഷനുകളുടെ കേന്ദ്രമാണ് ഏറനാട് താലൂക്ക്.',
    president: 'Adv. K. Narayanan',
    secretary: 'P. K. Abdurahiman',
    treasurer: 'M. Sivadasan',
    contactPhone: '+91 94470 12341',
    contactEmail: 'eranad.corwa@gmail.com',
    officeAddress: 'CoRWA Taluk Office, Down Hill, Manjeri, Malappuram - 676121',
    credentials: {
      username: 'eranad',
      passwordPlain: 'eranad123',
    },
  },
  ponnani: {
    slug: 'ponnani',
    name: 'Ponnani',
    nameMl: 'പൊന്നാനി',
    district: 'Malappuram',
    state: 'Kerala',
    headquarters: 'Ponnani',
    description: 'Ponnani Taluk represents coastal and riverside residential communities, committed to coastal conservation, waste management, and welfare programs.',
    descriptionMl: 'തീരദേശ സംരക്ഷണം, മാലിന്യ സംസ്കരണം, ക്ഷേമപ്രവർത്തനങ്ങൾ എന്നിവയിൽ മുന്നിട്ടുനിൽക്കുന്ന പൊന്നാനി താലൂക്ക് കമ്മിറ്റി.',
    president: 'T. V. Chandran Master',
    secretary: 'K. Mohammedali',
    treasurer: 'P. Vasudevan',
    contactPhone: '+91 94470 12342',
    contactEmail: 'ponnani.corwa@gmail.com',
    officeAddress: 'CoRWA Taluk Committee, Port Road, Ponnani, Malappuram - 679577',
    credentials: {
      username: 'ponnani',
      passwordPlain: 'ponnani123',
    },
  },
  perinthalmanna: {
    slug: 'perinthalmanna',
    name: 'Perinthalmanna',
    nameMl: 'പെരിന്തൽമണ്ണ',
    district: 'Malappuram',
    state: 'Kerala',
    headquarters: 'Perinthalmanna',
    description: 'Known as the healthcare hub of Malappuram, Perinthalmanna Taluk RWA federation pioneers public health camps, blood donation drives, and clean colony initiatives.',
    descriptionMl: 'ആരോഗ്യ സംരക്ഷണം, രക്തദാന ക്യാമ്പുകൾ, ശുചിത്വ കോളനി പദ്ധതികൾ എന്നിവ നടപ്പിലാക്കുന്ന പെരിന്തൽമണ്ണ താലൂക്ക് കമ്മിറ്റി.',
    president: 'Dr. C. P. Ramachandran',
    secretary: 'M. K. Bava Haji',
    treasurer: 'V. S. Radhakrishnan',
    contactPhone: '+91 94470 12343',
    contactEmail: 'perinthalmanna.corwa@gmail.com',
    officeAddress: 'CoRWA Bhavan, Bypass Road, Perinthalmanna, Malappuram - 679322',
    credentials: {
      username: 'perinthalmanna',
      passwordPlain: 'perinthalmanna123',
    },
  },
  tirur: {
    slug: 'tirur',
    name: 'Tirur',
    nameMl: 'തിരൂർ',
    district: 'Malappuram',
    state: 'Kerala',
    headquarters: 'Tirur',
    description: 'The cultural cradle of Kerala, Tirur Taluk unites residential associations across urban and rural sectors, driving civic engagement and educational support.',
    descriptionMl: 'സാംസ്കാരിക പൈതൃകവും സാമൂഹിക പ്രതിബദ്ധതയും ഉയർത്തിപ്പിടിക്കുന്ന തിരൂർ താലൂക്ക് റസിഡന്റ്സ് അസോസിയേഷൻ കൂട്ടായ്മ.',
    president: 'Prof. K. P. Sukumaran',
    secretary: 'T. P. Hamza Master',
    treasurer: 'K. V. Mohandas',
    contactPhone: '+91 94470 12344',
    contactEmail: 'tirur.corwa@gmail.com',
    officeAddress: 'CoRWA Complex, Thazhepalam, Tirur, Malappuram - 676101',
    credentials: {
      username: 'tirur',
      passwordPlain: 'tirur123',
    },
  },
  tirurangadi: {
    slug: 'tirurangadi',
    name: 'Tirurangadi',
    nameMl: 'തിരൂരങ്ങാടി',
    district: 'Malappuram',
    state: 'Kerala',
    headquarters: 'Tirurangadi / Chemmad',
    description: 'Tirurangadi Taluk committee works closely with resident communities for clean water bodies, traffic safety, and neighbourhood elder-care services.',
    descriptionMl: 'ജലസംരക്ഷണം, റോഡ് സുരക്ഷ, മുതിർന്ന പൗരന്മാരുടെ ക്ഷേമം എന്നിവയ്ക്കായി പ്രവർത്തിക്കുന്ന തിരൂരങ്ങാടി താലൂക്ക് കമ്മിറ്റി.',
    president: 'C. H. Abdul Gafoor',
    secretary: 'V. P. Prabhakaran',
    treasurer: 'P. Moideen Kutty',
    contactPhone: '+91 94470 12345',
    contactEmail: 'tirurangadi.corwa@gmail.com',
    officeAddress: 'CoRWA Taluk Seva Kendra, Chemmad, Tirurangadi - 676306',
    credentials: {
      username: 'tirurangadi',
      passwordPlain: 'tirurangadi123',
    },
  },
  kondotty: {
    slug: 'kondotty',
    name: 'Kondotty',
    nameMl: 'കൊണ്ടോട്ടി',
    district: 'Malappuram',
    state: 'Kerala',
    headquarters: 'Kondotty',
    description: 'Home to the Calicut International Airport, Kondotty Taluk RWAs lead environmental awareness, solar energy adoption, and urban beautification projects.',
    descriptionMl: 'പരിസ്ഥിതി സൗഹൃദ പ്രവർത്തനങ്ങളും ഊർജ്ജ സംരക്ഷണ പദ്ധതികളും നയിക്കുന്ന കൊണ്ടോട്ടി താലൂക്ക് റസിഡന്റ്സ് അസോസിയേഷൻ.',
    president: 'K. T. Moideenkutty',
    secretary: 'P. Sasidharan',
    treasurer: 'A. C. Vinod Kumar',
    contactPhone: '+91 94470 12346',
    contactEmail: 'kondotty.corwa@gmail.com',
    officeAddress: 'CoRWA Taluk Committee Office, Airport Junction, Kondotty - 673638',
    credentials: {
      username: 'kondotty',
      passwordPlain: 'kondotty123',
    },
  },
  nilambur: {
    slug: 'nilambur',
    name: 'Nilambur',
    nameMl: 'നിലമ്പൂർ',
    district: 'Malappuram',
    state: 'Kerala',
    headquarters: 'Nilambur',
    description: 'Nestled near the Western Ghats, Nilambur Taluk focuses on disaster management, green cover expansion, biodiversity conservation, and tribal community support.',
    descriptionMl: 'വനസംരക്ഷണം, പ്രകൃതിദുരന്ത നിവാരണം, പച്ചപ്പ് നിലനിർത്തൽ എന്നിവയിൽ ഊന്നിയ നിലമ്പൂർ താലൂക്ക് റസിഡന്റ്സ് അസോസിയേഷൻ പ്രവർത്തനം.',
    president: 'E. K. Balakrishnan',
    secretary: 'N. K. George',
    treasurer: 'T. K. Alavikutty',
    contactPhone: '+91 94470 12347',
    contactEmail: 'nilambur.corwa@gmail.com',
    officeAddress: 'CoRWA Forest Edge Office, Chandakkunnu, Nilambur - 679329',
    credentials: {
      username: 'nilambur',
      passwordPlain: 'nilambur123',
    },
  },
};

export const INITIAL_TALUK_EVENTS: Record<string, TalukEvent[]> = {
  eranad: [
    {
      id: 'er-ev-1',
      talukSlug: 'eranad',
      title: 'Eranad Taluk Annual General Body & Office Bearers Meet',
      titleMl: 'ഏറനാട് താലൂക്ക് വാർഷിക ജനറൽ ബോഡി യോഗം',
      date: '2026-11-28',
      time: '10:00 AM - 01:30 PM',
      venue: 'Town Hall Auditorium, Manjeri',
      category: 'General Body',
      description: 'Comprehensive discussion on pending municipal civil works, waste management collection schedules, and election of ward-level coordinators for 2026-2027.',
      imageUrl: '/1.jpeg',
      createdAt: '2026-11-01',
    },
    {
      id: 'er-ev-2',
      talukSlug: 'eranad',
      title: 'Monsoon Preparedness & Colony Drain Cleaning Drive',
      titleMl: 'മഴക്കാല പൂർവ ശുചീകരണ ക്യാമ്പയിൻ',
      date: '2026-12-05',
      time: '08:00 AM - 12:00 PM',
      venue: 'Across 40+ Affiliated Colonies in Eranad',
      category: 'Community',
      description: 'Voluntary joint cleaning and sanitization campaign involving local health inspectors and resident welfare volunteers.',
      imageUrl: '/2.jpeg',
      createdAt: '2026-11-05',
    },
  ],
  ponnani: [
    {
      id: 'po-ev-1',
      talukSlug: 'ponnani',
      title: 'Coastal Cleanliness & Plastic Free Colony Summit',
      titleMl: 'തീരദേശ ശുചിത്വവും പ്ലാസ്റ്റിക് വിമുക്ത കാമ്പയിനും',
      date: '2026-11-30',
      time: '09:30 AM - 01:00 PM',
      venue: 'Harbour Community Hall, Ponnani',
      category: 'Workshop',
      description: 'Keynote by environmentalists on household waste segregation and installation of aerobic composting bins in coastal wards.',
      imageUrl: '/3.jpeg',
      createdAt: '2026-11-02',
    },
  ],
  perinthalmanna: [
    {
      id: 'pm-ev-1',
      talukSlug: 'perinthalmanna',
      title: 'Free Multi-Speciality Medical & Cardiac Screening Camp',
      titleMl: 'സൗജന്യ മെഡിക്കൽ & ഹൃദ്രോഗ പരിശോധന ക്യാമ്പ്',
      date: '2026-12-08',
      time: '09:00 AM - 03:00 PM',
      venue: 'CoRWA Community Center, Perinthalmanna',
      category: 'Health Camp',
      description: 'Free consultations, ECG, blood sugar testing, and generic medicines distribution in partnership with local hospital networks.',
      imageUrl: '/4.jpeg',
      createdAt: '2026-11-06',
    },
  ],
  tirur: [
    {
      id: 'tr-ev-1',
      talukSlug: 'tirur',
      title: 'Tirur Taluk Cultural & Literary Youth Fest',
      titleMl: 'തിരൂർ താലൂക്ക് റസിഡന്റ്സ് കലോത്സവം',
      date: '2026-12-12',
      time: '09:00 AM - 06:00 PM',
      venue: 'Thunchan Smarakam Ground, Tirur',
      category: 'Community',
      description: 'Competitions for children and families across affiliated associations, including drawing, speech, traditional songs, and quiz.',
      imageUrl: '/5.jpeg',
      createdAt: '2026-11-04',
    },
  ],
  tirurangadi: [
    {
      id: 'tg-ev-1',
      talukSlug: 'tirurangadi',
      title: 'Traffic Safety Awareness & Solar Streetlight Seminar',
      titleMl: 'റോഡ് സുരക്ഷാ ബോധവൽക്കരണ സെമിനാർ',
      date: '2026-12-15',
      time: '04:00 PM - 07:00 PM',
      venue: 'Chemmad Central Library Hall',
      category: 'Workshop',
      description: 'Guidance on residential speed limits, road mirror installation, and availing government subsidies for solar street lighting in private roads.',
      imageUrl: '/6.jpeg',
      createdAt: '2026-11-08',
    },
  ],
  kondotty: [
    {
      id: 'ko-ev-1',
      talukSlug: 'kondotty',
      title: 'Green Canopy Tree Planting Drive Across Kondotty',
      titleMl: 'ഹരിത കൊണ്ടോട്ടി വൃക്ഷത്തൈ നടീൽ യജ്ഞം',
      date: '2026-12-02',
      time: '07:30 AM - 11:00 AM',
      venue: 'Airport Road & Residential Avenues',
      category: 'Community',
      description: 'Distribution of 1,000 fruit tree saplings and shade trees to all member households to boost green cover in the airport corridor.',
      imageUrl: '/1.jpeg',
      createdAt: '2026-11-07',
    },
  ],
  nilambur: [
    {
      id: 'ni-ev-1',
      talukSlug: 'nilambur',
      title: 'Nilambur Monsoon Disaster Response Team Training',
      titleMl: 'ദുരന്തനിവാരണ സന്നദ്ധ സേനാ പരിശീലനം',
      date: '2026-12-10',
      time: '09:00 AM - 04:00 PM',
      venue: 'Nilambur Teak Heritage Auditorium',
      category: 'Workshop',
      description: 'Hands-on training by Fire and Rescue department on water rescue, first aid CPR, and emergency communication during river floods.',
      imageUrl: '/2.jpeg',
      createdAt: '2026-11-03',
    },
  ],
};

export const INITIAL_TALUK_GALLERY: Record<string, TalukImage[]> = {
  eranad: [
    {
      id: 'er-img-1',
      talukSlug: 'eranad',
      imageUrl: '/1.jpeg',
      title: 'Taluk Committee Inauguration Meet',
      caption: 'Representatives from 30+ associations attending the district committee assembly.',
      date: '2026-10-15',
      createdAt: '2026-10-15',
    },
    {
      id: 'er-img-2',
      talukSlug: 'eranad',
      imageUrl: '/2.jpeg',
      title: 'Civic Grievance Redressal Meeting',
      caption: 'Memorandum submission to municipal engineer regarding road paving.',
      date: '2026-10-22',
      createdAt: '2026-10-22',
    },
  ],
  ponnani: [
    {
      id: 'po-img-1',
      talukSlug: 'ponnani',
      imageUrl: '/3.jpeg',
      title: 'Harbour Area Environment Campaign',
      caption: 'Ponnani coastal RWAs participating in beach cleaning.',
      date: '2026-10-18',
      createdAt: '2026-10-18',
    },
  ],
  perinthalmanna: [
    {
      id: 'pm-img-1',
      talukSlug: 'perinthalmanna',
      imageUrl: '/4.jpeg',
      title: 'Public Health Orientation Workshop',
      caption: 'Dr. Ramachandran speaking on vector-borne disease prevention.',
      date: '2026-10-20',
      createdAt: '2026-10-20',
    },
  ],
  tirur: [
    {
      id: 'tr-img-1',
      talukSlug: 'tirur',
      imageUrl: '/5.jpeg',
      title: 'Tirur Taluk Cultural Night',
      caption: 'Annual cultural reunion of resident families at Thunchan Parambu.',
      date: '2026-10-25',
      createdAt: '2026-10-25',
    },
  ],
  tirurangadi: [
    {
      id: 'tg-img-1',
      talukSlug: 'tirurangadi',
      imageUrl: '/6.jpeg',
      title: 'Solar Energy Implementation Seminar',
      caption: 'Resident association leaders examining solar rooftop models.',
      date: '2026-10-28',
      createdAt: '2026-10-28',
    },
  ],
  kondotty: [
    {
      id: 'ko-img-1',
      talukSlug: 'kondotty',
      imageUrl: '/1.jpeg',
      title: 'Kondotty Green Initiative',
      caption: 'Community leaders distributing fruit saplings to local RWAs.',
      date: '2026-10-30',
      createdAt: '2026-10-30',
    },
  ],
  nilambur: [
    {
      id: 'ni-img-1',
      talukSlug: 'nilambur',
      imageUrl: '/2.jpeg',
      title: 'Community Flood Resilience Drill',
      caption: 'Resident volunteers during rescue and relief protocol drill.',
      date: '2026-11-02',
      createdAt: '2026-11-02',
    },
  ],
};

export const normalizeTalukSlug = (nameOrSlug: string): string => {
  return nameOrSlug.toLowerCase().trim().replace(/[^a-z0-9]+/g, '');
};

