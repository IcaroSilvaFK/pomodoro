import { useContext } from 'react'

import { CycleContext } from '../context/CycleContext'

export function useCycle() {
  return useContext(CycleContext)
}
