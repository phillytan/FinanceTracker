import { createAsyncThunk } from '@reduxjs/toolkit'
import GoalService from '../services/goalService'

export const getGoalsAsync = createAsyncThunk('goals/getGoals', async () => {
  return await GoalService.getGoals()
})

// takes in a goal object
export const addGoalAsync = createAsyncThunk('goals/addGoal', async (goal) => {
  return await GoalService.addGoal(goal)
})

export const updateGoalAsync = createAsyncThunk(
  'goals/updateGoal',
  async (goal) => {
    return await GoalService.updateGoal(goal)
  },
)

export const deleteGoalAsync = createAsyncThunk(
  'goals/deleteGoal',
  async (goal) => {
    return await GoalService.deleteGoal(goal)
  },
)
