import { Badge } from '@chakra-ui/react'

export default function RankView (props: {
  rank: number
}): JSX.Element {
  const view = <Badge size='xs'>{props.rank}</Badge>
  return view
}
