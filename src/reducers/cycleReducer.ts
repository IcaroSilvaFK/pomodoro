/* eslint-disable no-unused-vars */
import { ICycle } from '../pages/Home'

export enum ACTION_TYPES {
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
      type: ACTION_TYPES.CREATE_SECONDS_PASSED
      payload: number
    }
  | {
      type: ACTION_TYPES.CREATE_NEW_CYCLE
      payload: ICycle
    }
  | {
      type: ACTION_TYPES.INTERRUPT_CYCLE
    }
  | {
      type: ACTION_TYPES.FINISH_CYCLE
    }
export function reducer(
  initialState: IInitialStateProps,
  action: IActionProps,
) {
  switch (action.type) {
    case ACTION_TYPES.CREATE_SECONDS_PASSED: {
      return {
        ...initialState,
        secondsPassed: action.payload,
      }
    }
    case ACTION_TYPES.CREATE_NEW_CYCLE: {
      const cycles = [...initialState.cycles, action.payload]

      return {
        ...initialState,
        cycles,
        activeCycleId: action.payload.id,
      }
    }
    case ACTION_TYPES.INTERRUPT_CYCLE: {
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
    case ACTION_TYPES.FINISH_CYCLE: {
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
