export interface BaseAttributes {
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface MenuItemAttributes extends BaseAttributes {
  title: string;
  path: string;
}

export interface MenuItemData {
  id: number;
  attributes: MenuItemAttributes;
}

export interface MenuItem {
  data: MenuItemData[];
}

export interface SocialLinkAttributes extends BaseAttributes {
  title: string;
  iconName: string;
  link: string;
}

export interface SocialLinkData {
  id: number;
  attributes: SocialLinkAttributes;
}

export interface SocialLink {
  data: SocialLinkData[];
}

export interface ImageAttributes {
  url: string;
  name: string;
}

export interface ImageData {
  id: number;
  attributes: ImageAttributes;
}

export interface Image {
  data: ImageData;
}

export interface SidebarAttributes extends BaseAttributes {
  title: string;
  subTitle: string;
  menu_items: MenuItem;
  social_links: SocialLink;
  image: Image;
}
