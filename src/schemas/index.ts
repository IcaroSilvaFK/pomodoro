import { z } from 'zod'

export const newTaskFormValidatorSchema = z.object({
  task: z.string().min(1, 'Informe a tarefa'),
  time: z.number().min(5).max(60),
})
