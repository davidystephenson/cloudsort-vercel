'use client'

import { useButtonContext } from '@/lib/button/button-context'
import { Button, ButtonGroup, Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react'
import { ReactNode } from 'react'
import { MdError } from 'react-icons/md'

export default function ButtonConsumerView ({
  children
}: {
  children: ReactNode
}): JSX.Element {
  const button = useButtonContext()
  if (button.error == null) {
    return (
      <Button
        onClick={button.handleClick}
        isLoading={button.loading}
        type={button.type}
      >
        {children} xyz
      </Button>
    )
  }

  return (
    <ButtonGroup>
      <Button
        onClick={button.handleClick}
        isLoading={button.loading}
        type={button.type}
      >
        {children}
      </Button>
      <Popover showArrow>
        <PopoverTrigger>
          <Button isIconOnly color='danger'>
            <MdError className='h-[55%] w-max' />
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          {button.error}
        </PopoverContent>
      </Popover>
    </ButtonGroup>
  )
}
