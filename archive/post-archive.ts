import { MovieEpisode } from '@/episode/episode-types'
import postEpisode from '@/episode/post-episode'
import { ArchiveRequest } from './archive-types'

export default async function postArchive (props: {
  body: ArchiveRequest
  label: string
}): Promise<MovieEpisode> {
  const episode = await postEpisode({
    request: props.body,
    label: props.label,
    url: '/api/movie/archive'
  })
  return episode
}
