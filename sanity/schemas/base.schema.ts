const schema = {
  name: 'base', 
  title: 'Base', 
  type: 'document',
  fields: [
    {
      name: 'title', 
      title: 'Title',
      type: 'string', 
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'intro',
      title: 'Intro',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    }
  ]
}

export default schema