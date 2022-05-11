/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
    Avatar,
    Box,
    Card,
    Checkbox,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    Typography
} from '@mui/material';

const getInitials = (name = '') => name
    .replace(/\s+/, ' ')
    .split(' ')
    .slice(0, 2)
    .map((v) => v && v[0].toUpperCase())
    .join('');

export const TeamResults = ({ customers, ...rest }) => {
    const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(0);

    const handleSelectAll = (event) => {
        let newSelectedCustomerIds;

        if (event.target.checked) {
            newSelectedCustomerIds = customers?.map((customer) => customer.id);
        } else {
            newSelectedCustomerIds = [];
        }

        setSelectedCustomerIds(newSelectedCustomerIds);
    };

    const handleSelectOne = (event, id) => {
        const selectedIndex = selectedCustomerIds.indexOf(id);
        let newSelectedCustomerIds = [];

        if (selectedIndex === -1) {
            newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds, id);
        } else if (selectedIndex === 0) {
            newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(1));
        } else if (selectedIndex === selectedCustomerIds.length - 1) {
            newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelectedCustomerIds = newSelectedCustomerIds.concat(
                selectedCustomerIds.slice(0, selectedIndex),
                selectedCustomerIds.slice(selectedIndex + 1)
            );
        }

        setSelectedCustomerIds(newSelectedCustomerIds);
    };

    const handleLimitChange = (event) => {
        setLimit(event.target.value);
    };

    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    };

    return (
        <Card {...rest}>
            <Box sx={{ minWidth: 1050 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell padding="checkbox">
                                {/* <Checkbox
                                    checked={selectedCustomerIds.length === customers?.length}
                                    color="primary"
                                    indeterminate={
                                        selectedCustomerIds.length > 0
                                                                        && selectedCustomerIds.length < customers?.length
                                    }
                                    onChange={handleSelectAll}
                                /> */}
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
                        {customers?.slice(0, limit).map((customer) => (
                            <TableRow
                                hover
                                key={customer}
                                selected={selectedCustomerIds.indexOf(customer.id) !== -1}
                            >
                                <TableCell padding="checkbox">
                                    {/* <Checkbox
                                        checked={selectedCustomerIds.indexOf(customer.id) !== -1}
                                        onChange={(event) => handleSelectOne(event, customer.id)}
                                        value="true"
                                    /> */}
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
                                            {getInitials(customer.name)}
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
            <TablePagination
                component="div"
                count={customers?.length}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleLimitChange}
                page={page}
                rowsPerPage={limit}
                rowsPerPageOptions={[5, 10, 25]}
            />
        </Card>
    );
};

TeamResults.defaultProps = {
    customers: [],
};
TeamResults.propTypes = {
    customers: PropTypes.array
};