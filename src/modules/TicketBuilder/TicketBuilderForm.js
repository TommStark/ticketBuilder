import * as React from 'react';
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import LoadingButton from '@mui/lab/LoadingButton';
import FormControl from '@mui/material/FormControl';


function TicketBuilderForm(props) {
    const {
        project, handleChangeSelect, PRNumber, setPRNumber, ticketNumber, setTicketNumber,details,
        setDetails,setChecks,isLoading,isDisabled,generateTicket, author, projectsData, checks
    } = props;
    
    const MenuItems = React.useMemo(() => projectsData.map((project,index) => {
        return <MenuItem key={ `${index}${project.name}` } value={project.name}> {`${project.icon} ${project.name}`} </MenuItem>;
    }),[projectsData]); 

    return ( 
        <Box
            sx={{
                width    : 500,
                maxWidth : '90%',
            }}>
            <h1 className="App" > Ticket Builder  </h1>
            <FormControl fullWidth>
                <InputLabel id="project">Project</InputLabel>
                <Select
                    labelId="project"
                    id="projectSelector"
                    value={project}
                    label="Project"
                    onChange={handleChangeSelect}
                    defaultValue=""
                >   
                    {
                        MenuItems
                    }
                </Select>
            </FormControl>
            <TextField
                id="filled-basic-author"
                label="Author"
                variant="filled"
                value={author}
                fullWidth
                disabled
            />

            <TextField
                id="filled-basic-pr"
                label="PR Number"
                variant="filled"
                value={PRNumber}
                onChange={(event) => setPRNumber(event.target.value)}
                fullWidth
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
            />

            <TextField
                id="filled-basic-ticket"
                label="Ticket Number"
                variant="filled"
                value={ticketNumber}
                onChange={(event) => setTicketNumber(event.target.value)}
                fullWidth
            /> 

            <TextField
                id="filled-basic-details"
                label="Details"
                variant="filled"
                value={details}
                onChange={(event) => setDetails(event.target.value)}
                fullWidth
            /> 
            
            <FormLabel id="demo-row-radio-buttons-group-label">Checks</FormLabel>
            <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                onChange={(event) => setChecks(event.target.value)}
                value={checks}
            >
                <FormControlLabel value="1" control={<Radio />} label="1" />
                <FormControlLabel value="2" control={<Radio />} label="2" />
                <FormControlLabel value="3" control={<Radio />} label="3" />
            </RadioGroup>
            
            <div className="App">
                <LoadingButton 
                    loading={isLoading}
                    variant="contained"
                    disabled={!isDisabled}
                    onClick={ () => generateTicket()}
                >Generate
                </LoadingButton>
            </div>
            
        </Box> );
}

TicketBuilderForm.defaultProps = {
    project      : '',
    projectsData : {},
};

TicketBuilderForm.propTypes = {
    project      : PropTypes.string,
    projectsData : PropTypes.arrayOf(PropTypes.shape({
        name : PropTypes.string,
        icon : PropTypes.string,

    })),
    isLoading          : PropTypes.bool.isRequired,
    isDisabled         : PropTypes.bool.isRequired,
    setPRNumber        : PropTypes.func.isRequired,
    setDetails         : PropTypes.func.isRequired,
    setChecks          : PropTypes.func.isRequired,
    generateTicket     : PropTypes.func.isRequired,
    setTicketNumber    : PropTypes.func.isRequired,
    handleChangeSelect : PropTypes.func.isRequired,
    author             : PropTypes.string.isRequired,
    ticketNumber       : PropTypes.string.isRequired,
    PRNumber           : PropTypes.string.isRequired,
    details            : PropTypes.string.isRequired,
    checks             : PropTypes.string.isRequired,
};
export default TicketBuilderForm;