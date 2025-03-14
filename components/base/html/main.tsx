
/*
jonobase by @jonchius
/app/components/base/html/main.tsx
the "main" section template of each page
*/

import { UtilDOMSectProps, UtilDOMSpanProps } from "@/sanity/myprops"

export const Sect = ({children, className, id, bgImage}: UtilDOMSectProps) => {

  const background = bgImage 
    ? {  
        backgroundImage: `url('${(bgImage) ? bgImage : ''}')`, 
        backgroundSize: 'cover', 
        backgroundRepeat: 'no-repeat', 
        backgroundPosition: 'center center', 
        backgroundAttachment: 'fixed'            
      }
    : {}
    
  return (
    
    <section 
      id={id ?? ''}
      style={background}
      className={`post-main w-full ${className ?? ''}`}
    >
      <div className="max-w-screen-lg mx-auto p-5">
        {children}
      </div>
    </section>
  
  )

}

export const Span = ({
  ariaLabel = '', 
  ariaHidden = false, 
  className = '', 
  children}: UtilDOMSpanProps) => {

  return (
    <span 
      aria-label={ariaLabel}
      aria-hidden={ariaHidden}
      className={className}
    >
      {children}
    </span>
  )
  
}