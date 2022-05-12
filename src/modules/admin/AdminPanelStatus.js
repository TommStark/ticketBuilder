/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import * as BackendAPI from  '../../services/BackendAPI';
import { Box, Card, CardContent, CardHeader, Divider } from '@mui/material';
import { useDispatch } from 'react-redux';
import Switch from '@mui/material/Switch';
import gtag from 'ga-gtag';
import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { addAvailableProjects, addFrozenProjects, addProjects } from '../Team/TeamSlice';

export default function DashboardByProject ({projectsStatus}){
    const [isLoading, setIsLoading]=useState(false);
    const [projects, setProjects] = useState([]); 
    const [text, setText] = useState('');
    const dispatch = useDispatch();

    const sendChanges = (id, status) =>{
        setIsLoading(true);
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
        setIsLoading(false);
    };
    
    const handleChange = (event,name) => {
        let projectSelected = projects.find(item => item.name === name);

        projectSelected = {
            ...projectSelected,
            state: event.target.checked
        };
        
        const newArr = projects.map( projct => {
            if(projct._id === projectSelected._id){
                sendChanges(projectSelected._id,projectSelected.state);
                return projectSelected;
            }
            return projct;
        });

        dispatch(addProjects(newArr));
        setProjects(newArr);
        BackendAPI.getProjects()
            .then(res => {
                if(res.data){
                    dispatch(addProjects(res.data));
                    const projectsFreez = [];
                    const projectsAvailable = [];

                    res.data?.forEach((project) => {
                        if(!project.state){
                            projectsFreez.push(project);
                        }else(
                            projectsAvailable.push(project)
                        );
                    });
                    dispatch(addFrozenProjects(projectsFreez));
                    dispatch(addAvailableProjects(projectsAvailable));
                }
            });
    };

    const handleChangeText = (event) => {
        setText(event.target.value);
    };
    useEffect(() =>{
        setProjects(projectsStatus);
    },[]);

    function sendToDiscordChannel(){
        setIsLoading(true);
        const requestParams = {
            body: {
                text: text
            },
        };
        BackendAPI.sendProjectStatus(requestParams)
            .then(() => {
                gtag('event', 'sendProjectStatusToDiscord', {});
                setIsLoading(false);
                setText('');
            })
            .catch(() => {
            });
    }

    return (
        <Card>
            <CardHeader title={'Project status'} />
            <Divider />
            <CardContent>
                <Box
                    sx={{
                        height   : 270,
                        position : 'relative'
                    }}
                >
                    <div style={{display: 'flex', flexDirection: 'column'}}>
                        {
                            projects.map((pro,index) => {
                                return (
                                    <div key={index+pro.name} style={{display: 'flex'}}>
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
                </Box>
                <Box
                    sx={{
                        display        : 'flex',
                        justifyContent : 'center',
                        alignItems     : 'center',
                        flexDirection  : 'column',
                    }}
                >
                    <TextareaAutosize
                        aria-label="minimum height"
                        minRows={4}
                        maxRows={7}
                        placeholder="text message for discord"
                        value={text}
                        onChange={handleChangeText}
                        style={{ width: '100%' }}
                    />
                    <div className="txt-align" style={{marginTop: '5vh'}}>
                        <LoadingButton 
                            color = 'secondary'
                            variant="contained"
                            loading={isLoading}
                            endIcon={<SendIcon />}
                            onClick={ () => sendToDiscordChannel()}
                        >Sent to Discord
                        </LoadingButton>
                    </div>
                </Box>
            </CardContent>
        </Card>
    );
}