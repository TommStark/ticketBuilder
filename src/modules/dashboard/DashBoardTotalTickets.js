/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import { Avatar, Box, Card, CardContent, Grid, Typography, LinearProgress} from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

export const DashBoardTotalTickets = (props) => {
    let isPositive;
    let porcentaje;
    let diff;

    if(props.showPorcentage){
        const pastMonth = new Date().getMonth();
    
        let pastMonthTickets = props.allTickets.filter(ticket => new Date(ticket.start_date).getMonth()+1 === pastMonth);
    
        const thisMonthTickets = props.tickets.length || 1;
        pastMonthTickets = pastMonthTickets.length;
    
        isPositive = thisMonthTickets > pastMonthTickets;

        if (pastMonthTickets > 0){
            if(thisMonthTickets > pastMonthTickets){
                diff = thisMonthTickets - pastMonthTickets;
            }else if( thisMonthTickets < pastMonthTickets ){
                diff = pastMonthTickets - thisMonthTickets;
            }
            
            porcentaje = Math.round((diff / pastMonthTickets)*100);
        }else{
            porcentaje = Math.round(thisMonthTickets*100);
        }
    }
    if(props.teamTotal && props.total > 0){        
        porcentaje = Math.round((props.total * 100)/ props.teamTotal);
    }

    return (
        <Card
            sx={{ height: '100%' }}
        >
            <CardContent>
                <Grid
                    container
                    spacing={3}
                    sx={{ justifyContent: 'space-between' }}
                >
                    <Grid item>
                        <Typography
                            color="textSecondary"
                            gutterBottom
                            variant="overline"
                        >
                            {props.title}
                        </Typography>
                        <Typography
                            color="textPrimary"
                            variant="h4"
                        >
                            {props.total} Tickets
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Avatar
                            sx={{
                                backgroundColor : `${props.color}.main`,
                                height          : 56,
                                width           : 56
                            }}
                        >
                            {props.icon}
                        </Avatar>
                    </Grid>
                </Grid>
                {
                    props.showPorcentage && props.total !== 0
                        ?
                        <Box
                            sx={{
                                pt         : 2,
                                display    : 'flex',
                                alignItems : 'center'
                            }}
                        >
                            {   isPositive
                                ?
                                <ArrowUpwardIcon color="success" />
                                :
                                <ArrowDownwardIcon color='error' />
                            }
                            <Typography
                                color={isPositive ? 'green' : 'error'}
                                sx={{
                                    mr: 1
                                }}
                                variant="body2"
                            >
                                {porcentaje}%
                            </Typography>
                            <Typography
                                color="textSecondary"
                                variant="caption"
                            >
                                Since last month
                            </Typography>
                        </Box>

                        :  null
                }
                {
                    props.teamTotal && props.total > 0
                        ?
                        <Box sx={{ pt: 3 }}>
                            <LinearProgress
                                value={porcentaje || 100}
                                variant="determinate"
                            />
                        </Box>
                        : null
                }  
            </CardContent>
        </Card>
    );
};