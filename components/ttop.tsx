
/*
jonobase by @jonchius
/app/components/ttop.tsx
scrolls to top on page load
*/

'use client'
import { useEffect } from 'react'

export default function ScrollToTop() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return null
}