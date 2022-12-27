import { Play } from 'phosphor-react'
import { useId } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import {
  Container,
  CountdownButton,
  CountdownContainer,
  Separator,
} from './styles'
import { newTaskFormValidatorSchema } from '../../schemas'

type IFormProps = z.infer<typeof newTaskFormValidatorSchema>

export function Home() {
  const inputWorkId = useId()
  const inputTimerId = useId()
  const formId = useId()
  const taskListId = useId()
  const { register, handleSubmit, watch } = useForm<IFormProps>({
    resolver: zodResolver(newTaskFormValidatorSchema),
    defaultValues: {
      task: '',
      time: 0,
    },
  })

  const isSubmitDisabled = !watch('task')

  const onSubmit: SubmitHandler<IFormProps> = (data) => {
    console.log(data)
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
        <span>0</span>
        <span>0</span>
        <Separator>:</Separator>
        <span>0</span>
        <span>0</span>
      </CountdownContainer>
      <CountdownButton type="submit" form={formId} disabled={isSubmitDisabled}>
        <Play size={24} />
        Começar
      </CountdownButton>
    </Container>
  )
}
