const schema = {
  name: 'heap', 
  title: 'Heap',   
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
      name: 'lists',
      title: 'lists',
      type: 'array',       
      of: [{
        type: 'reference', 
        to: [{ type: 'list'}]
      }]
    }
  ]
}

export default schema