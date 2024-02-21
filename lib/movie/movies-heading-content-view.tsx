import HeadingContentView from '../heading/heading-content-view'
import { useHeading } from '../heading/heading-context'
import CreateMovieFormView from './create-movie-form-view'

export default function MoviesHeadingContentView (): JSX.Element {
  const heading = useHeading()
  if (heading.selection == null) {
    return <></>
  }
  console.log('heading.selection', heading.selection)
  const creating = heading.selection === 'create'
  console.log('creating', creating)
  if (creating) {
    return (
      <HeadingContentView>
        <CreateMovieFormView />
      </HeadingContentView>
    )
  }
  throw new Error(`Unexpected selection: ${heading.selection}`)
}
