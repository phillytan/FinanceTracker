import { configureStore } from "@reduxjs/toolkit";
import transactionsSlice from "../slices/transactionsSlice";

export default configureStore({
	reducer: {
    transactions: transactionsSlice
  },
  devTools: true
});
