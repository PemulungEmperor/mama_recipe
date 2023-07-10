import { createSlice } from '@reduxjs/toolkit'

const registerSlicer = createSlice({
    name: "register",
    initialState: {
        userCredentials : {
            username: "",
            email: "",
            password: "",
            confirmPassword: ""
        },
        isPending : false,
        isError : null
    },
    reducers : {
        startRegister: (state, action) => {
            state.isPending = true
        },
        successRegister: (state, action) => {
            state.isPending = false
            state.isError = false
            state.userCredentials = action.payload
        },
        errorRegister : (state, action) => {
            state.isPending = true
            state.isError = true
        }
    }
})

export const {startRegister, successRegister, errorRegister } = registerSlicer.actions
export default registerSlicer.reducer

