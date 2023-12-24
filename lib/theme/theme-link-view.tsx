import { Link } from '@nextui-org/react'
import { usePathname } from 'next/navigation'
import { ComponentProps } from 'react'

export default function ThemeLinkView (props: ComponentProps<typeof Link>): JSX.Element {
  const pathname = usePathname()

  const active = pathname === props.href
  const color = active ? 'primary' : 'secondary'
  const underline = active ? 'always' : 'none'

  return (
    <Link
      href='/login'
      color={color}
      underline={underline}
      {...props}
    />
  )
}
