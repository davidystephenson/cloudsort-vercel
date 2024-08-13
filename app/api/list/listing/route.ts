import serverAuth from '@/auth/server-auth'
import { handleBody } from '@/handle/handle-body'
import { HandledResponse } from '@/handle/handle-types'
import guardAccessibleList from '@/list/guard-accessible-list'
import guardListWhere from '@/list/guard-list-where'
import guardListing from '@/listing/guard-listing'
import { ListingPayload } from '@/listing/listing-types'

export async function POST (request: Request): HandledResponse<ListingPayload> {
  const response = await handleBody({
    guard: guardListWhere,
    label: '/list/delete',
    handle: async (props) => {
      const authSession = await serverAuth()
      await guardAccessibleList({
        currentUserId: authSession?.user.id,
        db: props.db,
        listId: props.body.listId
      })
      const listing = await guardListing({
        db: props.db,
        listId: props.body.listId
      })
      return { listing }
    },
    request
  })
  return response
}
