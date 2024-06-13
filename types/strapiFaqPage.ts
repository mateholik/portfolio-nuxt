export interface Attribute {
  question: string;
  answer: string;
  createdAt: string;
  updatedAt: string;
}

export interface Data {
  id: number;
  attributes: Attribute;
}

export interface Faq {
  data: Data[];
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
