import { differenceInSeconds } from 'date-fns'

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from 'react'
import { ICycle } from '../pages/Home'

interface IContextProps {
  handleInterruptCycle: () => void
  handleFinishCycle: () => void
  cycles: ICycle[]
  setCycles: Dispatch<SetStateAction<ICycle[]>>
  setActiveCycleId: Dispatch<SetStateAction<string | null>>
  setSecondsPassed: Dispatch<SetStateAction<number>>
  activeCycleId: string | null
  secondsPassed: number
  activeCycle: ICycle | undefined
  minutesFormattedFromInterface: string
  secondsFormattedFromInterface: string
}

export const CycleContext = createContext<IContextProps>({} as IContextProps)

export function CycleContextProvider({ children }: { children: ReactNode }) {
  const [cycles, setCycles] = useState<ICycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [secondsPassed, setSecondsPassed] = useState(0)

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

  function handleInterruptCycle() {
    const updatedCycles = cycles.map((cycle) =>
      activeCycle?.id === cycle.id
        ? {
            ...cycle,
            interruptedDate: new Date(),
          }
        : cycle,
    )

    setCycles(updatedCycles)
    setActiveCycleId(null)
  }

  function handleFinishCycle() {
    const updatedCycles = cycles.map((cycle) =>
      activeCycle?.id === cycle.id
        ? {
            ...cycle,
            finishedDate: new Date(),
          }
        : cycle,
    )
    setCycles(updatedCycles)
    setActiveCycleId(null)
  }
  return (
    <CycleContext.Provider
      value={{
        handleInterruptCycle,
        handleFinishCycle,
        cycles,
        setCycles,
        setActiveCycleId,
        setSecondsPassed,
        activeCycleId,
        secondsPassed,
        activeCycle,
        minutesFormattedFromInterface,
        secondsFormattedFromInterface,
      }}
    >
      {children}
    </CycleContext.Provider>
  )
}
