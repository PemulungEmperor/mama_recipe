import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
    name: "user",
    initialState: {
        userCredentials : {
            email: "",
            password: ""
        },
    isPending : false,
    isError : null
    },
    reducers : {
        startLogin: (state, action) => {
            state.isPending = true
        },
        successLogin: (state, action) => {
            state.isPending = false
            state.isError = false
            state.userCredentials = action.payload
        },
        errorLogin : (state, action) => {
            state.isPending = true
            state.isError = true
        }
    }
})


//login
export const {startLogin, successLogin, errorLogin } = userSlice.actions
export default userSlice.reducer
