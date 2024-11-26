/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react' ;
import { Box, Container, Grid } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import { useSelector, useDispatch } from 'react-redux';
import gtag from 'ga-gtag';
import '../../App.css';
import TicketBuilderForm from '../TicketBuilder/TicketBuilderForm';
import * as BackendAPI from  '../../services/BackendAPI';
import { ChangeSnackbar } from '../AppSlice';
import { addProjects } from '../Team/TeamSlice';
import { createPlainTicketWithAuthor } from '../Utils';


function AdminPanelTicketBuilder({projectsStatus}) {
    const [project, setproject] = useState({});
    const [projectName, setProjectName] = useState('');
    const [PRNumber, setPRNumber] = useState('');
    const [ticketNumber, setTicketNumber] = useState('');
    const [details, setDetails] = useState('');
    const [checks, setChecks] = useState('1');
    const [isLoading, setIsLoading] = useState(false);
    const [isDisabled , setIsDisabled] = useState(true);
    const projectsData = projectsStatus;
    const team =(useSelector((state)=> state.TeamMates?.users)) ?? []; 
    const [isDataLoading, setIsDataLoading]=useState(true);
    const [checked, setChecked]=useState(false);
    const [authorAdmin, setAuthorAdmin] = useState([]);
    const dispatch = useDispatch();
    const appVersion = useSelector((state)=> state.app.news.version);

    useEffect(() =>{
        if (projectsData.length){
            setIsDataLoading(false);
        }
    },[]);

    const handleChangeSelect = (event) => {
        const data = projectsData.filter(project => project.name === event.target.value);
        setProjectName(data[0].name);
        setproject(data[0]);
    };

    const handleAuthorChangeSelect = (event) => {
        const data = team.filter(user => user.name === event.target.value);
        setAuthorAdmin(data);
    };


    const isFormValid = () => {
        return project?.name && PRNumber && ticketNumber && details && checks && authorAdmin.length;
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
                UserId     : authorAdmin[0]._id
            },
        };
        BackendAPI.postTicketData(requestParams)
            .then(response => {
                gtag('event', 'postTicketData', { ...requestParams.body, project: project.name });
                BackendAPI.pushTicketToAuthor({ticketId: response.data.ticket._id, body: {email: authorAdmin[0].email}});
                BackendAPI.pushTicketToProject( { ticket: response.data.ticket._id, body: { projectId: project._id } } );
                dispatch(ChangeSnackbar({state: true,txt: ' Ticket successfully Saved!'}));
                setIsLoading(false);
                reset();
            });
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
                UserId     : authorAdmin[0]._id

            },
        };
        BackendAPI.postTicketData(requestParams)
            .then(response => {
                gtag('event', 'postTicketData', { ...requestParams.body, project: project.name });
                const plainTicket = createPlainTicketWithAuthor(response.data.ticket,project,appVersion,authorAdmin[0]);
                BackendAPI.pushTicketToAuthor({ticketId: response.data.ticket._id, body: {email: authorAdmin[0].email}});
                BackendAPI.pushTicketToProject( { ticket: response.data.ticket._id, body: { projectId: project._id } } );
                BackendAPI.sendToDiscordChannel({body: {'ticket': plainTicket}})
                    .then(() => {
                        gtag('event', 'ClickSentToDiscord/ADMIN', {  'Author': `${authorAdmin[0].name}` });
                        dispatch(ChangeSnackbar({state: true,txt: ' Ticket successfully send to Discord!'}));
                        setIsLoading(false);
                        reset();
                    });
            });
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
                                projectsData={projectsData}
                                checks={checks}
                                projectSelected={project}
                                saveTicket={saveTicket}
                                checked={checked}
                                setChecked={setChecked}
                                admin={true}
                                team={team}
                                author={authorAdmin.length ? authorAdmin[0].name : ' '}
                                handleAuthorChangeSelect={handleAuthorChangeSelect}
                            />
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

export default AdminPanelTicketBuilder;
