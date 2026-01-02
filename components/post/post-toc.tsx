'use client'

/*
jonobase by @jonchius
/components/post/post-toc.tsx
Table of Contents navigation component for posts
*/

import { useEffect, useState } from 'react'
import { X, Menu } from 'lucide-react'

interface TocItem {
  id: string
  text: string
  level: number
}

export default function PostToc() {
  const [headings, setHeadings] = useState<TocItem[]>([])
  const [activeId, setActiveId] = useState<string>('')
  const [isOpen, setIsOpen] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)

  useEffect(() => {
    // Extract headings from #post-main section
    const postMain = document.getElementById('post-main')
    if (!postMain) return

    const headingElements = postMain.querySelectorAll('h1, h2, h3, h4')
    const items: TocItem[] = []

    headingElements.forEach((heading, index) => {
      // Add ID if it doesn't have one
      if (!heading.id) {
        heading.id = `heading-${index}`
      }

      items.push({
        id: heading.id,
        text: heading.textContent || '',
        level: parseInt(heading.tagName.charAt(1))
      })
    })

    setHeadings(items)

    // Set up intersection observer for active heading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      {
        rootMargin: '-30% 0px -35% 0px'
      }
    )

    headingElements.forEach((heading) => {
      observer.observe(heading)
    })

    return () => {
      headingElements.forEach((heading) => {
        observer.unobserve(heading)
      })
    }
  }, [])

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const offset = 110
      const elementPosition = element.getBoundingClientRect().top + window.scrollY
      const offsetPosition = elementPosition - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
      
      // Close mobile modal after clicking
      setIsOpen(false)
    }
  }

  if (headings.length === 0) return null

  const TocContent = () => (
    <nav className="space-y-1">
      {headings.map((heading) => (
        <button
          key={heading.id}
          onClick={() => scrollToHeading(heading.id)}
          className={`
            block w-full text-left py-1 px-2 rounded text-sm transition-colors
            ${heading.level === 1 ? 'font-bold' : ''}
            ${heading.level === 2 ? 'pl-2' : ''}
            ${heading.level === 3 ? 'pl-4 text-xs' : ''}
            ${heading.level === 4 ? 'pl-6 text-xs' : ''}
            ${
              activeId === heading.id
                ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 font-semibold'
                : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
            }
          `}
        >
          {heading.text}
        </button>
      ))}
    </nav>
  )

  return (
    <>
      {/* Desktop TOC - Right sidebar */}
      <div className="hidden lg:block fixed right-4 top-24 w-64 max-h-[calc(100vh-120px)] overflow-y-auto z-40">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              On this page
            </h3>
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
              aria-label={isCollapsed ? 'Expand' : 'Collapse'}
            >
              {isCollapsed ? (
                <Menu size={20} />
              ) : (
                <X size={20} />
              )}
            </button>
          </div>
          {!isCollapsed && <TocContent />}
        </div>
      </div>

      {/* Mobile TOC - Fixed button + Modal */}
      <div className="lg:hidden">
        {/* Fixed button */}
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-colors"
          aria-label="Open table of contents"
        >
          <Menu size={24} />
        </button>

        {/* Modal overlay */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-50"
            onClick={() => setIsOpen(false)}
          >
            {/* Modal content */}
            <div
              className="fixed right-0 top-[80px] bottom-0 w-full max-w-sm bg-white dark:bg-gray-800 shadow-xl overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 flex items-center justify-between z-10">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  On this page
                </h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
                  aria-label="Close"
                >
                  <X size={24} />
                </button>
              </div>
              <div className="p-4">
                <TocContent />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
