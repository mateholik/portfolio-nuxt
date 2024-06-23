export interface Attribute {
  name: string;
  url: string;
}

export interface Data {
  id: number;
  attributes: Attribute;
}

export interface MetaImage {
  data: Data;
}

export interface Attribute {
  name: string;
  url: string;
}

export interface Data {
  id: number;
  attributes: Attribute;
}

export interface Image {
  data: Data;
}

export interface MetaSocial {
  id: number;
  socialNetwork: string;
  title: string;
  description: string;
  image: Image;
}

export interface SeoAttributes {
  id: number;
  metaTitle: string;
  metaDescription: string;
  keywords?: any;
  metaRobots?: any;
  structuredData?: any;
  metaViewport?: any;
  canonicalURL?: any;
  metaImage: MetaImage;
  metaSocial: MetaSocial[];
}
export interface Seo {
  seo: SeoAttributes;
}
