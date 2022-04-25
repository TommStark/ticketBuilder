import React from 'react' ;
import {Navigate, Outlet} from 'react-router-dom';
// import * as BackendAPI from  '../services/BackendAPI';


const useAuth = async ()  => {
    // const requestParams = {
    //     body: {
    //         email: ' '
    //     },
    // };
    return true;
    // return await BackendAPI.isLogin(requestParams)
    //     .then(response => response.data.logged_in )
    //     .catch(err => console.log(err));
};

const ProtectedRoutes = () => {
    let isAuth = useAuth();
    return isAuth ? <Outlet/> : <Navigate to='/ticketBuilder'/>;
};

export default ProtectedRoutes;