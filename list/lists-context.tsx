import { List } from '@prisma/client'
import { useEffect, useState } from 'react'
import postList from './post-list'
import filterList from './filter-list'
import useFilter from '../filter/use-filter'
import contextCreator from 'context-creator'
import deleteList from './delete-list'

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
    async function _delete (props: {
      listId: number
    }): Promise<void> {
      const body = { listId: props.listId }
      await deleteList({ body })
      setRows((rows) => {
        const newRows = rows.filter((row) => {
          const keep = row.id !== props.listId
          return keep
        })
        return newRows
      })
    }
    const value = {
      create,
      delete: _delete,
      filter,
      filtered,
      rows
    }
    return value
  }
})
