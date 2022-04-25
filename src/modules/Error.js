import * as React from 'react';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import gtag from 'ga-gtag';

function Error() {
    return ( 
        <header className="App-header">
            <Box
                sx={{ p: 2, }}
            >
                <h1>Error Page</h1>
                <Link 
                    to="/ticketBuilder" 
                    onClick={ gtag('event', 'ErroPage', { 'ERROR': 'link to home' })}
                >Home</Link>
            </Box>
        </header>
    );
}
export default Error;