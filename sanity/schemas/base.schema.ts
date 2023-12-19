const schema = {
  name: 'base', 
  title: 'Base', 
  type: 'document',
  fields: [
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
      options: { source: 'title' }
    },           
    {
      name: 'tagline',
      title: 'Tagline',
      type: 'string',      
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
      name: 'filters',
      title: 'Filters',
      description: 'categories for home page filters',
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
      description: 'footer (tail) content, left side for desktop, at the top for mobile - good for copyright messages',
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
      description: 'footer (tail) content, right side for desktop, at the bottom for mobile - good for social media links or whatever',
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