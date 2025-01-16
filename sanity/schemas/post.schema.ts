const schema = {
  name: 'post',
  title: 'Post', 
  type: 'document', 
  fields: [
    {
      name: 'title',      
      title: 'Title',
      description: 'the post\'s name (obviously)', 
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
      name: 'kind',
      title: 'Kind',
      description: 'a one-word category for post-list filtering purposes',      
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
      name: 'link',
      title: 'Link', 
      description: 'external link to somewhere else',
      type: 'url',      
    },
    {
      name: 'nooks',
      title: 'Nooks', 
      description: 'the topics of the posts (aka tags)',
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