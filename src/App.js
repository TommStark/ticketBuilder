import * as React from 'react';
import './App.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import TicketBuilderForm from './modules/TicketBuilder/TicketBuilderForm'
import GeneratedTicket from './modules/TicketBuilder/GeneratedTicket'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  const [project, setproject] = React.useState('mobile');
  const [PRNumber, setPRNumber] = React.useState();
  const [ticketNumber, setTicketNumber] = React.useState();
  const [details, setDetails] = React.useState();
  const [checks, setChecks] = React.useState();
  const [ticket, setTicket] = React.useState();
  const [isLoading, setIsLoading] = React.useState(false)
  const [open, setOpen] = React.useState(false);
  const [isDisabled , setIsDisabled] = React.useState(true);
  
  
  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const handleChangeSelect = (event) => {
    setproject(event.target.value);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const isFormValid = () => {  
    return project && PRNumber && ticketNumber && details && checks
  }

  const reset = () =>{
    setproject('mobile');
    setPRNumber('');
    setTicketNumber('');
    setDetails('');
    setChecks('');
    setTicket('');
    setIsLoading(false);
    setIsDisabled(true);
  };

  const getProjectPath = (projectId) => {
    const path ={
      mobile : 'projectecho-bookingflow-mobile',
      api : 'bookingflow-api',
      echo : 'projectecho-bookingflow-frontend',
      vainilla : 'bookingflow-frontend',
      library : 'bf-library',
      widget : 'bookingflow-widget'
    }
    return path[projectId];
  };

  const getProjectIcon = (projectId) => {
    const icon ={
      mobile : ' 📳  Mobile',
      api : ' 📡  API',
      echo : ' 🔳  ECHO',
      vainilla : '🥐  Vainilla',
      library : ' 📒 Library',
      widget : ' ⚙️  Widgets'
    }
    return icon[projectId]; 
  };

  const getTicket = () => {
    const projectPath = getProjectPath(project);
    const projectIcon = getProjectIcon(project);

    const ticketTemplate = {
        pr : `PR:  🐛  https://github.com/Demeure/${projectPath}/pull/${PRNumber}`,
        vpdc :`Ticket:  🎟  https://kognitiv.atlassian.net/browse/VPDC-${ticketNumber}`,
        projectName : `Project: ${projectIcon}`,
        detailsText : `Details: 📃 ${details}`,
        check : `Checks : 🔎 /${checks}`
    }
    return ticketTemplate
  };

  const generateTicket = () =>{
    setIsLoading(true);
    setTimeout(() => {
      setTicket(getTicket());
    }, 700);
  };

  const PrintTicket = () =>{
    return (
        <p>
        {ticket.pr} <br/>
        {ticket.vpdc} <br/>
        {ticket.projectName} <br/>
        {ticket.detailsText} <br/>
        {ticket.check} <br />
        </p>
    )
  };

  React.useEffect(() => {
    setIsDisabled(!!isFormValid());
  },[isFormValid])

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
              />
            :
            <GeneratedTicket
              ticket={ticket}
              open={open}
              handleClick={handleClick}
              reset={reset}
              PrintTicket={PrintTicket}
              handleClose={handleClose}
            />
        }
      </header>
    </ThemeProvider>
  );
}

export default App;
