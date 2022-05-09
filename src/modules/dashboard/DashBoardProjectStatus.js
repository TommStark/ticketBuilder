/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import { Card, CardContent, Grid, Typography } from '@mui/material';

export const DashBoardProjectStatus = (props) => (
    <Card
        sx={{ height: '100%' }}
        {...props}
    >
        <CardContent>
            <Grid
                container
                spacing={2}
                sx={{ justifyContent: 'space-between' }}
            >
                <Grid item>
                    <Typography
                        color="textPrimary"
                        gutterBottom
                        // variant="overline"
                    >
                        Project
                    </Typography>
                    <Typography
                        color="textPrimary"
                        variant="h6"
                    >
                        Status
                    </Typography>
                </Grid>
                {props.ProjectsStatus.map(({
                    name,
                    state 
                }) => (
                    <Grid item key={name}>
                        <Typography
                            color="textPrimary"
                            gutterBottom
                            variant="body1"
                        >
                            {name}
                        </Typography>
                        <Typography
                            variant="h6"
                        >
                            {state ?  '✅' :  '❌' }
                        </Typography>
                    </Grid>
                ))}
            </Grid>
        </CardContent>
    </Card>
);