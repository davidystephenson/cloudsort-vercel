import { EPISODE_PARTS_RELATION } from '@/episode/episode-constants'
import { RelatedEpisode } from '@/episode/episode-types'
import { PrismaTransaction } from '@/prisma/prisma-types'
import { Episode } from '@prisma/client'
import { MovieData } from './movie-types'
import guardMergechoiceList from '@/list/guard-mergechoice-list'

export default async function createMovies (props: {
  episodes: Episode[]
  listId: number
  movies: MovieData[]
  tx: PrismaTransaction
}): Promise<RelatedEpisode> {
  const imdbIds = props.movies.map((movie) => movie.imdbId)
  const existingMovies = await props.tx.movie.findMany({
    where: {
      imdbId: {
        in: imdbIds
      }
    }
  })
  const existingImdbIds = existingMovies.map((movie) => movie.imdbId)
  const newImdbIds = imdbIds.filter((imdbId) => !existingImdbIds.includes(imdbId))
  const newPayloads = props.movies.filter((movie) => {
    const includes = newImdbIds.includes(movie.imdbId)
    return includes
  })
  const newItemData = newPayloads.map((movie) => {
    const data = {
      name: movie.name,
      movie: {
        create: {
          imdbId: movie.imdbId,
          url: movie.url,
          year: movie.year
        }
      }
    }
    return data
  })
  const createItemPromises = newItemData.map(async (data) => {
    const createdItem = await props.tx.item.create({ data })
    return createdItem
  })
  const createdItems = await Promise.all(createItemPromises)
  const createdItemIds = createdItems.map((item) => item.id)
  const createdMovies = await props.tx.movie.findMany({
    where: {
      itemId: {
        in: createdItemIds
      }
    }
  })
  const postedMovies = [...existingMovies, ...createdMovies]
  const mergechoiceList = await guardMergechoiceList({
    db: props.tx,
    listId: props.listId
  })
  const values = Object.values(mergechoiceList.state.items)
  const importingMovies = props.movies.filter(movie => {
    const exists = values.some((item) => {
      const match = item.imdbId === movie.imdbId
      return match
    })
    return !exists
  })
  const createdEpisodeItems = importingMovies.map((movie) => {
    const item = postedMovies.find((createMovie) => createMovie.imdbId === movie.imdbId)
    if (item == null) {
      throw new Error('Item not found.')
    }
    const episodeItem = {
      itemId: item.itemId,
      points: 0,
      seed: movie.seed,
      seeding: movie.seeding
    }
    return episodeItem
  })

  const episode = await props.tx.episode.create({
    data: {
      import: {
        create: {
          episodeItems: {
            create: createdEpisodeItems
          }
        }
      },
      listId: props.listId,
      mergeChoiceId: props.episodes.length
    },
    include: EPISODE_PARTS_RELATION
  })
  return episode
}
