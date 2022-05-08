/* eslint-disable no-unused-vars */
import  React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Box, Button, ListItem } from '@mui/material';

export const NavItem = (props) => {
    const { href, icon, title, } = props;
    const active = false;

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
                to={href}
            >
                <Button
                    component="a"
                    startIcon={icon}
                    disableRipple
                    sx={{
                        backgroundColor          : active && 'rgba(255,255,255, 0.08)',
                        borderRadius             : 1,
                        color                    : !active ? '#D1D5DB' : 'neutral.300',
                        fontWeight               : !active && 'fontWeightBold',
                        justifyContent           : 'flex-start',
                        px                       : 3,
                        textAlign                : 'left',
                        textTransform            : 'none',
                        width                    : '100%',
                        '& .MuiButton-startIcon' : {
                            color: !active ? '#D1D5DB' : 'neutral.400'
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