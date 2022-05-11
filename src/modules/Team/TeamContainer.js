import React, {useEffect, useState} from 'react';
import { Avatar, Box, Container, Skeleton, Typography } from '@mui/material';
import { TeamResults } from './TeamResult';
import { useSelector } from 'react-redux';

function TeamContainer () {
    const [teamMates, setTeamMates] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const SkeletonArr = [...Array(5)];
    const team =(useSelector((state)=> state.TeamMates?.users)) ?? []; 
    
    useEffect(()=>{
        if(team.length){
            setTeamMates(team);
            setIsLoading(false);
        }
    },[team]);

    return (
        <Box
            component="main"
            sx={{
                flexGrow : 1,
                py       : 1
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
                            'Dream Team'
                            :
                            <Skeleton height={'6vh'}  width={'30%'}/>
                    }
                </Typography>
                <Box sx={{ mt: 3 }}>
                    {
                        isLoading
                            ?
                            (
                                <Box>
                                    <Skeleton width="100%" height={'9vh'}/>
                                    {SkeletonArr.map((index) => (
                                        <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
                                            <Box sx={{ margin: 1 }}>
                                                <Skeleton variant="circular">
                                                    <Avatar />
                                                </Skeleton>
                                            </Box>
                                            <Box sx={{ width: '100%' }}>
                                                <Skeleton width="100%" height={'9vh'}/>
                                            </Box>
                                        </Box>
                                    )
                                    )}
                                    <Skeleton width="100%" height={'9vh'}/>
                                </Box>
                            )

                            :
                            <TeamResults customers={teamMates} />
                    }
                </Box>
            </Container>
        </Box>
    );}


export default TeamContainer;