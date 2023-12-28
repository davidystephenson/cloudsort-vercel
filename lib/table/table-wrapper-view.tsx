import { cn } from '@nextui-org/react'
import { ReactNode } from 'react'

export default function TableWrapperView (props: {
  children: ReactNode
}): JSX.Element {
  const className = cn(
    'mt-4',
    'pl-4',
    'pr-4',
    'pb-4',
    'z-0',
    'flex',
    'flex-col',
    'relative',
    'justify-between',
    'gap-4',
    'bg-content1',
    'overflow-auto',
    'rounded-large',
    'shadow-small',
    'w-full',
    'h-full'
  )
  return (
    <div className={className}>
      {props.children}
    </div>
  )
}
