import ListView from '@/lib/list/list-view'
import prisma from '@/lib/prisma/prisma'

export default async function Lists ({ params }: {
  params: {
    listId: string
  }
}): Promise<JSX.Element> {
  const list = await prisma.list.findFirstOrThrow({
    where: {
      id: Number(params.listId)
    }
  })
  const movies = await prisma.movie.findMany({
    where: {
      id: {
        in: list.itemIds
      }
    }
  })
  return (
    <>
      <ListView movies={movies} row={list} />
    </>
  )
}
