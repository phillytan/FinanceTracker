import { createSlice } from '@reduxjs/toolkit'
import { v4 as uuid } from 'uuid'
import {
  deleteTransactionAsync,
  getTransactionsAsync,
  addTransactionsAsync,
  updateTransactionAsync,
  getTopCategoriesAsync,
} from '../thunks/transactionThunk'

const DEFAULT_STATE = {
  transactions: [],
  topCategories: [],
}

export const transactionsSlice = createSlice({
  name: 'transactions',
  initialState: DEFAULT_STATE,
  reducers: {
    addTransaction: (state, action) => {
      action.payload.id = uuid()
      state.transactions = [...state.transactions, action.payload]
    },
    updateTransaction: (state, action) => {
      state.transactions = state.transactions.map((trans) =>
        trans.id === action.payload.id ? action.payload : trans,
      )
    },
    deleteTransaction: (state, action) => {
      state.transactions = state.transactions.filter(
        (trans) => trans.id !== action.payload.id,
      )
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTransactionsAsync.fulfilled, (state, action) => {
        state.transactions = action.payload
      })
      .addCase(addTransactionsAsync.fulfilled, (state, action) => {
        state.transactions = state.transactions.concat(action.payload)
      })

      .addCase(updateTransactionAsync.fulfilled, (state, action) => {
        state.transactions = state.transactions.map((trans) =>
          trans._id === action.payload._id ? action.payload : trans,
        )
      })
      .addCase(deleteTransactionAsync.fulfilled, (state, action) => {
        state.transactions = state.transactions.filter(
          (trans) => trans._id !== action.payload._id,
        )
      })
      .addCase(getTopCategoriesAsync.fulfilled, (state, action) => {
        state.topCategories = action.payload
      })
  },
})

export const { addTransaction, updateTransaction, deleteTransaction } =
  transactionsSlice.actions

export default transactionsSlice.reducer
