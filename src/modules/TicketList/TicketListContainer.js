import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import * as BackendAPI from  '../../services/BackendAPI';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

function TicketListContainer() {
    const [tickets, SetTickets]=useState([]);
    const [isLoading, setIsLoading]=useState(true);

    function getTicketsByUsers(){
        BackendAPI.getTicketsByAuthor()
            .then(res => {
                if(res.data){
                    SetTickets((res.data.tickets).reverse());
                    setIsLoading(false);
                }
            })
            .catch(() => {
                setIsLoading(false);});
    }
    useEffect(() =>{
        getTicketsByUsers();
    },[]);

    function formatDate(date){
        return date.split('T')[0];
    }

    function renderGhostBox(){
        if (tickets.length % 2 === 1){
            return <Card sx={{ width: 400, maxWidth: 400, margin: '1vh', borderRadius: '5%', padding: '1vh', backgroundColor: 'transparent' }}/>;
        }
        return null;
    }

    return ( 
        <>
            <div className='txt-align'>
                {  
                    tickets.length != 0
                        ? <h1 className='gradient__text'> Your tickets Through time</h1>
                        : null
                }
            </div>
            <header className="App-header">
                {   isLoading 
                    ?
                    <CircularProgress color="secondary"  size='5rem'/>
                    :
                    <>
                        <Box sx={{
                            display        : 'flex',
                            flexWrap       : 'wrap',
                            justifyContent : 'center',
                            width          : 900,
                        }}>
                            {tickets &&
                    tickets.map( (ticket,index) => 
                        <Card sx={{ width: 400, maxWidth: 400, margin: '1vh', borderRadius: '5%', padding: '1vh' }} key={ticket.id + index}>
                            <CardHeader
                                avatar={
                                    <Avatar sx={{ bgcolor: ticket.project.color }} aria-label={ticket.author.name}>
                                        {ticket.project.name[0]}
                                    </Avatar>
                                }
                                title={`Project ${ticket.project.name}`}
                                subheader={formatDate(ticket.start_date)}
                            />
                            <CardContent>
                                <Typography variant="body2" color="text.secondary">
                                    <p><strong>Pull Request:</strong> <a href={ticket.prLink}> {(ticket.prLink).substring(0,35)}</a>...</p>
                                    <p><strong>Jira:</strong>         <a href={ticket.prLink}>{ticket.ticketLink.substring(0,45)}</a>...</p>
                                    <p><strong>Details:</strong>      {ticket.details.substring(0,35)}...</p>
                                    <p><strong>Checks:</strong>      {ticket.checks}</p>
                                    <p><strong>Merged:</strong> {ticket.isDone ? `Yes on ${formatDate(ticket.end_date)}` : 'No yet'}</p>
                                </Typography>
                            </CardContent>
                        </Card>
                    )
                            }
                            {
                                tickets.length === 0
                                    ? <h1 className='gradient__text'>You do not have tickets yet</h1>
                                    : null
                            }
                            {
                                renderGhostBox()
                            }
                        </Box>
                    </>
                }
            </header>
        </>
    );
}

export default TicketListContainer;