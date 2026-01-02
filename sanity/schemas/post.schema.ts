const schema = {
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    {
      name: 'base',
      title: 'Base',
      description: 'the website to which this post belongs',
      type: 'array', 
      of: [
        {type: 'reference', to: [{type: 'base'}]}
      ]      
    },
    {
      name: 'title',
      title: 'Title',
      description: 'required: the official title of this post', 
      type: 'string',
      require: true,
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      description: 'required: a machine-friendly version of the title (characters allowed: a-z, 0-9, - [dashes, no spaces]), also this post\'s URL, e.g. yourname.com/yourjoin/yourkind/yourpost',
      type: 'slug',
      options: { source: 'title' }
    },
    {
      name: 'emoji',
      title: 'Emoji',
      description: 'required: an emoji or a letter that could stand in as the post\'s thumbnail',
      type: 'string',
    },
    {
      name: 'subtitle',
      title: 'Subtitle',
      description: 'optional: the tagline under the title that also serves as the meta description for SEO)',
      type: 'string'
    },
    {
      name: 'join',
      title: 'Join', 
      description: 'required: the one-word category that serves as the folder in this post\'s URL, e.g. yourname.com/yourjoin/yourkind/yourpost',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },

    {
      name: 'kind',
      title: 'Kind',
      description: 'required: the one-word sub-category that also serves as the subfolder in this post\'s URL, e.g. yourname.com/yourjoin/yourkind/yourpost)',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'content',
      title: 'Content',
      description: 'required: the real meat of this post!',
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
              description: `screen reader text for low-sighted users`
            }
          ]
        },
        {
          type: 'code'
        },
        {
          type: 'table'
        },
        {
          type: 'pens'
        },
        {
          type: 'tube'
        },
        {
          type: 'mbed'
        }
      ]
    },
    {
      name: 'extra',
      title: 'Extra',
      description: 'optional section for things like footnotes and references - rich text allowed',
      type: 'array',
      of: [
        {
          type: 'block',
        }
      ]
    },
    {
      name: 'link',
      title: 'Link',
      description: 'optional external link to somewhere else (will appear as a button)',
      type: 'url',
    },
    {
      name: 'nooks',
      title: 'Nooks',
      description: 'optional keywords for this post (i.e. like "tags")',
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
      description: 'optional image that appears as the thumbnail in lists and as the background in posts (if there is no image, then the emoji stands in',
      type: 'image'
    },
    {
      name: 'date',
      title: 'Date',
      description: 'the desired publication date (back-dating or future-dating allowed!) / defaults to current date and time',
      type: 'datetime',
      options: {
        dateFormat: 'YYYY-MM-DD',
        timeFormat: 'HH:mm',
        calendarTodayLabel: 'Today'
      }
    },
    {
      name: 'showDate',
      title: 'Show date',
      description: 'show that date on the public website',
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
      join: 'join',
      kind: 'kind',
      date: 'date',
      media: 'emoji',
    },
    prepare(selection: any) {
      const {title, join, kind, date, emoji} = selection
      return {
        title: title,
        subtitle: `${date ? new Date(date).toISOString().split('T')[0] : 'undated'} in ${join}/${kind}`,
        media: emoji
      }
    }
  },
  initialValue: {
    join: '',
    kind: '',
    showDate: true,
    date: new Date().toISOString()  
  }
}

export default schema