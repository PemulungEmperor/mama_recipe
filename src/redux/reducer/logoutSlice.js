import { createSlice } from '@reduxjs/toolkit'

const userLogoutSlice = createSlice({
    name: "logout",
    initialState: {
        isPending : null,
        isError : null
    },
    reducers : {
        startLogout: (state, action) => {
            state.isPending = true
        },
        successLogout: (state, action) => {
            state.isPending = false
            state.isError = false
        },
        errorLogout : (state, action) => {
            state.isPending = true
            state.isError = true
        }
    }
})

//logout
export const {startLogout, successLogout, errorLogout } = userLogoutSlice.actions
export default userLogoutSlice.reducer
