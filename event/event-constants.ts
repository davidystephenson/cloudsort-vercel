export const EVENT_ITEM_RELATION = {
  include: {
    item: {
      include: {
        movie: true
      }
    }
  }
} as const

export const EVENT_ITEM_DATA_RELATION = {
  include: {
    eventItem: EVENT_ITEM_RELATION
  }
} as const

export const IMPORT_RELATION = {
  include: {
    eventItems: EVENT_ITEM_RELATION
  }
} as const

export const CHOICE_RELATION = {
  include: {
    aEventItem: EVENT_ITEM_RELATION,
    bEventItem: EVENT_ITEM_RELATION
  }
} as const

export const RANDOM_RELATION = {
  include: {
    firstEventItem: EVENT_ITEM_RELATION,
    secondEventItem: EVENT_ITEM_RELATION
  }
} as const

export const EVENT_RELATION = {
  include: {
    archive: EVENT_ITEM_DATA_RELATION,
    choice: CHOICE_RELATION,
    import: IMPORT_RELATION,
    random: RANDOM_RELATION,
    remove: EVENT_ITEM_DATA_RELATION,
    reset: EVENT_ITEM_DATA_RELATION,
    unarchive: EVENT_ITEM_DATA_RELATION
  }
} as const

export const EVENTS_RELATION = {
  include: {
    events: EVENT_RELATION
  }
} as const
