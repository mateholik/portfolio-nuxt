// FAQ item attributes
export interface FaqItemAttributes {
  question: string;
  answer: string;
  iconName: string;
  createdAt: string;
  updatedAt: string;
}

// FAQ item with populated data
export interface FaqItem {
  id: number;
  attributes: FaqItemAttributes;
}

// Main FAQ page attributes with populated data
export interface PageAttributes {
  pageTitle: string;
  pageDescription: string;
  faqTitle: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  faqs: FaqItem[]; // Populated by controller
}

// SEO integration
export interface FaqPageWithSeo extends PageAttributes {
  seo?: import('./strapiSeo').SeoAttributes;
}
