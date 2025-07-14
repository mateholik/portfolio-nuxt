// types/strapi.ts - In your Frontend project (React/Next.js/etc.)

// Base Strapi types
export interface StrapiResponse<T> {
  data: T;
  meta: Record<string, unknown>;
}

export interface StrapiMedia {
  id: number;
  name: string;
  url: string;
  alternativeText?: string;
  caption?: string;
  width?: number;
  height?: number;
}

export interface StrapiTimestamps {
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

// Component types (based on your actual API responses)
export interface Card {
  id: number;
  title: string;
  subTitle: string;
  url: string;
  image: StrapiMedia;
  category: {
    id: number;
    title: string;
    createdAt: string;
    updatedAt: string;
  } | null;
}

export interface TitleAndCards {
  id: number;
  title: string;
  card: Card[];
}

export interface TitleAndServices {
  id: number;
  title: string;
  text: string; // RichText becomes string in API response
}

export interface PriceBlockOption {
  id: number;
  title: string;
  price: number;
  description: string;
}

export interface PriceBlock {
  id: number;
  blockTitle: string;
  option: PriceBlockOption[];
}

export interface MetaSocial {
  id: number;
  socialNetwork: 'Facebook' | 'Twitter';
  title: string;
  description: string;
  image?: StrapiMedia;
}

export interface SEO {
  id: number;
  metaTitle: string;
  metaDescription: string;
  metaImage?: StrapiMedia;
  metaSocial?: MetaSocial[];
  keywords?: string;
  metaRobots?: string;
  structuredData?: Record<string, unknown>; // JSON type
  metaViewport?: string;
  canonicalURL?: string;
}

// Page Response Types (what you actually get from your API)
export interface PortfolioPage extends StrapiTimestamps {
  id: number;
  title: string;
  websites: TitleAndCards[]; // Array because it's repeatable
  seo?: SEO;
}

export interface PricePage extends StrapiTimestamps {
  id: number;
  pageTitle: string;
  totalPriceText?: string;
  mobText?: string;
  calculator: PriceBlock[];
  seo?: SEO;
}

export interface JavascriptPage extends StrapiTimestamps {
  id: number;
  title: string;
  websites: TitleAndCards; // Single because it's not repeatable
  seo?: SEO;
}

export interface ServicesPage extends StrapiTimestamps {
  id: number;
  pageTitle: string;
  services: TitleAndServices[];
  seo?: SEO;
}

export interface FAQPage extends StrapiTimestamps {
  id: number;
  pageTitle: string;
  pageDescription: string;
  faqTitle: string;
  faqs: FAQ[];
  seo?: SEO;
}

export interface FAQ extends StrapiTimestamps {
  id: number;
  question: string;
  answer: string; // RichText becomes string
  Icon?: string;
}

export interface MenuItem extends StrapiTimestamps {
  id: number;
  title: string;
  path: string;
}

export interface SocialLink extends StrapiTimestamps {
  id: number;
  title: string;
  iconName: string;
  link: string;
}

export interface Sidebar extends StrapiTimestamps {
  id: number;
  title: string;
  subTitle: string;
  image?: StrapiMedia;
  menu_items: MenuItem[];
  social_links: SocialLink[];
}

// API Response Types
export type PortfolioPageResponse = StrapiResponse<PortfolioPage>;
export type PricePageResponse = StrapiResponse<PricePage>;
export type JavascriptPageResponse = StrapiResponse<JavascriptPage>;
export type ServicesPageResponse = StrapiResponse<ServicesPage>;
export type FAQPageResponse = StrapiResponse<FAQPage>;
export type SidebarResponse = StrapiResponse<Sidebar>;

// Collection responses (arrays)
export type MenuItemsResponse = StrapiResponse<MenuItem[]>;
export type SocialLinksResponse = StrapiResponse<SocialLink[]>;
export type FAQsResponse = StrapiResponse<FAQ[]>;
