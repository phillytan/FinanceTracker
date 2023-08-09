import { createSlice } from '@reduxjs/toolkit'
import { v4 as uuid } from 'uuid'
import {
  deleteSavingAsync,
  getSavingsAsync,
  addSavingsAsync,
  updateSavingAsync,
} from '../thunks/savingThunk'

const DEFAULT_STATE = {
  //   savings: data
  savings: [],
}

export const savingsSlice = createSlice({
  name: 'savings',
  initialState: DEFAULT_STATE,
  reducers: {
    addSaving: (state, action) => {
      action.payload.id = uuid()
      state.savings = [...state.savings, action.payload]
    },
    updateSaving: (state, action) => {
      state.savings = state.savings.map((trans) =>
        trans.id === action.payload.id ? action.payload : trans,
      )
    },
    deleteSaving: (state, action) => {
      state.savings = state.savings.filter(
        (trans) => trans.id !== action.payload.id,
      )
    },
  },
  // TODO: Async Reducers placed below here:
  extraReducers: (builder) => {
    builder
      .addCase(getSavingsAsync.fulfilled, (state, action) => {
        state.savings = action.payload
      })
      .addCase(addSavingsAsync.fulfilled, (state, action) => {
        state.savings = state.savings.concat(action.payload)
      })

      .addCase(updateSavingAsync.fulfilled, (state, action) => {
        state.savings = state.savings.map((trans) =>
          trans._id === action.payload._id ? action.payload : trans,
        )
      })
      .addCase(deleteSavingAsync.fulfilled, (state, action) => {
        state.savings = state.savings.filter(
          (trans) => trans._id !== action.payload._id,
        )
      })
  },
})

export const { addSaving, updateSaving, deleteSaving } = savingsSlice.actions

export default savingsSlice.reducer
