import React, { useState, useEffect } from 'react' ;
import '../../App.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import TicketBuilderForm from './TicketBuilderForm';
import * as BackendAPI from  '../../services/BackendAPI';
import gtag from 'ga-gtag';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import Modalticket from './Ticket';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});


function TicketBuilderContainer() {
    const [project, setproject] = useState({});
    const [projectName, setProjectName] = useState('');
    const [PRNumber, setPRNumber] = useState('');
    const [ticketNumber, setTicketNumber] = useState('');
    const [details, setDetails] = useState('');
    const [checks, setChecks] = useState('1');
    const [ticket, setTicket] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isDisabled , setIsDisabled] = useState(true);
    const [projectsData,SetprojectsData] = useState([]);
    const author = Cookies.get('author');
    const navigate = useNavigate();
    const isUserAuth  = JSON.parse(localStorage.getItem('user'));
    const [isModalopen, setIsModalOpen] = React.useState(false);


    const handleModalOpen = () => setIsModalOpen(true);

    const handleModalClosed = () => {
        reset();
        setIsModalOpen(false);
    };

    useEffect(()=>{
        !isUserAuth && navigate('/ticketBuilder', {replace: true});
    },[]);

    function getProjects(){
        BackendAPI.getProjects()
            .then(res => {
                SetprojectsData(res.data.tickets);
            });
    }

    const getMenuItems = React.useMemo(() => getProjects, [] );

    useEffect(() =>{
        getMenuItems();
    },[getMenuItems]);

    const handleClick = () => {
        gtag('event', 'ClickCopyBtn', {  'Author': `${author}` });
        setIsOpen(true);
    };

    const handleClose = (_event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setIsOpen(false);
    };

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
        setTicket('');
        setIsLoading(false);
        setIsDisabled(true);
    };

    const getTicket = (ticket) => {
        const {checks, details, prLink, ticketLink} = ticket;

        return {
            pr          : `PR      : 🐛 ${prLink}`,
            vpdc        : `Ticket  : 🎟 ${ticketLink}`,
            projectName : `Project : ${project.icon} ${project.name}`,
            detailsText : `Details : 📃 ${details}`,
            check       : `Checks  : 🔎 /${checks}`,
            author      : `Author  : 🧙🏼‍♂️ ${author}`
        };
    };
    
    const generateTicket = () =>{
        setIsLoading(true);
        const requestParams = {
            body: {
                prLink     : `https://github.com/Demeure/${project.path}/pull/${PRNumber}`,
                ticketLink : `https://kognitiv.atlassian.net/browse/VPDC-${ticketNumber}`,
                project    : project._id,
                details,
                checks
            },
        };
        BackendAPI.postTicketData(requestParams)
            .then(response => {
                gtag('event', 'postTicketData', { ...requestParams.body, project: project.name });
                setTicket(getTicket(response.data.ticket));
                BackendAPI.pushTicketToAuthor(response.data.ticket._id);
                BackendAPI.pushTicketToProject( { ticket: response.data.ticket._id, body: { projectId: project._id } } );
                handleModalOpen();
            });
        setIsLoading(false);
    };

    const PrintTicket = () =>{
        return (
            <p>
                {ticket.pr} <br/>
                {ticket.vpdc} <br/>
                {ticket.projectName} <br/>
                {ticket.detailsText} <br/>
                {ticket.check} <br />
                {`Author: 🧙🏼‍♂️ ${author}`} <br />
            </p>
        );
    };

    useEffect(() => {
        setIsDisabled(!!isFormValid());
    },[isFormValid]);

    return (
        <ThemeProvider theme={darkTheme}>
            <header className="App-header">
                {
                    isUserAuth ?
                        <>
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
                            />
                            <Modalticket
                                ticket={ticket}
                                isOpen={isOpen}
                                handleClick={handleClick}
                                reset={reset}
                                PrintTicket={PrintTicket}
                                handleClose={handleClose}
                                isModalopen={isModalopen}
                                handleModalClosed={handleModalClosed}
                                author={author}
                            />
                        </>
                        :null
                }
            </header>
        </ThemeProvider>
    );
}

export default TicketBuilderContainer;
