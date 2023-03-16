import { createSlice } from "@reduxjs/toolkit";

const initialState={
    user:{}
}

const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{
        setCredentials:(state,{payload})=>{
            state.user=payload
        }
    }
})

export default authSlice.reducer
export const {setCredentials}=authSlice.actions
export const selectCurrentUser=(state)=>state.auth.user