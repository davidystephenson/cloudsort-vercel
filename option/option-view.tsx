import { useList } from '../list/list-context'
import { MovieProvider } from '@/movie/movie-context'
import { OptionProvider } from './option-context'
import OptionConsumer from './option-consumer'
import { ItemId } from '@/mergechoice/mergeChoiceTypes'
import { VStack, HStack } from '@chakra-ui/react'
import OptionOpenView from './option-open-view'

export default function OptionView (props: {
  chooseLetter: string
  index: number
  id: ItemId
  openLetter: string
}): JSX.Element {
  const list = useList()
  const movie = list.movies.find(movie => movie.id === props.id)
  if (movie == null) {
    return <>There is no movie</>
  }
  return (
    <MovieProvider calculated={movie}>
      <OptionProvider
        chooseLetter={props.chooseLetter}
        index={props.index}
        openLetter={props.openLetter}
      >
        <VStack>
          <HStack>
            <OptionConsumer />
          </HStack>
          <OptionOpenView />
        </VStack>
      </OptionProvider>
    </MovieProvider>
  )
}
