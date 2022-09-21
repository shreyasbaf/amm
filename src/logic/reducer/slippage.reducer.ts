import { DECREMENT_SLIPPAGE, INCREMENT_SLIPPAGE } from "../action/actiontype"

const initialState = {
  slippageValue: 0.5,
}

export const slippageReducer = (state = 0.5, action: any) => {
  const { type } = action
  switch (type) {
    case INCREMENT_SLIPPAGE:
      return state < 5 ? state + 0.5 : state
    case DECREMENT_SLIPPAGE:
      return state > 0.5 ?  state - 0.5 : state
    default:
      return state
  }
}