import { configureStore } from "@reduxjs/toolkit";
import transactionsSlice from "../slices/transactionsSlice";
import usersSlice from "../slices/usersSlice";

export default configureStore({
	reducer: {
		transactions: transactionsSlice,
		users: usersSlice,
	},
	devTools: true,
});
