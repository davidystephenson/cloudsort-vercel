import { forwardRef } from 'react'
import { useTheme } from './theme-context'
import { Button, ButtonProps } from '@chakra-ui/react'

const ThemeButtonView = forwardRef<HTMLButtonElement, ButtonProps>((
  props,
  ref
) => {
  const theme = useTheme()
  const disabled = !theme.mounted || props.isDisabled === false
  const buttonView = (
    <>
      <Button
        colorScheme='purple'
        size='sm'
        {...props}
        isDisabled={disabled}
        ref={ref}
      />
    </>
  )
  return <>{buttonView}</>
})
export default ThemeButtonView
