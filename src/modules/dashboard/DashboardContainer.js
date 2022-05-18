/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Box, Container, Grid, Skeleton, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import GroupIcon from '@mui/icons-material/Group';
import PersonIcon from '@mui/icons-material/Person';
import DashboardByProject from './DashboardByProject';
import DashBoardGraph from './DashBoardGraph';
import { DashBoardTotalTickets } from './DashBoardTotalTickets';
import { DashBoardLastTickets } from './DashBoardLastTickets';
import { DashBoardProjectStatus } from './DashBoardProjectStatus';
import { DashboardChart } from './DashBoardChart';

function DashboardContainer () {
    const [isLoading, setIsLoading]=useState(true);
    const tickets = useSelector((state)=> state.user.tickets.tickets);
    const teamTickes = useSelector((state)=> state.DashBoard.teamTickets);
    const projectsStatus = useSelector((state)=> state.TeamMates.projects);
    const projectsByUser = useSelector((state)=> state.DashBoard.projectsByUsers.userProjects);
    const colors  = useSelector((state)=> state.DashBoard.projectsByUsers.colors);
    const graph = useSelector((state)=> state.DashBoard.projectsByUsers.graph);
    const x = tickets.map(t =>  new Date(Date.parse(t.start_date)).toJSON().slice(0,10));
    const y = teamTickes.map(t =>  new Date(Date.parse(t.start_date)).toJSON().slice(0,10));
    const thisMonth = new Date().getMonth()+1;
    const thisMonthTickets = tickets.filter(ticket => new Date(ticket.start_date).getMonth()+1 === thisMonth);
    const thisMonthTeamTickets = teamTickes.filter(ticket => new Date(ticket.start_date).getMonth()+1 === thisMonth);

    useEffect(()=>{
        (!!(colors.length || projectsStatus.length) && setIsLoading(false));
    },[tickets,teamTickes,graph,colors,projectsByUser]);

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
                                'Dashboard'
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
                            lg={12}
                            sm={12}
                            xl={12}
                            xs={12}
                        >
                            {
                                isLoading
                                    ? <Skeleton variant="rectangular" height={'12vh'} sx={{margin: 0}}/>
                                    :
                                    <DashBoardProjectStatus
                                        projectsStatus={projectsStatus}
                                        title={'Project Status'}
                                    />}
                        </Grid>
                        <Grid
                            item
                            xl={3}
                            lg={6}
                            sm={6}
                            xs={12}
                        >
                            {
                                isLoading
                                    ? <Skeleton  variant="rectangular" height={'12vh'} sx={{margin: 0}}/>
                                    :
                                    <DashBoardTotalTickets
                                        total={thisMonthTickets.length}
                                        title={'Your Tickets this month'}
                                        icon={<PersonIcon/>}
                                        tickets={thisMonthTickets}
                                        color={'info'}
                                        allTickets={tickets}
                                        showPorcentage={true}
                                    />
                            }
                        </Grid>
                        <Grid
                            item
                            xl={3}
                            lg={6}
                            sm={6}
                            xs={12}
                        >
                            {
                                isLoading
                                    ? <Skeleton  variant="rectangular" height={'12vh'} sx={{margin: 0}}/>
                                    :
                                    <DashBoardTotalTickets
                                        total={tickets.length}
                                        title={'Your Tickets TOTAL'}
                                        icon={<PersonIcon/>}
                                        tickets={tickets}
                                        color={'error'}
                                        allTickets={tickets}
                                        showPorcentage={false}
                                        teamTotal={teamTickes.length}
                                    />
                            }
                        </Grid>
                        <Grid
                            item
                            xl={3}
                            lg={6}
                            sm={6}
                            xs={12}
                        >
                            {
                                isLoading
                                    ? <Skeleton variant="rectangular" height={'12vh'} sx={{margin: 0}}/>
                                    :
                                    <DashBoardTotalTickets
                                        total={thisMonthTeamTickets.length}
                                        title={'Team Tickets this month'}
                                        icon={<GroupIcon/>}
                                        tickets={thisMonthTeamTickets}
                                        allTickets={teamTickes}
                                        color={'secondary'}
                                        showPorcentage={true}
                                    />
                            }
                        </Grid>
                        <Grid
                            item
                            xl={3}
                            lg={6}
                            sm={6}
                            xs={12}
                        >
                            {
                                isLoading
                                    ? <Skeleton variant="rectangular" height={'12vh'} sx={{margin: 0}}/>
                                    :
                                    <DashBoardTotalTickets
                                        total={teamTickes.length}
                                        title={'Team Tickets total'}
                                        icon={<GroupIcon/>}
                                        tickets={teamTickes}
                                        color={'warning'}
                                        allTickets={teamTickes}
                                        showPorcentage={false}
                                        teamTotal={teamTickes.length}
                                    />
                            }
                        </Grid>

                        <Grid
                            item
                            lg={8}
                            md={12}
                            xl={9}
                            xs={12}
                        >
                            {
                                isLoading
                                    ? <Skeleton variant="rectangular" height={500} sx={{margin: 0}}/>
                                    :
                                    <DashboardChart
                                        x={x}
                                        y={y}
                                    />
                            }
                        </Grid>
                        <Grid
                            item
                            lg={4}
                            md={6}
                            xl={3}
                            xs={12}
                        >
                            {
                                isLoading
                                    ? <Skeleton variant="rectangular" height={500} sx={{margin: 0}}/>
                                    :
                                    <DashboardByProject 
                                        sx={{ height: '100%' }} 
                                        colors={colors}
                                        projectsByUser={projectsByUser}
                                    />
                            }
                        </Grid>
                        <Grid
                            item
                            lg={4}
                            md={6}
                            xl={3}
                            xs={12}
                        >
                            {
                                isLoading
                                    ? <Skeleton variant="rectangular" height={400} sx={{margin: 0}}/>
                                    :
                                    <DashBoardGraph 
                                        sx={{ height: '100%' }}
                                        allTickets={graph}
                                    />
                            }
                        </Grid>
                        <Grid
                            item
                            lg={8}
                            md={12}
                            xl={9}
                            xs={12}
                        >
                            {
                                isLoading
                                    ? <Skeleton variant="rectangular" height={400} sx={{margin: 0}}/>
                                    :
                                    <DashBoardLastTickets
                                        tickets={[...tickets].reverse().slice(0,8)}
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