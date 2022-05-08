import React, {useEffect, useState} from 'react';
import { Box, Container } from '@mui/material';
import { TeamResults } from './TeamResult';
import { useSelector } from 'react-redux';

function TeamContainer () {
    const [teamMates, setTeamMates] = useState([]);
    
    const team =(useSelector((state)=> state.TeamMates?.users)) ?? [];
    
    console.log(team);
    
    useEffect(()=>{
        team ? setTeamMates(team) : null;
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
                <Box sx={{ mt: 3 }}>
                    <TeamResults customers={teamMates} />
                </Box>
            </Container>
        </Box>
    );}


export default TeamContainer;