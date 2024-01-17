import { ExternalLinkIcon } from '@chakra-ui/icons'
import { Link, LinkProps } from '@chakra-ui/next-js'

export default function ThemeLinkView (props: LinkProps): JSX.Element {
  const iconView = props.isExternal === true && <ExternalLinkIcon mx='2px' />
  return (
    <>
      <Link fontWeight={700} {...props} />
      {iconView}
    </>
  )
}
