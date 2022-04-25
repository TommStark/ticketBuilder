import React from 'react' ;
import './App.css';
import _app from './modules/_app';
import Login  from './modules/login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProtectedRoutes from './middleware/ProtectedRoutes';
import Error from './modules/Error';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/ticketBuilder"  element={<Login />}/>
                <Route element={<ProtectedRoutes/>}>
                    <Route exact path="/ticketBuilder/factory" element={<_app />}/>
                </Route>
                <Route path='*' element={<Error />} />
            </Routes>
        </Router>
    );
}

export default App;
