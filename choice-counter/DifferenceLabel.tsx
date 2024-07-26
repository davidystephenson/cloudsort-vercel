import privateListContext from '@/list/private-list-context'
import comparePercent from '@/movies/comparePercent'

export default function DifferenceLabelView (): JSX.Element {
  const privateList = privateListContext.useContext()
  if (privateList.state.choice?.random === true) {
    return <></>
  }
  if (privateList.range.maximum === privateList.range.minimum) {
    return <></>
  }
  const difference = privateList.range.maximum - privateList.range.minimum
  const minimumComparison = comparePercent({
    maximum: privateList.range.maximum,
    minimum: privateList.range.minimum,
    target: privateList.range.minimum
  })
  const maximumComparison = comparePercent({
    maximum: privateList.range.maximum,
    minimum: privateList.range.minimum,
    target: privateList.range.maximum
  })
  return (
    <span>({difference}, {minimumComparison}%, {maximumComparison}%)</span>
  )
}
