/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import * as BackendAPI from  '../../services/BackendAPI';
import { Avatar, Box, Card, CardContent, Divider, Grid, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import ClearIcon from '@mui/icons-material/Clear';
import IconButton from '@mui/material/IconButton';


function ProductCard ({ product, setIsLoading, isloading, ...rest }) {
    function formatDate(date){
        return date.split('T')[0];
    }
    
    function reSendTicket(ticket){
        setIsLoading(true);
        const formatTicket = {
            ...ticket,
            project      : ticket.project.name,
            projectColor : ticket.project.color   
        };
    
        BackendAPI.sendToDiscordChannel({body: {'ticket': formatTicket}})
            .then( () =>{
                setIsLoading(false);
            });
    }
    
    function deleteTicket(ticket){
        setIsLoading(true);
        const params ={
            authorId : ticket.author._id,
            ticket   : ticket._id,
            body     : {
                name: ticket.project.name
            }
        };

        BackendAPI.removeTicket({ticket: ticket._id})
            .then( () =>{
                BackendAPI.removeTicketFromProject(params)
                    .then(() => {
                        BackendAPI.removeTicketFromAuthor(params)
                            .then(() => {
                                setIsLoading(false);
                            });
                    });
            });
    }
    
    return(
        <>  
            <Card
                sx={{
                    display       : 'flex',
                    flexDirection : 'column',
                    height        : '100%'
                }}
                {...rest}
            >
                <CardContent>
                    <Box
                        sx={{
                            display        : 'flex',
                            justifyContent : 'center',
                            pb             : 3
                        }}
                    >
                        <Avatar sx={{ bgcolor: product.project.color }} aria-label={product.author.name}>
                            {product.project.name[0]}
                        </Avatar>
                    </Box>
                    <Typography
                        align="center"
                        color="textPrimary"
                        gutterBottom
                        variant="h5"
                    >
                        {product.project.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        <p><strong>Pull Request:</strong> <a href={product.prLink}> {(product.prLink).substring(0,50)}</a>...</p>
                        <p><strong>Jira:</strong>         <a href={product.ticketLink}>{product.ticketLink}</a></p>
                        <p><strong>Details:</strong>      {product.details}</p>
                        <p><strong>Checks:</strong>      {product.checks}</p>
                        <p><strong>Merged:</strong> {product.isDone ? `Yes on ${formatDate(product.end_date)}` : 'No yet'}</p>
                    </Typography>
                </CardContent>
                <Box sx={{ flexGrow: 1 }} />
                <Divider />
                <Box sx={{ p: 2 }}>
                    <Grid
                        container
                        spacing={2}
                        sx={{ justifyContent: 'space-between' }}
                    >
                        <Grid
                            item
                            sx={{
                                alignItems : 'center',
                                display    : 'flex'
                            }}
                        >
                            <Typography
                                color="textSecondary"
                                display="inline"
                                sx={{ pr: 1 }}
                                variant="body2"
                            >
                        To discord
                            </Typography>
                            <IconButton 
                                aria-label="sendIcon"
                                onClick={() => reSendTicket(product)}
                            >
                                <SendIcon color="action" />
                            </IconButton>
                        </Grid>
                        <Grid
                            item
                            sx={{
                                alignItems : 'center',
                                display    : 'flex'
                            }}
                        >
                            <Typography
                                color="textSecondary"
                                display="inline"
                                sx={{ pr: 1 }}
                                variant="body2"
                            >
                        Delete
                            </Typography>
                            <IconButton 
                                aria-label="sendIcon"
                                onClick={() => deleteTicket(product)}
                            >
                                <ClearIcon color="action" />
                            </IconButton>
                        </Grid>
                    </Grid>
                </Box>
            </Card>
        
        </>
    );
}

ProductCard.propTypes = {
    product: PropTypes.object.isRequired
};

export default ProductCard;