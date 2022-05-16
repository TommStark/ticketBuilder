/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react' ;
import { Box, Container, Grid, Typography } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import { useSelector, useDispatch } from 'react-redux';
import gtag from 'ga-gtag';
import Cookies from 'js-cookie';
import '../../App.css';
import TicketBuilderForm from './TicketBuilderForm';
import * as BackendAPI from  '../../services/BackendAPI';
import { ChangeSnackbar } from '../AppSlice';
import { addProjects } from '../Team/TeamSlice';
import { createPlainTicket } from '../Utils';


function TicketBuilderContainer() {
    const [project, setproject] = useState({});
    const [projectName, setProjectName] = useState('');
    const [PRNumber, setPRNumber] = useState('');
    const [ticketNumber, setTicketNumber] = useState('');
    const [details, setDetails] = useState('');
    const [checks, setChecks] = useState('1');
    const [isLoading, setIsLoading] = useState(false);
    const [isDisabled , setIsDisabled] = useState(true);
    const [projectsData,SetprojectsData] = useState(useSelector((state)=> state.TeamMates.projects));
    const user = useSelector((state)=> state.user.data);
    const [isDataLoading, setIsDataLoading]=useState(true);
    const [checked, setChecked]=useState(false);
    const author = Cookies.get('author');
    const dispatch = useDispatch();
    const appVersion = useSelector((state)=> state.app.news.version);

    useEffect(() =>{
        let unmounted = false;

        if (projectsData.length){
            setIsDataLoading(false);
        }
        BackendAPI.getProjects()
            .then(res => {
                if(res.data){
                    if (!unmounted) {
                        SetprojectsData(res.data);
                        dispatch(addProjects(res.data));
                        setIsDataLoading(false);
                    }
                }
            });
        return function () {
            unmounted = true;
        };
    },[]);

    const handleChangeSelect = (event) => {
        const data = projectsData.filter(project => project.name === event.target.value);
        setProjectName(data[0].name);
        setproject(data[0]);
    };

    const isFormValid = () => {
        return project?.name && PRNumber && ticketNumber && details && checks;
    };
    
    const reset = () =>{
        setproject({});
        setProjectName('');
        setChecks('1');
        setPRNumber('');
        setTicketNumber('');
        setDetails('');
        setIsLoading(false);
        setIsDisabled(true);
        setChecked(false);
    };

    //TODO refactor both methods to simplify code
    const saveTicket = () => {
        setIsLoading(true);
        const requestParams = {
            body: {
                prLink     : `https://github.com/Demeure/${project.path}/pull/${PRNumber}`,
                ticketLink : `https://kognitiv.atlassian.net/browse/VPDC-${ticketNumber}`,
                project    : project._id,
                details,
                checks,
                pending    : true,
                UserId     : user._id
            },
        };
        BackendAPI.postTicketData(requestParams)
            .then(response => {
                gtag('event', 'postTicketData', { ...requestParams.body, project: project.name });
                BackendAPI.pushTicketToAuthor({ticketId: response.data.ticket._id, body: {email: user.email}});
                BackendAPI.pushTicketToProject( { ticket: response.data.ticket._id, body: { projectId: project._id } } );
                dispatch(ChangeSnackbar({state: true,txt: ' Ticket successfully Saved!'}));
            });
        setIsLoading(false);
    };
    
    const generateTicket = () =>{
        setIsLoading(true);
        const requestParams = {
            body: {
                prLink     : `https://github.com/Demeure/${project.path}/pull/${PRNumber}`,
                ticketLink : `https://kognitiv.atlassian.net/browse/VPDC-${ticketNumber}`,
                project    : project._id,
                details,
                checks,
                UserId     : user._id
            },
        };
        BackendAPI.postTicketData(requestParams)
            .then(response => {
                gtag('event', 'postTicketData', { ...requestParams.body, project: project.name });
                
                const plainTicket = createPlainTicket(response.data.ticket,project,appVersion); 
                BackendAPI.pushTicketToAuthor({ticketId: response.data.ticket._id, body: {email: user.email}});
                BackendAPI.pushTicketToProject( { ticket: response.data.ticket._id, body: { projectId: project._id } } );
                BackendAPI.sendToDiscordChannel({body: {'ticket': plainTicket}})
                    .then(() => {
                        gtag('event', 'ClickSentToDiscord', {  'Author': `${user.name}` });
                        dispatch(ChangeSnackbar({state: true,txt: ' Ticket successfully send to Discord!'}));
                        reset();
                    })
                    .catch(err => {err;});
            });
        setIsLoading(false);
    };

    useEffect(() => {
        setIsDisabled(!!isFormValid());
    },[isFormValid]);

    return (
        <>
            {
                !isDataLoading ?
                    <>
                        <Box
                            component="main"
                            sx={{
                                flexGrow : 1,
                                py       : 1
                            }}
                        >
                            <Container maxWidth="lg">
                                <Typography
                                    sx={{ mb: 3 }}
                                    variant="h4"
                                >
                                    Ticket builder
                                </Typography>
                                <Grid
                                    container
                                    spacing={1}
                                >
                                    <Grid
                                        item
                                        lg={8}
                                        md={6}
                                        xs={12}
                                    >
                                        <TicketBuilderForm
                                            project={projectName}
                                            handleChangeSelect={handleChangeSelect}
                                            PRNumber={PRNumber}
                                            setPRNumber={setPRNumber}
                                            ticketNumber={ticketNumber}
                                            setTicketNumber={setTicketNumber}
                                            details={details}
                                            setDetails={setDetails}
                                            setChecks={setChecks}
                                            isLoading={isLoading}
                                            isDisabled={isDisabled}
                                            generateTicket={generateTicket}
                                            author={author}
                                            projectsData={projectsData}
                                            checks={checks}
                                            projectSelected={project}
                                            saveTicket={saveTicket}
                                            checked={checked}
                                            setChecked={setChecked}
                                        />
                                    </Grid>
                                </Grid>
                            </Container>
                        </Box>
                    </>
                    :                        
                    <Box
                        component="main"
                        sx={{
                            flexGrow : 1,
                            py       : 1
                        }}
                    >
                        <Container maxWidth="lg">
                            <Skeleton height={50} width="30%" />
                            <Grid
                                container
                                spacing={3}
                            >
                                <Grid
                                    item
                                    lg={8}
                                    md={6}
                                    xs={12}
                                >
                                    <Skeleton variant="rectangular"  height={400} />
                                    <Skeleton height={30} />
                                    <Skeleton height={30} width="80%" />
                                </Grid>
                            </Grid>
                        </Container>
                    </Box>
            }
        </>
    );
}

export default TicketBuilderContainer;
