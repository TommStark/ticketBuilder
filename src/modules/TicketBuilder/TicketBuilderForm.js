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
const pjson = require('../../../package.json');


function TicketBuilderForm(props) {

const {project, handleChangeSelect, PRNumber, setPRNumber, ticketNumber, setTicketNumber,details,
    setDetails,setChecks,isLoading,isDisabled,generateTicket
 } = props;
 const appVersion = pjson.version;

    return ( 
        <Box
            sx={{
            width: 500,
            maxWidth: '100%',
            }}>
            <h1 className="App" > Ticket Builder <sup className='smallText'> v{appVersion}</sup> </h1>
                <InputLabel id="demo-simple-select-label">Project*</InputLabel>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={project}
                label="project"
                onChange={handleChangeSelect}
                fullWidth
                variant="filled"
                >
                <MenuItem value='mobile'> 📳 Mobile</MenuItem>
                <MenuItem value='api'> 📡 API</MenuItem>
                <MenuItem value='echo'> 🔳 ECHO</MenuItem>
                <MenuItem value='vainilla'> 🥐 Vainilla</MenuItem>
                <MenuItem value='library'> 📒 Library</MenuItem>
                <MenuItem value='widget'> ⚙️ Widgets</MenuItem>
                </Select>
            
                <TextField
                id="filled-basic"
                label="PR Number"
                variant="filled"
                value={PRNumber}
                onChange={(event) => setPRNumber(event.target.value)}
                required
                fullWidth
                />
            
                <TextField
                id="filled-basic"
                label="Ticket Number"
                variant="filled"
                value={ticketNumber}
                onChange={(event) => setTicketNumber(event.target.value)}
                required
                fullWidth
                /> 
                <TextField
                id="filled-basic"
                label="Details"
                variant="filled"
                value={details}
                onChange={(event) => setDetails(event.target.value)}
                required
                fullWidth
                /> 
            
            <FormLabel id="demo-row-radio-buttons-group-label">Checks*</FormLabel>
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