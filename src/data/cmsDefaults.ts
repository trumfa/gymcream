export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  oldPrice?: number;
  isSale?: boolean;
  isSoldOut?: boolean;
  stock: number;
  isBestseller?: boolean;
  badge?: string;
  discountPercent?: number;
  imageFront: string;
  imageBack: string;
  images: string[];
  sizes: string[];
  description: string;
  details: string[];
  sku: string;
}

export interface Category {
  id: string;
  name: string;
  isSpecial?: boolean; // e.g. TOT, REBAIXATS
}

export interface Slide {
  id: string;
  type: 'image' | 'video';
  url: string;
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
}

export interface InfoPage {
  id: string;
  title: string;
  icon: string;
  content: string;
}

export interface BrandAsset {
  id: string;
  title: string;
  category: 'logo' | 'badge' | 'typography' | 'full_pack';
  description: string;
  fileUrl: string;
  formats: string[];
  previewImage: string;
  colorVariant: string;
}

export interface CommunityQuote {
  id: string;
  author: string;
  quote: string;
  status: 'approved' | 'pending';
  createdAt: string;
}

export interface CommunityPhoto {
  id: string;
  username: string;
  imageUrl: string;
  caption: string;
  type: 'DIY' | 'Oficial';
}

export const DEFAULT_PHRASES: string[] = [
  '"NO PAIN, NO GAIN? NOSALTRES PREFERIM: NO PIZZA, NO PARTY."',
  '"EL TEU COS ÉS UN TEMPLE. I ELS TEMPLES TAMBÉ FAN FESTES."',
  '"ROME WASN\'T BUILT IN A DAY, PERÒ ELLS NO TENIEN CREATINA."',
  '"NO ET RENDIXIS, AIXÒ NOMÉS ÉS TORNAR A COMENÇAR PER DÈCIMA VEGADA."',
  '"CARBS ARE FRIENDS. ENTRA A LA NOSTRA REVOLUCIÓ."'
];

export const DEFAULT_CATEGORIES: Category[] = [
  { id: '1', name: 'TOT', isSpecial: true },
  { id: '2', name: 'ROBA', isSpecial: false },
  { id: '3', name: 'ACCESSORIS', isSpecial: false },
  { id: '4', name: 'REBAIXATS', isSpecial: true }
];

export const DEFAULT_SLIDES: Slide[] = [
  {
    id: '1',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop',
    title: 'GYM CREAM',
    subtitle: 'COL·LECCIÓ OFICIAL 2026',
    buttonText: 'Entra a la Botiga',
    buttonLink: '#catalog'
  },
  {
    id: '2',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=2070&auto=format&fit=crop',
    title: 'CARBS ARE FRIENDS',
    subtitle: 'HEAVY OVERSIZE DROP',
    buttonText: 'Veure Drops',
    buttonLink: '#catalog'
  },
  {
    id: '3',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=2070&auto=format&fit=crop',
    title: 'TRENO SENSE EXCUSES',
    subtitle: 'EDICIÓ LIMITADA',
    buttonText: 'Explorar Catàleg',
    buttonLink: '#catalog'
  }
];

