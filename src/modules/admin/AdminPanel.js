import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import * as BackendAPI from  '../../services/BackendAPI';
import Switch from '@mui/material/Switch';
import gtag from 'ga-gtag';
import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';
import SearchIcon from '@mui/icons-material/Search';
import StarSharpIcon from '@mui/icons-material/StarSharp';
// import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';

import FormControl from '@mui/material/FormControl';


const AdminPanel = () => {
    const [isLoading, setIsLoading]=useState(true);
    const [projects, setProjects] = useState([]); 

    const sendChanges = (id, status) =>{
        const requestParams = {
            body: {
                id,
                status
            },
        };
        BackendAPI.updateProjectStatus(requestParams).then( () => {
            gtag('event', 'changeProjectStatus', { ...requestParams.body});
        })
            .catch(err => {err;});
    };
    
    const handleChange = (event,name) => {
        const projectSelected = projects.find(item => item.name === name);
        projectSelected.state = event.target.checked;

        const newArr = projects.map( projct => {
            if(projct._id === projectSelected._id){
                sendChanges(projectSelected._id,projectSelected.state);
                return projectSelected;
            }
            return projct;
        });

        setProjects(newArr);
    };

    function getAllProjects(){
        BackendAPI.getAllProjects()
            .then(res => {
                if(res.data){
                    setProjects(res.data);
                    setIsLoading(false);
                }
            })
            .catch(() => {
                setIsLoading(false);
            });
    }

    useEffect(() =>{
        getAllProjects();
    },[]);

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    function sendToDiscordChannel(){
        BackendAPI.sendProjectStatus()
            .then(() => {
                gtag('event', 'sendProjectStatusToDiscord', {});
            })
            .catch(() => {
            });
    }

    function ScanDiscord(){
        BackendAPI.scanChannel()
            .then(() => {
                gtag('event', 'scanChannel', {});
            })
            .catch(() => {
            });
    }

    return ( 
        <>
            <div className='txt-align'>
                {!isLoading && <h1 className='gradient__text'> You are in the admin Panel</h1>}
            </div>
            <header className="App-header" style={{flexDirection: 'row'}}>
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
                            <h1 className='txt-align' style={{marginBottom: '5vh'}}> Project status </h1>
                        </div>
                        <div style={{display: 'flex', flexDirection: 'column'}}>
                            {
                                projects.map((pro,index) => {
                                    return (
                                        <div key={index+getRandomInt(100,400)} style={{display: 'flex'}}>
                                            <div style={{display: 'flex',justifyContent: 'center',alignItems: 'center'}}>
                                                {pro.name}
                                            </div>
                                            <div style={{display: 'flex',justifyContent: 'flex-end',flexGrow: '1'}}>
                                                <Switch
                                                    checked={projects.find(item => item.name === pro.name).state}
                                                    onChange={(event)=> handleChange(event, pro.name)}
                                                    inputProps={{ 'aria-label': 'controlled' }}
                                                />
                                            </div>
                                        </div>
                                    );
                                })

                            }
                        </div>
                        <div className="txt-align" style={{marginTop: '5vh'}}>
                            <LoadingButton 
                                color = 'secondary'
                                variant="contained"
                                endIcon={<SendIcon />}
                                onClick={ () => sendToDiscordChannel()}
                            >Sent to Discord
                            </LoadingButton>
                        </div>
                    </Box>
                </Box>

                <Box sx={{
                    display        : 'flex',
                    justifyContent : 'center',
                    flexDirection  : 'column'
                }}>
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
                            <h3 className='txt-align' style={{fontFamily: 'roboto'}}>
                                Scan for Lazy tickets
                            </h3>
                            <div className="txt-align" style={{marginTop: '5vh'}}>
                                <LoadingButton 
                                    color = 'secondary'
                                    variant="contained"
                                    startIcon={<SearchIcon />}
                                    onClick={ () => ScanDiscord()}
                                >Scan for Lazy
                                </LoadingButton>
                            </div>
                        </Box>
                    </Box>
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
                            <h3 className='txt-align' style={{fontFamily: 'roboto'}}>
                                Emit an Event important Event!
                            </h3>
                            <FormControl fullWidth>
                                <InputLabel id="channel">Channel</InputLabel>
                                <Select
                                    labelId="channel"
                                    id="channelSelector"
                                    value={null}
                                    label="Channel"
                                    onChange={() => {}}
                                    defaultValue=""
                                    disabled={true}
                                >   
                                </Select>
                            </FormControl>
                            <div className="txt-align" style={{marginTop: '5vh'}}>
                                <LoadingButton 
                                    color = 'secondary'
                                    variant="contained"
                                    startIcon={<StarSharpIcon />}
                                    onClick={ () => {}}
                                >send event
                                </LoadingButton>
                            </div>
                        </Box>
                    </Box>
                </Box>
                
            </header>
        </>
    );
};

export default AdminPanel;