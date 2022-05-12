/* eslint-disable react/prop-types */
import React from 'react';
import {
    Box,
    Card,
    CardHeader,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TableSortLabel,
    Tooltip
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import IconButton from '@mui/material/IconButton';
import { formatDate } from '../Utils';
import { SeverityPill } from '../SeverityPill';
import StarsIcon from '@mui/icons-material/Stars';
import ScheduleSendIcon from '@mui/icons-material/ScheduleSend';
import { useDispatch, useSelector } from 'react-redux';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import { createPlainTicketWithAuthor } from '../Utils';
import * as BackendAPI from  '../../services/BackendAPI';
import { ChangeSnackbar } from '../AppSlice';
// eslint-disable-next-line no-undef
const pjson = require('../../../package.json');


export const DashBoardLastTickets = (props) =>{
    const  userId = useSelector((state)=> state.user.data._id); 
    const isAdmin = (userId  === '6267170f8df19de071b278fc' || userId === '626b22d24d0ffea24d6ccc2e');
    const dispatch = useDispatch();

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

    function getChip (author){
        return (
            <Chip avatar={<Avatar>{author.name[0]}</Avatar>} 
                label={author.name}
                variant="outlined"
            />
        );
    }

        
    function sendToDiscordChannel(ticket,project,authorAdmin){
        const plainTicket = createPlainTicketWithAuthor(ticket,project,pjson,authorAdmin);
        
        BackendAPI.sendToDiscordChannel({body: {'ticket': plainTicket}})
            .then( () =>{
                dispatch(ChangeSnackbar({state: true,txt: ' Ticket successfully send to Discord!'}));
                BackendAPI.changePendingStatus({ticket: ticket._id });
            })
            .catch(() =>{
                dispatch(ChangeSnackbar({state: true,txt: ' upss something happend!',severity: 'error'}));
            });    
    }

    const frozenProjects = useSelector((state)=> state.TeamMates.projectsByState.frozen);

    return(
        <Card>
            <CardHeader title="Latest tickets" />
            <Box sx={{ minWidth: 600 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                Project
                            </TableCell>
                            {
                                (isAdmin)
                                    ?
                                    <TableCell>
                                    Author
                                    </TableCell>
                                    :
                                    null
                            }
                            <TableCell>
                Jira ID
                            </TableCell>
                            <TableCell>
                Details
                            </TableCell>
                            <TableCell sortDirection="desc">
                                <Tooltip
                                    enterDelay={300}
                                    title="Sort"
                                >
                                    <TableSortLabel
                                        active
                                        direction="desc"
                                    >
                    Date
                                    </TableSortLabel>
                                </Tooltip>
                            </TableCell>
                            <TableCell>
                Status
                            </TableCell>
                            <TableCell>
                Action
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.tickets.map((ticket) => {
                            const disableButton = frozenProjects.filter( pro => pro.name === ticket.project.name);

                            return (
                                <TableRow
                                    hover
                                    key={ticket.start_date}
                                >
                                    <TableCell>
                                        {ticket.project.name}
                                    </TableCell>
                                    {
                                        (isAdmin)
                                            ?
                                            <TableCell>
                                                {getChip(ticket.author)}
                                            </TableCell>
                                            :
                                            null
                                    }
                                    <TableCell>
                                        {(ticket.ticketLink).split('-')[1]}
                                    </TableCell>
                                    <TableCell>
                                        {ticket.details}
                                    </TableCell>
                                    <TableCell>
                                        {formatDate(ticket.start_date)}
                                    </TableCell>
                                    <TableCell>
                                        <SeverityPill
                                            color={pillStatus(ticket.pending, ticket.isDone)}
                                        >
                                            {pillLabel(ticket.pending, ticket.isDone)}
                                        </SeverityPill>
                                    </TableCell>
                                    <TableCell>
                                        {
                                            ticket.isDone 
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
                                                            onClick={() => sendToDiscordChannel(ticket,ticket.project,ticket.author)}
                                                        >
                                                            {
                                                                (disableButton?.length && ticket.pending)
                                                                    ?
                                                                    <ScheduleSendIcon color="action" />
                                                                    :
                                                                    <SendIcon color="action" />
                                                            }
                                                        </IconButton>
                                                    </span>
                                                </Tooltip>
                                        }
                                    </TableCell>
                                </TableRow>
                            );})}
                    </TableBody>
                </Table>
            </Box>
            {/* <Box
            sx={{
                display        : 'flex',
                justifyContent : 'flex-end',
                p              : 2
            }}
        >
                                                    

            <Button
                color="primary"
                endIcon={<ArrowRightIcon fontSize="small" />}
                size="small"
                variant="text"
            >
        View all
            </Button>
        </Box> */}
        </Card>
    );};