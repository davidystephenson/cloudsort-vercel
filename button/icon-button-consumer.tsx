'use client'

import { useButtonContext } from '@/button/button-context'
import { MdError } from 'react-icons/md'
import { ButtonGroup, IconButtonProps, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverTrigger } from '@chakra-ui/react'
import ThemeIconButtonView from '../theme/theme-icon-button-view'
import { ForwardedRef, forwardRef } from 'react'

function Consumer (
  props: IconButtonProps,
  ref: ForwardedRef<HTMLButtonElement>
): JSX.Element {
  const button = useButtonContext()
  if (button.error == null) {
    return (
      <ThemeIconButtonView
        isLoading={button.loading}
        onClick={button.handleClick}
        ref={ref}
        type={button.type}
        {...props}
      />
    )
  }

  return (
    <ButtonGroup isAttached orientation={button.orientation}>
      <ThemeIconButtonView
        onClick={button.handleClick}
        isLoading={button.loading}
        ref={ref}
        type={button.type}
        {...props}
        variant='outline'
        colorScheme='red'
      />
      <Popover>
        <PopoverTrigger>
          <ThemeIconButtonView
            aria-label='Error'
            icon={<MdError />}
            colorScheme='red'
          />
        </PopoverTrigger>
        <PopoverContent>
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

const IconButtonConsumer = forwardRef(Consumer)
export default IconButtonConsumer
