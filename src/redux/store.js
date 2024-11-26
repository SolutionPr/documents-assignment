import { configureStore } from '@reduxjs/toolkit';
import fileSlice from "./authslice";

export const store = configureStore({
    reducer:
        { data: fileSlice }
});
