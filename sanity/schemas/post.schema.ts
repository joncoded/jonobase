const schema = {
  name: 'post',
  title: 'Post', 
  type: 'document', 
  fields: [
    {
      name: 'title',      
      title: 'Title',
      description: 'the post\'s name - will factor into the SEO metadata', 
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
      description: 'a tagline for the post - will factor into the SEO metadata',
      type: 'string'             
    },
    {
      name: 'kind',
      title: 'Kind',
      description: 'for post-list filtering purposes',
      type: 'string',      
      validation: (Rule: any) => Rule.required(),
      options: {
        list: ['coded', 'noted']
      }
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
      name: 'link',
      title: 'Link', 
      description: 'external link to somewhere else',
      type: 'string',      
    },
    {
      name: 'moods',
      title: 'Moods', 
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
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'date',
      media: 'image',     
    },
  },
}

export default schema