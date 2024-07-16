export const EPISODE_ITEM_RELATION = {
  include: {
    item: {
      include: {
        movie: true
      }
    }
  }
} as const

export const EPISODE_ITEM_DATA_RELATION = {
  include: {
    episodeItem: EPISODE_ITEM_RELATION
  }
} as const

export const REMOVE_RELATION = {
  remove: EPISODE_ITEM_DATA_RELATION
} as const

export const IMPORT_RELATION = {
  include: {
    episodeItems: EPISODE_ITEM_RELATION
  }
} as const

export const CHOICE_RELATION = {
  include: {
    aEpisodeItem: EPISODE_ITEM_RELATION,
    bEpisodeItem: EPISODE_ITEM_RELATION
  }
} as const

export const RANDOM_RELATION = {
  include: {
    firstEpisodeItem: EPISODE_ITEM_RELATION,
    secondEpisodeItem: EPISODE_ITEM_RELATION
  }
} as const

export const EPISODE_PARTS_RELATION = {
  archive: EPISODE_ITEM_DATA_RELATION,
  choice: CHOICE_RELATION,
  import: IMPORT_RELATION,
  random: RANDOM_RELATION,
  remove: EPISODE_ITEM_DATA_RELATION,
  reset: EPISODE_ITEM_DATA_RELATION,
  unarchive: EPISODE_ITEM_DATA_RELATION
} as const

export const EPISODE_RELATION = {
  include: EPISODE_PARTS_RELATION
} as const

export const EPISODES_RELATION = {
  include: {
    episodes: EPISODE_RELATION
  }
} as const
