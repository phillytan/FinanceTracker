import { createSlice } from '@reduxjs/toolkit'
import { getSpendingPredictionsAsync } from '../thunks/dashboardThunk'

const DEFAULT_STATE = {
  predictedSpendings: {
    total: 0,
    categories: [],
  },
}

export const dashboardSlice = createSlice({
  name: 'dashboardStats',
  initialState: DEFAULT_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSpendingPredictionsAsync.fulfilled, (state, action) => {
      state.predictedSpendings = action.payload
    })
  },
})

export default dashboardSlice.reducer
