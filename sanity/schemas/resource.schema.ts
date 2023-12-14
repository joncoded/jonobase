import { filterList } from "@/lib/app.config"

const categoryList = filterList.slice(1)

const schema = {
  name: 'resource',
  title: 'Resource', 
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
      name: 'link',
      title: 'Link', 
      type: 'url'      
    },
    {
      name: 'views', 
      title: 'Views', 
      type: 'number', 
      initialValue: 0
    },
    {
      name: 'image', 
      title: 'Image', 
      type: 'image',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'category', 
      title: 'Category',
      type: 'string', 
      validation: (Rule: any) => Rule.required(),
      options: {
        list: categoryList
      }
    }
  ]
}

export default schema