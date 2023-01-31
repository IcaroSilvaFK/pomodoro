import { differenceInSeconds } from 'date-fns'

import { createContext, ReactNode, useEffect, useReducer } from 'react'
import { ICycle } from '../pages/Home'
import { reducer, CYCLE_REDUCER_STATE } from '../reducers/cycleReducer'

interface IContextProps {
  handleInterruptCycle: () => void
  handleFinishCycle: () => void
  cycles: ICycle[]
  setActiveCycleId: (id: string) => void
  activeCycleId: string | null
  secondsPassed: number
  activeCycle: ICycle | undefined
  minutesFormattedFromInterface: string
  secondsFormattedFromInterface: string
  createCycle(data: ICycle): void
  setSecondsPassed(seconds: number): void
}

export const CycleContext = createContext<IContextProps>({} as IContextProps)

const initialState = {
  cycles: [],
  activeCycleId: null,
  secondsPassed: 0,
}

export function CycleContextProvider({ children }: { children: ReactNode }) {
  // const [cycles, setCycles] = useState<ICycle[]>([])
  // const [activeCycleId] = useState<string | null>(null)
  // const [secondsPassed, setSecondsPassed] = useState(0)

  const [{ cycles, activeCycleId, secondsPassed }, dispatch] = useReducer(
    reducer,
    initialState,
  )

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
    dispatch({
      type: CYCLE_REDUCER_STATE.INTERRUPT_CYCLE,
    })
  }

  function handleFinishCycle() {
    dispatch({
      type: CYCLE_REDUCER_STATE.FINISH_CYCLE,
    })
  }

  function createCycle(data: ICycle) {
    dispatch({
      type: CYCLE_REDUCER_STATE.CREATE_NEW_CYCLE,
      payload: data,
    })
  }

  function setActiveCycleId(id: string | null) {
    dispatch({
      type: CYCLE_REDUCER_STATE.CREATE_ACTIVE_CYCLE_ID,
      payload: id,
    })
  }

  function setSecondsPassed(seconds: number) {
    dispatch({
      type: CYCLE_REDUCER_STATE.CREATE_SECONDS_PASSED,
      payload: seconds,
    })
  }

  return (
    <CycleContext.Provider
      value={{
        handleInterruptCycle,
        handleFinishCycle,
        cycles,
        setActiveCycleId,
        activeCycleId,
        secondsPassed,
        activeCycle,
        minutesFormattedFromInterface,
        secondsFormattedFromInterface,
        createCycle,
        setSecondsPassed,
      }}
    >
      {children}
    </CycleContext.Provider>
  )
}
