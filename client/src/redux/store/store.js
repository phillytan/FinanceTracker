import { configureStore } from "@reduxjs/toolkit";
import transactionsSlice from "../slices/transactionsSlice";
import usersSlice from "../slices/usersSlice";
import goalsSlice from "../slices/goalsSlice";

export default configureStore({
	reducer: {
		transactions: transactionsSlice,
		users: usersSlice,
		goals: goalsSlice
	},
	devTools: true,
});
