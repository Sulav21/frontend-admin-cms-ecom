import { createSlice } from "@reduxjs/toolkit";

const initialState={
    reviews:[]
}

const reviewSlice=createSlice({
    name:'review',
    initialState,
    reducers:{
        setReviews:(state,{payload})=>{
            state.reviews= payload
        }
    }
})

export const {reducer,actions} = reviewSlice
export const {setReviews} = actions

export default reducer

