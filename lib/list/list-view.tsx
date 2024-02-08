'use client'

import { Movie } from '@prisma/client'
import { ListProvider } from './list-context'
import CreateMovieFormView from '../movie/create-movie-form-view'
import MoviesTableView from '../movie/movies-table-view'
import { useState } from 'react'
import ButtonView from '../button/button-view'
import { MdClear } from 'react-icons/md'
import CurtainView from '../curtain/curtain-view'
import { RelatedList } from './list-types'
import { State } from '../mergeChoice/merge-choice-types'
import ChooseView from '../choose/choose-view'
import { HStack, Heading } from '@chakra-ui/react'
import ImportMoviesView from '../movie/import-movies-view'

export default function ListView (props: {
  state: State<Movie>
  row: RelatedList
}): JSX.Element {
  const [open, setOpen] = useState(false)
  function handleOpen (): void {
    setOpen(true)
  }
  function handleClose (): void {
    setOpen(false)
  }
  const hider = (
    <ButtonView onClick={handleOpen}>
      Add Movie
    </ButtonView>
  )
  return (
    <ListProvider state={props.state} row={props.row}>
      <Heading size='lg'>List</Heading>
      <HStack justify='space-between'>
        <Heading size='md'>{props.row.name}</Heading>
        <CurtainView
          open={open}
          hider={hider}
        >
          <ButtonView
            color='danger'
            variant='light'
            onClick={handleClose}
            leftIcon={<MdClear />}
          >
            Close
          </ButtonView>
        </CurtainView>
        <ImportMoviesView />
      </HStack>
      <CurtainView open={open}>
        <CreateMovieFormView />
      </CurtainView>
      <ChooseView />
      <MoviesTableView />
    </ListProvider>
  )
}
