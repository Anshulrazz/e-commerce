import { configureStore } from "@reduxjs/toolkit";
import { productReducer, userReducer } from "./Reducers/User";

export const store = configureStore({
    reducer: {
        user: userReducer,
        product: productReducer,
    },
});
export default store;