import  {createSlice} from '@reduxjs/toolkit';

const initialState ={
    teamTickets     : [],
    projectsByUsers : {
        graph        : [],
        colors       : [],
        userProjects : []
    },
};

export const DashBoardSlice = createSlice({
    name     : 'DashBoard',
    initialState,
    reducers : {
        setTeamTickets: (state, action) => {
            state.teamTickets = action.payload;
        },
        setProjectsByUsers: (state, action) => {
            state.projectsByUsers = { ...action.payload };
        },
    }
});

export const { setTeamTickets, setProjectsByUsers } = DashBoardSlice.actions;

export default DashBoardSlice.reducer;