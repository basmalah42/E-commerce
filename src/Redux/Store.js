import { configureStore } from "@reduxjs/toolkit";
import { counterReducer } from "./CounterSlide.js";
import { brandsReducer } from "./BrandsSlide.js";

export let store = configureStore({
    reducer: {
        counter: counterReducer,
        brand :brandsReducer
    }
})