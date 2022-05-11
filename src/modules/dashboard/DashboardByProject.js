/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
// import {Chart, ArcElement} from 'chart.js';
import 'chart.js/auto';
import { Doughnut } from 'react-chartjs-2';
import { Box, Card, CardContent, CardHeader, Divider, Typography, useTheme } from '@mui/material';
// Chart.register(ArcElement);

export default function DashboardByProject (props){
    const theme = useTheme();
    const {projectsByUser} = props;

    const projectFiltered = projectsByUser.filter(pro => pro.value > 0);
    const colorsFiltered = projectFiltered.map(pro => pro.color);
    const projectsName = projectFiltered.map(pro => pro.name);
    const projectsvalue = projectFiltered.map(pro => pro.value);

    const data = {
        datasets: [
            {
                data             : projectsvalue,
                backgroundColor  : colorsFiltered,
                borderWidth      : 8,
                borderColor      : '#FFFFFF',
                hoverBorderColor : '#FFFFFF',
                label            : 'Dataset 1',
            }
        ],
        labels: projectsName
    };

    const options = {
        animation        : true,
        cutoutPercentage : 80,
        layout           : { padding: 0 },
        legend           : {
            position: 'top',
        },
        maintainAspectRatio : false,
        responsive          : true,
        tooltips            : {
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
        <Card>
            <CardHeader title={'Tickets by Projects'} />
            <Divider />
            <CardContent>
                <Box
                    sx={{
                        height   : 300,
                        position : 'relative'
                    }}
                >
                    <Doughnut
                        data={data}
                        options={options}
                    />
                </Box>
                <Box
                    sx={{
                        display        : 'flex',
                        justifyContent : 'center',
                        pt             : 2
                    }}
                >
                    {projectFiltered.map(({
                        color,
                        name,
                        value
                    }) => (
                        <Box
                            key={name}
                            sx={{
                                p         : .6,
                                textAlign : 'center'
                            }}
                        >
                            <Typography
                                color="textPrimary"
                                variant="body1"
                            >
                                {name}
                            </Typography>
                            <Typography
                                style={{ color }}
                                variant="h4"
                            >
                                {value}
                            </Typography>
                        </Box>
                    ))}
                </Box>
            </CardContent>
        </Card>
    );
}