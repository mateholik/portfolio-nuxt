export interface MediaFormat {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  width: number;
  height: number;
  size: number;
  path: string;
  url: string;
}
export enum Category {
  Representative = "Representative",
  EShop = "E. shop",
  OnePage = "One page",
  Js = "Js",
}
export interface Media {
  id: number;
  attributes: {
    name: string;
    alternativeText: string;
    caption: string;
    width: number;
    height: number;
    formats: {
      thumbnail: MediaFormat;
      small: MediaFormat;
      medium: MediaFormat;
      large: MediaFormat;
    };
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl: string;
    provider: string;
    createdAt: Date;
    updatedAt: Date;
  };
}
export interface Media_Plain {
  id: number;
  name: string;
  alternativeText: string;
  caption: string;
  width: number;
  height: number;
  formats: {
    thumbnail: MediaFormat;
    small: MediaFormat;
    medium: MediaFormat;
    large: MediaFormat;
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string;
  provider: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface Website {
  id: number;
  createdAt?: Date;
  updatedAt?: Date;
  publishedAt?: Date;
  Price?: string;
  LinkTitle?: string;
  Image?: Media_Plain;
  Category?: Category;
  LinkUrl?: string;
}

export type cardProps = {
  price: string;
  image: string;
  title: string;
  url: string;
};
