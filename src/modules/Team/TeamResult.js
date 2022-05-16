import React from 'react';
import PropTypes from 'prop-types';
import {
    Avatar,
    Box,
    Card,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography
} from '@mui/material';

export const TeamResults = ({ customers}) => {
    return (
        <Card>
            <Box sx={{ minWidth: 1050 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell padding="checkbox">
                            </TableCell>
                            <TableCell>
                                    Name
                            </TableCell>
                            <TableCell>
                                    Email
                            </TableCell>
                            <TableCell>
                                    Location
                            </TableCell>
                            <TableCell>
                                    Phone
                            </TableCell>
                            <TableCell>
                                    Rol
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {customers.map((customer) => (
                            <TableRow
                                hover
                                key={customer.img+customer._id}
                            >
                                <TableCell padding="checkbox">
                                </TableCell>
                                <TableCell>
                                    <Box
                                        sx={{
                                            alignItems : 'center',
                                            display    : 'flex'
                                        }}
                                    >
                                        <Avatar
                                            src={customer.img}
                                            sx={{ mr: 2 }}
                                        >
                                        </Avatar>
                                        <Typography
                                            color="textPrimary"
                                            variant="body1"
                                        >
                                            {`${customer.name} ${customer.lastName}`}
                                        </Typography>
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    {customer.email}
                                </TableCell>
                                <TableCell>
                                    {`${customer.state_code}, ${customer.country}`}
                                </TableCell>
                                <TableCell>
                                    {customer.phone}
                                </TableCell>
                                <TableCell>
                                    {customer.rol}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Box>
        </Card>
    );
};

TeamResults.defaultProps = {
    customers: [],
};
TeamResults.propTypes = {
    customers: PropTypes.array
};