export const DEFAULT_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Samarreta \"Carbs\" Oversize",
    category: "ROBA",
    price: 35.00,
    oldPrice: 45.00,
    isSale: true,
    discountPercent: 22,
    badge: "REBAIXAT",
    stock: 15,
    imageFront: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=800&auto=format&fit=crop",
    imageBack: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=800&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=1200&auto=format&fit=crop"
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    isSoldOut: false,
    description: "Samarreta oversize d'alta densitat (240 GSM) fabricada amb cotó 100% orgànic rentat a la pedra. Dissenyat per a un look relaxat de gimnàs i carrer amb l'estampat emblemàtic 'CARBS ARE FRIENDS' a l'esquena.",
    details: [
      "240 GSM Cotó Peinat Premium",
      "Patró Heavy Oversize Drop Shoulder",
      "Serigrafia d'alta durabilitat resistent a rentats",
      "Dissenyat i estampat localment"
    ],
    sku: "GC-TS-CARBS-01"
  },
  {
    id: "2",
    name: "Cinturó Aixecament \"Donut\" 10mm",
    category: "ACCESSORIS",
    price: 60.00,
    oldPrice: 75.00,
    isSale: false,
    badge: "ESGOTAT",
    stock: 0,
    imageFront: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop",
    imageBack: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1200&auto=format&fit=crop"
    ],
    sizes: ["S", "M", "L"],
    isSoldOut: true,
    description: "Cinturó de powerlifting i fortalesa de 10mm de gruix en pell autèntica tractada amb tancament de palanca ràpida Quick-Lever en acer inoxidable. Ideal per a sentadilles pesades i pes mort.",
    details: [
      "Pell de vacú de 10mm de gruix calibrat",
      "Hebilla de palanca d'acer reforçat",
      "Interior de camussa antilliscant",
      "Aprovat per a competicions de força"
    ],
    sku: "GC-ACC-BELT-DN"
  },
  {
    id: "3",
    name: "Straps Aixecament Heavy Duty",
    category: "ACCESSORIS",
    price: 18.00,
    oldPrice: 24.00,
    isSale: true,
    discountPercent: 25,
    isBestseller: true,
    badge: "BESTSELLER",
    stock: 25,
    imageFront: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=800&auto=format&fit=crop",
    imageBack: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=800&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1200&auto=format&fit=crop"
    ],
    sizes: ["Talla Única"],
    isSoldOut: false,
    description: "Corretges de prons de cotó ultra resistent amb encoixinat de neoprè al canell per evitar fregaments. Suporta fins a 350kg d'aixecament sense cedir.",
    details: [
      "Cotó industrial de 4mm reforçat",
      "Encoixinat de neoprè de 5mm per als canells",
      "Llargada de 60cm per a doble volta a la barra",
      "Costures dobles de niló"
    ],
    sku: "GC-ACC-STRAPS-HD"
  },
  {
    id: "4",
    name: "Sudadera \"No Pizza No Party\"",
    category: "ROBA",
    price: 49.99,
    oldPrice: 65.00,
    isSale: true,
    discountPercent: 23,
    badge: "REBAIXAT",
    stock: 8,
    imageFront: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=800&auto=format&fit=crop",
    imageBack: "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?q=80&w=800&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1200&auto=format&fit=crop"
    ],
    sizes: ["M", "L", "XL"],
    isSoldOut: false,
    description: "Sudadera amb caputxa de tall relaxat fabricada en felpa francesa de 400 GSM. Manten-te calent durant els escalfaments pesats o per al diari.",
    details: [
      "400 GSM Heavy French Terry",
      "Caputxa de doble capa sense cordons",
      "Bossa estil cangur frontal",
      "Efecte Vintage Wash"
    ],
    sku: "GC-HD-PIZZA-04"
  },
  {
    id: "5",
    name: "Top Esportiu \"Seamless Cream\"",
    category: "ROBA",
    price: 28.00,
    oldPrice: 38.00,
    isSale: true,
    discountPercent: 26,
    badge: "REBAIXAT",
    stock: 12,
    imageFront: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?q=80&w=800&auto=format&fit=crop",
    imageBack: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?q=80&w=800&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1518310383802-640c2de311b2?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1200&auto=format&fit=crop"
    ],
    sizes: ["XS", "S", "M", "L"],
    isSoldOut: false,
    description: "Top esportiu sense costures d'alta subjecció amb teixit de compressió transpirable. Dissenyat per a moviments d'alta intensitat i màxima comoditat.",
    details: [
      "Teixit Seamless ultra elàstic 4D",
      "Copes extraïbles incloses",
      "Banda inferior d'alta subjecció sense opressió",
      "Assecat ràpid Quick-Dry"
    ],
    sku: "GC-DN-TOP-SEAMLESS"
  },
  {
    id: "6",
    name: "Leggings Compressió High-Waist",
    category: "ROBA",
    price: 42.00,
    oldPrice: 55.00,
    isSale: false,
    badge: "NOU DROP",
    stock: 18,
    imageFront: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800&auto=format&fit=crop",
    imageBack: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1518310383802-640c2de311b2?q=80&w=1200&auto=format&fit=crop"
    ],
    sizes: ["XS", "S", "M"],
    isSoldOut: false,
    description: "Leggings d'alta cintura amb efecte motllador Squat-Proof (100% opac). No transparenta mai, ni tan sols a les sentadilles més profundes.",
    details: [
      "100% Squat Proof provat en laboratori",
      "Cintura alta de control abdominal",
      "Costures planes anti-fregament Flatlock",
      "Butxaca invisible posterior per claus/targetes"
    ],
    sku: "GC-DN-LEG-HW"
  },
  {
    id: "7",
    name: "Shaker Metall Inoxidable 750ml",
    category: "ACCESSORIS",
    price: 22.00,
    oldPrice: 30.00,
    isSale: false,
    badge: "ESGOTAT",
    stock: 0,
    imageFront: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=800&auto=format&fit=crop",
    imageBack: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=800&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=1200&auto=format&fit=crop"
    ],
    sizes: ["750ml"],
    isSoldOut: true,
    description: "Mesclador de proteïna en acer inoxidable de grau alimentari. Manté els batuts freds durant més de 12 hores sense aromes ni olors residuals.",
    details: [
      "Acer Inoxidable 18/8 Doble Capa Vacuum",
      "Tapa a prova de fuges hermètica",
      "Reixeta mescladora de silicona integrada",
      "Lliure de BPA i ftalats"
    ],
    sku: "GC-ACC-SHAKER-STEEL"
  },
  {
    id: "8",
    name: "Pantaló Curt Pro-Training 5\"",
    category: "ROBA",
    price: 32.00,
    oldPrice: 40.00,
    isSale: true,
    discountPercent: 20,
    badge: "REBAIXAT",
    stock: 10,
    imageFront: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?q=80&w=800&auto=format&fit=crop",
    imageBack: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?q=80&w=800&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1200&auto=format&fit=crop"
    ],
    sizes: ["S", "M", "L", "XL"],
    isSoldOut: false,
    description: "Pantaló curt d'entrenament de 5 polzades amb malla interior de compressió i butxaca especial antidesplaçament per al mòbil.",
    details: [
      "Malla interior elàstica amb butxaca per mòbil",
      "Obertures laterals per a màxima mobilitat",
      "Tira per tovallola integrada a la cintura",
      "Cintura elàstica amb cordó intern"
    ],
    sku: "GC-HM-SHORT-5IN"
  }
];

