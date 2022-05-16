/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import {
    Box,
    Card,
    CardHeader,
    CardContent,
    Divider,
    Typography,
    useTheme
} from '@mui/material';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Chip from '@mui/material/Chip';
import { formatDate } from '../Utils';

export function Newsprev(props) {
    const {item} =props;
    const theme = useTheme();

    return (

        <Box
            sx={{
                alignItems    : 'center',
                display       : 'flex',
                flexDirection : 'column',
                width         : 400
            }}
        >

            <Card sx={{ 
                maxWidth        : 400,
                width           : 368,
                maxHeight       : 400,
                backgroundColor : theme.palette.background.paper,
                overflow        : 'hidden',

            }}>
                <CardHeader
                    title="Preview"
                    sx={{ 
                        height: 50,
                    }}
                />
                <Divider />
                <CardContent sx={{ 
                    color      : theme.palette.text.secondary,
                    fontSize   : '12px',
                    fontWeight : 400,
                    padding    : '16px 16px 4px',
                    textAlign  : 'right',
                }}>
                    <Typography gutterBottom variant="body2" component="div" color={theme.palette.text.secondary}>
                        {formatDate(new Date())}
                    </Typography>
                </CardContent>
                <Divider />
                <CardContent>
                    <Typography gutterBottom variant="body2" component="div">
                        <Chip label={item.title} size="small"  color={item.color}/>
                    </Typography>
                    <Typography variant="body2" color={theme.palette.text.secondary}>
                        {item.text}
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    );
}