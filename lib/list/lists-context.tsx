import { List, Movie } from '@prisma/client'
import { ListsContextValue } from './list-types'
import { contextCreator } from '../context-creator/context-creator'
import { useEffect, useState } from 'react'
import postList from './post-list'
import filterList from './filter-list'
import useFilter from '../filter/use-filter'

function useValue (props: {
  rows: List[]
}): ListsContextValue {
  const [rows, setRows] = useState(props.rows)
  useEffect(() => {
    setRows(props.rows)
  }, [props.rows])
  const { filtered, filter } = useFilter({ rows, filter: filterList })
  async function create (props: {
    name: string
  }): Promise<List> {
    const row = await postList({ name: props.name })
    setRows((rows) => {
      const newRows = [row, ...rows]
      return newRows
    })
    return row
  }
  function createMovie (props: {
    listId: number
    movie: Movie
  }): void {
    setRows((rows) => {
      const newRows = rows.map((row) => {
        if (row.id !== props.listId) {
          return row
        }
        const newRow: List = {
          ...row,
          itemIds: [...row.itemIds, props.movie.id]
        }
        return newRow
      })
      return newRows
    })
  }
  function _delete (props: {
    id: number
  }): void {
    setRows((rows) => {
      const newRows = rows.filter((row) => {
        const keep = row.id !== props.id
        return keep
      })
      return newRows
    })
  }
  const value: ListsContextValue = {
    create,
    createMovie,
    delete: _delete,
    filter,
    filtered,
    rows
  }
  return value
}

export const {
  useCreatedContext: useLists,
  CreatedProvider: ListsProvider,
  useCreatedContextUnsafe: useListsUnsafe
} = contextCreator({ name: 'lists', useValue })
