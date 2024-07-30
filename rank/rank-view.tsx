import movieContext from '@/movie/movie-context'
import moviesContext from '@/movie/movies-context'
import { Badge } from '@chakra-ui/react'

export default function RankView (): JSX.Element {
  const movie = movieContext.useContext()
  const movies = moviesContext.useContext()
  const rank = movies.getRank({ movieId: movie.item.id })
  const view = <Badge size='xs'>{rank}</Badge>
  return view
}
