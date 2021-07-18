import { createSlice } from "@reduxjs/toolkit"

const getState = () => {
    const token = localStorage.getItem('token')
    const loggedIn = token ? true : false
    return loggedIn
}

const loggedIn = getState()

const authInitialState = { loggedIn: loggedIn }

const authSlice = createSlice({
	name: "auth",
	initialState: authInitialState,
	reducers: {
		login(state, action) {
			state.loggedIn = true
            localStorage.setItem('token', action.payload)
		},
		logout(state, action) {
			state.loggedIn = false
            localStorage.removeItem('token')
		},
	},
})

export const authActions = authSlice.actions

export default authSlice


