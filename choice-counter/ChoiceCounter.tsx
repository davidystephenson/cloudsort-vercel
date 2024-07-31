import {
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger
} from '@chakra-ui/react'
import ChoiceCounterLabelView from './ChoiceCounterLabel'
import ChoiceCounterDetailsView from './ChoiceCounterDetails'
import ThemeButtonView from '@/theme/theme-button-view'

export default function ChoiceCounterView (): JSX.Element {
  return (
    <Popover>
      <PopoverTrigger>
        <ThemeButtonView variant='solid' size='xs' minWidth='max-content'>
          <ChoiceCounterLabelView />
        </ThemeButtonView>
      </PopoverTrigger>
      <PopoverContent w='fit-content'>
        <PopoverArrow />
        <PopoverBody>
          <ChoiceCounterDetailsView />
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}
