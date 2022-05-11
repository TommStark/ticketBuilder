/* eslint-disable no-undef */
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
import { SeverityPill } from '../SeverityPill';
import {formatDate} from '../Utils';

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

export const DashBoardLastTickets = (props) => (
    <Card>
        <CardHeader title="Latest tickets" />
        <Box sx={{ minWidth: 600 }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                Project
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
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.tickets.map((ticket) => (
                        <TableRow
                            hover
                            key={ticket.start_date}
                        >
                            <TableCell>
                                {ticket.project.name}
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
                        </TableRow>
                    ))}
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
);