export const DEFAULT_INFO_PAGES: Record<string, InfoPage> = {
  enviaments: {
    id: 'enviaments',
    title: 'Enviaments i Devolucions',
    icon: '🚚',
    content: `
      <h4 class="font-bold text-gcYellow text-lg mb-2">Informació d'Enviaments</h4>
      <p class="mb-4">Realitzem enviaments a tota la Península, Balears i Canàries en un termini estimat de 24h a 48h feiners.</p>
      <ul class="list-disc pl-5 mb-4 space-y-1">
        <li><strong>Enviament Estàndard:</strong> 4,95 € (Gràtis en comandes superiors a 60 €).</li>
        <li><strong>Enviament Express 24h:</strong> 7,90 €.</li>
        <li>Seguiment en temps real amb codi de localització enviat al teu email.</li>
      </ul>
      <h4 class="font-bold text-gcYellow text-lg mb-2">Política de Devolucions</h4>
      <p class="mb-2">Tens 30 dies naturals des de la recepció de la comanda per sol·licitar el canvi o la devolució de qualsevol article sense cap tipus de penalització.</p>
      <p>L'article ha d'estar sense utilitzar, amb les etiquetes originals i en el seu embolcall inicial.</p>
    `
  },
  termes: {
    id: 'termes',
    title: 'Termes i Condicions de Venda',
    icon: '📜',
    content: `
      <h4 class="font-bold text-gcYellow text-lg mb-2">Condicions Generals de Compra</h4>
      <p class="mb-3">Tots els preus mostrats a GYM CREAM inclouen l'IVA corresponent. Les promocions i codis de descompte no són acumulables tret que s'indiqui el contrari.</p>
      <p class="mb-3">GYM CREAM es reserva el dret de modificar els productes, preus i condicions sense previ avís, garantint sempre les condicions vigents en el moment de realitzar la teva comanda.</p>
      <h4 class="font-bold text-gcYellow text-lg mb-2">Garantia Oficial</h4>
      <p>Tots els nostres equips i peces d'apparel compten amb 2 anys de garantia per defectes de fabricació.</p>
    `
  },
  privacitat: {
    id: 'privacitat',
    title: 'Política de Privacitat i Cookies',
    icon: '🔒',
    content: `
      <h4 class="font-bold text-gcYellow text-lg mb-2">Protecció de Dades Personals</h4>
      <p class="mb-3">A GYM CREAM tractem les teves dades amb la màxima confidencialitat d'acord amb el Reglament General de Protecció de Dades (RGPD).</p>
      <p class="mb-3">Les teves dades de contacte només s'utilitzen per a la gestió i enviament de la teva comanda i, si ho acceptes explícitament, per enviar-te informació sobre nous drops i promocions.</p>
      <p>Mai no venem ni cedim les teves dades a tercers amb fins comercials.</p>
    `
  },
  talles: {
    id: 'talles',
    title: 'Guia Oficial de Talles',
    icon: '📏',
    content: `
      <h4 class="font-bold text-gcYellow text-lg mb-2">Patró Heavy Oversize & Fit Esportiu</h4>
      <p class="mb-4">La nostra col·lecció de samarretes i sudaderes utilitza un patró <strong>Oversize Drop Shoulder</strong>. Si busques un ajust relaxat d'estil street/gym, tria la teva talla habitual. Si prefereixes un ajust més entallat, tria una talla menys.</p>
      <div class="overflow-x-auto">
        <table class="w-full text-left text-xs border border-gray-800 my-4">
          <thead class="bg-gray-900 text-gcYellow uppercase">
            <tr>
              <th class="p-2 border border-gray-800">Talla</th>
              <th class="p-2 border border-gray-800">Pit (cm)</th>
              <th class="p-2 border border-gray-800">Cintura (cm)</th>
              <th class="p-2 border border-gray-800">Llargada (cm)</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-800">
            <tr><td class="p-2 font-bold border border-gray-800">S</td><td class="p-2 border border-gray-800">92 - 98</td><td class="p-2 border border-gray-800">76 - 82</td><td class="p-2 border border-gray-800">72</td></tr>
            <tr><td class="p-2 font-bold border border-gray-800">M</td><td class="p-2 border border-gray-800">98 - 104</td><td class="p-2 border border-gray-800">82 - 88</td><td class="p-2 border border-gray-800">74</td></tr>
            <tr><td class="p-2 font-bold border border-gray-800">L</td><td class="p-2 border border-gray-800">104 - 110</td><td class="p-2 border border-gray-800">88 - 94</td><td class="p-2 border border-gray-800">76</td></tr>
            <tr><td class="p-2 font-bold border border-gray-800">XL</td><td class="p-2 border border-gray-800">110 - 118</td><td class="p-2 border border-gray-800">94 - 102</td><td class="p-2 border border-gray-800">78</td></tr>
            <tr><td class="p-2 font-bold border border-gray-800">XXL</td><td class="p-2 border border-gray-800">118 - 126</td><td class="p-2 border border-gray-800">102 - 110</td><td class="p-2 border border-gray-800">80</td></tr>
          </tbody>
        </table>
      </div>
    `
  },
  contacte: {
    id: 'contacte',
    title: 'Atenció al Client i Contacte',
    icon: '💬',
    content: `
      <h4 class="font-bold text-gcYellow text-lg mb-2">Com podem ajudar-te?</h4>
      <p class="mb-4">El nostre equip d'atenció al client respon a totes les consultes en menys de 24 hores de dilluns a divendres.</p>
      <div class="space-y-3 text-sm">
        <p>📧 <strong>Email:</strong> <a href="mailto:suport@gymcream.com" class="text-gcYellow underline">suport@gymcream.com</a></p>
        <p>💬 <strong>WhatsApp Directe:</strong> +34 600 000 000 (Dilluns a Divendres 9:00h - 19:00h)</p>
        <p>📍 <strong>Oficines Central:</strong> Carrer del Fitness 42, Barcelona</p>
      </div>
    `
  }
};

