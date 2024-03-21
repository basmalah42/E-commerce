import { createSlice } from "@reduxjs/toolkit";


let counterSlice = createSlice({
    name: 'counterSlice',
    initialState: {
        count: 0,
        userName: ''
    },
    reducers: {
        increase: (state , action) => {
            state.count+=1
        },
        decrease: () => {
            console.log('decrease');
        }
    }
})
export let counterReducer = counterSlice.reducer;
export let {increase , decrease} = counterSlice.actions;
