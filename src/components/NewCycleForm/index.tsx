import { nanoid } from 'nanoid'
import { useId } from 'react'

import { z } from 'zod'
import { useCycle } from '../../hooks/useCycle'
import { useCycleForm } from '../../hooks/useCycleForm'

import { ICycle } from '../../pages/Home'
import { newTaskFormValidatorSchema } from '../../schemas'
import { FormContainer } from './styles'

type IFormProps = z.infer<typeof newTaskFormValidatorSchema>

export interface INewCycleFormRef {
  isSubmitDisabled: boolean
  formId: string
}

export function NewCycleForm() {
  const inputWorkId = useId()
  const inputTimerId = useId()

  const taskListId = useId()
  const { setCycles, setActiveCycleId, setSecondsPassed, activeCycle } =
    useCycle()
  const { handleSubmit, register, reset, formId } = useCycleForm()

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
    setSecondsPassed(0)
    reset()
  }

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)} id={formId}>
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
    </FormContainer>
  )
}

NewCycleForm.displayName = 'New Cycle Form'
