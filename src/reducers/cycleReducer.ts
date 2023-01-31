import { ICycle } from '../pages/Home'

export enum CYCLE_REDUCER_STATE {
  CREATE_NEW_CYCLE = 'CREATE_NEW_CYCLE',
  CREATE_ACTIVE_CYCLE_ID = 'CREATE_ACTIVE_CYCLE_ID',
  CREATE_SECONDS_PASSED = 'CREATE_SECONDS_PASSED',
  INTERRUPT_CYCLE = 'INTERRUPT_CYCLE ',
  FINISH_CYCLE = 'FINISH_CYCLE',
}

interface IInitialStateProps {
  activeCycleId: string | null
  secondsPassed: number
  cycles: ICycle[]
}

type IActionProps =
  | {
      type: CYCLE_REDUCER_STATE.CREATE_ACTIVE_CYCLE_ID
      payload: string | null
    }
  | {
      type: CYCLE_REDUCER_STATE.CREATE_SECONDS_PASSED
      payload: number
    }
  | {
      type: CYCLE_REDUCER_STATE.CREATE_NEW_CYCLE
      payload: ICycle
    }
  | {
      type: CYCLE_REDUCER_STATE.INTERRUPT_CYCLE
    }
  | {
      type: CYCLE_REDUCER_STATE.FINISH_CYCLE
    }
export function reducer(
  initialState: IInitialStateProps,
  action: IActionProps,
) {
  switch (action.type) {
    case CYCLE_REDUCER_STATE.CREATE_ACTIVE_CYCLE_ID: {
      return {
        ...initialState,
        activeCycleId: action.payload,
      }
    }
    case CYCLE_REDUCER_STATE.CREATE_SECONDS_PASSED: {
      return {
        ...initialState,
        secondsPassed: action.payload,
      }
    }
    case CYCLE_REDUCER_STATE.CREATE_NEW_CYCLE: {
      const cycles = [...initialState.cycles, action.payload]

      return {
        ...initialState,
        cycles,
      }
    }
    case CYCLE_REDUCER_STATE.INTERRUPT_CYCLE: {
      const updatedCycles = initialState.cycles.map((cycle) =>
        initialState.activeCycleId === cycle.id
          ? {
              ...cycle,
              interruptedDate: new Date(),
            }
          : cycle,
      )

      return {
        ...initialState,
        activeCycleId: null,
        cycles: updatedCycles,
      }
    }
    case CYCLE_REDUCER_STATE.FINISH_CYCLE: {
      const updatedCycles = initialState.cycles.map((cycle) =>
        initialState.activeCycleId === cycle.id
          ? {
              ...cycle,
              finishedDate: new Date(),
            }
          : cycle,
      )

      return {
        ...initialState,
        activeCycleId: null,
        cycles: updatedCycles,
      }
    }
    default: {
      return initialState
    }
  }
}
