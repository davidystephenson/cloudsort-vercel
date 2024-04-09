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
      choices: {
        include: {
          options: true
        }
      },
      listMovies: {
        include: {
          movie: true
        }
      },
      movieReservations: true,
      operations: {
        include: {
          inputs: {
            include: {
              inputMovies: true
            }
          },
          outputMovies: true
        }
      }
    }
  })
  return list
}
