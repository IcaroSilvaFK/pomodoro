import { Play } from 'phosphor-react'
import { useId } from 'react'

import {
  Container,
  CountdownButton,
  CountdownContainer,
  Separator,
} from './styles'

export function Home() {
  const inputWorkId = useId()
  const inputTimerId = useId()
  const formId = useId()

  return (
    <Container>
      <form action="" id={formId}>
        <label htmlFor={inputWorkId}>Vou trabalhar em</label>
        <input
          type="text"
          id={inputWorkId}
          placeholder="Dê um nome para o seu projeto"
        />
        <label htmlFor={inputTimerId}>durante</label>
        <input type="number" id={inputTimerId} placeholder="- 00 +" />
        <span>minutos.</span>
      </form>
      <CountdownContainer>
        <span>0</span>
        <span>0</span>
        <Separator>:</Separator>
        <span>0</span>
        <span>0</span>
      </CountdownContainer>
      <CountdownButton type="submit" form={formId}>
        <Play size={24} />
        Começar
      </CountdownButton>
    </Container>
  )
}
