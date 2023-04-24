import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import './HelpModal.css'

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function HelpModal() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div className="help-modal">
            <Button className="help-button" onClick={handleOpen}><HelpOutlineIcon/></Button>
            <Modal
                open={open}
                onClose={handleClose}

            >
                <Box className="modal-container" sx={style}>
                    <div className="legend-line">
                        <div className="frame-container border-green">
                            <div className="content-container">
                            </div>
                        </div>
                        <h6>At Home</h6>
                    </div>
                    <div className="legend-line">
                        <div className="frame-container border-yellow">
                            <div className="content-container">
                            </div>
                        </div>
                        <h6>Home Office</h6>
                    </div>
                    <div className="legend-line">
                        <div className="frame-container border-red">
                            <div className="content-container">
                            </div>
                        </div>
                        <h6>Do Not Disturb</h6>
                    </div>
                    <div className="legend-line">
                        <div className="frame-container border-grey">
                            <div className="content-container">
                            </div>
                        </div>
                        <h6>Absent</h6>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}
