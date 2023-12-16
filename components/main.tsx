
interface SectProps {
  children: JSX.Element | JSX.Element[];
  className?: string;  
  bgImage?: string;
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
      className={`${className} w-full`}
    >
      <div className="max-w-screen-xl mx-auto">
        {children}
      </div>
    </section>
  
  )

}