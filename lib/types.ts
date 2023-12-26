
export interface FindProps {
  searchParams: {
    [key: string] : string | undefined;
  }
}

export interface FindFiltersProps {
  filters: string[]
}

export interface FindPageParams {
  filters: string[];
  showFilters: boolean;
  posts: PostProps[];
  urlParams: {
    [key: string] : string | undefined;
  };
}

export interface HeapProps {
  params: {
    slug: string;
  }
}

export interface KindProps {
  params: {
    slug: string;
  }
}

export interface ListProps {
  count: number;
  query: string;
  kind: string;
}

export interface MoodProps {
  params: {
    slug: string | undefined;
  }
}

export interface MoodPostGetterProps {
  slug: string;
  page?: string;
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
    kind?: string;
    moods?: string[];
    link?: URL | undefined;        
    date: string;
    content: JSX.Element[] | JSX.Element;
  }
}

export interface PostGetterProps {
  query: string;
  kind: string;
  page: string;
  perPage: string;
}

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
  showMenu?: (arg: boolean) => void,
  inputName: string,
  placeholder: string,
}

export interface UtilMenuFindWrapperProps {
  children: React.ReactNode | React.ReactNode[],
  className: string
}

export interface UtilQueryBuildingProps {
  type: string;
  query: string;
  kind: string;
  page: number;
  perPage?: number;
}

export interface UtilQueryURLProps {
  params: string;
  key?: string;
  value?: string | null;
  keysToRemove?: string[];
}