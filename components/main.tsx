import { UtilDOMSectProps, UtilDOMSpanProps } from "@/lib/types"

export const Sect = ({children, className, bgImage}: UtilDOMSectProps) => {

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
      style={background}
      className={`${className} post-main w-full`}
    >
      <div className="max-w-screen-lg mx-auto p-5 xl:p-0">
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