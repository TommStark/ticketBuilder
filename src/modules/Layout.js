/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import Nav from './Nav/Nav';
import SideBar from './SideBar';
import TicketBuilderContainer from './TicketBuilder/TicketBuilderContainer';
import Login  from './login/login';
import {  Route, Routes } from 'react-router-dom';
import Error from './Error';
import StatsContainer from './Stats/StatsContainer';
import TicketListContainer from './TicketList/TicketListContainer';
import AdminPanel from './admin/AdminPanel';
import ProfileContainer from './Profile/ProfileContainer';
import SettingsContainer from './Settings/SettingsContainer';
import TeamContainer from './Team/TeamContainer';
import { AddUser, addTickets, addUserData } from '../modules/login/loginSlice';
import { addTeam } from '../modules/Team/TeamSlice';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import * as BackendAPI from  '../services/BackendAPI';

const DashboardLayoutRoot = styled('div')(({ theme }) => ({
    display                      : 'flex',
    flex                         : '1 1 auto',
    maxWidth                     : '100%',
    paddingTop                   : 64,
    [theme.breakpoints.up('lg')] : {
        paddingLeft: 280
    }
}));

export default function DashboardLayout ({logOut,setUser,user}) {
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const dispatch = useDispatch();
    const isUserAuth  = localStorage.getItem('user') && JSON.parse(localStorage.getItem('user'));
    const data  = Cookies.get('data') && JSON.parse(Cookies.get('data'));

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
                            path="/ticketBuilder/stats"
                            element={<StatsContainer />
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
        </>
    );
}