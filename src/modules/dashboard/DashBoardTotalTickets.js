/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import { Avatar, Box, Card, CardContent, Grid, Typography } from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

export const DashBoardTotalTickets = (props) => (
    <Card
        sx={{ height: '100%' }}
        {...props}
    >
        <CardContent>
            <Grid
                container
                spacing={3}
                sx={{ justifyContent: 'space-between' }}
            >
                <Grid item>
                    <Typography
                        color="textSecondary"
                        gutterBottom
                        variant="overline"
                    >
                        {props.title}
                    </Typography>
                    <Typography
                        color="textPrimary"
                        variant="h5"
                    >
                        {props.total}
                    </Typography>
                </Grid>
                <Grid item>
                    <Avatar
                        sx={{
                            backgroundColor : 'primary.main',
                            height          : 56,
                            width           : 56
                        }}
                    >
                        {props.icon}
                    </Avatar>
                </Grid>
            </Grid>
            {/* <Box
                sx={{
                    pt         : 2,
                    display    : 'flex',
                    alignItems : 'center'
                }}
            >
                <ArrowDownwardIcon color="error" />
                <Typography
                    color="error"
                    sx={{
                        mr: 1
                    }}
                    variant="body2"
                >
          12%
                </Typography>
                <Typography
                    color="textSecondary"
                    variant="caption"
                >
          Since last month
                </Typography>
            </Box> */}
        </CardContent>
    </Card>
);