import ListsView from '@/lib/list/lists-view'
import prisma from '@/lib/prisma'

export default async function Lists (): Promise<JSX.Element> {
  const lists = await prisma.list.findMany()
  return (
    <>
      <ListsView rows={lists} />
    </>
  )
}
