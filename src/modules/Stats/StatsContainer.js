import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import {
    PieChart, Pie, Cell,   Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    Legend
} from 'recharts';
import * as BackendAPI from  '../../services/BackendAPI';
import CircularProgress from '@mui/material/CircularProgress';

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * .6;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text x={x} y={y} fill="black" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};

function StatsContainer() {
    const [ProjectsByUser, setProjectsByUser] = useState([]);
    const [colors, setColors] = useState([]);
    const [graph, setGraph] = useState([]);
    const [isLoading, setIsLoadin]=useState(true);
    const [tickets, SetTickets]=useState([]);

    function getTicketsByUsers(){
        BackendAPI.getTicketsByAuthor()
            .then(res => {
                if(res.data){
                    SetTickets(res.data.tickets);
                }
            });
    }
    useEffect(() =>{
        getTicketsByUsers();
    },[]);


    function getProjectByUsers(){
        BackendAPI.getProjectByUsers()
            .then(res => {
                if(res.data){
                    setGraph(res.data.stats.radarChart);
                    setColors(res.data.stats.colors);
                    setProjectsByUser(res.data.stats.pieChart);
                    setIsLoadin(false);
                }
            })
            .catch(() => {
                window.location.reload()

                setIsLoadin(false)});
    }

    useEffect(() =>{
        getProjectByUsers();
    },[]);

    return ( 
        <header className="App-header">
            {
                isLoading 
                    ?   
                    <CircularProgress color="secondary"  size='5rem'/>
                    :(
                        tickets.length === 0
                            ? <h1 className='gradient__text'>You do not have tickets yet</h1>
                            : 
                            <Box sx={{
                                display        : 'flex',
                                justifyContent : 'center',
                            }}>
                                <Box
                                    sx={{
                                        width           : 400,
                                        maxWidth        : '90%',
                                        backgroundColor : 'white',
                                        padding         : '30px',
                                        borderRadius    : '5%',
                                        margin          : '1vh'
                                    }}>
                                    <div style={{ display: 'flex',flexDirection: 'column' }}>
                                        <h1 className='txt-align'>Pie chart</h1>
                                        <div style={{display: 'flex',flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                                            <PieChart width={250} height={200}>
                                                <Pie
                                                    data={ProjectsByUser}
                                                    cx="50%"
                                                    cy="50%"
                                                    labelLine={false}
                                                    label={renderCustomizedLabel}
                                                    outerRadius={80}
                                                    innerRadius={50}
                                                    fill="#8884d8"
                                                    dataKey="value"
                                                >
                                                    {ProjectsByUser?.map((entry, index) => (
                                                        <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                                                    ))}
                                                </Pie>
                                            </PieChart>
                                        </div>
                                        <div style={{display: 'flex',flexDirection: 'column'}}>
                                            {ProjectsByUser.map((p) => {
                                                return (<>
                                                    <div style={{display: 'flex',margin: '.5vh'}}>
                                                        <div className='box' style={{background: p.color}}/>
                                                        <div> &nbsp; {p.name} &nbsp; &nbsp; &nbsp;{p.value}</div>
                                                    </div>
                                                </>);
                                            })}
                                        </div>
                                    </div>
                                </Box>
                                <Box
                                    sx={{
                                        width           : 400,
                                        maxWidth        : '90%',
                                        backgroundColor : 'transparent',
                                        padding         : '30px',
                                        borderRadius    : '5%',
                                        margin          : '1vh'
                                    }}>
                                </Box>
                                <Box
                                    sx={{
                                        width           : 400,
                                        maxWidth        : '90%',
                                        backgroundColor : 'white',
                                        padding         : '30px',
                                        borderRadius    : '5%',
                                        margin          : '1vh'
                                    }}>
                                    <h1 className='txt-align'>Radar Chart</h1>
                                    <RadarChart
                                        cx='43.5%'
                                        cy='43.5%'
                                        outerRadius={110}
                                        width={400}
                                        height={400}
                                        data={graph}
                                    >
                                        <PolarGrid />
                                        <PolarAngleAxis dataKey="subject" />
                                        <PolarRadiusAxis />
                                        <Radar name="You" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.7} />
                                        <Radar name="The team" dataKey="B" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.3} />
                                        <Legend />
                                    </RadarChart>
                                </Box>
                            </Box>
                    )
                    
            }
        </header>

    );
}

export default StatsContainer;