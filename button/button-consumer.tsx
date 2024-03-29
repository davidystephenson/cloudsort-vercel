'use client'

import { useButtonContext } from '@/button/button-context'
import { MdError } from 'react-icons/md'
import ThemeButtonView from '../theme/theme-button-view'
import {
  ButtonGroup,
  ButtonProps,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger
} from '@chakra-ui/react'
import ThemeIconButtonView from '../theme/theme-icon-button-view'

export default function ButtonConsumer (props: ButtonProps): JSX.Element {
  const button = useButtonContext()
  if (button.errorMessage == null) {
    return (
      <ThemeButtonView
        isLoading={button.loading}
        onClick={button.handleClick}
        type={button.type}
        {...props}
      />
    )
  }
  const icon = <MdError />
  const sizeProps = props.size == null ? {} : { size: props.size }
  return (
    <ButtonGroup isAttached orientation={button.orientation}>
      <ThemeButtonView
        onClick={button.handleClick}
        isLoading={button.loading}
        type={button.type}
        {...props}
        variant='outline'
        colorScheme='red'
      />
      <Popover>
        <PopoverTrigger>
          <ThemeIconButtonView
            aria-label='Error'
            colorScheme='red'
            icon={icon}
            {...sizeProps}
          />
        </PopoverTrigger>
        <PopoverContent zIndex={1}>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverBody>
            {button.errorMessage}
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </ButtonGroup>
  )
}
