import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { changeNotificationSaw } from './AppSlice';


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
            sx={{ width: 250 }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>
                            {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                        </ListItemIcon>
                        <ListItemText primary={text} />
                        <Divider />
                    </ListItem>
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