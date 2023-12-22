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
      options: { source: 'title' },
      validation: (Rule: any) => Rule.required()
    },    
    {
      name: 'lists',
      title: 'Lists',
      type: 'array',       
      of: [{
        type: 'reference', 
        to: [{ type: 'list'}]
      }],
      validation: (Rule: any) => Rule.required()
    }
  ]
}

export default schema