import { ChangeEvent, useRef } from 'react'
import { HStack, Icon, Text } from '@chakra-ui/react'
import { useHotkeys } from 'react-hotkeys-hook'
import { BsCloudUpload } from 'react-icons/bs'
import { useList } from '../list/list-context'
import Papa from 'papaparse'
import parseCritickerMovies from '../movies/parse-criticker-movies'
import { CritickerRow } from './movie-types'
import { useAction } from '../action/action-context'
import ButtonView from '../button/button-view'
import { AxiosError } from 'axios'

export default function ImportMoviesConsumer (): JSX.Element {
  const action = useAction()
  const list = useList()
  const inputRef = useRef<HTMLInputElement>(null)
  useHotkeys('i', () => {
    inputRef.current?.click()
  })
  async function parseCriticker (props: {
    data: CritickerRow[]
  }): Promise<void> {
    try {
      const movies = parseCritickerMovies({ rows: props.data })
      await list.createMovies({ movies, slice: 1 })
      action.succeed()
    } catch (error) {
      if (error instanceof AxiosError) {
        action.fail({ error, message: error.response?.data?.error })
      }
      throw error
    }
  }

  function handleFileChange (e: ChangeEvent<HTMLInputElement>): void {
    const file = e.target.files?.[0]
    if (file == null) {
      throw new Error('There is no file.')
    }
    action.start()
    Papa.parse<CritickerRow>(file, {
      header: true,
      skipEmptyLines: true,
      complete: ({ data }) => {
        void parseCriticker({ data })
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
  return (
    <>
      <ButtonView
        loading={action.loading}
        errorMessage={action.errorMessage}
        onClick={handleClick}
        fontSize='sm'
        variant='solid'
      >
        <HStack>
          <Text>[i]mport</Text>
          <Icon as={BsCloudUpload} />
        </HStack>
      </ButtonView>
      <input
        hidden
        type='file'
        ref={inputRef}
        onChange={handleFileChange}
      />
    </>
  )
}
