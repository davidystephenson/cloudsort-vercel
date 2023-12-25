'use client'

import { useButtonContext } from '@/lib/button/button-context'
import { ButtonGroup, Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react'
import { ReactNode } from 'react'
import { MdError } from 'react-icons/md'
import ThemeButtonView from '../theme/theme-button-view'
import { useTheme } from '../theme/theme-context'

export default function ButtonConsumer (
  props: {
    children: ReactNode
  }
): JSX.Element {
  const button = useButtonContext()
  const theme = useTheme()
  if (button.error == null) {
    return (
      <ThemeButtonView
        isLoading={button.loading}
        onClick={button.handleClick}
        type={button.type}
      >
        {props.children}
      </ThemeButtonView>
    )
  }

  const contentClass = theme.darkened ? 'bg-danger-900' : 'bg-danger-200'

  return (
    <ButtonGroup>
      <ThemeButtonView
        onClick={button.handleClick}
        isLoading={button.loading}
        type={button.type}
      >
        {props.children}
      </ThemeButtonView>
      <Popover
        classNames={{ content: contentClass }}
        placement='right-start'
        showArrow
      >
        <PopoverTrigger>
          <ThemeButtonView
            isIconOnly
            color='danger'
          >
            <MdError className='h-[55%] w-max' />
          </ThemeButtonView>
        </PopoverTrigger>
        <PopoverContent>
          {button.error}
        </PopoverContent>
      </Popover>
    </ButtonGroup>
  )
}
