import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import PropTypes from 'prop-types';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import DoneIcon from '@mui/icons-material/Done';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import OutboxIcon from '@mui/icons-material/Outbox';

const Alert = React.forwardRef(function Alert(props, ref) {
    return < MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


const style = {
    height          : '100px',
    margin          : '0 auto',
    display         : 'table',
    position        : 'absolute',
    left            : 0,
    right           : 0,
    top             : '50%',
    border          : ' 1px solid',
    transform       : 'translateY(-50%)',
    backgroundColor : '#747c85',
    p               : 2
};

export default function Modalticket(props) {
    const { ticket, isOpen, handleClick, PrintTicket, handleClose, handleModalClosed, isModalopen }= props;

    const [isdiscordOpen, setIsDicordOpen] = React.useState(false);

    return (
        <div>
            <Modal
                open={isModalopen}
                onClose={handleModalClosed}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <>
                    <Box
                        sx={style}
                    >
                        { isModalopen && PrintTicket()}
                        <Stack spacing={2} direction="row">
                            <Tooltip title="Send to Discord">
                                <IconButton 
                                    variant="contained"
                                    color = 'secondary'
                                    onClick={ () => {setIsDicordOpen(true);}}
                                >
                                    <OutboxIcon/>
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
                    <Snackbar open={isOpen} autoHideDuration={1400} onClose={handleClose}>
                        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Copied!
                        </Alert>
                    </Snackbar>
                    <Snackbar open={isdiscordOpen} autoHideDuration={1400} onClose={() => setIsDicordOpen(false)}>
                        <Alert onClose={() => setIsDicordOpen(false)} severity="info" sx={{ width: '100%' }}>
                    Aguanta, todavia falta para eso!
                        </Alert>
                    </Snackbar>
                </>
            </Modal>
        </div>
    );
}
Modalticket.defaultProps ={
    ticket: {}
};

Modalticket.propTypes = {
    ticket: PropTypes.shape({
        id          : PropTypes.string,
        pr          : PropTypes.string,
        vpdc        : PropTypes.string,
        projectName : PropTypes.string,
        detailsText : PropTypes.string,
        check       : PropTypes.string,
        author      : PropTypes.string

    }),
    isOpen            : PropTypes.bool.isRequired,
    handleClick       : PropTypes.func.isRequired,
    reset             : PropTypes.func.isRequired,
    PrintTicket       : PropTypes.func.isRequired,
    handleClose       : PropTypes.func.isRequired,
    handleModalClosed : PropTypes.func.isRequired,
    isModalopen       : PropTypes.bool.isRequired,
    author            : PropTypes.string.isRequired,
};