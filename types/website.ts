export interface Website {
  id: number;
  Price: string;
  Category: string;
  LinkTitle: string;
  LinkUrl: string;
  Image: {
    data: {
      attributes: {
        url: string;
      };
    };
  };
}

export interface StrapiResponseData<T> {
  id: number;
  attributes: T;
}

export interface StrapiResponse<T> {
  data: StrapiResponseData<T>[];
  meta: object; // Adjust this type based on the actual structure returned by Strapi
}
