'use client'

import { useButtonContext } from '@/lib/button/button-context'
import { ButtonGroup, Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react'
import { ForwardedRef, ReactNode, forwardRef } from 'react'
import { MdError } from 'react-icons/md'
import ButtonDisplayView from '../theme/button-display-view'

function Consumer (
  props: {
    children: ReactNode
  },
  ref: ForwardedRef<HTMLButtonElement>
): JSX.Element {
  const button = useButtonContext()
  if (button.error == null) {
    return (
      <ButtonDisplayView
        isLoading={button.loading}
        onClick={button.handleClick}
        ref={ref}
        type={button.type}
      >
        {props.children}
      </ButtonDisplayView>
    )
  }

  return (
    <ButtonGroup>
      <ButtonDisplayView
        onClick={button.handleClick}
        isLoading={button.loading}
        ref={ref}
        type={button.type}
      >
        {props.children}
      </ButtonDisplayView>
      <Popover
        classNames={{ content: 'bg-red-950' }}
        placement='right-start'
        showArrow
      >
        <PopoverTrigger>
          <ButtonDisplayView
            isIconOnly
            color='danger'
          >
            <MdError className='h-[55%] w-max' />
          </ButtonDisplayView>
        </PopoverTrigger>
        <PopoverContent>
          {button.error}
        </PopoverContent>
      </Popover>
    </ButtonGroup>
  )
}

const ButtonConsumer = forwardRef(Consumer)

export default ButtonConsumer
