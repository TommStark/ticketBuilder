import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Avatar from '@mui/material/Avatar';
import Cookies from 'js-cookie';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';

// eslint-disable-next-line no-undef
const pjson = require('../../package.json');

export default function Nav({logOut}){
    const appVersion = pjson.version;
    const avatarImg = Cookies.get('img');
    console.log(avatarImg);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    
    const handleClose = () => {
        setAnchorEl(null);
    };

    return(
        <div className="navbar">
            <div className='navbar-sign'>
                <p><div>v{appVersion}</div></p> 
            </div>
            <div className="navbar-links">
                <div className='navbar-links_container'>
                    <p><Link to="ticketBuilder/factory">Builder</Link></p>
                    <p><Link to="ticketBuilder/tickets">Tickets</Link></p>
                    <p><Link to="ticketBuilder/stats">Stats</Link></p>
                    <p>&nbsp;</p>
                </div>
                <div>
                    <Box sx={{ flexGrow: 0 }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit"
                            sx={{ p: 0 }}
                        >
                            <Tooltip title="Open settings">
                                <Avatar alt="Remy Sharp" src={avatarImg} />
                            </Tooltip>
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            sx={{ mt: '45px' }}
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical   : 'top',
                                horizontal : 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical   : 'top',
                                horizontal : 'right',
                            }}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={handleClose}><del>Profile</del></MenuItem>
                            <MenuItem> 
                                <Link 
                                    to="/ticketBuilder"
                                    onClick={() => logOut()}
                                >Log Out</Link>
                            </MenuItem>
                        </Menu>
                    </Box>
                </div>
            </div>
        </div>
    );
}
Nav.propTypes = {
    logOut: PropTypes.func.isRequired,
};