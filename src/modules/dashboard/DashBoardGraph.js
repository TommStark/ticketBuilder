/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import 'chart.js/auto';
import { Radar } from 'react-chartjs-2';
import { Box, Card, CardContent, CardHeader, Divider, Typography, useTheme } from '@mui/material';

export default function DashBoardGraph (props){
    const {allTickets} = props;
    const projectsName = allTickets?.map(pro => pro.subject);
    const projectsvalueA = allTickets?.map(pro => pro.A);
    const projectsvalueB = allTickets?.map(pro => pro.B);

    const data = {
        datasets: [
            {
                data            : projectsvalueA,
                label           : 'You',
                borderColor     : 'rgb(249, 97, 128)',
                backgroundColor : 'rgba(249, 97, 128, 0.4)',
            },{
                data            : projectsvalueB,
                label           : 'The Team',
                borderColor     : 'rgb(54, 162, 235)',
                backgroundColor : 'rgba(54, 162, 235, 0.3)',
            },
        ],
        labels: projectsName
    };

    const options = {
        type    : 'radar',
        data    : data,
        options : {
            responsive : true,
            plugins    : {
                title: {
                    display : true,
                    text    : 'Chart.js Radar Chart'
                }
            }
        },
    };
    return (
        <Card>
            <CardContent>
                <CardHeader title="Radar Ticket" />
                <Divider />
                <Box
                    sx={{
                        height   : 400,
                        position : 'relative'
                    }}
                >
                    <Radar
                        data={data}
                        options={options}
                    />
                </Box>
            </CardContent>
        </Card>
    );
}