const schema = {
  name: 'tube',  
  title: 'YouTube Embed',
  type: 'object',
  fields: [
    {
      name: 'url',
      type: 'url',
      title: 'YouTube URL'      
    }
  ]
}

export default schema