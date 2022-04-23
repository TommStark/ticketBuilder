import * as React from 'react';
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
const pjson = require('../../../package.json');


function TicketBuilderForm(props) {

    const {project, handleChangeSelect, PRNumber, setPRNumber, ticketNumber, setTicketNumber,details,
        setDetails,setChecks,isLoading,isDisabled,generateTicket, author, projectsData
    } = props;

    const appVersion = pjson.version;

    const MenuItems = React.useMemo(() => projectsData.map((project) => {
        return <MenuItem value={project.name}> {`${project.icon} ${project.name}`}</MenuItem>;
    }),[projectsData]); 

    return ( 
        <Box
            sx={{
                width: 500,
                maxWidth: '90%',
            }}>
            <h1 className="App" > Ticket Builder <sup className='smallText'> v{appVersion}</sup> </h1>
            <FormControl fullWidth>
                <InputLabel id="project">Project</InputLabel>
                <Select
                    labelId="project"
                    id="demo-simple-select"
                    value={project.name}
                    label="Project"
                    onChange={handleChangeSelect}
                >   
                    {
                        MenuItems         
                    }
                </Select>
            </FormControl>
            <TextField
                id="filled-basic"
                label="Author"
                variant="filled"
                value={author}
                fullWidth
                disabled
            />

            <TextField
                id="filled-basic"
                label="PR Number"
                variant="filled"
                value={PRNumber}
                onChange={(event) => setPRNumber(event.target.value)}
                fullWidth
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
            />

            <TextField
                id="filled-basic"
                label="Ticket Number"
                variant="filled"
                value={ticketNumber}
                onChange={(event) => setTicketNumber(event.target.value)}
                fullWidth
            /> 

            <TextField
                id="filled-basic"
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

export default TicketBuilderForm;