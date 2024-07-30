import { Link, LinkProps } from '@chakra-ui/next-js'
import { usePathname } from 'next/navigation'
import { useTheme } from './theme-context'

export default function ThemeLinkView (props: LinkProps): JSX.Element {
  const theme = useTheme()
  const pathname = usePathname()
  const active = pathname === props.href
  const color = active ? theme.colorScheme : 'inherit'
  return (
    <Link {...props} color={color}>
      {props.children}
    </Link>
  )
}
