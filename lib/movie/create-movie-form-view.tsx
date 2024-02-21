'use client'

import { HStack } from '@chakra-ui/react'
import FormFieldView from '../form/form-field-view'
import { Fields } from '../form/form-types'
import guardFields from '../guard/guard-fields'
import { useList } from '../list/list-context'
import RequestFormView from '../request/request-form-view'
import SubmitRequestView from '../request/submit-request-view'
import { MOVIE_DATA_KEYS } from './movie-constants'
import { MovieData } from './movie-types'
import { useHeading } from '../heading/heading-context'

export default function CreateMovieFormView (): JSX.Element {
  const heading = useHeading()
  const list = useList()
  if (heading.selection !== 'create') {
    return <></>
  }
  async function send (fields: Fields): Promise<void> {
    const guarded = guardFields({
      fields,
      names: MOVIE_DATA_KEYS
    })
    const movieData: MovieData = {
      ...guarded,
      score: Number(guarded.score),
      year: Number(guarded.year)
    }
    await list.createMovie(movieData)
  }
  return (
    <RequestFormView send={send}>
      <FormFieldView
        name='name'
        label='Name'
        isRequired
      />
      <FormFieldView
        name='dateRated'
        label='Date Rated'
        type='date'
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
        name='score'
        label='Score'
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
        <SubmitRequestView>
          Create Movie
        </SubmitRequestView>
      </HStack>
    </RequestFormView>
  )
}
