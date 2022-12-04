import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: { token: null, isAuth: false },
    reducers: {
        setCredentials: (state, action) => {
            if (action.payload && action.payload.data) {
                state.token = action.payload.data;
                state.isAuth = true;
            } else {
                state.isAuth = false;
            }
        },
        logOut: (state, action) => {
            state.token = null;
            state.isAuth = false;
        },
    },
});
export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;
