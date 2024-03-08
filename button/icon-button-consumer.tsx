'use client'

import { useButtonContext } from '@/button/button-context'
import { MdError } from 'react-icons/md'
import { ButtonGroup, IconButtonProps, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverTrigger } from '@chakra-ui/react'
import ThemeIconButtonView from '../theme/theme-icon-button-view'

export default function IconButtonConsumer (props: IconButtonProps): JSX.Element {
  const button = useButtonContext()
  if (button.errorMessage == null) {
    return (
      <ThemeIconButtonView
        isLoading={button.loading}
        onClick={button.handleClick}
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
            {button.errorMessage}
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </ButtonGroup>
  )
}
