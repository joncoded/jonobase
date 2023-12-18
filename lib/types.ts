export interface DOMChildrenProps {
  children: JSX.Element[] | JSX.Element;
  className?: string;
  bgImage?: string;
}

export interface FindProps {
  searchParams: {
    [key: string] : string | undefined;
  }
}

export interface GetPostsParams {
  query: string;
  category: string;
  page: string;
}

export interface PostProps {
  post: {
    _id: string;
    slug: {
      current: string;
    }
    image: string;
    title: string;
    emoji: string;
    subtitle?: string;
    category?: string;
    moods?: string[];
    link?: URL | undefined;        
    date: string;
    content: JSX.Element[] | JSX.Element;
    
    
  }
}