import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import Avatar from '@mui/material/Avatar';
import Cookies from 'js-cookie';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { changeNotificationSaw } from '../AppSlice';

const pages = ['Products', 'Pricing', 'Blog'];

export default function Nav(){
    const avatarImg = Cookies.get('img');
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const dispatch = useDispatch();
    const DrawerSaw = useSelector((state)=> state.app.notification.saw);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };


    const openDrawer = () => {
        dispatch(changeNotificationSaw({isOpen: open}));
    };

    return(
        <AppBar position="static" style={{paddingLeft: '300px', maxHeight: '64px',backgroundColor: 'white', color: 'grey'}}>
            <Container maxWidth="xxl">
                <Toolbar disableGutters>
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical   : 'bottom',
                                horizontal : 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical   : 'top',
                                horizontal : 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page} onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center">{page}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
                    >
                        Ticket Builder
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Tooltip title="Notifications">
                            <IconButton 
                                onClick={() => openDrawer()}
                                sx={{ ml: 1 }}
                            >
                                <Badge  variant={ DrawerSaw ? '' : 'dot'} color="primary">
                                    <NotificationsIcon color="action" />
                                </Badge>
                            </IconButton>
                        </Tooltip>
                        <Box sx={{ ml: 2 }}>
                        </Box>
                        <Avatar alt="Remy Sharp" src={avatarImg} />
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
Nav.propTypes = {
    logOut: PropTypes.func.isRequired,
};