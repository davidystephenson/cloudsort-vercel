import { Row } from '@/cell/cell-types'
import { EpisodeChoice } from '@/mergechoice/mergeChoiceTypes'
import MovieLabelCellsView from '@/movie/movie-label-cells-view'
import { ListMovie } from '@/movie/movie-types'
import ThemeTdView from '@/theme/theme-td-view'
import { CheckIcon, SmallCloseIcon } from '@chakra-ui/icons'
import { HStack, Text } from '@chakra-ui/react'

export default function ChoiceEpisodeMovieCellsView (props: {
  input: EpisodeChoice<ListMovie>
  row: Row<'episodeMovie'>
}): JSX.Element {
  const a = props.input.aId === props.row.cells.movie.id
  const better = a ? props.input.aBetter : !props.input.aBetter
  const icon = better ? <CheckIcon /> : <SmallCloseIcon />
  const betterProps = better ? { fontWeight: 'bold' } : {}
  const aSeedBetter = (
    props.input.aItem.seed !== undefined &&
    props.input.bItem.seed !== undefined &&
    props.input.aItem.seed > props.input.bItem.seed
  )
  const upset = a ? better !== aSeedBetter : better === aSeedBetter
  const upsetItem = upset && better
  const upsetStyles = upsetItem ? { fontWeight: 'bold' } : {}
  const view = (
    <>
      <MovieLabelCellsView
        seedProps={upsetStyles}
      />
      <ThemeTdView>
        <HStack>
          <Text {...betterProps}>{props.row.cells.movie.points}</Text>
          {icon}
        </HStack>
      </ThemeTdView>
    </>
  )
  return view
}
