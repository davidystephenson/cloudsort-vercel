import { Button, ButtonProps } from '@nextui-org/react'
import { ReactNode, forwardRef } from 'react'
import useMounted from '../mounted/use-mounted'

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
  const mounted = useMounted()
  const disabled = !mounted
  return (
    <Button
      color='primary'
      size='sm'
      isDisabled={disabled}
      {...props}
      ref={ref}
    />
  )
})
export default ThemeButtonView
