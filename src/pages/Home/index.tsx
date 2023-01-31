import { HandPalm, Play } from 'phosphor-react'
import { useEffect, useId } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { nanoid } from 'nanoid'
import { differenceInSeconds } from 'date-fns'

import { useCycle } from '../../hooks/useCycle'

import { newTaskFormValidatorSchema } from '../../schemas'
import { Countdown } from '../../components/Countdown'

import { Container, CountdownButton } from './styles'

type IFormProps = z.infer<typeof newTaskFormValidatorSchema>
export interface ICycle {
  id: string
  task: string
  time: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

export function Home() {
  const {
    activeCycle,

    handleFinishCycle,
    handleInterruptCycle,
    minutesFormattedFromInterface,
    secondsFormattedFromInterface,
    secondsPassed,
    setActiveCycleId,
    setSecondsPassed,
    createCycle,
  } = useCycle()
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

  const isSubmitDisabled = !watch('task')

  const totalSeconds = activeCycle ? activeCycle.time * 60 : 0

  useEffect(() => {
    if (!activeCycle) return

    const interval = setInterval(() => {
      const differenceSeconds = differenceInSeconds(
        new Date(),
        activeCycle.startDate,
      )

      if (differenceSeconds >= totalSeconds) {
        handleFinishCycle()
        setSecondsPassed(totalSeconds)
        clearInterval(interval)
      }
      if (differenceSeconds < totalSeconds) {
        setSecondsPassed(differenceInSeconds(new Date(), activeCycle.startDate))
      }
    }, 1000)

    return () => {
      clearInterval(interval)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [secondsPassed, activeCycle, totalSeconds])

  useEffect(() => {
    if (!activeCycle) return

    document.title = `${minutesFormattedFromInterface}:${secondsFormattedFromInterface}`
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [minutesFormattedFromInterface, secondsFormattedFromInterface])

  async function onSubmit({ task, time }: IFormProps) {
    const id = nanoid()

    const newCycle: ICycle = {
      id,
      task,
      time,
      startDate: new Date(),
    }
    createCycle(newCycle)
    setActiveCycleId(id)
    setSecondsPassed(0)
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
          disabled={!!activeCycle}
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
          min={1}
          step={5}
          disabled={!!activeCycle}
          {...register('time', { valueAsNumber: true })}
        />
        <span>minutos.</span>
      </form>
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
