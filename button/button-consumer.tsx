'use client'

import { forwardRef, ForwardedRef } from 'react'
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

function Consumer (
  props: {
    leftButton?: JSX.Element
  } & ButtonProps,
  ref: ForwardedRef<HTMLButtonElement>
): JSX.Element {
  const button = useButtonContext()
  const { leftButton, ...restProps } = props
  if (button.error == null) {
    const mainView = (
      <ThemeButtonView
        isLoading={button.loading}
        onClick={button.handleClick}
        type={button.type}
        ref={ref}
        {...restProps}
      />
    )
    if (leftButton == null) {
      return mainView
    }
    return (
      <ButtonGroup isAttached orientation={button.orientation}>
        {leftButton}
        {mainView}
      </ButtonGroup>
    )
  }
  const icon = <MdError />
  const sizeProps = props.size == null ? {} : { size: props.size }
  return (
    <ButtonGroup isAttached orientation={button.orientation}>
      {leftButton}
      <ThemeButtonView
        onClick={button.handleClick}
        isLoading={button.loading}
        type={button.type}
        ref={ref}
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
            {button.error}
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </ButtonGroup>
  )
}

const ButtonConsumer = forwardRef(Consumer)

export default ButtonConsumer
