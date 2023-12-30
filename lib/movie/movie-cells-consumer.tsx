import { MdDeleteForever } from 'react-icons/md'
import SendRequestView from '../request/send-request-view'
import ThemeIconView from '../theme/theme-icon-view'
import { useMovie } from '../movie/movie-context'
import ThemeLinkableView from '../theme/theme-linkable-view'

export default function MovieCellsConsumer (): JSX.Element {
  const movie = useMovie()
  async function send (): Promise<void> {
    // await movie.delete()
  }
  return (
    <>
      <td className='w-full'>
        <ThemeLinkableView href={movie.row.url ?? undefined} isExternal showAnchorIcon>
          {movie.row.name}
        </ThemeLinkableView>
      </td>
      <td>
        <SendRequestView
          aria-label='Delete'
          color='danger'
          isIconOnly
          send={send}
          size='sm'
          variant='light'
        >
          <ThemeIconView Icon={MdDeleteForever} />
        </SendRequestView>
      </td>
    </>
  )
}
