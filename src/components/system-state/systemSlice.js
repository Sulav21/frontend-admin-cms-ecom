import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    showAdminSidebar: false
}
const systemSlice = createSlice({
    name : "systemSlice",
    initialState,
    reducers:{
        toggleSidebar:(state)=>{
            state.showAdminSidebar = !state.showAdminSidebar;
        }
    }

})

const {reducer,actions} = systemSlice

export const {toggleSidebar} = actions

export default reducer