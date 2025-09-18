import React from "react"

export default function CodePenEmbed({ url }: { url: string }) {
  
  const embedUrl = url.replace('/pen/', '/embed/') + '?default-tab=js,html,css,result&editable=true&theme-id=dark'
  
  return (
    <div className="codepen-container">
      <iframe
        width="100%"
        src={embedUrl}
        loading="lazy"
        allowFullScreen
        style={{ minHeight: 400 }}
      >
        go to the codepen @ <a href={url}>{url}</a>
      </iframe>
    </div>
  )

}