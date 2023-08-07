import { configureStore } from "@reduxjs/toolkit";
import transactionsSlice from "../slices/transactionsSlice";
import savingsSlice from "../slices/savingsSlice";
import usersSlice from "../slices/usersSlice";
import goalsSlice from "../slices/goalsSlice";

export default configureStore({
	reducer: {
		transactions: transactionsSlice,
		savings: savingsSlice,
		users: usersSlice,
		goals: goalsSlice
	},
	devTools: true,
});
