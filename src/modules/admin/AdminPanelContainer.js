/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Box, Container, Grid, Skeleton, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { DashBoardLastTickets } from '../dashboard/DashBoardLastTickets';
import  AdminPanelStatus from './AdminPanelStatus';
import DashboardByProject from './AdminPanelRadar';
import AdminPanelTicketBuilder from './AdminPanelTicketBuilder';
import { DashboardChart } from '../dashboard/DashBoardChart';

function DashboardContainer () {
    const [isLoading, setIsLoading]=useState(true);
    const tickets = useSelector((state)=> state.user.tickets.tickets);
    const teamTickes = useSelector((state)=> state.DashBoard.teamTickets);
    const projectsStatus = useSelector((state)=> state.TeamMates.projects);
    const projectsByUser = useSelector((state)=> state.DashBoard.projectsByUsers.userProjects);
    const x = tickets.map(t =>  new Date(Date.parse(t.start_date)).toJSON().slice(0,10));
    const y = teamTickes.map(t =>  new Date(Date.parse(t.start_date)).toJSON().slice(0,10));
    const team =(useSelector((state)=> state.TeamMates?.users)) ?? []; 
    const colors =(useSelector((state)=> state.app.colors)) ?? []; 
    
    useEffect(()=>{
        (!!( projectsStatus.length) && setIsLoading(false));
    },[tickets,teamTickes,projectsByUser]);

    return (
        <>
            <Box
                component="main"
                sx={{
                    flexGrow : 1,
                    py       : 2
                }}
            >   
                <Container maxWidth={false}>
                    <Typography
                        sx={{ mb: 3 }}
                        variant="h4"
                    >
                        {                                    
                            !isLoading  
                                ?
                                'Admin Panel'
                                :
                                <Skeleton height={'6vh'}  width={'30%'}/>
                        }
                    </Typography>
                    <Grid
                        container
                        spacing={3}
                    >
                        <Grid
                            item
                            lg={6}
                            md={6}
                            xl={3}
                            xs={12}
                        >
                            {
                                isLoading
                                    ? <Skeleton variant="rectangular" height={500} sx={{margin: 0}}/>
                                    : <AdminPanelStatus projectsStatus={ projectsStatus } />
                            }
                        </Grid>
                        <Grid
                            item
                            lg={6}
                            md={6}
                            xl={3}
                            xs={12}
                        >
                            {
                                isLoading
                                    ? <Skeleton variant="rectangular" height={500} sx={{margin: 0}}/>
                                    : <DashboardByProject />

                            }
                        </Grid>
                        <Grid
                            item
                            lg={12}
                            md={12}
                            xl={6}
                            xs={12}
                        >
                            {
                                isLoading
                                    ? <Skeleton variant="rectangular" height={500} sx={{margin: 0}}/>
                                    : <AdminPanelTicketBuilder projectsStatus={projectsStatus} />

                            }
                        </Grid>
                        <Grid
                            item
                            lg={12}
                            md={12}
                            xl={12}
                            xs={12}
                        >
                            {
                                isLoading
                                    ? <Skeleton variant="rectangular" height={400} sx={{margin: 0}}/>
                                    :
                                    <DashboardChart
                                        x={x}
                                        y={y}
                                        team={team}
                                        admin={true}
                                        colors={colors}
                                    />
                            }
                        </Grid>
                        <Grid
                            item
                            lg={12}
                            md={12}
                            xl={12}
                            xs={12}
                        >
                            {
                                isLoading
                                    ? <Skeleton variant="rectangular" height={400} sx={{margin: 0}}/>
                                    :
                                    <DashBoardLastTickets
                                        tickets={[...teamTickes].reverse().slice(0,10)}
                                    />
                            }
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </>
    );
}

export default DashboardContainer;