import { useCycle } from '../../hooks/useCycle'
import { CountdownContainer, Separator } from './styles'

export function Countdown() {
  const { minutesFormattedFromInterface, secondsFormattedFromInterface } =
    useCycle()

  return (
    <CountdownContainer>
      <span>{minutesFormattedFromInterface[0]}</span>
      <span>{minutesFormattedFromInterface[1]}</span>
      <Separator>:</Separator>
      <span>{secondsFormattedFromInterface[0]}</span>
      <span>{secondsFormattedFromInterface[1]}</span>
    </CountdownContainer>
  )
}
