import { ExternalLinkIcon } from '@chakra-ui/icons'
import { Link, LinkProps } from '@chakra-ui/next-js'
import { usePathname } from 'next/navigation'

export default function ThemeLinkView (props: LinkProps): JSX.Element {
  const pathname = usePathname()
  const active = pathname === props.href
  const color = active ? 'purple' : 'inherit'
  const iconView = props.isExternal === true && <ExternalLinkIcon mx='2px' />
  return (
    <>
      <Link fontWeight={700} {...props} color={color} />
      {iconView}
    </>
  )
}
