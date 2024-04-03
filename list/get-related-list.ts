import prisma from '@/prisma/prisma'
import { RelatedList } from './list-types'

export default async function getRelatedList (props: {
  listId: number
}): Promise<RelatedList | null> {
  const list = await prisma.list.findFirst({
    where: {
      id: props.listId
    },
    include: {
      operations: {
        include: {
          inputs: {
            include: {
              inputMovies: true
            }
          },
          outputMovies: true
        }
      },
      movieReservations: true,
      choices: {
        include: {
          options: true
        }
      }
    }
  })
  return list
}
