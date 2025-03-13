const schema = {
  name: 'base', 
  title: 'Base', 
  type: 'document',
  fields: [
    {
      name: 'logo',
      title: 'Site logo', 
      description: '', 
      type: 'image',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'title', 
      title: 'Title',
      type: 'string', 
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'slug', 
      title: 'Slug', 
      type: 'slug', 
      options: { source: 'title' },
      validation: (Rule: any) => Rule.required()
    },           
    {
      name: 'tagline',
      title: 'Tagline',
      type: 'string',      
    },
    {
      name: 'perPage',
      title: 'Posts per page on homepage',
      type: 'string',
      options: {
        list:  ['1', '2', '3', '6', '12', '18', '30']
      }    
    },
    {
      name: 'menu',
      title: 'Menu',
      description: 'navigational menu in rich text (use WYSIWYG or HTML!)',
      type: 'array', 
      of: [
        {
          type: 'block'
        }
      ]
    }, 
    {
      name: 'intro',
      title: 'Intro',
      type: 'array', 
      of: [
        {
          type: 'block'
        }
      ]
    },
    {
      name: 'featuredPostsTitle',
      title: 'Featured posts heading',
      description: 'What to call the featured (pinned) posts section of the home page (e.g. "pinned")',
      type: 'string',
    },
    {
      name: 'featured',
      title: 'Featured posts',
      description: 'The "greatest hits" list of posts for home page',
      type: 'reference',
      weak: true,              
      to: { type: 'list'}      
    },
    {
      name: 'latestPostsTitle', 
      title: 'Latest posts heading', 
      description: 'What to call the latest posts section of the home page (e.g. "blog")',
      type: 'string'
    },
    {
      name: 'filters',
      title: 'Filters',
      description: 'categories for search filters',
      type: 'array', 
      of: [
        {
          type: 'string',
        }
      ],
      options: {
        layout: 'tags',
      }
    },
    {
      name: 'metakeywords',
      title: 'Meta keywords', 
      description: 'site keywords for SEO purposes',
      type: 'array',
      of: [
        {
          type: 'string', 
        }
      ],
      options: {
        layout: 'tags',
      }
    },
    {
      name: 'colophon1',
      title: 'Colophon 1',
      description: 'footer (tail) content: left side for desktop + at the top for mobile',
      type: 'array', 
      of: [
        {
          type: 'block'
        }
      ]
    },
    {
      name: 'colophon2',
      title: 'Colophon 2',
      description: 'footer (tail) content: right side for desktop + at the bottom for mobile',
      type: 'array', 
      of: [
        {
          type: 'block'
        }
      ]
    },
  ]
}

export default schema