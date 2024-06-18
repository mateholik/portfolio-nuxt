export type cardProps = {
  title: string;
  subTitle: string;
  image: string;
  url: string;
};

export interface expandableBlockProps {
  isOpen: boolean;
  iconName: string;
  question: string;
  answer: string;
}