export const DEFAULT_BRAND_ASSETS: BrandAsset[] = [
  {
    id: 'asset-1',
    title: 'Logo Principal Gym Cream (Format Gran)',
    category: 'logo',
    description: 'Logo oficial a tot color preparat per a serigrafia, DTF o impressió digital en samarretes fosques.',
    fileUrl: '/logos/logo primary GC no GC.png',
    formats: ['PNG', 'SVG', 'AI', 'JPG'],
    previewImage: '/logos/logo primary GC no GC.png',
    colorVariant: 'Groc / Blanc (Oficial)'
  },
  {
    id: 'asset-2',
    title: 'Logo Blanc / Monocromàtic',
    category: 'logo',
    description: 'Versió en blanc pur de màxima resolució per a estampació en fons negres, xandalls o dessuadores.',
    fileUrl: '/logos/logo white GC no GC.png',
    formats: ['PNG', 'SVG', 'AI', 'JPG'],
    previewImage: '/logos/logo white GC no GC.png',
    colorVariant: 'Blanc Fons Transparent'
  },
  {
    id: 'asset-3',
    title: 'Logo Negre / Stealth Vector',
    category: 'logo',
    description: 'Versió en negre intens ideal per a fons clars, roba de color gris o impressió en bosses de tela.',
    fileUrl: '/logos/logo GC Black.png',
    formats: ['PNG', 'SVG', 'AI', 'JPG'],
    previewImage: '/logos/logo GC Black.png',
    colorVariant: 'Negre Stealth'
  },
  {
    id: 'asset-4',
    title: 'Insignia / Badge Oficial Gym Cream',
    category: 'badge',
    description: 'Escut circular emblemàtic amb el Cream Cone i la data de fundació 2026. Perfecte per a pit, dessuadores o tovalloles.',
    fileUrl: '/logos/gymcream-badge.svg',
    formats: ['SVG', 'PNG', 'AI'],
    previewImage: '/logos/gymcream-badge.svg',
    colorVariant: 'Insignia Daurada / Groga'
  }
];

