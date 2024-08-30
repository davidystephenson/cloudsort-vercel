import { useRef, useEffect, RefObject } from 'react'

export default function useTextSlim <Element extends HTMLElement> (props?: {
  debug?: boolean
}): RefObject<Element> {
  const ref = useRef<Element>(null)
  useEffect(() => {
    if (ref.current == null) {
      if (props?.debug === true) {
        console.debug('no ref')
      }
      return
    }
    const range = document.createRange()
    const text = ref.current.childNodes[0]
    range.setStartBefore(text)
    range.setEndAfter(text)
    const clientRect = range.getBoundingClientRect()
    const style = window.getComputedStyle(ref.current)
    const paddingLeft = Number(style.paddingLeft.replace('px', ''))
    const paddingRight = Number(style.paddingRight.replace('px', ''))
    const width = clientRect.width + paddingLeft + paddingRight
    if (props?.debug === true) {
      console.debug('paddingLeft', paddingLeft)
      console.debug('paddingRight', paddingRight)
      console.debug('width', width)
    }
    ref.current.style.width = `${width}px`
  }, [])
  return ref
}
