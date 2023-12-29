'use client'

import { useButtonContext } from '@/lib/button/button-context'
import { ButtonGroup, ButtonProps, Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react'
import { ReactNode } from 'react'
import { MdError } from 'react-icons/md'
import ThemeButtonView from '../theme/theme-button-view'
import ThemeIconView from '../theme/theme-icon-view'

export default function ButtonConsumer (props: {
  children: ReactNode
} & ButtonProps): JSX.Element {
  const button = useButtonContext()
  const { ref, ...restProps } = props
  if (button.error == null) {
    return (
      <ThemeButtonView
        isLoading={button.loading}
        onClick={button.handleClick}
        type={button.type}
        {...restProps}
      >
        {props.children}
      </ThemeButtonView>
    )
  }

  const popoverClass = {
    content: 'bg-danger-100 border-1 border-danger-400'
  }

  return (
    <ButtonGroup>
      <ThemeButtonView
        onClick={button.handleClick}
        isLoading={button.loading}
        type={button.type}
        {...restProps}
      >
        {props.children}
      </ThemeButtonView>
      <Popover
        classNames={popoverClass}
        placement='right-start'
        showArrow
      >
        <PopoverTrigger>
          <ThemeButtonView
            isIconOnly
            color='danger'
          >
            <ThemeIconView Icon={MdError} />
          </ThemeButtonView>
        </PopoverTrigger>
        <PopoverContent>
          {button.error}
        </PopoverContent>
      </Popover>
    </ButtonGroup>
  )
}
