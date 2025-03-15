
/*
jonobase by @jonchius
/sanity/myprops.ts
a set of restrictions for various props and parameters
(used everywhere - in app, components, sanity, schema!)
*/

// finds 

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
  opera: OpusListProps[];
  totalOperaCount: number;
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

// nooks

export interface NookProps {
  params: {
    [key: string] : string | undefined;
  };
  searchParams: {  
    [key: string] : string | undefined;
  };
}

// opera (plural of opus)

export interface OpusListProps {

  opus: OpusProps;
  showType?: boolean;
  showKind?: boolean; 

}

export interface OpusProps {
  
  _type: string;
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
  content: JSX.Element[] | JSX.Element;
  extra?: JSX.Element[] | JSX.Element;
  link?: URL | undefined;        
  date: string;
  showDate: boolean;

}

export interface OpusAdjacentProps {
  
  _id: string;
  _type: string;
  slug: string;  
  title: string;
  emoji: string;
  subtitle?: string;
  kind: string;
  date: string;
  showDate: boolean;

}

export interface OpusGetterProps {  
  isCount?: boolean; 
  query?: string;
  type?: string;
  kind?: string;
  page?: string;
  nook?: string;
  perPage?: string;
  random?: boolean;
  order?: 'title' | 'date';
  ascDesc?: 'asc' | 'desc';
}

export interface OpusLinkProps {
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

export interface UtilListTurnProps {
  myBase: { 
    perPage: string; 
  };
  totalOperaCount: number,
  searchParams: {
    [key: string] : string | undefined
  };
}

// what should the query be like?
export interface UtilQueryBuildingProps {
  isCount?: boolean; 
  type?: string;
  query?: string;
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