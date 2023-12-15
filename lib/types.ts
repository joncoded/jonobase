export interface DOMChildrenProps {
  children: JSX.Element[] | JSX.Element, 
}

export interface GetPostParams {
  query: string;
  category: string;
  page: string;
}

export interface ItemProps {
  post: {
    _id: string;
    link: string;    
    image: string;
    views: number;
    slug: string;
    category: string;
    title: string;
  }
}