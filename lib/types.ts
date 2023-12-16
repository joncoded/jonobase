export interface DOMChildrenProps {
  children: JSX.Element[] | JSX.Element, 
  className?: string
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
    slug: {
      current: string;
    }
    content: JSX.Element[] | JSX.Element;
    category: string;
    title: string;
  }
}