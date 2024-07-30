'use client'

import { useMovie } from './movie-context'

export default function MovieLabelView (): JSX.Element {
  const movie = useMovie()
  return (
    <>
      {movie.item.name}
      {' '}
      ({movie.item.year})
    </>
  )
}
