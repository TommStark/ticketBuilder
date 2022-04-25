import React, { useState, useEffect } from 'react' ;
import '../App.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import TicketBuilderForm from './TicketBuilder/TicketBuilderForm';
import GeneratedTicket from './TicketBuilder/GeneratedTicket';
import * as BackendAPI from  '../services/BackendAPI';
import { useLocation } from 'react-router-dom';
import gtag from 'ga-gtag';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

function App() {
    const {state} = useLocation();
    const {name} = state.author;
    const [project, setproject] = useState();
    const [PRNumber, setPRNumber] = useState('');
    const [ticketNumber, setTicketNumber] = useState('');
    const [details, setDetails] = useState('');
    const [checks, setChecks] = useState('');
    const [ticket, setTicket] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isDisabled , setIsDisabled] = useState(true);
    const [ticketId, setTicketId] = useState('');
    const [projectsData,SetprojectsData] = useState([]);
    const author = name;

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

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setIsOpen(false);
    };

    const handleChangeSelect = (event) => {
        const data = projectsData.filter(project => project.name === event.target.value);
        console.log(data[0]);
        setproject(data[0]);
    };

    const isFormValid = () => {  
        return project && PRNumber && ticketNumber && details && checks;
    };

    const reset = () =>{
        setproject('');
        setPRNumber('');
        setTicketNumber('');
        setDetails('');
        setChecks('');
        setTicket('');
        setIsLoading(false);
        setIsDisabled(true);
        setTicketId('');
    };

    const getTicket = (ticket) => {
        const {author,checks, details, prLink, ticketLink} = ticket;

        const ticketTemplate = {
            pr          : `PR:  🐛  ${prLink}`,
            vpdc        : `Ticket:  🎟  ${ticketLink}`,
            projectName : `Project: ${project.icon} ${project.name}`,
            detailsText : `Details: 📃 ${details}`,
            check       : `Checks : 🔎 /${checks}`,
            author      : `Author: 🧙🏼‍♂️ ${author}`
        };
        return ticketTemplate;
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
                setTicketId(response.data.ticket._id);
                setTicket(getTicket(response.data.ticket));
                BackendAPI.pushTicketToAuthor(response.data.ticket._id);
                BackendAPI.pushTicketToProject( { ticket: response.data.ticket._id, body: { projectId: project._id } } );
            });
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
                { !ticket
                    ? 
                    <TicketBuilderForm
                        project={project}
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
                    />
                    :
                    <GeneratedTicket
                        ticket={ticket}
                        isOpen={isOpen}
                        handleClick={handleClick}
                        reset={reset}
                        PrintTicket={PrintTicket}
                        handleClose={handleClose}
                        ticketId={ticketId}
                    />
                }
            </header>
        </ThemeProvider>
    );
}

export default App;
