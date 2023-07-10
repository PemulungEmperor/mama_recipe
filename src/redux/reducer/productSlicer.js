import { createSlice } from "@reduxjs/toolkit";

const productSlicer = createSlice({
    name : 'products',
    initialState: {isPending : false, isError : false},
    dataProducts : {

    },
    reducers: {
        getProduct: (state, action) => {
            state.dataProducts = action.payload
        }
    }
})

export const {getProduct} = productSlicer.actions
export default productSlicer.reducer