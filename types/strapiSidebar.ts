export interface BaseAttributes {
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface MenuItem {
  id: number;
  title: string;
  path: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface SocialLink {
  id: number;
  title: string;
  iconName: string;
  link: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
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

export interface SidebarAttributes extends BaseAttributes {
  id: number;
  title: string;
  subTitle: string;
  menu_items: MenuItem[];
  social_links: SocialLink[];
  image: Image;
}
