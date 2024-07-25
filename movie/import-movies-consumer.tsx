import { ChangeEvent, useRef } from 'react'
import { HStack, Icon, Text } from '@chakra-ui/react'
import { useHotkeys } from 'react-hotkeys-hook'
import { BsCloudUpload } from 'react-icons/bs'
import privateListContext from '../list/private-list-context'
import Papa from 'papaparse'
import parseCritickerMovies from '../movies/parse-criticker-movies'
import { CritickerRow } from './movie-types'
import { useAction } from '../action/action-context'
import ButtonView from '../button/button-view'

export default function ImportMoviesConsumer (): JSX.Element {
  const action = useAction()
  const privateList = privateListContext.useContext()
  const inputRef = useRef<HTMLInputElement>(null)
  useHotkeys('i', () => {
    inputRef.current?.click()
  })
  async function parseCriticker (props: {
    data: CritickerRow[]
  }): Promise<void> {
    try {
      const movies = parseCritickerMovies({ rows: props.data })
      await privateList.importMovies({
        movies
      })
      action.succeed()
      privateList.importingFlag.lower()
    } catch (error) {
      if (error instanceof Error) {
        action.fail({ error, message: error.message })
      }
      privateList.importingFlag.lower()
      throw error
    }
  }
  function handleFileChange (e: ChangeEvent<HTMLInputElement>): void {
    const file = e.target.files?.[0]
    if (file == null) {
      throw new Error('There is no file.')
    }
    action.start()
    privateList.importingFlag.raise()
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
  const randoming = privateList.state.choice?.random === true && !privateList.state.complete
  const disabled = (
    randoming ||
    !privateList.synced
  )
  return (
    <>
      <ButtonView
        loading={action.loading}
        isDisabled={disabled}
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
