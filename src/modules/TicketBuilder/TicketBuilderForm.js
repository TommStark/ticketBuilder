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
import SendIcon from '@mui/icons-material/Send';
import SaveIcon from '@mui/icons-material/Save';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';

import {
    Box,
    Card,
    CardContent,
    CardHeader,
    Divider,
    Grid,
    ListSubheader,
} from '@mui/material';

function TicketBuilderForm(props) {
    const {
        project, handleChangeSelect, PRNumber, setPRNumber, ticketNumber, setTicketNumber,details,
        setDetails,setChecks,isLoading,isDisabled,generateTicket, author, projectsData, checks, projectSelected, saveTicket, checked, setChecked, admin, team,handleAuthorChangeSelect
    } = props;
    
    const projectsFreez = [];
    const projectsAvailable = [];
    
    const teamMenu = team.map( (user, index) => {
        return (<MenuItem key={ `${index}${user.name}` } value={user.name}> {user.name} </MenuItem>);
    });

    projectsData?.forEach((project,index) => {
        if(!project.state){
            projectsFreez.push(<MenuItem key={ `${index}${project.name}` } value={project.name}> {project.name} </MenuItem>);
        }else(
            projectsAvailable.push(<MenuItem key={ `${index}${project.name}` } value={project.name}> {project.name} </MenuItem>)
        );
    });
    
    const isEmpty = Object.keys(projectSelected).length === 0;

    return ( 
        <>                  
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
                                        <ListSubheader>{projectsAvailable.length ? 'Available' : ''}</ListSubheader>
                                        {
                                            projectsAvailable
                                        }
                                        <ListSubheader>{projectsFreez.length ? 'Frozen' : null}</ListSubheader>
                                        {
                                            projectsFreez
                                        }
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid
                                item
                                md={6}
                                xs={12}
                            >
                                {
                                    admin
                                        ?
                                        <FormControl fullWidth>
                                            <InputLabel id="Author">Author</InputLabel>
                                            <Select
                                                labelId="Author"
                                                id="AuthorSelector"
                                                value={author}
                                                label="Author"
                                                onChange={handleAuthorChangeSelect}
                                                defaultValue=""
                                            >   
                                                {teamMenu}
                                            </Select>
                                        </FormControl>
                                        :
                                        <TextField
                                            id="filled-basic-author"
                                            label="Author"
                                            variant="filled"
                                            value={author}
                                            fullWidth
                                            disabled
                                        />
                                }
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
                                    label="VPDC-"
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
                            
                            {                           
                                !isEmpty && !projectSelected?.state
                                    ?
                                    <Grid
                                        item
                                        md={6}
                                        xs={12}
                                    >
                                        <FormGroup>
                                            <FormControlLabel control={
                                                <Checkbox
                                                    checked={checked}
                                                    onChange={(event) => setChecked(event.target.checked)}
                                                    inputProps={{ 'aria-label': 'controlled' }}
                                                />} label="Deployment Label" />
                                        </FormGroup>
                                    </Grid>
                                    : null
                            }
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
                            {
                                (projectSelected?.state || checked) 
                                    ?
                                    <LoadingButton 
                                        loading={isLoading}
                                        color = 'secondary'
                                        variant="contained"
                                        disabled={!isDisabled}
                                        endIcon={<SendIcon />}
                                        onClick={ () => generateTicket()}
                                    >Save & Discord
                                    </LoadingButton>
                                    :
                                    <LoadingButton 
                                        loading={isLoading}
                                        color = 'primary'
                                        variant="contained"
                                        disabled={!isDisabled}
                                        endIcon={<SaveIcon />}
                                        onClick={ () => saveTicket()}
                                    >Save
                                    </LoadingButton>
                            }
                        </div>
                    </Box>
                </Card>
            </form>
        </>
    );}

TicketBuilderForm.defaultProps = {
    project       : '',
    projectsData  : [],
    isDataLoading : true,
    admin         : false,
    team          : []

};

TicketBuilderForm.propTypes = {
    project      : PropTypes.string,
    projectsData : PropTypes.arrayOf(PropTypes.shape({
        name : PropTypes.string,
        icon : PropTypes.string,

    })),
    isLoading                : PropTypes.bool.isRequired,
    isDisabled               : PropTypes.bool.isRequired,
    setPRNumber              : PropTypes.func.isRequired,
    handleAuthorChangeSelect : PropTypes.func.isRequired,
    setDetails               : PropTypes.func.isRequired,
    setChecks                : PropTypes.func.isRequired,
    generateTicket           : PropTypes.func.isRequired,
    setTicketNumber          : PropTypes.func.isRequired,
    handleChangeSelect       : PropTypes.func.isRequired,
    checked                  : PropTypes.func.isRequired,
    setChecked               : PropTypes.func.isRequired,
    author                   : PropTypes.string.isRequired,
    ticketNumber             : PropTypes.string.isRequired,
    PRNumber                 : PropTypes.string.isRequired,
    details                  : PropTypes.string.isRequired,
    checks                   : PropTypes.string.isRequired,
    isDataLoading            : PropTypes.bool,
    projectSelected          : PropTypes.shape({
        state: PropTypes.bool, 
    }),
    saveTicket : PropTypes.func.isRequired,
    admin      : PropTypes.bool,
    team       : PropTypes.arrayOf(PropTypes.shape({})),

};
export default TicketBuilderForm;