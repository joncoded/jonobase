
/*
jonobase by @jonchius
/sanity/myprops.ts
a set of restrictions for various props and parameters
(used everywhere - in app, components, sanity, schema!)
*/

// get results for "finds" (i.e. the omnisearch) 
export interface FindProps {
  searchParams: {
    [key: string] : string | undefined;
  }
}

export interface FindHeadProps {
  count: number;
  query: string;
  kind: string;
}

export interface FindPageParams {
  posts: PostListProps[];
  totalPostsCount: number;
  urlParams: {
    [key: string] : string | undefined;
  };
}

// get a heap, i.e. a list of lists
export interface HeapProps {
  params: {
    slug: string;
  }
}

// get a list, i.e. data for a horizontal section
export interface ListProps {
  _id: string;
  title: string;
  showTitle: boolean;
  slug: string;  
  subtitle: string;
  showSubtitle: boolean;
  bgColor: string;
  precontent: JSX.Element[] | JSX.Element;
  querybuilder?: {
    query?: string;
    type?: string;
    join?: string;
    kind?: string;
    nook?: string;
    count?: number;
    order?: 'date' | 'title';
    ascDesc?: 'asc' | 'desc';
  };
  postcontent: JSX.Element[] | JSX.Element;
  cta?: {
    url?: string;
    title?: string;
  };
  showtype?: boolean;
  showjoin?: boolean;
  showkind?: boolean;
}

// get a nook, i.e. a list of posts based on a topic/tag
export interface NookProps {
  params: {
    [key: string] : string | undefined;
  };
  searchParams: {  
    [key: string] : string | undefined;
  };
}

// get a raw list of post data
export interface PostListProps {

  post: PostProps;
  showJoin?: boolean;
  showKind?: boolean; 

}

// get the post data of some post
export interface PostProps {
  
  _type: string;
  _id: string;
  slug: {
    current: string;
  }
  image: string;
  title: string;
  emoji: string;
  subtitle?: string;
  join: string;
  kind: string;
  nooks?: string[];
  content: JSX.Element[] | JSX.Element;
  extra?: JSX.Element[] | JSX.Element;
  link?: URL | undefined;        
  date: string;
  showDate: boolean;

}

// get the post data of the previous or next post 
export interface PostAdjacentProps {
  
  _id: string;
  _type: string;
  slug: string;  
  title: string;
  emoji: string;
  subtitle?: string;
  join: string;
  kind: string;
  date: string;
  showDate: boolean;

}

// get post query from URL
export interface PostGetterProps {  
  isCount?: boolean; 
  query?: string;
  type?: string;
  join?: string;
  kind?: string;
  page?: string;
  nook?: string;
  perPage?: string;
  random?: boolean;
  order?: 'title' | 'date';
  ascDesc?: 'asc' | 'desc';
}

// post external link button
export interface PostLinkProps {
  mark: any;
  children: any;
}

// utils (mostly HTML wrappers)

export interface UtilDOMChildrenProps {
  children: JSX.Element[] | JSX.Element;
  className?: string;
  bgImage?: string;
}

export interface UtilDOMSectProps {
  children: JSX.Element | JSX.Element[];
  id?: string;
  className?: string;  
  bgImage?: string;
}

export interface UtilDOMSpanProps {
  children: JSX.Element | JSX.Element[] | string | string[];
  className?: string;  
  ariaHidden?: boolean;
  ariaLabel?: string;
}

export interface UtilMenuFindProps {  
  showMenu?: (arg: boolean) => void;
  inputName: string;
  placeholder: string;
}

export interface UtilMenuFindWrapperProps {
  children: React.ReactNode | React.ReactNode[];
  className: string;
}

// pagination
export interface UtilPaginationProps {
  myBase: { 
    perPage: string; 
  };
  totalPostsCount: number,
  searchParams: {
    [key: string] : string | undefined
  };
}

// queries
export interface UtilQueryBuildingProps {
  isCount?: boolean; 
  type?: string;
  query?: string;
  join?: string; 
  kind?: string;
  nook?: string;
  page?: number;
  perPage?: number;  
  order?: 'date' | 'title';
  ascDesc?: 'asc' | 'desc' | '';
}

// what should the new query string be like? (handy for "onChange"s)
export interface UtilQueryURLProps {
  params: string;
  key?: string;
  value?: string | null;
  keysToRemove?: string[];
}