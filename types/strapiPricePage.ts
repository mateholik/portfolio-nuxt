export interface Option {
  id: number;
  title: string;
  price: number;
  description: string;
  active: boolean;
}

export interface Blocks {
  id: number;
  blockTitle: string;
  option: Option[];
}

export interface PageAttributes {
  pageTitle: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  totalPriceText: string;
  calculator: Blocks[];
}
