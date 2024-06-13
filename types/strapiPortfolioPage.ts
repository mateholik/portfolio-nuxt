export interface BaseAttributes {
  createdAt: string;
  updatedAt: string;
  title: string;
}

export interface CategoryData {
  id: number;
  attributes: BaseAttributes;
}

export interface Category {
  data: CategoryData;
}

export interface ImageAttributes {
  name: string;
  url: string;
}

export interface ImageData {
  id: number;
  attributes: ImageAttributes;
}

export interface Image {
  data: ImageData;
}

export interface Card {
  id: number;
  title: string;
  url: string;
  subTitle: string;
  category: Category;
  image: Image;
}

export interface Website {
  id: number;
  title: string;
  card: Card[];
}

export interface PageAttributes extends BaseAttributes {
  publishedAt: string;
  websites: Website[];
}
