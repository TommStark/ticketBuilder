/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Box, Container, Grid, Pagination, Typography } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import { useSelector, useDispatch } from 'react-redux';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ProductCard from './TicketCard';
import * as BackendAPI from  '../../services/BackendAPI';
import { addTickets } from '../../modules/login/loginSlice';
import { ChangeSnackbar } from '../AppSlice';
const pjson = require('../../../package.json');


function TicketListContainer () {
    const [tickets, SetTickets]=useState([]);
    const dispatch = useDispatch();
    const [isLoading, setIsLoading]=useState(true);
    const ticketList = useSelector((state)=> state.user?.tickets?.tickets);
    const [ticketToDelete, setTicketTodelete] = useState('');
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = (ticket) => {
        setOpen(true);
        setTicketTodelete(ticket);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = () =>{
        setIsLoading(true);
        const params ={
            authorId : ticketToDelete.author._id,
            ticket   : ticketToDelete._id,
            body     : {
                name: ticketToDelete.project.name
            }
        };
        BackendAPI.removeTicket({ticket: ticketToDelete._id})
            .then( () =>{
                BackendAPI.removeTicketFromProject(params)
                    .then(() => {
                        BackendAPI.removeTicketFromAuthor(params)
                            .then(() => {
                                setIsLoading(false);
                            });
                    });
            });
        dispatch(ChangeSnackbar({state: true,txt: ' The ticket was successfully delete!'}));
        setTicketTodelete('');
        setOpen(false);
    };

    const reSendTicket = (ticket) => {
        const formatTicket = {
            ...ticket,
            project      : ticket.project.name,
            projectColor : ticket.project.color,
            id           : ticket._id,
            version      : pjson.version,
        };
    
        BackendAPI.sendToDiscordChannel({body: {'ticket': formatTicket}})
            .then( () =>{
                dispatch(ChangeSnackbar({state: true,txt: ' Ticket successfully send to Discord!'}));
                BackendAPI.changePendingStatus({ticket: ticket._id });
            })
            .catch(() =>{
                dispatch(ChangeSnackbar({state: true,txt: ' upss something happend!',severity: 'error'}));
            });
    };
    
    useEffect(()=>{
        if( ticketList ){
            SetTickets([...ticketList].reverse());
            setIsLoading(false);
        } 
    },[ticketList]);

    useEffect(() => {
        BackendAPI.getTicketsByAuthor()
            .then(res => {
                if(res.data){
                    dispatch(addTickets(res.data));
                    setIsLoading(false);
                }
            });
    },[isLoading,setIsLoading]);

    return (
        <>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
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
                                (ticketList.length ? 'Tickets' : 'you do not have tickets yet')
                                :
                                <Skeleton height={'6vh'}  width={'30%'}/>
                        }
                    </Typography>
                    {/* <ProductListToolbar /> */}
                    <Box sx={{ pt: 3 }}>
                        <Grid
                            container
                            spacing={3}
                        >
                            {                                    
                                !isLoading
                                    ?
                                    (
                                        tickets.map((ticket) => (
                                            <Grid
                                                item
                                                key={ticket.id}
                                                lg={4}
                                                md={6}
                                                xs={12}
                                            >

                                                <ProductCard 
                                                    product={ticket} 
                                                    isLoading={isLoading} 
                                                    setIsLoading={setIsLoading} 
                                                    handleClickOpen={handleClickOpen}
                                                    reSendTicket={reSendTicket}
                                                />
                                            </Grid>))
                                        
                                    )
                                    :
                                    (
                                        [...Array(6)].map((index) => (
                                            <Grid
                                                item
                                                key={index}
                                                lg={4}
                                                md={6}
                                                xs={12}
                                            >

                                                <>
                                                    <Skeleton variant="rectangular"  height={'28vh'} />
                                                    <Skeleton height={'9vh'} />
                                                </>

                                            </Grid>
                                        )
                                        ))

                            }
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
            </Box>
            <div>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {'Confirm Delete!'}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Are you sure you want to delete this item?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>No</Button>
                        <Button onClick={handleDelete} autoFocus>
                                Yes
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </>
    );
}
export default TicketListContainer;