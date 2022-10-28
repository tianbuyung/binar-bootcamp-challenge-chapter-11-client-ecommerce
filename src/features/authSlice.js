import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import AuthService from "../services/AuthService";

const authservice = new AuthService();

export const cekUser = createAsyncThunk("users/verify", async () => {
	const token = localStorage.getItem("token");
	return await authservice.verifyUser(token);
});

export const cekAdmin = createAsyncThunk("admin/verify", async () => {
	const tokenAdmin = localStorage.getItem("tokenAdmin");
	return await authservice.verifyAdmin(tokenAdmin);
});

const authSlice = createSlice({
	name: "auth",
	initialState: {
		isAdmin: false,
		isUser: false,
		isLoading: true,
	},
	reducers: {
		logout: (state) => {
			state.isUser = false;
		},
		logoutAdmin: (state) => {
			state.isAdmin = false;
		},
		login: (state) => {
			state.isUser = true;
		},
		loginAdmin: (state) => {
			state.isAdmin = true;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(cekUser.pending, (state, action) => {
				// state.isUser = true;
				state.isLoading = true;
			})
			.addCase(cekUser.fulfilled, (state, action) => {
				state.isLoading = false;
				if (action.payload.status === 403) {
					state.isUser = false;
				} else {
					state.isUser = true;
				}
			})
			.addCase(cekUser.rejected, (state, action) => {
				state.isUser = false;
				state.isLoading = true;
			})

			// ! cekAdmin
			.addCase(cekAdmin.pending, (state, action) => {
				// state.isAdmin = true;
				state.isLoading = true;
			})
			.addCase(cekAdmin.fulfilled, (state, action) => {
				state.isLoading = false;
				if (action.payload.status === 200) {
					state.isAdmin = true;
				} else {
					state.isAdmin = false;
				}
			})
			.addCase(cekAdmin.rejected, (state, action) => {
				state.isAdmin = false;
				state.isLoading = true;
			});
	},
});

export const { logout, logoutAdmin, login, loginAdmin } = authSlice.actions;

export default authSlice.reducer;
