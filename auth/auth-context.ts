'use client'

import { Session } from 'next-auth'
import contextCreator from 'context-creator'
import { ItemHide } from '@prisma/client'
import { useEffect, useState } from 'react'

const authContext = contextCreator({
  name: 'auth',
  useValue: (props: {
    itemHides?: ItemHide[]
    session: Session | null
  }) => {
    const [itemHides, setItemHides] = useState(props.itemHides ?? [])
    function hideItem (hideItemProps: {
      itemId: number
    }): void {
      if (props.session == null) {
        throw new Error('There is no session')
      }
      const newHide = {
        id: Math.random(),
        itemId: hideItemProps.itemId,
        userId: props.session.user.id
      }
      const newHides = [...itemHides, newHide]
      setItemHides(newHides)
    }
    function unhideItem (unhideItemProps: {
      itemId: number
    }): void {
      const newHides = itemHides.filter((hide) => hide.itemId !== unhideItemProps.itemId)
      setItemHides(newHides)
    }
    useEffect(() => {
      setItemHides(props.itemHides ?? [])
    }, [props.itemHides])
    const value = {
      hideItem,
      itemHides,
      session: props.session,
      unhideItem
    }
    return value
  }
})
export const {
  useContext: useAuthContext,
  Provider: AuthContextProvider
} = authContext
