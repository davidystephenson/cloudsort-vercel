import ArchiveTableView from '@/archive/archive-table-view'
import HeadingContentView from '../heading/heading-content-view'
import { useHeading } from '../heading/heading-context'
import CreateMovieFormView from './create-movie-form-view'

export default function MoviesHeadingContentView (): JSX.Element {
  const heading = useHeading()
  if (heading.selection == null) {
    return <></>
  }
  const creating = heading.selection === 'create'
  if (creating) {
    return (
      <HeadingContentView>
        <CreateMovieFormView />
      </HeadingContentView>
    )
  }
  const archiving = heading.selection === 'archive'
  if (archiving) {
    return (
      <HeadingContentView>
        <ArchiveTableView />
      </HeadingContentView>
    )
  }
  throw new Error(`Unexpected selection: ${heading.selection}`)
}
