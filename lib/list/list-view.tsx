'use client'

import { List, Movie } from '@prisma/client'
import { ListProvider } from './list-context'
import CreateMovieFormView from '../movie/create-movie-form-view'
import MoviesTableView from '../movie/movies-table-view'
import { useState } from 'react'
import ButtonView from '../button/button-view'
import { MdClear } from 'react-icons/md'
import ThemeIconView from '../theme/theme-icon-view'

export default function ListsView (props: {
  movies: Movie[]
  row: List
}): JSX.Element {
  const [open, setOpen] = useState(false)
  function handleOpen (): void {
    setOpen(true)
  }
  function handleClose (): void {
    setOpen(false)
  }
  const formView = open && (
    <CreateMovieFormView />
  )
  const toggleView = open
    ? (
      <ButtonView
        color='danger'
        variant='light'
        onClick={handleClose}
        startContent={<ThemeIconView Icon={MdClear} />}
      >
        Close
      </ButtonView>
      )
    : (
      <ButtonView onClick={handleOpen}>
        Add Movie
      </ButtonView>
      )
  return (
    <ListProvider movies={props.movies} row={props.row}>
      <div className='text-3xl'>List</div>
      <div className='flex justify-between'>
        <div className='text-2xl text-gray'>{props.row.name}</div>
        {toggleView}
      </div>
      {formView}
      <MoviesTableView />
    </ListProvider>
  )
}
