import  {createSlice} from '@reduxjs/toolkit';

const initialState ={
    snackbar: {
        state    : false,
        txt      : '',
        severity : 'success'
    }

};

export const AppSlice = createSlice({
    name     : 'App',
    initialState,
    reducers : {
        ChangeSnackbar: (state, action) => {
            state.snackbar = { ...action.payload };
        },
    }
});

export const { ChangeSnackbar } = AppSlice.actions;

export default AppSlice.reducer;