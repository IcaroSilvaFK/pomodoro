import { zodResolver } from '@hookform/resolvers/zod'
import { createContext, ReactNode, useId } from 'react'
import {
  useForm,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormReset,
  UseFormWatch,
} from 'react-hook-form'
import { z } from 'zod'
import { newTaskFormValidatorSchema } from '../schemas'

type IFormProps = z.infer<typeof newTaskFormValidatorSchema>

interface ICycleFormProps {
  register: UseFormRegister<IFormProps>
  handleSubmit: UseFormHandleSubmit<IFormProps>
  watch: UseFormWatch<IFormProps>
  reset: UseFormReset<IFormProps>
  formId: string
}

export const CycleFormContext = createContext<ICycleFormProps>(
  {} as ICycleFormProps,
)

export function CycleFormContextProvider({
  children,
}: {
  children: ReactNode
}) {
  const formId = useId()

  const { register, handleSubmit, watch, reset } = useForm<IFormProps>({
    resolver: zodResolver(newTaskFormValidatorSchema),
    defaultValues: {
      task: '',
      time: 0,
    },
  })

  return (
    <CycleFormContext.Provider
      value={{ register, handleSubmit, watch, reset, formId }}
    >
      {children}
    </CycleFormContext.Provider>
  )
}
