/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import * as BackendAPI from  '../../services/BackendAPI';
import { Avatar, Box, Card, CardContent, Divider, Grid, Typography } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import SendIcon from '@mui/icons-material/Send';
import ClearIcon from '@mui/icons-material/Clear';
import IconButton from '@mui/material/IconButton';
import { formatDate } from '../Utils';

function ProductCard ({ product, setIsLoading, isloading, handleClickOpen, reSendTicket, ...rest }) {
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
                        <p><strong>Merged:</strong> {product.isDone ? ` ${formatDate(product.end_date)}` : 'No yet'}</p>
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
                                    aria-label="sendIcon"
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
                            <Tooltip title="Sent to Discord">
                                <IconButton 
                                    aria-label="sendIcon"
                                    onClick={() => reSendTicket(product)}
                                >
                                    <SendIcon color="action" />
                                </IconButton>
                            </Tooltip>
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