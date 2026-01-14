/*
jonobase by @joncoded (aka @jonchius)
/app/components/base/html/over-head.tsx
beams things up to the <head> tag, e.g.:
- favicon
*/

interface BaseProps {
  logo?: string;
  [key: string]: any;
}

export default async function OverHead(base: BaseProps) {  

  return <link rel="icon" href={base.base.logo + '?v=new'} />
      
}