export const DEFAULT_COMMUNITY_QUOTES: CommunityQuote[] = [
  {
    id: 'quote-1',
    author: 'Marc V.',
    quote: 'El meu escalfament és buscar les claus del cotxe durant 20 minuts.',
    status: 'approved',
    createdAt: '2026-08-01'
  },
  {
    id: 'quote-2',
    author: 'Sònia G.',
    quote: 'Si el gimnàs fos fàcil, es diria anar al bar. Però aquí estem.',
    status: 'approved',
    createdAt: '2026-08-03'
  },
  {
    id: 'quote-3',
    author: 'Pol & Alex',
    quote: 'Aixeco pes per poder demanar postres dobles sense cap mena de remordiment.',
    status: 'approved',
    createdAt: '2026-08-04'
  },
  {
    id: 'quote-4',
    author: 'Laia T.',
    quote: 'Avui he fet hip thrust amb la samarreta estampada a la meva copisteria de barri. M\'encanta aquesta marca!',
    status: 'approved',
    createdAt: '2026-08-05'
  }
];

export const DEFAULT_COMMUNITY_PHOTOS: CommunityPhoto[] = [
  {
    id: 'photo-1',
    username: '@pau_fit_barcelona',
    imageUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop',
    caption: 'Samarreta casolana feta amb el logo descarregat de la web! #GymCreamDIY',
    type: 'DIY'
  },
  {
    id: 'photo-2',
    username: '@clara_heavycarbs',
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop',
    caption: 'Amb la Línia Oficial i el Distintiu Físic Gym Cream. Qualitat brutal!',
    type: 'Oficial'
  },
  {
    id: 'photo-3',
    username: '@sergi_lift',
    imageUrl: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=800&auto=format&fit=crop',
    caption: 'Estampat DIY a la tovallola del gimnàs. Sense regles ni judicis.',
    type: 'DIY'
  },
  {
    id: 'photo-4',
    username: '@marta_power',
    imageUrl: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=800&auto=format&fit=crop',
    caption: 'Línia Oficial Drop 2026. L\'insignia brodada és 10/10.',
    type: 'Oficial'
  }
];

