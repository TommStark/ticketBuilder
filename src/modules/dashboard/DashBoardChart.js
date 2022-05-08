/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Box, CardHeader, Card, CardContent, Divider, useTheme } from '@mui/material';
import 'chart.js/auto';
import { getLast7ticketsAmmount } from '../Utils';

export const DashboardChart = (props) => {
    const theme = useTheme();
    const dataValueX = [];
    const dataLabelsX = [];
    const dataValueY = [];
    const dataLabelsY = [];
    getLast7ticketsAmmount(props.x,dataLabelsX,dataValueX);
    getLast7ticketsAmmount(props.y,dataLabelsY,dataValueY);
    const dataLabel = dataLabelsY.map(d => (new Date(d).toUTCString()).split(' ').slice(0,3).join(' ') );


    const data = {
        datasets: [
            {
                backgroundColor    : '#1976d2',
                barPercentage      : 0.5,
                barThickness       : 12,
                borderRadius       : 4,
                categoryPercentage : 0.5,
                data               : dataValueX,
                label              : 'You',
                maxBarThickness    : 10
            },
            {
                backgroundColor    : '#01030694',
                barPercentage      : 0.5,
                barThickness       : 12,
                borderRadius       : 4,
                categoryPercentage : 0.5,
                data               : dataValueY,
                label              : 'The Team',
                maxBarThickness    : 10
            }
        ],
        labels: dataLabel
    };

    const options = {
        animation           : false,
        cornerRadius        : 20,
        layout              : { padding: 0 },
        legend              : { display: true },
        maintainAspectRatio : false,
        responsive          : true,
        xAxes               : [
            {
                ticks: {
                    fontColor: theme.palette.text.secondary
                },
                gridLines: {
                    display    : false,
                    drawBorder : false
                }
            }
        ],
        yAxes: [
            {
                ticks: {
                    fontColor   : theme.palette.text.secondary,
                    beginAtZero : true,
                    min         : 0
                },
                gridLines: {
                    borderDash               : [2],
                    borderDashOffset         : [2],
                    color                    : theme.palette.divider,
                    drawBorder               : false,
                    zeroLineBorderDash       : [2],
                    zeroLineBorderDashOffset : [2],
                    zeroLineColor            : theme.palette.divider
                }
            }
        ],
        tooltips: {
            backgroundColor : theme.palette.background.paper,
            bodyFontColor   : theme.palette.text.secondary,
            borderColor     : theme.palette.divider,
            borderWidth     : 1,
            enabled         : true,
            footerFontColor : theme.palette.text.secondary,
            intersect       : false,
            mode            : 'index',
            titleFontColor  : theme.palette.text.primary
        }
    };

    return (
        <Card {...props}>      
            <CardHeader
                title="Last seven days"
            />
            <Divider />
            <CardContent>
                <Box
                    sx={{
                        height   : 450,
                        position : 'relative'
                    }}
                >
                    <Bar
                        data={data}
                        options={options}
                    />
                </Box>
            </CardContent>
            <Divider />
            <Box
                sx={{
                    display        : 'flex',
                    justifyContent : 'flex-end',
                    p              : 3
                }}
            >
            </Box>
        </Card>
    );
};