import { Button, ButtonProps } from '@nextui-org/react'
import { ReactNode } from 'react'

export default function ThemeButtonView (
  props: {
    children: ReactNode
  } & ButtonProps
): JSX.Element {
  return (
    <Button
      color='primary'
      className='text-md'
      size='sm'
      {...props}
    />
  )
}
