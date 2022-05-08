import  {createSlice} from '@reduxjs/toolkit';

const initialState ={
    users: []
};

export const TeamSlice = createSlice({
    name     : 'TeamData',
    initialState,
    reducers : {
        addTeam: (state, action) => {
            state.users = action.payload;
        }
    }
});


export const { addTeam } = TeamSlice.actions;

export default TeamSlice.reducer;