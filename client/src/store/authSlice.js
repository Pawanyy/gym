import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false,
        isAdminLoggedIn: false,
        user: null,
        tokenInfo: null,
    },
    reducers: {
        login: (state, action) => {
            state.isLoggedIn = true;
            state.isAdminLoggedIn = false;
            state.tokenInfo = action.payload.tokenInfo;
            state.user = action.payload.userInfo;
        },
        logout: (state) => {
            state.isLoggedIn = false;
            state.isAdminLoggedIn = false;
            state.user = null;
            state.tokenInfo = null;
        },
        loginAdmin: (state, action) => {
            state.isLoggedIn = false;
            state.isAdminLoggedIn = true;
            state.tokenInfo = action.payload.tokenInfo;
            state.user = action.payload.userInfo;
        },
        logoutAdmin: (state) => {
            state.isLoggedIn = false;
            state.isAdminLoggedIn = false;
            state.user = null;
            state.tokenInfo = null;
        },
    },
});

export const { login, logout, loginAdmin, logoutAdmin } = authSlice.actions;

export default authSlice.reducer;
