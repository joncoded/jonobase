const schema = {
  name: 'side',
  title: 'Side', 
  type: 'document', 
  fields: [
    {
      name: 'title',      
      title: 'Title',
      description: 'the side\'s name - will factor into the SEO metadata', 
      type: 'string', 
      require: true,
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'slug', 
      title: 'Slug', 
      description: 'alphanumeric and dashes-only - will factor into the SEO',
      type: 'slug',       
      options: { source: 'title' }
    },
    {
      name: 'emoji',
      title: 'Emoji', 
      description: 'for casual categorization purposes',       
      type: 'string',      
    },
    {
      name: 'subtitle',
      title: 'Subtitle', 
      description: 'a tagline for the side - will factor into the SEO metadata',
      type: 'string'             
    },
    {
      name: 'content',
      title: 'Content',
      description: 'rich text and code allowed',      
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
              description: `Screen reader text for low-sighted users`
            }
          ]
        },
        {
          type: 'code'
        },
        {
          type: 'table'
        }
      ] 
    },
    {
      name: 'image', 
      title: 'Image', 
      type: 'image'      
    },
    { 
      name: 'date',
      title: 'Date', 
      description: 'back-dating or future-dating allowed',
      type: 'datetime',
      options: {
        dateFormat: 'YYYY-MM-DD', 
        timeFormat: 'HH:mm',
        calendarTodayLabel: 'Today'
      },
      validation: (Rule: any) => Rule.required(),      
    },
    {
      name: 'showDate', 
      title: 'Show date',
      description: 'show date on public website',
      type: 'boolean', 
      validation: (Rule: any) => Rule.required()
    }
  ],
  orderings: [
    {
      title: 'Date specified, newest first',
      name: 'dateDesc',
      by: [
        { field: 'date', direction: 'desc'}
      ]
    },
    {
      title: 'Date specified, oldest first',
      name: 'dateAsc',
      by: [
        { field: 'date', direction: 'asc'}
      ]
    },
    {
      title: 'Title, ascending',
      name: 'titleAsc',
      by: [
        { field: 'title', direction: 'asc'}
      ]
    },
    {
      title: 'Title, descending',
      name: 'titleDesc',
      by: [
        { field: 'title', direction: 'desc'}
      ]
    }
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'date',
      media: 'image',     
    },
  },
  initialValue: {
    showDate: true
  }
}

export default schema