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
      onClick={handleClick}
      fontSize='md'
      whiteSpace='normal'
      py='6px'
      h='auto'
      w='fit-content'
    >
      <Text w='fit-content'>
        [{option.chooseLetter}]
        &thinsp;
        <MovieLabelView />
      </Text>
    </ButtonView>
  )
}
