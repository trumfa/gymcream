export interface Product {
  id: string;
  name: string;
  category: "Home" | "Dona" | "Accessoris";
  price: number;
  oldPrice?: number;
  isSale?: boolean;
  isSoldOut?: boolean;
  isBestseller?: boolean;
  badge?: "NOU DROP" | "BESTSELLER" | "ESGOTAT" | "REBAIXAT" | "EDICIÓ LIMITADA";
  discountPercent?: number;
  imageFront: string;
  imageBack: string;
  images: string[];
  sizes: string[];
  description: string;
  details: string[];
  sku: string;
}

export const PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Samarreta \"Carbs\" Oversize",
    category: "Home",
    price: 35.00,
    oldPrice: 45.00,
    isSale: true,
    discountPercent: 22,
    badge: "REBAIXAT",
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
    category: "Accessoris",
    price: 60.00,
    oldPrice: 75.00,
    isSale: false,
    badge: "ESGOTAT",
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
    category: "Accessoris",
    price: 18.00,
    oldPrice: 24.00,
    isSale: true,
    discountPercent: 25,
    isBestseller: true,
    badge: "BESTSELLER",
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
    category: "Home",
    price: 49.99,
    oldPrice: 65.00,
    isSale: true,
    discountPercent: 23,
    badge: "REBAIXAT",
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
    category: "Dona",
    price: 28.00,
    oldPrice: 38.00,
    isSale: true,
    discountPercent: 26,
    badge: "REBAIXAT",
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
    category: "Dona",
    price: 42.00,
    oldPrice: 55.00,
    isSale: false,
    badge: "NOU DROP",
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
    category: "Accessoris",
    price: 22.00,
    oldPrice: 30.00,
    isSale: false,
    badge: "ESGOTAT",
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
    category: "Home",
    price: 32.00,
    oldPrice: 40.00,
    isSale: true,
    discountPercent: 20,
    badge: "REBAIXAT",
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
