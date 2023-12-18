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
    }
  ]
}

export default schema