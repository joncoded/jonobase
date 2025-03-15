const schema = {
  name: 'list', 
  title: 'List',   
  type: 'document',
  fields: [
    {
      name: 'title', 
      title: 'Title',
      type: 'string', 
      description: 'the heading',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'slug', 
      title: 'Slug', 
      type: 'slug', 
      description: 'a machine-friendly version of the title (characters allowed: a-z, 0-9, - [dashes, no spaces])',
      options: { source: 'title' }
    },
    {
      name: 'subtitle', 
      title: 'Subtitle',
      description: 'content before the precontent', 
      type: 'string'      
    },
    {
      name: 'bgColor',
      title: 'Background',
      description: 'background colour for the whole section',
      type: 'string',
      options: {
        list: ['white', 'gray', 'red', 'orange', 'yellow', 'amber', 'lime', 'green', 'emerald', 'teal', 'cyan', 'sky', 'blue', 'indigo', 'violet', 'purple', 'fuchsia', 'pink', 'rose']
      },
      validation: (Rule: any) => Rule.required()
    },    
    {
      name: 'precontent',
      title: 'Precontent',
      description: 'content before the post list (if any)',
      type: 'array', 
      of: [
        {
          type: 'block'
        },
        {
          type: 'image',
          fields: [
            {
              type: 'text',
              name: 'alt',
              title: 'Alternative text',
              description: `screen reader text for low-sighted users`             
            }
          ]
        },
        {
          type: 'code'
        }
      ]
    }, 
    {
      name: 'posts',
      title: 'Posts',
      type: 'array',       
      of: [{
        type: 'reference', 
        weak: true, 
        to: [{ type: 'post'}]
      }]
    },
    {
      name: 'postcontent',
      title: 'Postcontent',       
      type: 'array',      
      of: [
        {
          type: 'block'
        },
        {
          type: 'image',
          fields: [
            {
              type: 'text',
              name: 'alt',
              title: 'Alternative text',
              description: `screen reader text for low-sighted users`,
              options: {                
              }
            }
          ]
        },
        {
          type: 'code'
        }
      ] 
    },
    {
      name: 'cta',
      title: 'CTA', 
      description: 'external link to somewhere else',
      type: 'object',
      fields: [
        { name: 'url', type: 'url', title: 'URL'},
        { name: 'title', type: 'string', title: 'Title'},
      ]
    }    
  ]
}

export default schema