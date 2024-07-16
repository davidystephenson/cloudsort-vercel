import ListsView from '@/list/lists-view'
import prisma from '@/prisma/prisma'

export default async function Lists (): Promise<JSX.Element> {
  const lists = await prisma.list.findMany()
  return (
    <>
      <ListsView rows={lists} />
    </>
  )
}
