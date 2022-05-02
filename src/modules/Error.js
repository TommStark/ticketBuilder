import * as React from 'react';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import gtag from 'ga-gtag';
import { Button } from '@mui/material';

// eslint-disable-next-line react/prop-types
function Error({logOut}) {
    const navigate = useNavigate();

    function handleOnclick (){
        logOut();
        gtag('event', 'ErroPage', { 'ERROR': 'link to home' });
        navigate('/ticketBuilder', {replace: true});
    }


    return ( 
        <div className="gradient__bg">
            <header className="App-header">
                <Box
                    sx={{ p: 2, }}
                >
                    <h1 className='gradient__text txt-align'>Error Page</h1>

                    <div className='txt-align' >
                        <Button 
                            variant="contained"
                            color = 'secondary'
                            onClick={() => handleOnclick() }> Home </Button>
                    </div>
                </Box>
            </header>
        </div>
    );
}
export default Error;