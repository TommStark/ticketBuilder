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
    useTheme,
    TextField
} from '@mui/material';
import Chip from '@mui/material/Chip';
import LoadingButton from '@mui/lab/LoadingButton';

export function NewsVersion(props) {
    const {version, NewsVersion, handleBtnVersionOnClick, isDisabled, setNewVersionTxt, setIsDisabled} =props;
    const theme = useTheme();

    return (

        <Box
        >
            <Card sx={{ 
                backgroundColor : theme.palette.background.paper,
                overflow        : 'hidden',

            }}>
                <CardHeader
                    title="App Version"
                    sx={{ 
                        height: 30,
                    }}
                />
                <Divider />
                <CardContent
                    sx={{
                        display        : 'flex',
                        justifyContent : 'space-evenly',
                        alignItems     : 'center'
                    }}
                >
                    <TextField
                        label="Actual Version"
                        name="Actual Version"
                        disabled
                        value={version}
                        variant="outlined"
                    />
                    <TextField
                        label="new Version"
                        name="new Version"
                        required
                        variant="outlined"
                        onChange={(e) => {
                            setIsDisabled(false);
                            setNewVersionTxt(e.target.value);
                        }}
                        value={NewsVersion}
                    />
                    <LoadingButton
                        color="primary"
                        variant="contained"
                        onClick={() => handleBtnVersionOnClick()}
                        disabled={isDisabled}
                    >
            Send new version
                    </LoadingButton>
                </CardContent>
            </Card>
        </Box>
    );
}