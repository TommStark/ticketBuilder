/* eslint-disable no-unused-vars */
import React from 'react';
import {
    Avatar,
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Divider,
    Typography
} from '@mui/material';

import { useSelector } from 'react-redux';

export function ProfileAccount(props) {
    const user = useSelector((state)=> state.user?.data);

    return (
        <Card {...props}>
            <CardContent>
                <Box
                    sx={{
                        alignItems    : 'center',
                        display       : 'flex',
                        flexDirection : 'column'
                    }}
                >
                    <Avatar
                        src={user?.img}
                        sx={{
                            height : 64,
                            mb     : 2,
                            width  : 64
                        }}
                    />
                    <Typography
                        color="textPrimary"
                        gutterBottom
                        variant="h5"
                    >
                        {user?.name}
                    </Typography>
                    <Typography
                        color="textSecondary"
                        variant="body2"
                    >
                        {`${user?.state_code} ${user?.country}`}

                    </Typography>
                    <Typography
                        color="textSecondary"
                        variant="body2"
                    >
                        {/* {user?.timezone} */}
                        GTM-7
                    </Typography>
                </Box>
            </CardContent>
            <Divider />
            <CardActions>
                <Button
                    color="primary"
                    fullWidth
                    variant="text"
                    disabled={true}
                >
          Upload picture
                </Button>
            </CardActions>
        </Card>
    );
}