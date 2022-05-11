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
    news: {
        version : '',
        title   : '',
        posts   : []
    },
    tabs: {
        active: window.location.href.split('#')[1]
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
        addNews: (state, action) => {
            state.news = { ...action.payload };
        },
        changeActiveTab: (state, action) => {
            state.tabs = {active: action.payload};
        },
    }
});

export const { ChangeSnackbar, changeNotificationSaw, addNews, changeActiveTab  } = AppSlice.actions;

export default AppSlice.reducer;