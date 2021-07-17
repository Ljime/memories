import { createSlice } from "@reduxjs/toolkit"

const authInitialState = { loggedIn: false }

const authSlice = createSlice({
	name: "auth",
	initialState: authInitialState,
	reducers: {
		login(state, action) {
			state.loggedIn = true
		},
		logout(state, action) {
			state.loggedIn = false
		},
	},
})

export const authActions = authSlice.actions

export default authSlice
