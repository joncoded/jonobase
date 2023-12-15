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
      validation: (Rule: any) => Rule.required()
    },    
    {
      name: 'intro',
      title: 'Intro',       
      type: 'array',
      validation: (Rule: any) => Rule.required(),
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
    }
  ]
}

export default schema