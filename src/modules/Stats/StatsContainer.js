import React from 'react';
import { Box } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});


function StatsContainer() {
    return ( 
        <ThemeProvider theme={darkTheme}>
            <header className="App-header"></header>
            <Box
                sx={{
                    width    : 500,
                    maxWidth : '90%',
                }}>
                <h1 className="App" > Stats  </h1>
            </Box>
        </ThemeProvider>
    );
}

export default StatsContainer;