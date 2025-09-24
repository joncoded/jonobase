const schema = {
  name: 'pens',  
  title: 'CodePen',
  type: 'object',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
      description: 'Optional: give this pen a name to distinguish it from others'
    },
    {
      name: 'url',
      type: 'url',
      title: 'Codepen URL'      
    },
    {
      name: 'tabs',
      type: 'string',
      title: 'Visible tabs',
      description: 'comma-separated list of tabs to show by default (js,html,css,result)',
      initialValue: 'js,html,css,result',
      options: {
        list: [
          { title: 'JS, HTML, CSS, result', value: 'js,html,css,result' },
          { title: 'JS & result', value: 'js,result' },
          { title: 'HTML & result', value: 'html,result' },
          { title: 'CSS & result', value: 'css,result' },
          { title: 'Result only', value: 'result' }
        ]
      }
    }
  ]
}

export default schema