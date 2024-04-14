import { IconButtonProps } from '@chakra-ui/react'

export type OptionallyLabeledIconButtonProps = {
  'aria-label'?: string
} & Omit<IconButtonProps, 'aria-label'>
