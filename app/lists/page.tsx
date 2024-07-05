import ListsView from '@/list/lists-view'
import prisma from '@/prisma/prisma'

export default async function Lists (): Promise<JSX.Element> {
  const lists = await prisma.list.findMany()
  // const [lists, setLists] = useState([])
  // useEffect(() => {
  //   async function fetchLists () {
  //     const lists = await prisma.list.findMany()
  //     setLists(lists)
  //   }
  //   fetchLists()
  // }, [])
  return (
    <>
      <ListsView rows={lists} />
    </>
  )
}
