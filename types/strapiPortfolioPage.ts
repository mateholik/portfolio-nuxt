export interface BaseAttributes {
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface CategoryAttributes extends BaseAttributes {
  // Add any additional category-specific fields here
}

export interface Category {
  id: number;
  attributes: CategoryAttributes;
}

export interface Image {
  id: number;
  name: string;
  url: string;
  alternativeText?: string;
  caption?: string;
  width?: number;
  height?: number;
  formats?: Record<string, any>;
}

export interface Card {
  id: number;
  title: string;
  url: string;
  subTitle: string;
  image: Image;
}

export interface Website {
  id: number;
  title: string;
  card: Card[];
}

export interface PortfolioPageAttributes extends BaseAttributes {
  id: number;
  title: string;
  websites: Website[];
}

export interface PortfolioPageWithSeo extends PortfolioPageAttributes {
  seo?: import('./strapiSeo').SeoAttributes;
}
