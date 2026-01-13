import { createSlice } from "@reduxjs/toolkit";

const KEY = "account";

interface AccountState {
    isLoading: boolean;
    error: {
        code: string;
        message: string;
        name: string;
    } | null;
}

const initialState: AccountState = {
    isLoading: false,
    error: null,
};

const accountSlice = createSlice({
    name: KEY,
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
    },
});

const { reducer, actions } = accountSlice;
export const { setLoading, setError } = actions;

export default reducer;
