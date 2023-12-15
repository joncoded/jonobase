const schema = {
  name: 'list', 
  title: 'List',   
  type: 'document',
  fields: [
    {
      name: 'title', 
      title: 'Title',
      type: 'string', 
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'posts',
      title: 'posts',
      type: 'array',       
      of: [{
        type: 'reference', 
        to: [{ type: 'post'}]
      }]
    }
  ]
}

export default schema