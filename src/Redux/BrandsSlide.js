import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
let initialState = { brands: [], isLoading: false, error: null }

export let getBrands = createAsyncThunk("brands/getBrands",
    async () => {
        let { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/brands")
            .catch((err) => err)
        return data.data
    }
)

let brandsSlice = createSlice({
    name: 'brandsSlice',
    initialState,
    extraReducers: (builder) => {
        // data prepare
        builder.addCase(getBrands.pending, (state, action) => {
            state.isLoading = true
        });
        // data come
        builder.addCase(getBrands.fulfilled, (state, action) => {
            state.brands = action.payload
            state.isLoading = false
        })
    }
})
export let brandsReducer = brandsSlice.reducer;