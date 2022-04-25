import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import DoneIcon from '@mui/icons-material/Done';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import IconButton from '@mui/material/IconButton';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import Tooltip from '@mui/material/Tooltip';

const Alert = React.forwardRef(function Alert(props, ref) {
    return < MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function GeneratedTicket(props) {
    const { ticket, isOpen, handleClick, reset, PrintTicket, handleClose, ticketId }= props;

    return ( 
        <>
            <p> #{ticketId} </p>
            <Box
                sx={{ p: 2, border: '1px dashed white', backgroundColor: '#747c85' }}
            >
                {PrintTicket()}
                <Stack spacing={2} direction="row">
                    <Tooltip title="Back">
                        <IconButton 
                            variant="contained"
                            color = 'secondary'
                            onClick={ () => reset()}
                        >
                            <KeyboardBackspaceIcon/>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Copy to clipboard">
                        <IconButton 
                            aria-label="copy" 
                            color={ isOpen ? 'success' : 'primary'}
                            size="small"
                            onClick={() =>  {
                                navigator.clipboard.writeText(`${ticket.pr}\n${ticket.vpdc}\n${ticket.projectName}\n${ticket.detailsText}\n${ticket.check}\n${ticket.author}\n`);
                                handleClick();
                            }}
                        >
                            { isOpen ? <DoneIcon /> : <ContentCopyIcon />}
                        </IconButton>
                    </Tooltip>
                </Stack>
            </Box>
            <Snackbar open={isOpen} autoHideDuration={2000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Copied!
                </Alert>
            </Snackbar>
        </>
    );
}

GeneratedTicket.propTypes = {
    ticket: PropTypes.shape({
        id          : PropTypes.string,
        pr          : PropTypes.string,
        vpdc        : PropTypes.string,
        projectName : PropTypes.string,
        detailsText : PropTypes.string,
        check       : PropTypes.string,
        author      : PropTypes.string

    }).isRequired,
    isOpen      : PropTypes.bool.isRequired,
    handleClick : PropTypes.func.isRequired,
    reset       : PropTypes.func.isRequired,
    PrintTicket : PropTypes.func.isRequired,
    handleClose : PropTypes.func.isRequired,
    ticketId    : PropTypes.string.isRequire,
};

export default GeneratedTicket;