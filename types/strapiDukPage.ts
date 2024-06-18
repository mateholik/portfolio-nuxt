export interface Attribute {
  question: string;
  answer: string;
  createdAt: string;
  updatedAt: string;
  iconName: string;
}

export interface FaqAttribute {
  id: number;
  attributes: Attribute;
  open: boolean;
}

export interface Faq {
  data: FaqAttribute[];
}

export interface PageAttributes {
  pageTitle: string;
  pageDescription: string;
  faqTitle: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  faqs: Faq;
}
