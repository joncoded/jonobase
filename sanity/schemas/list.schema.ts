const schema = {
  name: 'list', 
  title: 'List',   
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
      name: 'subtitle', 
      title: 'Subtitle',
      type: 'string'      
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
              description: `Screen reader text for low-sighted users`,
              options: {
                isHighlighted: true
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
      name: 'posts',
      title: 'Posts',
      type: 'array',       
      of: [{
        type: 'reference', 
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
              description: `Screen reader text for low-sighted users`,
              options: {
                isHighlighted: true
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