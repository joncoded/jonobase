export interface DOMChildrenProps {
  children: JSX.Element[] | JSX.Element, 
}

export interface GetPostsParams {
  query: string;
  category: string;
  page: string;
}

export interface PostProps {
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