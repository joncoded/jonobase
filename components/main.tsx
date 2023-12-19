
interface SectProps {
  children: JSX.Element | JSX.Element[];
  className?: string;  
  bgImage?: string;
}

interface SpanProps {
  children: JSX.Element | JSX.Element[] | string;
  className?: string;  
  ariaHidden?: boolean;
  ariaLabel?: string;
}

export const Sect = ({children, className, bgImage}: SectProps) => {

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
  children}: SpanProps) => {

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