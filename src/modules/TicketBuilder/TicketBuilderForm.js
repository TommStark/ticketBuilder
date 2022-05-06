/* eslint-disable no-unused-vars */
import * as React from 'react';
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import LoadingButton from '@mui/lab/LoadingButton';
import FormControl from '@mui/material/FormControl';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import SendIcon from '@mui/icons-material/Send';
import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Divider,
    Grid,
} from '@mui/material';

const Alert = React.forwardRef(function Alert(props, ref) {
    return < MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
function TicketBuilderForm(props) {
    const {
        project, handleChangeSelect, PRNumber, setPRNumber, ticketNumber, setTicketNumber,details,
        setDetails,setChecks,isLoading,isDisabled,generateTicket, author, projectsData, checks, isdiscordOpen, setIsDicordOpen, isDataLoading
    } = props;

    const MenuItems = React.useMemo(() => projectsData?.map((project,index) => {
        return <MenuItem key={ `${index}${project.name}` } value={project.name}> {`${project.icon} ${project.name}`} </MenuItem>;
    }),[projectsData]); 

    return ( 
        <>  
            {isDataLoading 
                ? <CircularProgress color="secondary"  size='5rem'/>
                :
                <form
                    autoComplete="off"
                    noValidate
                >
                    <Card>
                        <CardHeader
                            subheader="Create and send to Discord"
                            title="Ticket"
                        />
                        <Divider />
                        <CardContent>
                            <Grid
                                container
                                spacing={3}
                            >
                                <Grid
                                    item
                                    md={6}
                                    xs={12}
                                >
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
                                </Grid>
                                <Grid
                                    item
                                    md={6}
                                    xs={12}
                                >
                                    <TextField
                                        id="filled-basic-author"
                                        label="Author"
                                        variant="filled"
                                        value={author}
                                        fullWidth
                                        disabled
                                    />
                                </Grid>
                                <Grid
                                    item
                                    md={6}
                                    xs={12}
                                >
                                    <TextField
                                        id="filled-basic-pr"
                                        label="Github PR Number"
                                        variant="filled"
                                        value={PRNumber}
                                        onChange={(event) => setPRNumber(event.target.value)}
                                        fullWidth
                                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                                    />
                                </Grid>
                                <Grid
                                    item
                                    md={6}
                                    xs={12}
                                >
                                    <TextField
                                        id="filled-basic-ticket"
                                        label="Jira Ticket Number"
                                        variant="filled"
                                        value={ticketNumber}
                                        onChange={(event) => setTicketNumber(event.target.value)}
                                        fullWidth
                                    /> 
                                </Grid>
                                <Grid
                                    item
                                    md={6}
                                    xs={12}
                                >
                                    <TextField
                                        id="filled-basic-details"
                                        label="Details"
                                        variant="filled"
                                        value={details}
                                        onChange={(event) => setDetails(event.target.value)}
                                        fullWidth
                                    /> 
                                </Grid>
                                <Grid
                                    item
                                    md={6}
                                    xs={12}
                                >
                                    <FormLabel id="demo-row-radio-buttons-group-label" style={{textAlign: 'left'}}>Checks</FormLabel>
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
                                </Grid>
                            </Grid>
                        </CardContent>
                        <Divider />
                        <Box
                            sx={{
                                display        : 'flex',
                                justifyContent : 'flex-end',
                                p              : 2
                            }}
                        >
                            <div className="txt-align">
                                <LoadingButton 
                                    loading={isLoading}
                                    color = 'secondary'
                                    variant="contained"
                                    disabled={!isDisabled}
                                    endIcon={<SendIcon />}
                                    onClick={ () => generateTicket()}
                                >To Discord
                                </LoadingButton>
                            </div>
                        </Box>
                    </Card>
                </form>
            
            }
            <Snackbar open={isdiscordOpen} autoHideDuration={2400} onClose={() => setIsDicordOpen(false)}>
                <Alert onClose={() => setIsDicordOpen(false)} severity="info" sx={{ width: '100%' }}>
                Ticket Sent to Discord!
                </Alert>
            </Snackbar>
        </>
    );}

TicketBuilderForm.defaultProps = {
    project      : '',
    projectsData : [],
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
    isdiscordOpen      : PropTypes.bool.isRequired,
    isDataLoading      : PropTypes.bool.isRequired,
    setIsDicordOpen    : PropTypes.func.isRequired,
};
export default TicketBuilderForm;