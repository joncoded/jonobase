const schema = {
  name: 'wiki',
  title: 'Wiki', 
  type: 'document', 
  fields: [
    {
      name: 'title',      
      title: 'Title',
      description: 'the wiki page\'s name (obviously)', 
      type: 'string', 
      require: true,
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'slug', 
      title: 'Slug', 
      description: 'alphanumeric and dashes-only',
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
      description: 'a tagline for the post that appears under the title',
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
          type: 'block',
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
      name: 'extra',
      title: 'Extra',
      description: 'footnotes and references - rich text and code allowed',      
      type: 'array',      
      of: [
        {
          type: 'block',
        }
      ] 
    },
    {
      name: 'nooks',
      title: 'Nooks', 
      description: 'the topics relating to this wiki item (aka tags)',
      type: 'array',
      of: [
        {type: 'string'}      
      ],
      options: {
        layout: 'tags',
      }
    },
    {
      name: 'image', 
      title: 'Image', 
      description: 'if there is no image, then the emoji will substitute as the image',
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
      subtitle: 'subtitle',
      media: 'image',     
    },
  },
  initialValue: {
    showDate: false,
    date: Date.now()
  }
}

export default schema