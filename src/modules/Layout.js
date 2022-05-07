/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useSelector, useDispatch } from 'react-redux';
import {  Route, Routes } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Cookies from 'js-cookie';
import Nav from './Nav/Nav';
import SideBar from './SideBar';
import TicketBuilderContainer from './TicketBuilder/TicketBuilderContainer';
import Login  from './login/login';
import Error from './Error';
import TicketListContainer from './TicketList/TicketListContainer';
import AdminPanel from './admin/AdminPanel';
import ProfileContainer from './Profile/ProfileContainer';
import SettingsContainer from './Settings/SettingsContainer';
import TeamContainer from './Team/TeamContainer';
import { AddUser, addTickets, addUserData } from '../modules/login/loginSlice';
import { addTeam } from '../modules/Team/TeamSlice';
import { ChangeSnackbar } from '../modules/AppSlice';
import * as BackendAPI from  '../services/BackendAPI';
import DashboardContainer from './dashboard/DashboardContainer';

const DashboardLayoutRoot = styled('div')(({ theme }) => ({
    display                      : 'flex',
    flex                         : '1 1 auto',
    maxWidth                     : '100%',
    [theme.breakpoints.up('lg')] : {
        paddingLeft: 280
    }
}));

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function DashboardLayout ({logOut,setUser,user}) {
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const dispatch = useDispatch();
    const isUserAuth  = localStorage.getItem('user') && JSON.parse(localStorage.getItem('user'));
    const data  = Cookies.get('data') && JSON.parse(Cookies.get('data'));
    const snack = useSelector((state)=> state.app.snackbar);
    
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        dispatch(ChangeSnackbar({state: false,txt: ''}));
    };



    useEffect(()=>{
        if(isUserAuth || data){
            dispatch(AddUser(data));

            BackendAPI.getOtherAuthors()
                .then( result => {
                    dispatch(addTeam(result.data));
                })
                .catch();
                
            BackendAPI.getTicketsByAuthor()
                .then(res => {
                    if(res.data){
                        dispatch(addTickets(res.data));
                    }
                })
                .catch();
            BackendAPI.getUserData()
                .then(res => {
                    if(res.data){
                        dispatch(addUserData(res.data));
                    }
                })
                .catch();
        }
    },[user,isUserAuth,data]);

    return (
        <>
            { user && <Nav logOut={() => logOut()}/>}
            { user && <SideBar
                onClose={() => setSidebarOpen(false)}
                open={isSidebarOpen}
            />
            }
            <DashboardLayoutRoot>
                <Box
                    sx={{
                        display       : 'flex',
                        flex          : '1 1 auto',
                        flexDirection : 'column',
                        width         : '100%'
                    }}
                >
                    <Routes>
                        <Route 
                            path="/ticketBuilder"  
                            element={ <Login authenticate={() => setUser(true)} />
                            }/>
                        <Route
                            path="/ticketBuilder/factory"
                            element={<TicketBuilderContainer />
                            }>
                        </Route>
                        <Route
                            path="/ticketBuilder/dashboard"
                            element={<DashboardContainer />
                            }>
                        </Route>
                        <Route
                            path="/ticketBuilder/tickets"
                            element={<TicketListContainer />
                            }>
                        </Route>
                        <Route
                            path="/ticketBuilder/admin"
                            element={<AdminPanel />
                            }>
                        </Route>
                        <Route
                            path="/ticketBuilder/profile"
                            element={<ProfileContainer />
                            }>
                        </Route>
                        <Route
                            path="/ticketBuilder/profile"
                            element={<ProfileContainer />
                            }>
                        </Route>
                        <Route
                            path="/ticketBuilder/settings"
                            element={<SettingsContainer />
                            }>
                        </Route>
                        <Route
                            path="/ticketBuilder/team"
                            element={<TeamContainer />
                            }>
                        </Route>
                        <Route path='*' element={<Error logOut={() => logOut()}/>} />
                    </Routes>
                </Box>
            </DashboardLayoutRoot>
            <Snackbar open={snack.state} autoHideDuration={2000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={snack.severity} sx={{ width: '100%' }}>
                    {snack.txt}
                </Alert>
            </Snackbar>
        </>
    );
}