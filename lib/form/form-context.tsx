import { createContext, useContext, useState, createRef, ReactNode, useCallback } from 'react'
import { Field, FormContextValue } from './form-types'

const formContext = createContext<FormContextValue | undefined>(undefined)

export function useForm (): FormContextValue {
  const value = useContext(formContext)
  if (value == null) {
    throw new Error('useFormContext must be used within a FormProvider')
  }
  return value
}

export function FormProvider (props: {
  children: ReactNode
}): JSX.Element {
  const [fields, setFields] = useState<Record<string, Field>>({})

  const register = useCallback((props: {
    name: string
  }) => {
    const field: Field = {
      name: props.name,
      ref: createRef<HTMLInputElement>(),
      value: '',
      error: ''
    }
    setFields((fields) => {
      return {
        ...fields,
        [props.name]: field
      }
    })
  }, [])

  const deregister = useCallback((props: {
    name: string
  }) => {
    setFields((fields) => {
      const { [props.name]: deregistered, ...next } = fields
      return next
    })
  }, [])

  function handleChange (): void {
    setFields((current) => {
      const next = { ...current }
      for (const name in next) {
        console.log('name', name)
        const field = next[name]
        if (field.ref.current != null) {
          console.log('field.ref.current.value', field.ref.current.value)
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
        if (field.ref.current != null) {
          field.error = field.ref.current.validationMessage
        }
      }
      return next
    })
  }

  const value: FormContextValue = {
    deregister,
    fields,
    handleChange,
    handleSubmit,
    register
  }

  return (
    <formContext.Provider value={value}>
      {props.children}
    </formContext.Provider>
  )
}
