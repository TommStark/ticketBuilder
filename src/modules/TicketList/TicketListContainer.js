/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Box, Container, Grid, Pagination } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { useSelector } from 'react-redux';
import ProductCard from './TicketCard';
import * as BackendAPI from  '../../services/BackendAPI';
import { useDispatch } from 'react-redux';
import { addTickets } from '../../modules/login/loginSlice';


function TicketListContainer () {
    const [tickets, SetTickets]=useState([]);
    const dispatch = useDispatch();

    const [isLoading, setIsLoading]=useState(true);
    const ticketList = useSelector((state)=> state.user?.tickets?.tickets);

    useEffect(()=>{
        ticketList && SetTickets([...ticketList].reverse());
        setIsLoading(false);
    },[ticketList]);

    useEffect(() => {
        BackendAPI.getTicketsByAuthor()
            .then(res => {
                if(res.data){
                    dispatch(addTickets(res.data));
                }
            });
    },[isLoading,setIsLoading]);

    return (
        <>
            <Box
                component="main"
                sx={{
                    flexGrow : 1,
                    py       : 8
                }}
            >
                {isLoading
                    ? 
                    <CircularProgress color="secondary"  size='5rem'/>
                    :
                    <Container maxWidth={false}>
                        {/* <ProductListToolbar /> */}
                        <Box sx={{ pt: 3 }}>
                            <Grid
                                container
                                spacing={3}
                            >
                                {tickets.map((ticket) => (
                                    <Grid
                                        item
                                        key={ticket.id}
                                        lg={4}
                                        md={6}
                                        xs={12}
                                    >
                                        <ProductCard product={ticket} isLoading={isLoading} setIsLoading={setIsLoading} />
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                        {/* <Box
                        sx={{
                            display        : 'flex',
                            justifyContent : 'center',
                            pt             : 3
                        }}
                    >
                        <Pagination
                            color="primary"
                            count={3}
                            size="small"
                        />
                    </Box> */}
                    </Container>
                }
            </Box>
        </>
    );
}
export default TicketListContainer;