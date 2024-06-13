export type cardProps = {
  title: string;
  subTitle: string;
  image: string;
  url: string;
};

export interface expandableBlockProps {
  head: string;
  body: string;
  isVisible: boolean;
  index: number;
  isFirst: boolean;
  isLast: boolean;
}
