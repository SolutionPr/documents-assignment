import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoading: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        SetLoading: (state, actions) => {
            state.isLoading = actions.payload;
        },
    },
});

export const { SetLoading } = authSlice.actions;

export default authSlice.reducer;
