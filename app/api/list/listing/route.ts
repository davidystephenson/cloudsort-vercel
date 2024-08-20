import serverAuth from '@/auth/server-auth'
import { handleRequest } from '@/handle/handle-request'
import { HandledResponse } from '@/handle/handle-types'
import guardAccessibleList from '@/list/guard-accessible-list'
import guardListWhere from '@/list/guard-list-where'
import guardListing from '@/listing/guard-listing'
import { ListingPayload } from '@/listing/listing-types'

export async function POST (request: Request): HandledResponse<ListingPayload> {
  const response = await handleRequest({
    guard: guardListWhere,
    label: '/list/delete',
    handle: async (props) => {
      const authSession = await serverAuth()
      await guardAccessibleList({
        currentUserId: authSession?.user.id,
        db: props.db,
        listId: props.request.listId
      })
      const listing = await guardListing({
        db: props.db,
        listId: props.request.listId
      })
      return { listing }
    },
    request
  })
  return response
}
