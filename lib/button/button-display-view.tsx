import { Button, ButtonProps } from '@nextui-org/react'
import { ReactNode, forwardRef, ForwardedRef } from 'react'

function ButtonDisplay (
  props: {
    children: ReactNode
  } & ButtonProps,
  ref: ForwardedRef<HTMLButtonElement>
): JSX.Element {
  return (
    <Button
      color='primary'
      className='text-md'
      size='sm'
      {...props}
      ref={ref}
    />
  )
}

const ButtonDisplayView = forwardRef(ButtonDisplay)

export default ButtonDisplayView
