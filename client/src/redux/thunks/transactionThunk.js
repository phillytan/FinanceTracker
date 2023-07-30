import { createAsyncThunk } from "@reduxjs/toolkit";
import TransactionService from '../services/transactionService'

export const getTransactionsAsync = createAsyncThunk(
    'transactions/getTransactions',
    async () => {
        return await TransactionService.getTransactions()
    }
)

export const getTopCategoriesAsync = createAsyncThunk(
    'transactions/getTopCategories',
    async () => {
        return await TransactionService.getTopCategories()
    }
)

// takes in an array of transactions
export const addTransactionsAsync = createAsyncThunk(
    'transactions/addTransactions',
    async (transaction) => {
        return await TransactionService.addTransactions(transaction)
    }
)

export const updateTransactionAsync = createAsyncThunk(
    'transactions/updateTransaction',
    async (transaction) => {
        return await TransactionService.updateTransaction(transaction)
    }
)

export const deleteTransactionAsync = createAsyncThunk(
    'transactions/deleteTransaction',
    async (transaction) => {
        return await TransactionService.deleteTransaction(transaction)
    }
)