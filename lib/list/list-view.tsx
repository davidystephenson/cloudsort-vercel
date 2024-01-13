'use client'

import { Movie } from '@prisma/client'
import { ListProvider } from './list-context'
import CreateMovieFormView from '../movie/create-movie-form-view'
import MoviesTableView from '../movie/movies-table-view'
import { useState } from 'react'
import ButtonView from '../button/button-view'
import { MdClear } from 'react-icons/md'
import ThemeIconView from '../theme/theme-icon-view'
import CurtainView from '../curtain/curtain-view'
import { RelatedList } from './list-types'
import { State } from '../mergeChoice/merge-choice-types'
import ChooseView from '../choose/choose-view'

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
  const startContent = <ThemeIconView Icon={MdClear} />
  return (
    <ListProvider state={props.state} row={props.row}>
      <div className='text-3xl'>List</div>
      <div className='flex justify-between'>
        <div className='text-2xl text-gray'>{props.row.name}</div>
        <CurtainView
          open={open}
          hider={hider}
        >
          <ButtonView
            color='danger'
            variant='light'
            onClick={handleClose}
            startContent={startContent}
          >
            Close
          </ButtonView>
        </CurtainView>
      </div>
      <CurtainView open={open}>
        <CreateMovieFormView />
      </CurtainView>
      <ChooseView />
      <MoviesTableView />
    </ListProvider>
  )
}
