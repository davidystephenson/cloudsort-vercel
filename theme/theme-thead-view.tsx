import { TableHeadProps, Thead } from '@chakra-ui/react'
import { forwardRef } from 'react'

const ThemeTheadView = forwardRef<HTMLTableSectionElement, TableHeadProps>((props, ref) => {
  return <Thead {...props} ref={ref} boxShadow='inset 0px 0px 0px 10000px var(--chakra-colors-chakra-body-bg)' zIndex='1 !important' />
})
export default ThemeTheadView
