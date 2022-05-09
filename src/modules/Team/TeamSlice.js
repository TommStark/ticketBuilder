import  {createSlice} from '@reduxjs/toolkit';

const initialState ={
    users           : [],
    projects        : [],
    projectsByState : {
        frozen    : [],
        available : []
    },
};

export const TeamSlice = createSlice({
    name     : 'TeamData',
    initialState,
    reducers : {
        addTeam: (state, action) => {
            state.users = action.payload;
        },
        addProjects: (state, action) => {
            state.projects = action.payload;
        },
        addFrozenProjects: (state, action) => {
            state.projectsByState.frozen = action.payload;
        },
        addAvailableProjects: (state, action) => {
            state.projectsByState.available = action.payload;
        },
    }
});


export const { addTeam, addProjects, addFrozenProjects, addAvailableProjects } = TeamSlice.actions;

export default TeamSlice.reducer;