/*
jonobase by @joncoded (aka @jonchius)
/app/components/util/rich-code.tsx
code block component with copy functionality for rich text
*/

'use client'

import { useState } from "react"
import SyntaxHighlighter from "react-syntax-highlighter"
import { monokaiSublime } from "react-syntax-highlighter/dist/cjs/styles/hljs"

export default function CodeBlockWithCopy({ code, language }: { code: string, language?: string }) {
  const [copied, setCopied] = useState(false)
  
  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  
  return (
    <div className="relative group">
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 px-3 py-1 text-sm bg-gray-700 hover:bg-gray-600 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10"
        aria-label="Copy code to clipboard"
      >
        {copied ? 'Copied!' : 'Copy'}
      </button>
      <SyntaxHighlighter style={monokaiSublime} language={language ||'text'} wrapLongLines={true}>
        {code}
      </SyntaxHighlighter>
    </div>
  )
}
