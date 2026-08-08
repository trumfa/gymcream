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

// ─────────────────────────────────────────────────────────────────
// Estos son SOLO fallbacks mínimos de seguridad, para cuando el CMS
// (Google Sheets vía Apps Script) tarda en responder o falla un
// instante. NO son el catálogo real — ese vive en Google Sheets.
// No añadas aquí productos, fotos ni contenido real de la tienda.
// ─────────────────────────────────────────────────────────────────

export const FALLBACK_PHRASES: string[] = [
  'Carregant novetats de Gym Cream...'
];

export const FALLBACK_CATEGORIES: Category[] = [
  { id: 'fallback-1', name: 'TOT', isSpecial: true }
];

export const FALLBACK_SLIDES: Slide[] = [
  {
    id: 'fallback-1',
    type: 'image',
    url: '/logos/logo primary GC no GC.png',
    title: 'GYM CREAM',
    subtitle: 'Carregant col·lecció...',
    buttonText: 'Veure Botiga',
    buttonLink: '#catalog'
  }
];

export const FALLBACK_PRODUCTS: Product[] = [];

export const FALLBACK_INFO_PAGES: Record<string, InfoPage> = {};

export const FALLBACK_BRAND_ASSETS: BrandAsset[] = [];

export const FALLBACK_COMMUNITY_QUOTES: CommunityQuote[] = [];

export const FALLBACK_COMMUNITY_PHOTOS: CommunityPhoto[] = [];

