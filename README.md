# Jonobase

![home page of a jonobase site](./public/readme/screenshot1.png)

a website (blogging and portfolio) template made with a Next.js front-end and a Sanity (headless "CMS") back-end, used on:

* [joncoded.com](https://www.joncoded.com)
* [jonchius.com](https://www.jonchius.com) or [jonchius.vercel.app](https://jonchius.vercel.app)

![post page of a jonobase site](./public/readme/screenshot2.png)

## Features

it's essentially a template with many thought-out features, some dating back to 2020:

*   **accessible hotkeys**
    
    *   command+K for search
        
    *   command+/ for menu
        
*   **light-to-dark mode theme toggle**

![dark mode of a jonobase site](./public/readme/screenshot3.png)
    
*   **fully-functional search** (known as "**finds**")
    
*   **full-screen modal menu**
    
*   **home page** with full-width sections (known as "**lists**")
    
    *   include only text
        
    *   ...or a list of posts sorted by date or title or randomly
        
    *   ...add text before and after the list
        
*   **summary pages** that allow stacked lists (known as "**heaps**")
    
    *   great for arranging content in a variety of ways!
        
*   **heading-based "table of contents" post menus**
    
    *   both for desktop and mobile
        
*   **category-based routing** of posts
    
    *   clean URLs like /code/snippets/post-page
        
*   **tagging system** for posts (known as "nooks")
    
*   **posts with embeddable content**
    
    *   YouTube videos
        
    *   Google maps
        
    *   code snippets (that you can copy-and-paste with a click!)
        
    *   tables
        
*   **follow-up link** optional on each page
    
*   **previous-and-next post navigation**
    
*   **footer** modifiable via back-end with rich text editor
    
*   **responsive** in desktop and mobile
    
*   **multi-site** capability (more on this later!)

## Needs

* Node.js and npm
* Sanity (CMS) account and API key

## Setup

I have not yet installed a second instance (never needed to, since a single instance functions as a _multi-site_), so I can't guarantee that this will work for you but:

```
git clone https://github.com/joncoded/jonobase.git yourfolder
cd yourfolder
```

Create a `.env` file with the following:

```
SANITY_STUDIO_PROJECT_ID="your_project_id"
SANITY_STUDIO_TOKEN="your_api_key"
SANITY_STUDIO_BASE_SLUG="your_base_slug"
```

You will have to create a "base" (i.e. a website object) in Sanity Studio (the CMS admin panel) first, to get this slug! 

Run on local:

```
npm run dev
```

I will write more on this in the wiki when time permits!