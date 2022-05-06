import  {createSlice} from '@reduxjs/toolkit';

const initialState ={

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
    }
});

export const { AddUser, addTickets, addUserData } = loginSlice.actions;

export default loginSlice.reducer;