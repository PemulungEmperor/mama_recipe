
// import storage from 'redux-persist/lib/storage'
// import {combineReducers} from "redux"; 
// import { persistReducer } from 'redux-persist'
// depedencies
import { configureStore} from '@reduxjs/toolkit'
import logger from 'redux-logger'
import thunk from 'redux-thunk';
import productSlicer from './reducer/productSlicer'

//reducer
import logoutSlice from './reducer/logoutSlice'
import registerSlicer from './reducer/registerSlicer'
import userSlicer from './reducer/userSlicer'

export const store = configureStore({
    reducer : {
        user : userSlicer,
        register : registerSlicer,
        logout : logoutSlice,
        product : productSlicer
    },
    middleware : [thunk, logger]
})
