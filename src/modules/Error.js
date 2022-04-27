import * as React from 'react';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import gtag from 'ga-gtag';
import { Button } from '@mui/material';

function Error() {
    const navigate = useNavigate();

    function handleOnclick (){
        localStorage.removeItem('user');
        gtag('event', 'ErroPage', { 'ERROR': 'link to home' });
        navigate('/ticketBuilder', {replace: true});
    }


    return ( 
        <header className="App-header">
            <Box
                sx={{ p: 2, }}
            >
                <h1>Error Page</h1>
                <Button 
                    variant="contained"
                    onClick={() => handleOnclick() }> To Home </Button>
            </Box>
        </header>
    );
}
export default Error;