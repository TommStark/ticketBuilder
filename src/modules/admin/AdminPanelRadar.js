/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import * as BackendAPI from  '../../services/BackendAPI';
import { Box, Card, CardContent, CardHeader, Divider } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import SearchIcon from '@mui/icons-material/Search';
import gtag from 'ga-gtag';



export default function DashboardByProject (){
    const [showRadar, setShowRadar]= useState(false);
    const [isLoading, setisLoading]= useState(false);

    function ScanDiscord(){
        BackendAPI.scanChannel()
            .then(() => {
                gtag('event', 'scanChannel', {});
            })
            .catch(() => {
            });
        setShowRadar(true);
        setisLoading(true);
        setTimeout(() => {
            setShowRadar(false);
            setisLoading(false);
        }, 8000);
    }


    return (
        <Card>
            <CardHeader title={'Ticket Scanner'} />
            <Divider />
            <CardContent>
                <Box
                    sx={{
                        height   : 190,
                        position : 'relative',
                    }}
                >{
                        showRadar
                            ?   
                            <div className="radar_wrapper">
                                <div className="bar"></div>
                                <div className="radial"></div>
                                <div className="hr"></div>
                                <div className="vr"></div>
                                <div className="back"></div>
                                <div className="dot1"></div>
                                <div className="dot2"></div>
                                <div className="dot3"></div>
                            </div>
                            :    
                            <div className="radar_wrapper">
                                <div className="radial"></div>
                                <div className="hr"></div>
                                <div className="vr"></div>
                                <div className="back"></div>
                            </div>
                    }
                </Box>
                <Box
                    sx={{
                        display        : 'flex',
                        justifyContent : 'center',
                        mt             : 4
                    }}
                >
                    <div className="txt-align" style={{marginTop: '4vh', marginBottom: 0}}>
                        <LoadingButton 
                            color = 'secondary'
                            variant="contained"
                            loading={isLoading}
                            startIcon={<SearchIcon />}
                            onClick={ () => ScanDiscord()}
                        >Scan for Lazy
                        </LoadingButton>
                    </div>
                </Box>
            </CardContent>
        </Card>
    );
}