/* eslint-disable no-debugger */
/* eslint-disable no-constant-condition */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useMemo } from 'react' ;
import './App.css';
import TicketBuilderContainer from './modules/TicketBuilder/TicketBuilderContainer';
import Login  from './modules/login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import * as BackendAPI from  './services/BackendAPI';
import Error from './modules/Error';
import Nav from './modules/Nav';
import StatsContainer from './modules/Stats/StatsContainer';
import Cookies from 'js-cookie';


// const providerUser = useMemo(() => ({user, setUser}),[user, setUser]);

// function getLoggedIn (){
//     BackendAPI.isLogin()
//         .then(res => {
//             setIsLoggedIn(res.data.logged_in);
//         })
//         .catch(() => setIsLoggedIn(false) );
// }
// const getMenuItems = React.useMemo(() => getLoggedIn, [] );


function App() {
    const [user, setUser] = useState(localStorage.getItem('user'));

    useEffect(() =>{
        const u = localStorage.getItem('user');
        u && JSON.parse(u) ? setUser(true) : setUser(false);
    },[]);

    useEffect(() =>{
        localStorage.setItem('user', user);
    },[user]);

    function logOut(){
        setUser(false);
        Cookies.remove('token');
        Cookies.remove('author');
        localStorage.removeItem('user');
    }


    return (
        <Router>
            {user ? <Nav logOut={() => logOut()}/> : null}
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
                <Route path='*' element={<Error />} />
            </Routes>
        </Router>
    );
}

export default App;
