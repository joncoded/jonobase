const schema = {
  name: 'list', 
  title: 'List',   
  type: 'document',
  fields: [
    {
      name: 'title', 
      title: 'Title',
      type: 'string', 
      description: 'the heading',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'showtitle',
      title: 'Show title',
      description: 'display or hide the title',
      type: 'boolean',
    },
    {
      name: 'slug', 
      title: 'Slug', 
      type: 'slug', 
      description: 'a machine-friendly version of the title (characters allowed: a-z, 0-9, - [dashes, no spaces])',
      options: { source: 'title' }
    },
    {
      name: 'subtitle', 
      title: 'Subtitle',
      description: 'content before the precontent', 
      type: 'string'      
    },
    {
      name: 'showsubtitle', 
      title: 'Show subtitle',
      description: 'display or hide the subtitle', 
      type: 'boolean'      
    },
    {
      name: 'bgColor',
      title: 'Background',
      description: 'background colour for the whole section',
      type: 'string',
      options: {
        list: ['white', 'gray', 'red', 'orange', 'yellow', 'amber', 'lime', 'green', 'emerald', 'teal', 'cyan', 'sky', 'blue', 'indigo', 'violet', 'purple', 'fuchsia', 'pink', 'rose']
      },
      validation: (Rule: any) => Rule.required()
    },    
    {
      name: 'precontent',
      title: 'Precontent',
      description: 'content before the post list (if any)!',
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
              description: `screen reader text for low-sighted users`             
            }
          ]
        },
        {
          type: 'code'
        }
      ]
    }, 
    {
      name: 'querybuilder',
      title: 'Query builder', 
      type: 'object',
      description: 'build a query for the list of content to display in page sections (all fields are optional - leave blank to mean "any")!)',
      fields: [
        {name: 'query', type: 'string', title: 'Query', description: 'content that contains this keyword'},
        {name: 'join', type: 'string', title: 'Join', description: 'within the content folder'},
        {name: 'kind', type: 'string', title: 'Kind', description: 'within the content subfolder' },
        {name: 'nook', type: 'string', title: 'Nook', description: 'with the following tag' },
        {name: 'count', type: 'number', title: '# of posts', options: { list: [ 1, 2, 3, 6, 12 ] }},
        {name: 'order', type: 'string', title: 'Order by', options: { list: [ 
          { title: 'Date', value: 'date'}, 
          { title: 'Title', value: 'title'},
          { title: 'Random', value: 'random'}
        ]}},
        {name: 'ascDesc', type: 'string', title: 'Sort direction', options: { list: [ 
          { title: 'Descending', value: 'desc'}, 
          { title: 'Ascending', value: 'asc'}
        ]}},
      ]
    },
    {
      name: 'showposts',
      title: 'Show posts',
      description: 'Show the posts from the query above',
      type: 'boolean',       
    },
    {
      name: 'showjoin',
      title: 'Show join',
      description: 'display the join (category folder) on the list',
      type: 'boolean',
    },
    {
      name: 'showkind',
      title: 'Show kind',
      description: 'display the kind (category subfolder) on the list',
      type: 'boolean',
    },
    {
      name: 'postcontent',
      title: 'Postcontent',       
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
              description: `screen reader text for low-sighted users`,
              options: {                
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
      name: 'cta',
      title: 'CTA', 
      description: 'external link to somewhere else',
      type: 'object',
      fields: [
        { name: 'url', type: 'url', title: 'URL'},
        { name: 'title', type: 'string', title: 'Title'},
      ]
    },
    {
      name: 'showlink',
      title: 'Show link', 
      description: 'show CTA',
      type: 'boolean'
    }
  ],
  initialValue: {
    showtype: false,
    showkind: false,
    showtitle: true,
    showsubtitle: false,
    querybuilder: {
      query: '', 
      nook: '', 
      order: 'date', 
      ascDesc: 'desc'
    },
    showposts: true,
    showlink: false
  }
}

export default schema