import policeCritickerRowArray from '@/criticker/policeCritickerRowArray'
import privateListContext from '@/list/private-list-context'
import { CritickerRow } from '@/movie/movie-types'
import parseCritickerMovies from '@/movies/parse-criticker-movies'
import { Icon, MenuItem, Spinner } from '@chakra-ui/react'
import Papa from 'papaparse'
import { ChangeEvent, useRef } from 'react'
import { BsCloudUpload } from 'react-icons/bs'

export default function ImportMenuItemView (): JSX.Element {
  const privateList = privateListContext.useContext()
  const inputRef = useRef<HTMLInputElement>(null)
  function handleError (props: {
    error: unknown
  }): void {
    if (!(props.error instanceof Error)) {
      throw props.error
    }
    console.error(props.error)
    privateList.importAction.fail({
      error: props.error,
      message: props.error.message
    })
  }
  async function parseCriticker (props: {
    data: CritickerRow[]
  }): Promise<void> {
    try {
      const movies = parseCritickerMovies({ rows: props.data })
      await privateList.importMovies({
        movies,
        slice: 10
      })
      privateList.importAction.succeed()
    } catch (error) {
      handleError({ error })
    }
  }
  function handleFileChange (e: ChangeEvent<HTMLInputElement>): void {
    const file = e.target.files?.[0]
    if (file == null) {
      throw new Error('There is no file.')
    }
    privateList.importAction.start()
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: ({ data }) => {
        try {
          const critickerRows = policeCritickerRowArray({
            label: 'ImportMenuItemView',
            value: data
          })
          void parseCriticker({ data: critickerRows })
        } catch (error) {
          handleError({ error })
        }
      }
    })
    if (inputRef.current == null) {
      throw new Error('There is no inputRef.')
    }
    inputRef.current.value = ''
  }
  function handleClick (): void {
    inputRef.current?.click()
  }
  const randoming = privateList.state.choice?.random === true && !privateList.state.complete
  const disabled = randoming || !privateList.synced
  const icon = privateList.importAction.active
    ? <Icon as={Spinner} />
    : <BsCloudUpload />
  return (
    <>
      <MenuItem
        icon={icon}
        isDisabled={disabled}
        onClick={handleClick}
      >
        Import
      </MenuItem>
      <input
        hidden
        type='file'
        ref={inputRef}
        onChange={handleFileChange}
      />
    </>
  )
}
