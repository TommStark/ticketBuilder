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
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


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
    const [projectsByUser, setProjectsByUser] = useState([]);
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
                setIsLoadin(false);
            });
    }

    useEffect(() =>{
        getProjectByUsers();
    },[]);

    return ( 
        <>
            <div className='txt-align'>
                {  
                    tickets.length != 0
                        ? <h1 className='gradient__text'> Statistics are important</h1>
                        : null
                }
            </div>
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
                                            borderRadius    : '20px',
                                            margin          : '1vh'
                                        }}>
                                        <div style={{ display: 'flex',flexDirection: 'column' }}>
                                            <h1 className='txt-align'>Your tickets by project</h1>
                                            <div style={{display: 'flex',flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                                                <PieChart width={250} height={200}>
                                                    <Pie
                                                        data={projectsByUser}
                                                        cx="50%"
                                                        cy="50%"
                                                        labelLine={false}
                                                        label={renderCustomizedLabel}
                                                        innerRadius={60}
                                                        outerRadius={80}
                                                        fill="#8884d8"
                                                        dataKey="value"
                                                        paddingAngle={5}
                                                    >
                                                        {projectsByUser?.map((entry, index) => (
                                                            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                                                        ))}
                                                    </Pie>
                                                </PieChart>
                                            </div>
                                            <TableContainer component={Paper}>
                                                <Table sx={{ minWidth: 200 }} size="small" aria-label="a dense table">
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell># </TableCell>
                                                            <TableCell align="left">Project</TableCell>
                                                            <TableCell align="right">Tickets</TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {projectsByUser.map((p) => (
                                                            <TableRow
                                                                key={p.name}
                                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                            >
                                                                <TableCell component="th" scope="row">
                                                                    <div className='box' style={{background: p.color}}/>
                                                                </TableCell>
                                                                <TableCell align="left">{p.name}</TableCell>
                                                                <TableCell align="right">{p.value}</TableCell>
                                                            </TableRow>
                                                        ))}
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>
                                        </div>
                                    </Box>
                                    <Box
                                        sx={{
                                            width           : 400,
                                            maxWidth        : '90%',
                                            backgroundColor : 'white',
                                            padding         : '30px',
                                            borderRadius    : '20px',
                                            margin          : '1vh'
                                        }}>
                                        <h1 className='txt-align'>Amount of tickets by projects</h1>
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
        </>
    );
}

export default StatsContainer;