export interface Service {
  id: number;
  title: string;
  text: string;
}

export interface PageAttributes {
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  pageTitle: string;
  services: Service[];
}
