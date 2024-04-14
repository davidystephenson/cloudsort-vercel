import updateList from '@/list/update-list'
import chooseOption from '@/mergeChoice/chooseOption'
import guardPostChooseMovie from '@/movie/guard-post-choose-movie'

export async function POST (request: Request): Promise<Response> {
  return await updateList({
    guardBody: guardPostChooseMovie,
    guardLabel: '/movie/choose body',
    guardUpdate: async (props) => {
      if (props.state.choice == null) {
        throw new Error('There is no choice.')
      }
      const included = props.state.choice.options.includes(props.body.movieId)
      if (!included) {
        throw new Error(`${props.body.movieId} is not an option.`)
      }
    },
    request,
    update: (props) => {
      return chooseOption({
        betterIndex: props.body.betterIndex,
        state: props.state
      })
    }
  })
}
