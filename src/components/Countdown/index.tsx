import { CountdownContainer, Separator } from './styles'

interface ICountdownProps {
  minute: string
  second: string
}

export function Countdown(props: ICountdownProps) {
  const { minute, second } = props

  return (
    <CountdownContainer>
      <span>{minute[0]}</span>
      <span>{minute[1]}</span>
      <Separator>:</Separator>
      <span>{second[0]}</span>
      <span>{second[1]}</span>
    </CountdownContainer>
  )
}
