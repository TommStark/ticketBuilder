/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useSelector, useDispatch } from 'react-redux';
import {  Route, Routes } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import * as BackendAPI from  '../services/BackendAPI';
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
import { addTeam, addProjects, addAvailableProjects, addFrozenProjects  } from '../modules/Team/TeamSlice';
import { ChangeSnackbar, addNews } from '../modules/AppSlice';
import DashboardContainer from './dashboard/DashboardContainer';
import Drawer from './Drawer';
import LogOut from './logOut';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function DashboardLayout ({logOut,setUser,user}) {
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const dispatch = useDispatch();
    const isUserAuth  = localStorage.getItem('user') && JSON.parse(localStorage.getItem('user'));
    const data  = Cookies.get('data') && JSON.parse(Cookies.get('data'));
    const snack = useSelector((state)=> state.app.snackbar);
    const isDarkMode = useSelector((state)=> state.app.theme.darkMode);
    const [isTabActive, setIsTabActive] = useState(useSelector((state)=> state.app.tabs.active));

    const versionData={
        userVersion : useSelector((state)=> state?.user?.data?.appVersion),
        appVersion  : useSelector((state)=> state?.app?.news?.version),
    };

    const darkTheme = createTheme({
        palette: {
            mode: isDarkMode ? 'dark' :  'light',
        },
    });
    
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        dispatch(ChangeSnackbar({state: false,txt: ''}));
    };

    const DashboardLayoutRoot = styled('div')(({ theme }) => (
        user ?
            {
                display                      : 'flex',
                flex                         : '1 1 auto',
                maxWidth                     : '100%',
                [theme.breakpoints.up('lg')] : {
                    paddingLeft : 280,
                    paddingTop  : 120
                }
            } :        {
                display  : 'flex',
                flex     : '1 1 auto',
                maxWidth : '100%',
            }
    ));


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
            BackendAPI.getNews()
                .then(res => {
                    if(res.data){
                        dispatch(addNews(res.data[0]));
                    }
                })
                .catch();
            BackendAPI.getProjects()
                .then(res => {
                    if(res.data){
                        dispatch(addProjects(res.data));
                        

                        const projectsFreez = [];
                        const projectsAvailable = [];

                        res.data?.forEach((project,index) => {
                            if(!project.state){
                                projectsFreez.push(project);
                            }else(
                                projectsAvailable.push(project)
                            );
                        });
                        dispatch(addFrozenProjects(projectsFreez));
                        dispatch(addAvailableProjects(projectsAvailable));
                    }
                });
        }
    },[user,isUserAuth,data]);

    return (
        <>
            <ThemeProvider theme={darkTheme}>

                { user && <Nav versionData={versionData}  onSidebarOpen={() => setSidebarOpen(true)}/>}
                { user && <SideBar
                    onClose={() => setSidebarOpen(false)}
                    open={isSidebarOpen}
                    logOut={() => logOut()}
                />
                }
                <DashboardLayoutRoot>
                    <Box
                        sx={ {
                            display       : 'flex',
                            flex          : '1 1 auto',
                            flexDirection : 'column',
                            width         : '100%',
                        }}
                    >
                        <Routes>
                            <Route 
                                path="/ticketBuilder"  
                                element={ <Login authenticate={() => setUser(true)} />
                                }/>
                            <Route
                                path="/ticketBuilder/factory"
                                element={ user  ? <TicketBuilderContainer /> : <Login authenticate={() => setUser(true)} />
                                }>
                            </Route>
                            <Route
                                path="/ticketBuilder/dashboard"
                                element={user  ? <DashboardContainer /> : <Login authenticate={() => setUser(true)} />
                                }>
                            </Route>
                            <Route
                                path="/ticketBuilder/tickets"
                                element={user  ? <TicketListContainer /> : <Login authenticate={() => setUser(true)} />
                                }>
                            </Route>
                            <Route
                                path="/ticketBuilder/admin"
                                element={user  ? <AdminPanel /> : <Login authenticate={() => setUser(true)} />
                                }>
                            </Route>
                            <Route
                                path="/ticketBuilder/profile"
                                element={user ? <ProfileContainer /> : <Login authenticate={() => setUser(true)} />
                                }>
                            </Route>
                            <Route
                                path="/ticketBuilder/profile"
                                element={user ? <ProfileContainer /> : <Login authenticate={() => setUser(true)} />
                                }>
                            </Route>
                            <Route
                                path="/ticketBuilder/settings"
                                element={user ? <SettingsContainer /> : <Login authenticate={() => setUser(true)} />
                                }>
                            </Route>
                            <Route
                                path="/ticketBuilder/team"
                                element={user ? <TeamContainer /> : <Login authenticate={() => setUser(true)} />
                                }>
                            </Route>
                            <Route
                                path="/ticketBuilder/logOut"
                                element={<LogOut
                                    logOut={() => logOut()}
                                />
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
                <Drawer />
            </ThemeProvider>
        </>
    );
}