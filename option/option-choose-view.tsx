import MovieLabelView from '@/movie/movie-label-view'
import { useOption } from './option-context'
import ButtonView from '@/button/button-view'
import { Text } from '@chakra-ui/react'

export default function OptionChooseView (): JSX.Element {
  const option = useOption()
  function handleClick (): void {
    option.choose()
  }
  return (
    <ButtonView
      fontSize='md'
      h='auto'
      onClick={handleClick}
      py='6px'
      w='fit-content'
      whiteSpace='normal'
    >
      <Text w='fit-content'>
        [{option.chooseLetter}]
        &thinsp;
        <MovieLabelView />
      </Text>
    </ButtonView>
  )
}
