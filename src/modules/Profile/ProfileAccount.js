/* eslint-disable react/prop-types */
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

export function ProfileAccount(props) {
    const {user} =props;

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
                        {`${user?.name} ${user?.lastName}`}
                    </Typography>
                    <Typography
                        color="textSecondary"
                        variant="h6"
                    >
                        {`${user?.rol}`}

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
                        GTM-3
                    </Typography>
                </Box>
            </CardContent>
            <Divider />
            {/* <CardActions>
                <Button
                    color="primary"
                    fullWidth
                    variant="text"
                    disabled={true}
                >
          Upload picture
                </Button>
            </CardActions> */}
        </Card>
    );
}