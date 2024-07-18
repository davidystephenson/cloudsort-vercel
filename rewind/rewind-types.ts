import { LastWhere } from '@/list/list-types'

export interface RewindRequest extends LastWhere {
  lastMergechoiceId: number
  episodeMergechoiceId: number
}
