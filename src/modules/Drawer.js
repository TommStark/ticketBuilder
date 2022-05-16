import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { changeNotificationSaw } from './AppSlice';
import Chip from '@mui/material/Chip';
import { formatDate } from './Utils';
import {
    useTheme, Divider, Stack
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export default function TemporaryDrawer() {
    const dispatch = useDispatch();
    const isOpen = useSelector((state)=> state.app.notification.isOpen);
    const news = useSelector((state)=> state.app.news);
    const theme = useTheme();

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        dispatch(changeNotificationSaw({isOpen: open, saw: true}));
    };
  
    const list = (anchor) => (
        <Box
            sx={{ width: 400}}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <CardContent sx={{ 
                height   : 50,
                overflow : 'hidden',
            }}>
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    spacing={2}
                >
                    <Typography gutterBottom variant="body1" component="div">
                        {news?.title}
                    </Typography>
                    <CloseIcon/>

                </Stack>
            </CardContent>
            <List>
                {news?.posts.map((item) => (
                    <Card sx={{ 
                        maxWidth        : 400,
                        maxHeight       : 200,
                        backgroundColor : theme.palette.background.paper,
                        overflow        : 'hidden',
                        borderRadius    : 0

                    }} key={item}>
                        <CardContent sx={{ 
                            color        : theme.palette.text.secondary,
                            fontSize     : '12px',
                            fontWeight   : 400,
                            padding      : '16px 16px 4px',
                            textAlign    : 'right',
                            borderRadius : 0

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
                                {item.body}
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
                    anchor={'right'}
                    open={isOpen}
                    onClose={toggleDrawer('right', false)}
                >
                    {list( 'right')}
                </Drawer>
            </React.Fragment>
        </div>
    );
}