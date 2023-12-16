
interface SectProps {
  children: JSX.Element | JSX.Element[];
  bgClasses: string;
}

export const Sect = ({children, bgClasses}: SectProps) => {
  return (
    
    <section className={`w-full ${bgClasses}`}>
      <div className="max-w-screen-xl mx-auto">
        {children}
      </div>
    </section>
  
  )
}