import { useContext } from 'react'
import { CycleFormContext } from '../context/CycleFormContext'

export function useCycleForm() {
  return useContext(CycleFormContext)
}
