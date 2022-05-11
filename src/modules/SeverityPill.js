import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';

const SeverityPillRoot = styled('span')(({ theme, ownerState }) => {
    const backgroundColor = theme.palette[ownerState.color].main;
    const color = theme.palette[ownerState.color].contrastText;

    return {
        alignItems     : 'center',
        backgroundColor,
        borderRadius   : 12,
        color,
        cursor         : 'default',
        display        : 'inline-flex',
        flexGrow       : 0,
        flexShrink     : 0,
        fontFamily     : theme.typography.fontFamily,
        fontSize       : theme.typography.pxToRem(11),
        lineHeight     : 2,
        fontWeight     : 600,
        justifyContent : 'center',
        letterSpacing  : 0.5,
        minWidth       : 15,
        paddingLeft    : theme.spacing(1),
        paddingRight   : theme.spacing(1),
        textTransform  : 'uppercase',
        whiteSpace     : 'nowrap'
    };
});

export const SeverityPill = (props) => {
    const { color = 'primary', children, } = props;
    const ownerState = { color };

    return (
        <SeverityPillRoot
            ownerState={ownerState}
        >
            {children}
        </SeverityPillRoot>
    );
};

SeverityPill.propTypes = {
    children : PropTypes.node,
    color    : PropTypes.oneOf([
        'primary',
        'secondary',
        'error',
        'info',
        'warning',
        'success'
    ])
};