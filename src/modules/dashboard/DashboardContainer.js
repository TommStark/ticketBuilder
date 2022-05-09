/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Box, Container, Grid, Skeleton } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import GroupIcon from '@mui/icons-material/Group';
import PersonIcon from '@mui/icons-material/Person';
import * as BackendAPI from  '../../services/BackendAPI';
import DashboardByProject from './DashboardByProject';
import DashBoardGraph from './DashBoardGraph';
import { DashBoardTotalTickets } from './DashBoardTotalTickets';
import { DashBoardLastTickets } from './DashBoardLastTickets';
import { DashBoardProjectStatus } from './DashBoardProjectStatus';
import { DashboardChart } from './DashBoardChart';

function DashboardContainer () {
    const [ProjectsByUser, setProjectsByUser] = useState([]);
    const [colors, setColors] = useState([]);
    const [graph, setGraph] = useState([]);
    const [isLoading, setIsLoading]=useState(true);
    const [tickets, SetTickets]=useState([]);
    const [teamTickes, setTeamTickets]=useState([]);
    const [ProjectsStatus, setProjectsStatus]=useState([]);
    const dispatch = useDispatch();
    
    const x = tickets.map(t =>  new Date(Date.parse(t.start_date)).toJSON().slice(0,10));
    const y = teamTickes.map(t =>  new Date(Date.parse(t.start_date)).toJSON().slice(0,10));

    useEffect(()=>{
        (!!(tickets.length && teamTickes.length && graph.length && colors.length && ProjectsByUser.length) && setIsLoading(false));
    },[tickets,teamTickes,graph,colors,ProjectsByUser]);

    function getTicketsByUsers(){
        BackendAPI.getTicketsByAuthor()
            .then(res => {
                if(res.data){
                    SetTickets(res.data.tickets);
                }
            });
        BackendAPI.getTeamTickets()
            .then(res => {
                if(res.data){
                    setTeamTickets(res.data.tickets);
                }
            });
    }
    useEffect(() =>{
        getTicketsByUsers();
    },[]);

    function getProjectByUsers(){
        BackendAPI.getProjectByUsers()
            .then(res => {
                if(res.data){
                    setGraph(res.data.stats.radarChart);
                    setColors(res.data.stats.colors);
                    setProjectsByUser(res.data.stats.pieChart);
                }
            })
            .catch(() => {
                setIsLoading(false);
                window.location.reload();
            });
        BackendAPI.getAllProjects()
            .then(res => {
                if(res.data){
                    setProjectsStatus(res.data);
                }
            })
            .catch(() => {
                setIsLoading(false);
            });
    }

    useEffect(() =>{
        getProjectByUsers();
    },[]);


    return (
        <>
            <Box
                component="main"
                sx={{
                    flexGrow : 1,
                    py       : 8
                }}
            >
                <Container maxWidth={false}>
                    <Grid
                        container
                        spacing={3}
                    >
                        <Grid
                            item
                            lg={6}
                            sm={12}
                            xl={6}
                            xs={12}
                        >
                            {
                                isLoading
                                    ? <Skeleton variant="rectangular" height={'12vh'} sx={{margin: 0}}/>
                                    :
                                    <DashBoardProjectStatus
                                        ProjectsStatus={ProjectsStatus}
                                        title={'Project Status'}
                                    />}
                        </Grid>
                        <Grid
                            item
                            xl={3}
                            lg={3}
                            sm={6}
                            xs={12}
                        >
                            {
                                isLoading
                                    ? <Skeleton  variant="rectangular" height={'12vh'} sx={{margin: 0}}/>
                                    :
                                    <DashBoardTotalTickets
                                        total={tickets.length}
                                        title={'Your Tickets'}
                                        icon={<PersonIcon/>}
                                    />
                            }
                        </Grid>
                        <Grid
                            item
                            xl={3}
                            lg={3}
                            sm={6}
                            xs={12}
                        >
                            {
                                isLoading
                                    ? <Skeleton variant="rectangular" height={'12vh'} sx={{margin: 0}}/>
                                    :
                                    <DashBoardTotalTickets
                                        total={teamTickes.length}
                                        title={'Team Tickets'}
                                        icon={<GroupIcon/>}
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
                                        ProjectsByUser={ProjectsByUser}
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