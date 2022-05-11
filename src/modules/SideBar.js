/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { Box, Divider, Drawer, Typography, useMediaQuery } from '@mui/material';
import { NavItem } from './Nav/NavItem';
import OutboxIcon from '@mui/icons-material/Outbox';
import BarChartIcon from '@mui/icons-material/BarChart';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PersonIcon from '@mui/icons-material/Person';
import GroupIcon from '@mui/icons-material/Group';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
// import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { useSelector } from 'react-redux';
const pjson = require('../../package.json');

export default function SideBar (props) {
    const { open, onClose } = props;
    const user = useSelector((state)=> state.user?.data);
    const appVersion = pjson.version;
    const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'), {
        defaultMatches : true,
        noSsr          : false
    });

    const items = [
        {
            href  : '/ticketBuilder/dashboard',
            title : 'Dashboard',
            icon  : BarChartIcon
        },
        {
            href  : '/ticketBuilder/team',
            title : 'Dream Team',
            icon  : GroupIcon
        },
        {
            href  : '/ticketBuilder/factory',
            title : 'Ticket Builder',
            icon  : OutboxIcon
        },
        {
            href  : '/ticketBuilder/tickets',
            title : 'Ticket List',
            icon  : ListAltIcon
        },
        {
            href  : '/ticketBuilder/profile',
            title : 'Profile',
            icon  : PersonIcon
        },
        {
            href  : '/ticketBuilder/settings',
            title : 'Settings',
            icon  : SettingsIcon
        },
        // {
        //     href  : '/ticketBuilder/admin',
        //     title : 'Admin',
        //     icon  : AdminPanelSettingsIcon
        // },
        {
            href  : '/ticketBuilder/LogOut',
            title : 'LogOut',
            icon  : LogoutIcon,
        },
    ];
    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
    };
    const content = (
        <>
            <Box
                sx={{
                    display       : 'flex',
                    flexDirection : 'column',
                    height        : '100%'
                }}
            >
                <div>
                    <Box sx={{ p: 3 }}>
                        <Typography>
                            TicketBuilder v{appVersion}
                        </Typography>
                    </Box>
                    <Box sx={{ px: 2 }}>
                        <Box
                            sx={{
                                alignItems      : 'center',
                                backgroundColor : 'rgba(255, 255, 255, 0.04)',
                                cursor          : 'pointer',
                                display         : 'flex',
                                justifyContent  : 'space-between',
                                px              : 3,
                                py              : '11px',
                                borderRadius    : 1
                            }}
                        >
                            <div>
                                <Typography
                                    color="inherit"
                                    variant="subtitle1"
                                >
                                Tomito Inc
                                </Typography>
                                <Typography
                                    color="neutral.400"
                                    variant="body2"
                                >
                                    Your tier
                                    {' '}
                                    : {!user?.tier ? 'Developer' : ' PL'}
                                </Typography>
                            </div>
                        </Box>
                    </Box>
                </div>
                <Divider
                    sx={{
                        borderColor : '#2D3748',
                        my          : 3
                    }}
                />
                <Box sx={{ flexGrow: 1 }}>
                    {items.map((item) => (
                        <NavItem
                            key={item.title}
                            icon={<item.icon/>}
                            href={item.href}
                            title={item.title}
                            onClick={onClose}
                        />
                    ))}
                </Box>
                <Divider sx={{ borderColor: '#2D3748' }} />
                <Box
                    sx={{
                        px : 2,
                        py : 3
                    }}
                >
                    <Box
                        sx={{
                            display : 'flex',
                            mt      : 2,
                            mx      : 'auto',
                            width   : '160px',
                            '& img' : {
                                width: '100%'
                            }
                        }}
                    >
                    </Box>
                </Box>
            </Box>
        </>
    );

    if (!lgUp) {
        return (
            <Drawer
                anchor="left"
                open={open}
                onClose={onClose}
                variant="temporary"
                sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
                PaperProps={{
                    sx: {
                        backgroundColor : '#111827',
                        color           : '#FFFFFF',
                        width           : 260,
                    }
                }}
            >
                {content}
            </Drawer>
        );
    }
    return (
        <Drawer
            anchor="left"
            onClose={onClose}
            open={open}
            PaperProps={{
                sx: {
                    backgroundColor : '#111827',
                    color           : '#FFFFFF',
                    width           : 260,
                }
            }}
            sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
            variant="permanent"
        >
            {content}
        </Drawer>
    );
}

SideBar.propTypes = {
    onClose : PropTypes.func,
    open    : PropTypes.bool
};