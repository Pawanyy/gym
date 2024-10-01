import { combineReducers } from 'redux';
import authReducer from './authSlice.js';
import themeReducer from "./themeSlice.js";

const rootReducer = combineReducers({
    auth: authReducer,
    theme: themeReducer,
});

export default rootReducer;
