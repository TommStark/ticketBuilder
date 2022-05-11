/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import  React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Box, Button, ListItem } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { changeActiveTab } from '../AppSlice';

export const NavItem = (props) => {
    const { href, icon, title, onClick } = props;
    const [isActive, setIsActive] = useState(false);
    let location = useSelector((state)=> state.app.tabs.active);
    const dispatch = useDispatch();

    useEffect(() => {
        setIsActive(location === href ? true : false);
    },[location,dispatch]);


    return (
        <ListItem
            disableGutters
            sx={{
                display : 'flex',
                mb      : 0.5,
                py      : 0,
                px      : 2
            }}
            style={{width: '100%'}}
        >
            <Link
                className={'css-1uk9c8ukp'}
                onClick={() => {
                    dispatch(changeActiveTab((href == '/ticketBuilder/LogOut') ? '/ticketBuilder/dashboard' : href));
                    location = useSelector((state)=> state.app.tabs.active);
                }}
                to={href}
            >
                <Button
                    startIcon={icon}
                    disableRipple
                    onClick={() => onClick()}
                    sx={{
                        backgroundColor          : isActive && 'rgba(255,255,255, 0.08)',
                        borderRadius             : 1,
                        color                    : !isActive ? '#D1D5DB' : 'neutral.300',
                        fontWeight               : !isActive && 'fontWeightBold',
                        justifyContent           : 'flex-start',
                        px                       : 3,
                        textAlign                : 'left',
                        textTransform            : 'none',
                        width                    : '100%',
                        '& .MuiButton-startIcon' : {
                            color: !isActive ? '#D1D5DB' : 'neutral.400'
                        },
                        '&:hover': {
                            backgroundColor: 'rgba(255,255,255, 0.08)'
                        }
                    }}
                >
                    <Box sx={{ flexGrow: 1, width: '100%',color: '#D1D5DB' }}>
                        {title}
                    </Box>
                </Button>
            </Link>
        </ListItem>
    );
};

NavItem.propTypes = {
    href  : PropTypes.string,
    icon  : PropTypes.node,
    title : PropTypes.string
};