import { useHeading } from '../heading/heading-context'
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
          colorScheme='red'
          icon={<MdClose />}
          onClick={handleClose}
        />
        <ThemeButtonView isActive>
          {props.children}
        </ThemeButtonView>
      </ButtonGroup>
    )
  }
  function handleSelect (): void {
    heading.select({ selection: 'create' })
  }
  return (
    <ThemeButtonView onClick={handleSelect}>
      {props.children}
    </ThemeButtonView>
  )
}
