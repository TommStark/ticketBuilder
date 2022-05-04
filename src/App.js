
import React, { useState, useEffect} from 'react' ;
import './App.css';
import TicketBuilderContainer from './modules/TicketBuilder/TicketBuilderContainer';
import Login  from './modules/login';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Error from './modules/Error';
import Nav from './modules/Nav';
import StatsContainer from './modules/Stats/StatsContainer';
import TicketListContainer from './modules/TicketList/TicketListContainer';
import Cookies from 'js-cookie';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

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
        <div className="gradient__bg">
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
                    <Route
                        path="/ticketBuilder/tickets"
                        element={<TicketListContainer />
                        }>
                    </Route>
                    <Route path='*' element={<Error logOut={() => logOut()}/>} />
                </Routes>
            </Router>
        </div>
    );
}
export default App;
