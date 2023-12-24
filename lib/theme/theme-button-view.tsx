import { Button, ButtonProps } from '@nextui-org/react'
import { ReactNode, forwardRef } from 'react'

// export default function ThemeButtonView (
//   props: {
//     children: ReactNode
//   } & ButtonProps
// ): JSX.Element {
//   return (
//     <Button
//       color='primary'
//       className='text-md'
//       size='sm'
//       {...props}
//     />
//   )
// }

const ThemeButtonView = forwardRef<HTMLButtonElement, {
  children: ReactNode
} & ButtonProps>(function ThemeButtonView (
  props,
  ref
): JSX.Element {
  return (
    <Button
      color='primary'
      className='text-md'
      size='sm'
      {...props} ref={ref}
    />
  )
})
export default ThemeButtonView
