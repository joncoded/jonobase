const schema = {
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      description: 'this post\'s name',
      type: 'string',
      require: true,
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      description: 'a machine-friendly version of the title (characters allowed: a-z, 0-9, - [dashes, no spaces])',
      type: 'slug',
      options: { source: 'title' }
    },
    {
      name: 'emoji',
      title: 'Emoji',
      description: 'the replacement for an image (image and emoji are both optional)',
      type: 'string',
    },
    {
      name: 'subtitle',
      title: 'Subtitle',
      description: 'the tagline under the title that also serves as the meta description for SEO)',
      type: 'string'
    },
    {
      name: 'kind',
      title: 'Kind',
      description: 'the one-word category that also serves as the subfolder in the URL (i.e. /[type]/[kind])',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'content',
      title: 'Content',
      description: 'the meat of this entry - rich text and code allowed',
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
      description: 'optional footnotes and references - rich text allowed',
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
      description: 'an external link to somewhere else (optional, will appear as a button)',
      type: 'url',
    },
    {
      name: 'nooks',
      title: 'Nooks',
      description: 'the topics of this post (commonly known as "tags")',
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
      description: 'the image that appears as the thumbnail in lists and background in posts (if there is no image, then the emoji might substitute the thumbnail)',
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
      },
      validation: (Rule: any) => Rule.required(),
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
      subtitle: 'date',
      media: 'image',
    },
  },
  initialValue: {
    kind: 'unsorted',
    showDate: true,
    date: Date.now()
  }
}

export default schema