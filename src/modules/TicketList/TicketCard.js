/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { Avatar, Box, Card, CardContent, Divider, Grid, Typography } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import SendIcon from '@mui/icons-material/Send';
import ClearIcon from '@mui/icons-material/Clear';
import IconButton from '@mui/material/IconButton';
import StarsIcon from '@mui/icons-material/Stars';
import ScheduleSendIcon from '@mui/icons-material/ScheduleSend';
import { formatDate } from '../Utils';
import { SeverityPill } from '../SeverityPill';

function ProductCard ({ product, setIsLoading, isloading, handleClickOpen, reSendTicket, }) {
    //TODO refactor these block of code
    function pillStatus(isPending, status){
        if(isPending)
            return 'info';
        if(status){
            return 'success';
        }else{
            return 'error';
        }
    }
    function pillLabel(isPending, status){
        if(isPending)
            return 'Pending';
        if(status){
            return 'Merged';
        }else{
            return 'Not merge';
        }
    }

    const frozenProjects = useSelector((state)=> state.TeamMates.projectsByState.frozen);
    const disableButton = frozenProjects.filter( pro => pro.name === product.project.name);

    return(
        <>  
            <Card
                sx={{
                    display       : 'flex',
                    flexDirection : 'column',
                    height        : '100%'
                }}
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
                        sx={{
                            display        : 'flex',
                            justifyContent : 'center',
                            alignItems     : 'center'
                        }}
                    >
                        {(product.details).slice(0,28)}...&nbsp;&nbsp;
                        <SeverityPill
                            color={pillStatus(product.pending, product.isDone)}
                        >
                            {pillLabel(product.pending, product.isDone)}
                        </SeverityPill>
                    </Typography>
                    <Typography  component={'span'} variant="body2" color="text.secondary">
                        <p><strong>Project:</strong>      {product.project.name}</p>
                        <p><strong>Pull Request:</strong>  <a href={product.prLink}> {(product.prLink).substring(0,50)}</a>...</p>
                        <p><strong>Jira:</strong>         <a href={product.ticketLink}>{product.ticketLink}</a></p>
                        <p><strong>Details:</strong>      {product.details}</p>
                        <p><strong>Date:</strong> {formatDate(product.start_date)} </p>
                        <p><strong>Checks:</strong>      {product.checks}</p>
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
                            <Tooltip title="Delete">
                                <IconButton 
                                    aria-label="Delete"
                                    onClick={() => handleClickOpen(product)}
                                >
                                    <ClearIcon color="action" />
                                </IconButton>
                            </Tooltip>
                        </Grid>
                        <Grid
                            item
                            sx={{
                                alignItems : 'center',
                                display    : 'flex'
                            }}
                        >
                            {
                                product.isDone 
                                    ?
                                    <Tooltip title="Congratulations!">
                                        <IconButton 
                                            aria-label="star"
                                            onClick={() => {}}
                                        >
                                            <StarsIcon color="action" />
                                        </IconButton>
                                    </Tooltip>

                                    :
                                    <Tooltip title={disableButton?.length ? 'Frozen Project' : 'Sent to Discord'}>
                                        <span>
                                            <IconButton 
                                                aria-label="sendIcon"
                                                disabled={!!disableButton?.length || false}
                                                onClick={() => reSendTicket(product)}
                                            >
                                                {
                                                    (disableButton?.length && product.pending)
                                                        ?
                                                        <ScheduleSendIcon color="action" />
                                                        :
                                                        <SendIcon color="action" />
                                                }
                                            </IconButton>
                                        </span>
                                    </Tooltip>
                            }
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