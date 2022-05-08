import React from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';
import { ProfileAccount } from './ProfileAccount';
import { ProfileDetails } from './ProfileDetails';

const Account = () => (
    <>
        <Box
            component="main"
            sx={{
                flexGrow : 1,
                py       : 1
            }}
        >
            <Container maxWidth="lg">
                <Typography
                    sx={{ mb: 3 }}
                    variant="h4"
                >
                    Account
                </Typography>
                <Grid
                    container
                    spacing={3}
                >
                    <Grid
                        item
                        lg={4}
                        md={6}
                        xs={12}
                    >
                        <ProfileAccount />
                    </Grid>
                    <Grid
                        item
                        lg={8}
                        md={6}
                        xs={12}
                    >
                        <ProfileDetails />
                    </Grid>
                </Grid>
            </Container>
        </Box>
    </>
);

export default Account;