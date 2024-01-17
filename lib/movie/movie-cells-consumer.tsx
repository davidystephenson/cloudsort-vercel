import { useMovie } from '../movie/movie-context'
import ThemeLinkableView from '../theme/theme-linkable-view'
import DeleteIconButtonView from '../delete-button/delete-icon-button-view'

export default function MovieCellsConsumer (): JSX.Element {
  const movie = useMovie()
  async function send (): Promise<void> {
    await movie.delete()
  }
  return (
    <>
      <td className='w-full'>
        <ThemeLinkableView href={movie.calculated.url} isExternal>
          {movie.calculated.name}
        </ThemeLinkableView>
      </td>
      <td className='w-fit whitespace-nowrap'>
        <div className='w-fit'>{movie.calculated.updatedAt.toLocaleString()}</div>
      </td>
      <td>
        {movie.calculated.score}
      </td>
      <td className='flex items-center'>
        {movie.calculated.points}
        <DeleteIconButtonView send={send} />
      </td>
    </>
  )
}
