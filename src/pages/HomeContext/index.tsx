import { HandPalm, Play } from 'phosphor-react'

import { Container, CountdownButton } from './styles'
import { Countdown } from '../../components/Countdown'
import { NewCycleForm } from '../../components/NewCycleForm'
import { useCycle } from '../../hooks/useCycle'
import { useCycleForm } from '../../hooks/useCycleForm'

export interface ICycle {
  id: string
  task: string
  time: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

export function Home() {
  const { activeCycle, handleInterruptCycle } = useCycle()
  const { watch, formId } = useCycleForm()
  const isSubmitDisabled = !watch('task')

  return (
    <Container>
      <NewCycleForm />
      <Countdown />

      {!activeCycle ? (
        <CountdownButton
          type="submit"
          form={formId}
          disabled={isSubmitDisabled}
        >
          <Play size={24} />
          Começar
        </CountdownButton>
      ) : (
        <CountdownButton
          type="button"
          onClick={handleInterruptCycle}
          inCountdown
          form={formId}
        >
          <HandPalm size={24} />
          Interromper
        </CountdownButton>
      )}
    </Container>
  )
}
