import { Play } from 'phosphor-react'
import { useEffect, useId, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { nanoid } from 'nanoid'
import { differenceInSeconds } from 'date-fns'

import {
  Container,
  CountdownButton,
  CountdownContainer,
  Separator,
} from './styles'
import { newTaskFormValidatorSchema } from '../../schemas'

type IFormProps = z.infer<typeof newTaskFormValidatorSchema>
interface ICycle {
  id: string
  task: string
  time: number
  startDate: Date
}

export function Home() {
  const inputWorkId = useId()
  const inputTimerId = useId()
  const formId = useId()
  const taskListId = useId()
  const { register, handleSubmit, watch, reset } = useForm<IFormProps>({
    resolver: zodResolver(newTaskFormValidatorSchema),
    defaultValues: {
      task: '',
      time: 0,
    },
  })
  const [cycles, setCycles] = useState<ICycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [secondsPassed, setSecondsPassed] = useState(0)

  const isSubmitDisabled = !watch('task')

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)
  const totalSeconds = activeCycle ? activeCycle.time * 60 : 0
  const currentSeconds = activeCycle ? totalSeconds - secondsPassed : 0

  const minutes = Math.floor(currentSeconds / 60)
  const seconds = currentSeconds % 60
  const minutesFormattedFromInterface = String(minutes).padStart(2, '0')
  const secondsFormattedFromInterface = String(seconds).padStart(2, '0')

  useEffect(() => {
    if (!activeCycle) return

    const interval = setInterval(() => {
      setSecondsPassed(differenceInSeconds(new Date(), activeCycle.startDate))
    }, 1000)

    return () => {
      clearInterval(interval)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [secondsPassed, activeCycle])

  async function onSubmit({ task, time }: IFormProps) {
    const id = nanoid()

    const newCycle: ICycle = {
      id,
      task,
      time,
      startDate: new Date(),
    }
    setCycles((prev) => [...prev, newCycle])
    setActiveCycleId(id)
    reset()
  }

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)} id={formId}>
        <label htmlFor={inputWorkId}>Vou trabalhar em</label>
        <input
          type="text"
          id={inputWorkId}
          list={taskListId}
          placeholder="Dê um nome para o seu projeto"
          {...register('task')}
        />
        <datalist id={taskListId}>
          <option value="cacascs" />
        </datalist>
        <label htmlFor={inputTimerId}>durante</label>
        <input
          type="number"
          id={inputTimerId}
          placeholder="- 00 +"
          max={60}
          min={5}
          step={5}
          {...register('time', { valueAsNumber: true })}
        />
        <span>minutos.</span>
      </form>
      <CountdownContainer>
        <span>{minutesFormattedFromInterface[0]}</span>
        <span>{minutesFormattedFromInterface[1]}</span>
        <Separator>:</Separator>
        <span>{secondsFormattedFromInterface[0]}</span>
        <span>{secondsFormattedFromInterface[1]}</span>
      </CountdownContainer>
      <CountdownButton type="submit" form={formId} disabled={isSubmitDisabled}>
        <Play size={24} />
        Começar
      </CountdownButton>
    </Container>
  )
}
