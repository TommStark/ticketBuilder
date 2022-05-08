import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import gtag from 'ga-gtag';
import { Button } from '@mui/material';
import { Box, Container, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

// eslint-disable-next-line react/prop-types
function Error() {
    const navigate = useNavigate();

    function handleOnclick (){
        gtag('event', 'ErroPage', { 'ERROR': 'link to home' });
        navigate('/ticketBuilder', {replace: true});
    }

    return ( 
        <Box
            component="main"
            sx={{
                alignItems : 'center',
                display    : 'flex',
                flexGrow   : 1,
                minHeight  : '100%'
            }}
        >
            <Container maxWidth="md">
                <Box
                    sx={{
                        alignItems    : 'center',
                        display       : 'flex',
                        flexDirection : 'column'
                    }}
                >
                    <Typography
                        align="center"
                        color="textPrimary"
                        variant="h1"
                    >
                        404: The page you are looking for isn’t here
                    </Typography>
                    <Typography
                        align="center"
                        color="textPrimary"
                        variant="subtitle2"
                    >
                        You either tried some shady route or you came here by mistake.
                        Whichever it is, try using the navigation
                    </Typography>
                    <Box sx={{ textAlign: 'center' }}>
                        <img
                            alt="Under development"
                            src="https://material-kit-react.devias.io/static/images/undraw_page_not_found_su7k.svg"
                            style={{
                                marginTop : 50,
                                display   : 'inline-block',
                                maxWidth  : '100%',
                                width     : 560
                            }}
                        />
                        <Button
                            component="a"
                            startIcon={(<ArrowBackIcon fontSize="small" />)}
                            sx={{ mt: 3 }}
                            variant="contained"
                            fullWidth
                            onClick={() => handleOnclick() }> Home </Button>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
}

export default Error;         