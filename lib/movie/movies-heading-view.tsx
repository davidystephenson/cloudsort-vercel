import HeadingView from '../heading/heading-view'
import ImportMoviesView from './import-movies-view'
import MoviesHeadingContentView from './movies-heading-content-view'
import MoviesHeadingCreateView from './movies-heading-create-view'

export default function MoviesHeadingView (): JSX.Element {
  return (
    <HeadingView label='Movies' content={<MoviesHeadingContentView />}>
      <ImportMoviesView />
      <MoviesHeadingCreateView />
    </HeadingView>
  )
}
