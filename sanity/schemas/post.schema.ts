const schema = {
  name: 'post',
  title: 'Post', 
  type: 'document', 
  fields: [
    {
      name: 'title',
      title: 'Title', 
      type: 'string', 
      require: true,
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'slug', 
      title: 'Slug', 
      type: 'slug', 
      options: { source: 'title' }
    },
    {
      name: 'emoji',
      description: 'for casual categorization purposes', 
      title: 'Emoji', 
      type: 'string',      
    },
    {
      name: 'subtitle',
      title: 'Subtitle', 
      type: 'string'             
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
    {
      name: 'links',
      title: 'Links', 
      description: 'external links',
      type: 'array',
      of: [
        {type: 'url'}
      ],      
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
  initialValue: {
    date: Date.now()
  },
  preview: {
    select: {
      title: 'title',
      subtitle: 'date',
      media: 'image',     
    },
 },
}

export default schema