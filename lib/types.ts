export interface ChildrenProps {
  children: JSX.Element[] | JSX.Element, 
}

export interface GetResourceParams {
  query: string;
  category: string;
  page: string;
}

export interface ItemProps {
  resource: {
    _id: string;
    link: string;    
    image: string;
    views: number;
    slug: string;
    category: string;
    title: string;
  }
}