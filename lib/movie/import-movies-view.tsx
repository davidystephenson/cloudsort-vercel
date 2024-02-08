import { ChangeEvent, useRef, useState } from 'react'
import { Button, HStack, Icon, Text } from '@chakra-ui/react'
import Papa from 'papaparse'
import { useHotkeys } from 'react-hotkeys-hook'
import { BsCloudUpload } from 'react-icons/bs'
import { useList } from '../list/list-context'
import { CritickerRow, MovieData } from './movie-types'

export default function ImportMoviesView (): JSX.Element {
  const list = useList()
  const [initializing, setInitializing] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  useHotkeys('i', () => {
    inputRef.current?.click()
  })
  async function parseCriticker ({
    data
  }: {
    data: CritickerRow[]
  }): Promise<void> {
    const movies: MovieData[] = data.map((row: CritickerRow) => {
      const score = Number(row.Score)
      const year = Number(row[' Year'])
      const movie: MovieData = {
        imdbId: row[' IMDB ID'],
        review: row[' Mini Review'],
        score,
        name: row[' Film Name'],
        year,
        url: row[' URL']
      }
      return movie
    })
    await list.createMovies({ movies, slice: 100 })
    setInitializing(false)
  }
  function handleFileChange (e: ChangeEvent<HTMLInputElement>): void {
    const file = e.target.files?.[0]
    if (file == null) {
      throw new Error('There is no file.')
    }
    setInitializing(true)
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
      <Button
        isLoading={initializing}
        onClick={handleClick}
        fontSize='sm'
        size='xs'
        variant='solid'
      >
        <HStack>
          <Text>[i]mport</Text>
          <Icon as={BsCloudUpload} />
        </HStack>
      </Button>
      <input
        hidden
        type='file'
        ref={inputRef}
        onChange={handleFileChange}
      />
    </>
  )
}
