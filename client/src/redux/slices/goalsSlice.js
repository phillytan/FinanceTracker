import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuid } from 'uuid'
import { deleteGoalAsync, getGoalsAsync, addGoalAsync, updateGoalAsync } from "../thunks/goalThunk";


const DEFAULT_STATE = {
	//   goals: data
	goals: []
};

export const goalsSlice = createSlice({
	name: "goals",
	initialState: DEFAULT_STATE,
	reducers: {
		addGoal: (state, action) => {
			// console.log("Adding goal " + action.payload);
			action.payload.id = uuid();
			state.goal = [...state.goals, action.payload];
		},
		updateGoal: (state, action) => {
			// console.log("Updating goal " + action.payload);
			state.goals = state.goals.map((goal) =>
				goal.id === action.payload.id ? action.payload : goal
			);
		},
		deleteGoal: (state, action) => {
			// console.log("Deleting goal " + Object.values(action.payload));
			state.goals = state.goals.filter(
				(trans) => trans.id !== action.payload.id
			);
		},
	},
	// TODO: Async Reducers placed below here:
	extraReducers: (builder) => {
		builder
			.addCase(getGoalsAsync.fulfilled, (state, action) => {
				state.goals = action.payload
			})
			.addCase(addGoalAsync.fulfilled, (state, action) => {
				state.goals = state.goals.concat(action.payload);
			})

			.addCase(updateGoalAsync.fulfilled, (state, action) => {
				state.goals = state.goals.map((trans) =>
					trans._id === action.payload._id ? action.payload : trans
				);
			})
			.addCase(deleteGoalAsync.fulfilled, (state, action) => {
				state.goals = state.goals.filter((trans) =>
					trans._id !== action.payload._id
				);
			})
	},
});

export const { addGoal, updateGoal, deleteGoal } = goalsSlice.actions;

export default goalsSlice.reducer;
