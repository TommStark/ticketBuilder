/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import { Card, CardContent, Grid, Typography } from '@mui/material';
import { SeverityPill } from '../SeverityPill';

export const DashBoardProjectStatus = (props) => (
    <Card
        sx={{ height: '100%' }}
    >
        <CardContent>
            <Grid
                container
                spacing={2}
                sx={{ justifyContent: 'space-between'}}
            >
                {props.projectsStatus.map(({
                    name,
                    state 
                }) => (
                    <Grid item key={name}>
                        <Typography
                            color="textPrimary"
                            gutterBottom
                            variant="body1"
                            sx={{textAlign: 'center'}}
                        >
                            {name}
                        </Typography>
                        <Typography
                        >
                            <SeverityPill
                                color={state ? 'success' : 'error'}
                            >
                                {state ? 'Available' : 'Frozen'}
                            </SeverityPill>
                        </Typography>
                    </Grid>
                ))}
            </Grid>
        </CardContent>
    </Card>
);