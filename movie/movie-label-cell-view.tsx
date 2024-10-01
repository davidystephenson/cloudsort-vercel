import ThemeTdView from '@/theme/theme-td-view'
import { HStack, LinkProps } from '@chakra-ui/react'
import { ReactNode } from 'react'
import MovieLabelLinkView from './movie-label-link-view'

export default function MovieLabelCellView (props: {
  children?: ReactNode
  linkProps?: LinkProps
}): JSX.Element {
  return (
    <ThemeTdView w='100%'>
      <HStack>
        {props.children}
        <MovieLabelLinkView linkProps={props.linkProps} />
      </HStack>
    </ThemeTdView>
  )
}
