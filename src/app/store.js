import {configureStore} from '@reduxjs/toolkit';
import loginReducer from '../modules/login/loginSlice';
import TeamReducer from '../modules/Team/TeamSlice';
import AppReducer from '../modules/AppSlice';
export const store = configureStore({
    reducer: {
        app       : AppReducer,
        user      : loginReducer,
        TeamMates : TeamReducer,
    }
});