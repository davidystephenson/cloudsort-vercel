'use client'

import { HStack } from '@chakra-ui/react'
import FormFieldView from '../form/form-field-view'
import RequestFormView from '../request/request-form-view'
import SubmitRequestView from '../request/submit-request-view'
import { useHeading } from '../heading/heading-context'
import guardMovieData from './guard-movie-data'
import privateListContext from '@/list/private-list-context'
import ThemeIconButtonView from '@/theme/theme-icon-button-view'
import { MdClose } from 'react-icons/md'

export default function CreateMovieFormView (): JSX.Element {
  const heading = useHeading()
  const privateList = privateListContext.useContext()
  if (heading.selection !== 'create') {
    return <></>
  }
  async function send (props: { values: Record<string, string> }): Promise<void> {
    const fieldData = {
      ...props.values,
      seed: Number(props.values.seed),
      year: Number(props.values.year),
      seeding: true
    }
    const movieData = guardMovieData({ label: 'Create movie form data', value: fieldData })
    const movies = [movieData]
    await privateList.importMovies({ movies })
  }
  function handleClose (): void {
    heading.deselect()
  }
  return (
    <RequestFormView send={send}>
      <FormFieldView
        name='name'
        label='Name'
        isRequired
      />
      <FormFieldView
        name='imdbId'
        label='IMDB ID'
        isRequired
      />
      <FormFieldView
        name='review'
        label='Review'
      />
      <FormFieldView
        name='seed'
        label='Seed'
        isRequired
        type='number'
      />
      <FormFieldView
        name='url'
        label='URL'
      />
      <FormFieldView
        name='year'
        label='Year'
        isRequired
        type='number'
      />
      <HStack justifyContent='end' mt='2px'>

        <SubmitRequestView
          leftButton={
            <ThemeIconButtonView
              aria-label='Close'
              colorScheme='red'
              icon={<MdClose />}
              onClick={handleClose}
              variant='solid'
            />
          }
        >
          Create Movie
        </SubmitRequestView>
      </HStack>
    </RequestFormView>
  )
}
