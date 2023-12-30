import { MdDeleteForever } from 'react-icons/md'
import SendRequestView from '../request/send-request-view'
import ThemeIconView from '../theme/theme-icon-view'
import { useMovie } from '../movie/movie-context'
import ThemeLinkableView from '../theme/theme-linkable-view'

export default function MovieCellsConsumer (): JSX.Element {
  const movie = useMovie()
  console.log('movie', movie)
  async function send (): Promise<void> {
    // await movie.delete()
  }
  const isUrl = URL.canParse(movie.row.url)
  console.log('isUrl', isUrl, movie.row.url)
  return (
    <>
      <td className='w-full'>
        <ThemeLinkableView href={movie.row.url} isExternal showAnchorIcon>
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
