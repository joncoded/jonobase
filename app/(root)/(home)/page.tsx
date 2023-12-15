import Find from "@/components/find"
import { getResources, getResourcesPlaylist } from "@/sanity/actions"
import ItemCard from "@/components/item-card"

export const revalidate = 30

interface Props {
  searchParams: { [key: string] : string | undefined }
}

export default async function Home({ searchParams }: Props) {

  const resources = await getResources({
    query: searchParams?.query || '', 
    category: searchParams?.category || '', 
    page: '1'
  })

  const resourcesPlaylist = await getResourcesPlaylist()  

  return (
    <main className="w-full flex flex-col justify-center mx-auto">
      <section className="w-full bg-gradient-to-b from-sky-50 to-sky-200 p-5">
        <div className="max-w-screen-2xl mx-auto">
          <Find resources={resources} urlParams={searchParams} />
        </div>
      </section> 
      
      {resourcesPlaylist.map((item: any) => (
        <section key={item._id} className="w-full bg-emerald-200 p-5 flex flex-col justify-center items-center">
          <div className="max-w-screen-2xl mx-auto my-10">
            <h2 className="text-5xl text-center">{item.title}</h2>
            <div className="mt-5 w-full grid grid-cols-1 md:grid-cols-2 justify-center gap-5 sm:justify-start">
            {item.resources.map((resource: any) => (
              <ItemCard key={resource._id} resource={resource} />
            ))}
            </div>
          </div>
        </section>
      ))}    
      
    </main>
  )

}