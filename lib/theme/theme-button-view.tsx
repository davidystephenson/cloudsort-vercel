import { Button, ButtonProps } from '@nextui-org/react'
import { ReactNode, forwardRef } from 'react'
import { useTheme } from './theme-context'

const ThemeButtonView = forwardRef<HTMLButtonElement, {
  children: ReactNode
} & ButtonProps>(function ThemeButtonView (
  props,
  ref
): JSX.Element {
  const theme = useTheme()
  const disabled = !theme.mounted
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
