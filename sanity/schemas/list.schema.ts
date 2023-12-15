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
      name: 'posts',
      title: 'Posts',
      type: 'array',       
      of: [{
        type: 'reference', 
        to: [{ type: 'post'}]
      }]
    },
    {
      name: 'content',
      title: 'Content',       
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
  ]
}

export default schema