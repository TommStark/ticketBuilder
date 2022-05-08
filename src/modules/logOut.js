import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import gtag from 'ga-gtag';

// eslint-disable-next-line react/prop-types
function LogOut({logOut}) {
    const navigate = useNavigate();

    React.useEffect(()=>{
        logOut();
        gtag('event', 'logOut', { 'logOut': 'from page' });
        navigate('/ticketBuilder', {replace: true});
    });


    return ( 
        <header className="App-header">
        </header>
    );
}
export default LogOut;