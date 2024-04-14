import { useMovie } from './movie-context'
import DeleteIconButtonView from '../delete-button/delete-icon-button-view'
import { OptionallyLabeledIconButtonProps } from '@/theme/theme-types'

export default function DeleteMovieButtonView (props: OptionallyLabeledIconButtonProps): JSX.Element {
  const movie = useMovie()
  async function send (): Promise<void> {
    await movie.delete()
  }
  return (
    <DeleteIconButtonView
      send={send}
      {...props}
    />
  )
}
