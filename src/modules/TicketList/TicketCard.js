/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Box, Card, CardContent, Divider, Grid, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import ClearIcon from '@mui/icons-material/Clear';

function formatDate(date){
    return date.split('T')[0];
}

export const ProductCard = ({ product, ...rest }) => (
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
                    <SendIcon color="action" />
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
                        {product.totalDownloads}
                        {' '}
                        Detele
                    </Typography>
                    <ClearIcon color="action" />
                </Grid>
            </Grid>
        </Box>
    </Card>
);

ProductCard.propTypes = {
    product: PropTypes.object.isRequired
};