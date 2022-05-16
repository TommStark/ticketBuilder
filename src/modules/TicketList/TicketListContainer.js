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
import { addTicketsPaginate } from '../../modules/login/loginSlice';
import { ChangeSnackbar } from '../AppSlice';


function TicketListContainer () {
    const [tickets, SetTickets]=useState([]);
    const dispatch = useDispatch();
    const [isLoading, setIsLoading]=useState(true);
    const [ticketToDelete, setTicketTodelete] = useState('');
    const [open, setOpen] = React.useState(false);
    const appVersion = useSelector((state)=> state.app.news.version);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const perPage = 6;
    const ticketListPaginate = useSelector((state)=> state.user.tickets?.paginated?.tickets);

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
            ticket : ticketToDelete._id,
            body   : {
                name: ticketToDelete.project.name
            }
        };
        BackendAPI.removeTicket({ticket: ticketToDelete._id});
        BackendAPI.removeTicketFromProject(params);
        BackendAPI.removeTicketFromAuthor(params);
        dispatch(ChangeSnackbar({state: true,txt: ' The ticket was successfully delete!'}));
        setTicketTodelete('');
        setIsLoading(false);
        setOpen(false);
    };

    const reSendTicket = (ticket) => {
        const formatTicket = {
            ...ticket,
            project      : ticket.project.name,
            projectColor : ticket.project.color,
            id           : ticket._id,
            version      : appVersion,
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
        if( ticketListPaginate && ticketListPaginate?.length ){
            SetTickets(ticketListPaginate);
            setIsLoading(false);
        } 
    },[ticketListPaginate]);

    const handleChange = (_event, value) => {
        setPage(value);
    };
    useEffect(() => {
        let unmounted = false;
        BackendAPI.ticketsUserPagination({from: page,limit: perPage})
            .then(res => {
                if(res.data){
                    if (!unmounted) {
                        dispatch(addTicketsPaginate(res.data));
                        setTotalPages(res.data.pages);
                        setIsLoading(false);
                    }
                }
            });
        return function () {
            unmounted = true;
        };
    },[isLoading,setIsLoading,page]);

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
                                (ticketListPaginate && ticketListPaginate.length ? 'Tickets' : null)
                                :
                                <Skeleton height={'6vh'}  width={'30%'}/>
                        }
                    </Typography>
                    <Box sx={{ pt: 3 }}>
                        <Grid
                            container
                            spacing={3}
                        >
                            {                                    
                                !isLoading
                                    ?
                                    (
                                        tickets.map((ticket, index) => (
                                            <Grid
                                                item
                                                key={ticket + index + new Date()}
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
                                        [...Array(6)].map((_item,index) => (
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
                    <Box
                        sx={{
                            display        : 'flex',
                            justifyContent : 'center',
                            pt             : 4,
                            pb             : 4,
                        }}
                    >
                        <Pagination
                            color="primary"
                            count={totalPages}
                            size="small"
                            page={page} 
                            onChange={handleChange}
                        />
                    </Box>
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