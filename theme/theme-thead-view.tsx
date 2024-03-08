import { TableHeadProps, Thead } from '@chakra-ui/react'
import { forwardRef } from 'react'

const ThemeTheadView = forwardRef<HTMLTableSectionElement, TableHeadProps>((props, ref) => {
  return <Thead {...props} ref={ref} bg='var(--chakra-colors-chakra-body-bg)' />
})
export default ThemeTheadView
