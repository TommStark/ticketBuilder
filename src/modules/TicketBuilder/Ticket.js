/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import PropTypes from 'prop-types';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import DoneIcon from '@mui/icons-material/Done';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

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
    const { ticket, isOpen, handleClick, PrintTicket, handleClose, ticketId,handleModalClosed, isModalopen }= props;

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
            </Modal>
        </div>
    );
}