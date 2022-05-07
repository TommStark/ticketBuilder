
import React, { useState, useEffect} from 'react' ;
import './App.css';
import { HashRouter as Router } from 'react-router-dom';
import Layout from './modules/Layout';
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
        Cookies.remove('data');
        localStorage.removeItem('user');
    }

    return (
        <Router>
            <Layout user={user} logOut={() => logOut()} setUser={(x)=>setUser(x)}/>
        </Router>
    );
}
export default App;
