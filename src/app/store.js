import {configureStore} from '@reduxjs/toolkit';
import loginReducer from '../modules/login/loginSlice';
import TeamReducer from '../modules/Team/TeamSlice';

export const store = configureStore({
    reducer: {
        user      : loginReducer,
        TeamMates : TeamReducer,
    }
});