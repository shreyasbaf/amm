import { INITIALBUST, INITIALRUST } from "../action/actiontype"

interface Props{
    rust: any;
    bust: any;
}

const initialState: Props = {
    rust: 0,
    bust: 0
}

export const initialReducer = (state = initialState, action: any) => {
  const { type, payload } = action
  switch (type) {
    case INITIALBUST:
      return {
        ...state,
        bust: payload,
      }
    case INITIALRUST:
      return {
        ...state,
        rust: payload,
      }
    default:
      return state
  }
}
