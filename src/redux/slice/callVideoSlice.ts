import { createSlice } from "@reduxjs/toolkit";

const KEY = "CALL-VIDEO";

const callVideoSlice = createSlice({
    name: KEY,
    initialState: {},
    reducers: {},
});

const { reducer } = callVideoSlice;

export default reducer;
