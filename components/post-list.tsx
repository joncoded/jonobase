
/*
jonobase by @jonchius
/app/components/post-list.tsx
the list of post "cards"
*/

'use client'

import { useEffect, useRef, useState } from 'react'
import PostLine from "./post-line"
import PostCard from "./post-card"
import { text } from '@/lib/app.config'

export default function PostList({posts} : any) {

  const carouselRef = useRef(null)
  const [ currentCard, setCurrentCard ] = useState(0)    
  const [ postsDesktop, setPostsDesktop ] = useState(posts?.slice(0, 3) || [])
  const [ postsTablet, setPostsTablet ] = useState(posts?.slice(0, 2) || [])
  const [ postsMobile, setPostsMobile ] = useState(posts?.slice(0, 1) || [])
  
  useEffect(() => {
    setPostsDesktop(posts?.slice(currentCard * 3, (currentCard * 3) + 3))
    setPostsTablet(posts?.slice(currentCard * 2, (currentCard * 2) + 2))
    setPostsMobile(posts?.slice(currentCard, currentCard + 1))
  }, [currentCard])
  
  return (
    <div className="post-list w-full sm:justify-start">      
      {posts.length == 0 && 
        <>
          <p className="text-center">{text['results found none']}</p>
        </>
      }
      {posts.length > 0 && 
        <>  
          <div 
            ref={carouselRef}             
            className="post-list-cont-des 
              hidden lg:flex gap-10 justify-center w-full h-full">
            
              {postsDesktop.map((post: any) => (
                
                  <PostLine key={post._id} post={post} />                  
                
              ))}
              
          </div> 
          <div 
            ref={carouselRef}             
            className="post-list-cont-tab 
              hidden md:flex lg:hidden gap-10 justify-center w-full h-full">
            
              {postsTablet.map((post: any) => (
                
                  <PostLine key={post._id} post={post} />                  
                
              ))}
              
          </div> 
          <div 
            ref={carouselRef}             
            className="post-list-cont-mob 
              flex md:hidden gap-10 justify-center w-full h-full">
            
              {postsMobile.map((post: any) => (
                
                  <PostLine key={post._id} post={post} />                  
                
              ))}
              
          </div> 
          <div className='post-list-navs flex gap-5 justify-center mt-10'>
            <button
              disabled={currentCard === 0}
              onClick={() => setCurrentCard(prev => prev - 1)}
              className={`btn-left-all 
                border border-black dark:border-white 
                px-4 py-2 font-bold 
                ${currentCard === 0 && 'opacity-25'}`
              }
              aria-label={text.newer}
            >
              {"< " + text.newer}
            </button>
            <button
              disabled={currentCard >= ((posts.length - 3) / 3)}
              onClick={() => setCurrentCard(prev => prev + 1)}
              className={`btn-right-des 
                border border-black dark:border-white 
                hidden lg:inline px-4 py-2 font-bold 
                ${currentCard >= ((posts.length - 3) / 3) && 'opacity-25'}`
              }
              aria-label={text.older}
            >
              {text.older + " >"}
            </button>
            <button
              disabled={currentCard >= ((posts.length - 2) / 2)}
              onClick={() => setCurrentCard(prev => prev + 1)}
              className={`btn-right-tab 
                border border-black dark:border-white 
                hidden md:inline lg:hidden px-4 py-2 font-bold 
                ${currentCard >= ((posts.length - 2) / 2) && 'opacity-25'}`
              }
              aria-label={text.older}
            >
              {text.older + " >"}
            </button>
            <button
              disabled={currentCard === posts.length - 1}
              onClick={() => setCurrentCard(prev => prev + 1)}
              className={`btn-right-mob 
                border border-black dark:border-white 
                inline md:hidden px-4 py-2 font-bold 
                ${currentCard === posts.length - 1 && 'opacity-25'}`
              }
              aria-label={text.older}
            >
              {text.older + " >"}
            </button>
          </div>   
        </>    
      }
    </div>
  )

}