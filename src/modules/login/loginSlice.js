import  {createSlice} from '@reduxjs/toolkit';

const initialState ={
    tickets: {
        tickets : [],
        total   : 0
    },
    log  : {},
    data : {}
    

};

export const loginSlice = createSlice({
    name     : 'userData',
    initialState,
    reducers : {
        AddUser: (state, action) => {
            state.log = action.payload;
        },
        addTickets: (state, action) => {
            state.tickets = action.payload;
        },
        addUserData: (state, action) => {
            state.data = action.payload;
        },
        toggleTheme: (state, action) => {
            state.data = { 
                ...state.data,
                darkMode: action.payload 
            };
        },
    }
});

export const { AddUser, addTickets, addUserData, toggleTheme } = loginSlice.actions;

export default loginSlice.reducer;