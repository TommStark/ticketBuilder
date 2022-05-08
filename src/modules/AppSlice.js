import  {createSlice} from '@reduxjs/toolkit';

const initialState ={
    snackbar: {
        state    : false,
        txt      : '',
        severity : 'success'
    },
    notification: {
        saw    : false,
        isOpen : false,
    },
    theme: {
        darkMode: false,
    },
    news: {
        version : '',
        title   : '',
        posts   : []
    }
};

export const AppSlice = createSlice({
    name     : 'App',
    initialState,
    reducers : {
        ChangeSnackbar: (state, action) => {
            state.snackbar = { ...action.payload };
        },
        changeNotificationSaw: (state, action) => {
            state.notification = { ...action.payload };
        },
        toggleTheme: (state, action) => {
            state.darkMode = action.payload;
        },
        addNews: (state, action) => {
            state.news = { ...action.payload };
        },
    }
});

export const { ChangeSnackbar, changeNotificationSaw, toggleTheme, addNews } = AppSlice.actions;

export default AppSlice.reducer;