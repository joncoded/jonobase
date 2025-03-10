
/*
jonobase by @jonchius
/app/lib/types.ts
all typescript interfaces for prop types in all/most other .tsx files
*/

// finds 

export interface FindProps {
  searchParams: {
    [key: string] : string | undefined;
  }
}

export interface FindFiltersProps {
  filters: string[];
}

export interface FindHeadProps {
  count: number;
  query: string;
  kind: string;
}

export interface FindPageParams {
  filters: string[];
  showFilters: boolean;
  posts: ListItemProps[];
  unpagedPosts: { _id: string }[];
  urlParams: {
    [key: string] : string | undefined;
  };
}

// heaps

export interface HeapProps {
  params: {
    slug: string;
  }
}

// lists

export interface ListProps {
  params: {
    [key: string] : string | undefined;
  };
  searchParams: {  
    [key: string] : string | undefined;
  };
}

// posts

export interface ListItemProps {
  post: {
    _id: string;
    slug: {
      current: string;
    }
    image: string;
    title: string;
    emoji: string;
    subtitle?: string;
    kind?: string;
    nooks?: string[];
    link?: URL | undefined;        
    date: string;
    showDate: boolean;
    content: JSX.Element[] | JSX.Element;
  }
}

export interface PostGetterProps {
  query: string;
  kind: string;
  page: string;
  perPage?: string;
}

// post links

export interface LinkProps {
  mark: any;
  children: any;
}

// utils

export interface UtilDOMChildrenProps {
  children: JSX.Element[] | JSX.Element;
  className?: string;
  bgImage?: string;
}


export interface UtilDOMSectProps {
  children: JSX.Element | JSX.Element[];
  className?: string;  
  bgImage?: string;
}

export interface UtilDOMSpanProps {
  children: JSX.Element | JSX.Element[] | string;
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

export interface UtilPageTurnProps {
  base: { 
    perPage: string; 
  };
  posts: { 
    length: number;
  };
  searchParams: {
    [key: string] : string | undefined
  };
}

export interface UtilQueryBuildingProps {
  type: string;
  query: string;
  kind: string;
  nook?: string;
  page: number;
  perPage?: number;
}

export interface UtilQueryURLProps {
  params: string;
  key?: string;
  value?: string | null;
  keysToRemove?: string[];
}