import { useHeading } from './heading-context'
import { ButtonGroup } from '@chakra-ui/react'
import ThemeButtonView from '../theme/theme-button-view'
import ThemeIconButtonView from '../theme/theme-icon-button-view'
import { MdClose } from 'react-icons/md'
import { ReactNode } from 'react'

export default function HeadingSelectorView (props: {
  children: ReactNode
  selection: string
}): JSX.Element {
  const heading = useHeading()
  function handleClose (): void {
    heading.deselect()
  }
  if (heading.selection === props.selection) {
    return (
      <ButtonGroup isAttached>
        <ThemeIconButtonView
          aria-label='Close'
          colorScheme='purple'
          icon={<MdClose />}
          onClick={handleClose}
          variant='solid'
        />
        <ThemeButtonView isActive>
          {props.children}
        </ThemeButtonView>
      </ButtonGroup>
    )
  }
  function handleSelect (): void {
    heading.select({ selection: props.selection })
  }
  return (
    <ThemeButtonView onClick={handleSelect} size='xs'>
      {props.children}
    </ThemeButtonView>
  )
}
