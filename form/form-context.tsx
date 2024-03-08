import { useState, createRef, useCallback } from 'react'
import { Field } from './form-types'
import contextCreator from 'context-creator'

export const {
  useContext: useForm,
  Provider: FormProvider
} = contextCreator({
  name: 'form',
  useValue: () => {
    const [fields, setFields] = useState<Record<string, Field>>()

    const deregister = useCallback((props: {
      name: string
    }) => {
      setFields((fields) => {
        if (fields == null) {
          throw new Error('There are no fields')
        }

        const { [props.name]: deregistered, ...next } = fields
        return next
      })
    }, [])

    function handleChange (): void {
      setFields((current) => {
        const next = { ...current }
        for (const name in next) {
          const field = next[name]
          if (field.ref.current != null) {
            field.value = field.ref.current.value
          }
        }
        return next
      })
    }

    function handleSubmit (): void {
      setFields((current) => {
        const next = { ...current }
        for (const name in next) {
          const field = next[name]
          if (
            field.ref.current?.validationMessage != null &&
            field.ref.current.validationMessage !== ''
          ) {
            field.error = field.ref.current.validationMessage
          }
        }
        return next
      })
    }

    const register = useCallback((props: {
      name: string
      value?: string
    }) => {
      const field: Field = {
        name: props.name,
        ref: createRef<HTMLInputElement>(),
        value: props.value ?? ''
      }
      setFields((fields) => {
        return {
          ...fields,
          [props.name]: field
        }
      })
    }, [])

    const value = {
      deregister,
      fields,
      handleChange,
      handleSubmit,
      register
    }
    return value
  }
})
