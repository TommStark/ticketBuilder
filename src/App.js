import React from 'react' ;
import './App.css';
import System from './_app';
import Login  from './modules/login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
 
    return (
        <Router>
            <Routes>
                <Route path="/ticketBuilder"  element={<Login />}/>
                <Route path="/ticketBuilder/factory" element={<System />}/>
            </Routes>
        </Router>
    );
}

export default App;
