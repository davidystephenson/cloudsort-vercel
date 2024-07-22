import listContext from '@/list/list-context'
import HeadingSelectorView from '../heading/heading-selector-view'

export default function MoviesHeadingCreateView (): JSX.Element {
  const list = listContext.useContext()
  if (!list.authed) {
    return <></>
  }
  return (
    <HeadingSelectorView selection='create'>
      Create Movie
    </HeadingSelectorView>
  )
}
