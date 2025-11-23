const schema = {
  name: 'base', 
  title: 'Base', 
  type: 'document',
  fields: [
    {
      name: 'logo',
      title: 'Site logo', 
      description: 'site logo and favicon', 
      type: 'image',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'title', 
      title: 'Title',
      description: 'required: website name, with no more than 40 characters',
      type: 'string', 
      validation: (Rule: any) => Rule.required().max(40)
    },
    {
      name: 'slug', 
      title: 'Slug', 
      description: 'required: a machine-friendly version of the title (characters allowed: a-z, 0-9, - [dashes, no spaces])',
      type: 'slug', 
      options: { source: 'title' },
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'domain',
      title: 'Domain', 
      description: 'domain name of the site', 
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },          
    {
      name: 'tagline',
      title: 'Tagline',
      description: 'optional: a short one-liner slogan for the website, with no more than 100 characters',
      type: 'string', 
      validation: (Rule: any) => Rule.max(100)     
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
      name: 'perPage',
      title: 'Posts per page on homepage',
      description: 'optional: number of posts to show per page on the homepage (default is 6)',
      initialValue: '6',
      type: 'string',
      options: {
        list:  ['1', '2', '3', '6', '12', '18', '24', '30']
      }    
    },
    {
      name: 'homeHeap',
      title: 'Home heap',
      description: 'required: choose the heap of lists (i.e. a pile of horizontal sections) to display on the homepage',
      type: 'reference',
      to: [{ 
        type: 'heap'
      }],
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'metakeywords',
      title: 'Meta keywords', 
      description: 'optional: site keywords for SEO purposes',
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
      description: 'optional: footer (tail) content: left side for desktop + at the top for mobile',
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
      description: 'optional: footer (tail) content: right side for desktop + at the bottom for mobile',
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