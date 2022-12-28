import { FormContainer } from './styles'

export function NewCycleForm() {
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
