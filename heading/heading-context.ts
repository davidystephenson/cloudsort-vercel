import contextCreator from 'context-creator'
import { useState } from 'react'

export const {
  Provider: HeadingProvider,
  useContext: useHeading
} = contextCreator({
  name: 'heading',
  useValue: (props: {
    content?: JSX.Element
    label: string
  }) => {
    const [selection, setSelection] = useState<string>()
    function deselect (): void {
      setSelection(undefined)
    }
    function select (props: { selection: string }): void {
      setSelection(props.selection)
    }
    return {
      deselect,
      label: props.label,
      select,
      selection,
      content: props.content
    }
  }
})
