import React from 'react';
import { Box } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Skeleton from '@mui/material/Skeleton';
import Grid from '@mui/material/Grid';
const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

function StatsContainer() {
    return ( 
        <ThemeProvider theme={darkTheme}>
            <header className="App-header">
                <Box
                    sx={{
                        maxWidth: '96%',
                    }}>
                    <Box sx={{ flexGrow: 1 }}>
                        <h1 className="App" > stats  </h1>
                        <Grid container spacing={4} >
                            <Grid item xs={6}>
                                <Skeleton variant="rectangular" width={510} height={218} />
                                <Box sx={{ pt: 0.5 }}>
                                    <Skeleton width="80%" />
                                    <Skeleton width="60%" />
                                </Box>
                            </Grid>
                            <Grid item xs={6}>
                                <Skeleton variant="rectangular" width={510} height={218} />
                                <Box sx={{ pt: 0.5 }}>
                                    <Skeleton width="80%" />
                                    <Skeleton width="60%" />
                                </Box>
                            </Grid>
                        </Grid>
                        <Grid container spacing={4} >
                            <Grid item xs={6}>
                                <Skeleton variant="rectangular" width={510} height={218} />
                                <Box sx={{ pt: 0.5 }}>
                                    <Skeleton width="80%" />
                                    <Skeleton width="60%" />
                                </Box>
                            </Grid>
                            <Grid item xs={6}>
                                <Skeleton variant="rectangular" width={510} height={218} />
                                <Box sx={{ pt: 0.5 }}>
                                    <Skeleton width="80%" />
                                    <Skeleton width="60%" />
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </header>
        </ThemeProvider>
    );
}

export default StatsContainer;