import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import logger from "redux-logger";

export default configureStore({
	reducer: {
		auth: authReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({ serializableCheck: false }),
});
