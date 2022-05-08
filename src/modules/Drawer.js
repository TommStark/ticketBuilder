/* eslint-disable no-unused-vars */
import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { changeNotificationSaw } from './AppSlice';
import Chip from '@mui/material/Chip';


const __mock__ = [
    {
        title : 'JAVA',
        text  : ' Java analysis is now 30% faster, on average. One beta tester even shared analyzing his 1 million LoC project dropped from 38 minutes to 18.',
        date  : 'Apr 07, 2022',
        color : 'info'
    },
    {
        title : 'Testing',
        text  : ' Java analysis is now 30% faster, on average. One beta tester even shared analyzing his 1 million LoC project dropped from 38 minutes to 18.',
        date  : 'Apr 07, 2023',
        color : 'error'
    },
    {
        title : 'Place Holder',
        text  : ' Java analysis is now 30% faster, on average. One beta tester even shared analyzing his 1 million LoC project dropped from 38 minutes to 18.',
        date  : 'Apr 07, 2024',
        color : 'warning'
    },
    {
        title : 'Testing',
        text  : ' Java analysis is now 30% faster, on average. One beta tester even shared analyzing his 1 million LoC project dropped from 38 minutes to 18.',
        date  : 'Apr 07, 2023',
        color : 'success'
    },
];


export default function TemporaryDrawer() {
    const dispatch = useDispatch();
    const isOpen = useSelector((state)=> state.app.notification.isOpen);

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        dispatch(changeNotificationSaw({isOpen: open, saw: true}));
    };
  
    const list = (anchor) => (
        <Box
            sx={{ width: 400,bgcolor: 'background.paper3' }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <CardContent sx={{ 
                height          : 50,
                backgroundColor : '#fff',
                borderTop       : '1px solid #e6e8ea',
                overflow        : 'hidden',
            }}>
                <Typography gutterBottom variant="body1" component="div">
                    {'Whats new on TicketBuilder?'}
                </Typography>
            </CardContent>
            <List>
                {__mock__.map((item, index) => (
                    <Card sx={{ 
                        maxWidth        : 400,
                        maxHeight       : 200,
                        backgroundColor : '#fff',
                        borderTop       : '1px solid #e6e8ea',
                        overflow        : 'hidden',
                    }} key={item}>
                        <CardContent sx={{ 
                            backgroundColor : '#f9f9fb',
                            color           : '#8a8c8f',
                            fontSize        : '12px',
                            fontWeight      : 400,
                            padding         : '16px 16px 4px',
                            textAlign       : 'right',
                        }}>
                            <Typography gutterBottom variant="body2" component="div">
                                {item.date}
                            </Typography>
                        </CardContent>
                        <CardContent>
                            <Typography gutterBottom variant="body2" component="div">
                                <Chip label={item.title} size="small"  color={item.color}/>
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {item.text}
                            </Typography>
                        </CardContent>
                    </Card>

                ))}
            </List>
        </Box>
    );
  
    return (
        <div>
            <React.Fragment key={'right'}>
                <Drawer
                    anchor={ 'right'}
                    open={isOpen}
                    onClose={toggleDrawer( 'right', false)}
                >
                    {list( 'right')}
                </Drawer>
            </React.Fragment>
        </div>
    );
}