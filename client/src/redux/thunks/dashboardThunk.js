import { createAsyncThunk } from "@reduxjs/toolkit";
import DashboardService from '../services/dashboardService'

export const getSpendingPredictionsAsync = createAsyncThunk(
    'dashboard/getSpendingPredictions',
    async () => {
        return await DashboardService.getSpendingPredictions()
    }
)