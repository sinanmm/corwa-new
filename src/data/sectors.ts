export interface Organization {
  name: string;
  location?: string;
  tag?: string;
  website?: string;
}

export interface Sector {
  slug: string;
  title: string;
  titleMl?: string;
  description: string;
  descriptionMl?: string;
  iconName: string;
  organizations: Organization[];
  benefitNote?: string;
  benefitNoteMl?: string;
}

export const sectors: Sector[] = [
  {
    slug: "healthcare",
    title: "Healthcare",
    titleMl: "ആരോഗ്യ മേഖല",
    description: "Special healthcare partners offering premium benefits and discounts for CoRWA members across Kerala.",
    descriptionMl: "കേരളത്തിലുടനീളമുള്ള CoRWA അംഗങ്ങൾക്കായി പ്രത്യേക ആരോഗ്യ ആനുകൂല്യങ്ങളും ഡിസ്കൗണ്ടുകളും നൽകുന്ന പ്രമുഖ ആശുപത്രികൾ.",
    iconName: "HeartPulse",
    organizations: [
      { name: "ASTER MIMS / ASTER MEDICITY", location: "Ernakulam", tag: "All Kerala Level", website: "https://www.asterhospitals.in" },
      { name: "AHALYA FOUNDATION EYE HOSPITAL", location: "Multiple Branches", tag: "All Kerala Level", website: "https://ahalia.in/" },
      { name: "LAKESHORE HOSPITAL", location: "Ernakulam", website: "https://www.vpslakeshorehospital.com" },
      { name: "MES MEDICAL COLLEGE", location: "Perinthalmanna", website: "https://mesmedicalcollege.edu.in/" },
      { name: "MES DENTAL MEDICAL COLLEGE", location: "Perinthalmanna", website: "https://mesdc.edu.in/" },
      { name: "MEITRA HOSPITAL", location: "Kozhikode", website: "https://www.meitra.com" },
      { name: "STAR CARE HOSPITAL", location: "Kozhikode", website: "https://starcarehospitals.com" },
      { name: "PRASHANTHI HOSPITAL", location: "Manjeri", website: "https://prasanthihospital.com/" },
      { name: "IMBICHI BAVA MEMORIAL HOSPITAL", location: "Alathiyur, Tirur", website: "https://imch.imbichibavahospital.com/hospitals/doctors/imch-1" },
      { name: "SMITHA HOSPITAL", location: "Thodupuzha", website: "https://smitahospital.com/" },
      { name: "TreeG MAJAN EYE HOSPITAL", location: "Oman", tag: "International", website: "https://treegmajan.com" },
      { name: "ORCHID MEDICITY HOSPITAL", location: "Malappuram", website: "https://orchidmedicity.com" },
      { name: "ASTER PMF MEDICITY", location: "Kollam", website: "https://www.asterhospitals.in/pmf" },
      { name: "ALMAS HOSPITAL", location: "Kottakkal", website: "https://almashospital.com" },
      { name: "TreeG EYE HOSPITAL", location: "Manjeri", website: "https://treegeyecare.com/" },
      { name: "VIJAY DENTAL SPECIALTY HOSPITAL", location: "Nilambur" },
      { name: "EMC HOSPITAL & RAAREERAM CARE", location: "Edavanna", website: "https://emchospital.in" },
      { name: "MBH HOSPITAL", location: "Malappuram", website: "https://mbhospital.org/" },
      { name: "ASTER MIMS SPECIALTY HOSPITAL & MEDICAL COLLEGE", location: "Wayanad", website: "https://www.asterhospitals.in/wayanad" },
      { name: "INDIANA HEART & CANCER SPECIALTY HOSPITAL", location: "Mangaluru", tag: "Out of Kerala", website: "https://indianahospital.in" }
    ],
    benefitNote: "CoRWA members are eligible for special discounts on consultation, diagnostics, and IP services.",
    benefitNoteMl: "CoRWA അംഗങ്ങൾക്ക് കൺസൾട്ടേഷൻ, ഡയഗണോസ്റ്റിക്സ്, ഐപി സേവനങ്ങൾ എന്നിവയിൽ പ്രത്യേക കിഴിവുകൾ ലഭിക്കും."
  },
  {
    slug: "ayurveda",
    title: "Ayurveda",
    titleMl: "ആയുർവേദം",
    description: "Traditional healing and wellness through our associated Ayurvedic centers.",
    descriptionMl: "ഞങ്ങളുടെ അനുബന്ധ ആയുർവേദ കേന്ദ്രങ്ങളിലൂടെ പരമ്പരാഗത ചികിത്സയും ആരോഗ്യവും.",
    iconName: "Leaf",
    organizations: [
      { name: "KOTTAKKAL ARYA VAIDYA SALA", location: "Kottakkal", tag: "Headquarters", website: "https://www.aryavaidyasala.com" },
      { name: "VAIDYARATNAM OUSHADHASALA", location: "Thaikkattussery", website: "https://vaidyaratnam.com" },
      { name: "SNA OUSHADHASALA", location: "Thrissur", website: "https://snaoushadhasala.com" }
    ],
    benefitNote: "Discounts available on treatments and Ayurvedic medicines.",
    benefitNoteMl: "ചികിത്സകൾക്കും ആയുർവേദ മരുന്നുകൾക്കും കിഴിവുകൾ ലഭ്യമാണ്."
  },
  {
    slug: "tourism",
    title: "Tourism",
    titleMl: "ടൂറിസം",
    description: "Explore the beauty of Kerala with exclusive travel and stay packages.",
    descriptionMl: "എക്സ്ക്ലൂസീവ് യാത്രാ പാക്കേജുകളിലൂടെ കേരളത്തിന്റെ സൗന്ദര്യം പര്യവേക്ഷണം ചെയ്യുക.",
    iconName: "Palmtree",
    organizations: [
      { name: "WAYANAD WILD PLANET RESORTS GROUP", location: "Wayanad", tag: "Premium Partner", website: "https://wildplanetresort.com" },
      { name: "KERALA TOURISM DEVELOPMENT CORP (KTDC)", location: "Multiple Locations", website: "https://www.ktdc.com" },
      { name: "BLUE WATER BEACH RESORT", location: "Varkala", website: "https://www.bluewaterstay.com/" }
    ],
    benefitNote: "Special rates for group bookings and family packages.",
    benefitNoteMl: "ഗ്രൂപ്പ് ബുക്കിംഗുകൾക്കും ഫാമിലി പാക്കേജുകൾക്കും പ്രത്യേക നിരക്കുകൾ."
  },
  {
    slug: "business",
    title: "Business",
    titleMl: "ബിസിനസ്സ്",
    description: "Supporting local businesses and providing commercial benefits to our members.",
    descriptionMl: "പ്രാദേശിക ബിസിനസ്സുകളെ പിന്തുണയ്ക്കുകയും അംഗങ്ങൾക്ക് വാണിജ്യ ആനുകൂല്യങ്ങൾ നൽകുകയും ചെയ്യുന്നു.",
    iconName: "Briefcase",
    organizations: [
      { name: "KANNANKANDI AGENCIES", location: "All Kerala", tag: "Retail Partner", website: "https://kannankandy.com/?srsltid=AfmBOoplRKLZKiGE2bcA3ECdMVTUt-A537pP3SjFHWfZTNouY78gwJVV" },
      { name: "MY G DIGITAL HUB", location: "All Kerala", website: "https://myg.in" },
      { name: "OXYGEN DIGITAL EXPERT", location: "All Kerala", website: "https://oxygendigitalshop.com/" }
    ],
    benefitNote: "Exclusive discounts on home appliances and digital gadgets.",
    benefitNoteMl: "ഗൃഹോപകരണങ്ങൾക്കും ഡിജിറ്റൽ ഗാഡ്‌ജെറ്റുകൾക്കും എക്സ്ക്ലൂസീവ് ഡിസ്കൗണ്ടുകൾ."
  },
  {
    slug: "event-management",
    title: "Event Management",
    titleMl: "ഇവന്റ് മാനേജ്‌മെന്റ്",
    description: "Professional event planning and catering services for your community and family events.",
    descriptionMl: "നിങ്ങളുടെ കമ്മ്യൂണിറ്റി, ഫാമിലി ഇവന്റുകൾക്കായി പ്രൊഫഷണൽ ഇവന്റ് പ്ലാനിംഗും കാറ്ററിംഗ് സേവനങ്ങളും.",
    iconName: "Users",
    organizations: [
      { name: "CALICUT PARIVAR CATERING", location: "Kozhikode", tag: "Catering", website: "https://www.calicutparivar.com/" },
      { name: "CELEBRATIONS EVENTS", location: "Malappuram", website: "https://celebrationeventsindia.com/" }
    ],
    benefitNote: "Reduced rates for community gatherings and residential events.",
    benefitNoteMl: "കമ്മ്യൂണിറ്റി മീറ്റിംഗുകൾക്കും റെസിഡൻഷ്യൽ ഇവന്റുകൾക്കും കുറഞ്ഞ നിരക്കുകൾ."
  },
  {
    slug: "greening",
    title: "Greening",
    titleMl: "ഗ്രീനിംഗ്",
    description: "Initiatives focused on environmental sustainability and residential gardening.",
    descriptionMl: "പരിസ്ഥിതി സുസ്ഥിരതയിലും പരിപാലനത്തിലും ശ്രദ്ധ കേന്ദ്രീകരിക്കുന്ന സംരംഭങ്ങൾ.",
    iconName: "TreePine",
    organizations: [
      { name: "HARITHAM KERALA MISSION", location: "Statewide", website: "https://haritham.kerala.gov.in/" },
      { name: "ORGANIC GARDENERS ASSOC", location: "District Level" }
    ],
    benefitNote: "Free saplings and organic seeds for member associations.",
    benefitNoteMl: "അംഗ അസോസിയേഷനുകൾക്ക് സൗജന്യ തൈകളും ഓർഗാനിക് വിത്തുകളും."
  },
  {
    slug: "education",
    title: "Education",
    titleMl: "വിദ്യാഭ്യാസം",
    description: "Educational partnerships providing career guidance and skill development.",
    descriptionMl: "കരിയർ ഗൈഡൻസും നൈപുണ്യ വികസനവും നൽകുന്ന വിദ്യാഭ്യാസ പങ്കാളിത്തം.",
    iconName: "GraduationCap",
    organizations: [
      { name: "UNIVERSAL INSTITUTE", location: "Kottakkal", website: "https://universalinstitute.in/" },
      { name: "ZEPHYR ENTRANCE COACHING", location: "Thiruvananthapuram", website: "https://zephyrentrance.in/" }
    ],
    benefitNote: "Scholarships and fee waivers for students from member associations.",
    benefitNoteMl: "അംഗ അസോസിയേഷനുകളിൽ നിന്നുള്ള വിദ്യാർത്ഥികൾക്ക് സ്കോളർഷിപ്പുകളും ഫീസിളവും."
  },
  {
    slug: "government",
    title: "Government Sector",
    titleMl: "സർക്കാർ മേഖല",
    description: "Collaborations with government bodies for public welfare and transport benefits.",
    descriptionMl: "പൊതുക്ഷേമത്തിനും ഗതാഗത ആനുകൂല്യങ്ങൾക്കുമായി സർക്കാർ സംവിധാനങ്ങളുമായുള്ള സഹകരണം.",
    iconName: "Building2",
    organizations: [
      { name: "KSRTC - Tourism / Pilgrimage", location: "Kerala", tag: "3% Cashback", website: "https://www.ksrtcblog.com" },
      { name: "KUDUMBASHREE", location: "Statewide", website: "https://www.kudumbashree.org" }
    ],
    benefitNote: "Cashback on tourism and pilgrimage bookings through KSRTC.",
    benefitNoteMl: "KSRTC വഴിയുള്ള ടൂറിസം, തീർത്ഥാടന ബുക്കിംഗുകളിൽ ക്യാഷ്ബാക്ക്."
  },
  {
    slug: "honda",
    title: "Honda",
    titleMl: "ഹോണ്ട",
    description: "Special vehicle purchase and service benefits for CoRWA members.",
    descriptionMl: "CoRWA അംഗങ്ങൾക്കായി വാഹന വാങ്ങലിലും സർവീസിലും പ്രത്യേക ആനുകൂല്യങ്ങൾ.",
    iconName: "Car",
    organizations: [
      { name: "HONDA TWO WHEELERS", location: "Multiple Showrooms", tag: "Authorized Dealer", website: "https://www.honda2wheelersindia.com" },
      { name: "EVM HONDA", location: "Kochi", website: "https://evmhonda.com" }
    ],
    benefitNote: "Special accessories and maintenance packages for members.",
    benefitNoteMl: "അംഗങ്ങൾക്ക് പ്രത്യേക ആക്സസറികളും മെയിന്റനൻസ് പാക്കേജുകളും."
  }
];
