'use client'

import { ReactNode } from 'react'
import { useRequest } from './request-context'
import ButtonView from '../button/button-view'
import { useForm } from '../form/form-context'
import { useIsMounted } from 'usehooks-ts'
import { Skeleton } from '@nextui-org/react'

export default function SubmitRequestView (props: {
  children: ReactNode
}): JSX.Element {
  const form = useForm()
  const request = useRequest()
  const isMounted = useIsMounted()
  const mounted = isMounted()
  if (!mounted) {
    return (
      <Skeleton className='rounded-lg'>
        <ButtonView>
          {props.children}
        </ButtonView>
      </Skeleton>
    )
  }
  return (
    <ButtonView
      loading={request.loading}
      error={request.errorMessage}
      type='submit'
      onClick={() => {
        console.log('SubmitRequestView.onClick')
        form.handleSubmit()
      }}
    >
      {props.children}
    </ButtonView>
  )
}
