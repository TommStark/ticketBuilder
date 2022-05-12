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
    },
    colors: ['#828DF8','#3FC79A','#246A73','#64B6F7','#FFBF4C','#FFC6D9','#DA6868','#ED254E']
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