import guardOkTrue from '@/ok/guard-ok-true'
import post from '@/post/post'

export default async function postHideMovie (props: {
  label: string
  itemId: number
}): Promise<void> {
  const body = {
    itemId: props.itemId
  }
  await post({
    body,
    guard: guardOkTrue,
    label: props.label,
    url: '/api/movie/hide'
  })
}
