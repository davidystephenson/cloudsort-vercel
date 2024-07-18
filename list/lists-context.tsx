import { List } from '@prisma/client'
import { useEffect, useState } from 'react'
import postList from './post-list'
import filterList from './filter-list'
import useFilter from '../filter/use-filter'
import contextCreator from 'context-creator'
import postDeleteList from './post-delete-list'

export const {
  useContext: useLists,
  useOptionalContext: useOptionalLists,
  Provider: ListsProvider
} = contextCreator({
  name: 'lists',
  useValue: (props: {
    rows: List[]
  }) => {
    const [rows, setRows] = useState(props.rows)
    useEffect(() => {
      setRows(props.rows)
    }, [props.rows])
    const filter = useFilter({
      rows,
      filter: filterList
    })
    async function create (props: {
      name: string
    }): Promise<List> {
      const body = { name: props.name }
      const row = await postList({ body, label: 'create' })
      setRows((rows) => {
        const newRows = [row, ...rows]
        return newRows
      })
      return row
    }
    async function _delete (props: {
      id: number
    }): Promise<void> {
      const body = { listId: props.id }
      await postDeleteList({ body, label: '_delete' })
      setRows((rows) => {
        const newRows = rows.filter((row) => {
          const keep = row.id !== props.id
          return keep
        })
        return newRows
      })
    }
    const value = {
      create,
      delete: _delete,
      filter: filter.sift,
      filtered: filter.filtered,
      rows
    }
    return value
  }
})
