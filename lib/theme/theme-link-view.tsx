import { Link } from '@nextui-org/react'
import { usePathname } from 'next/navigation'
import { ComponentProps } from 'react'

export default function ThemeLinkView (props: ComponentProps<typeof Link>): JSX.Element {
  const pathname = usePathname()

  const active = pathname === props.href
  const underline = active ? 'always' : 'none'

  return (
    <Link href='/login' underline={underline} {...props} />
  )
}
