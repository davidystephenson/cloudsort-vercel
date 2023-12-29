import { IconType } from 'react-icons'

export default function ThemeIconView (props: {
  Icon: IconType
}): JSX.Element {
  return (
    <props.Icon className='h-[55%] w-max' />
  )
}
