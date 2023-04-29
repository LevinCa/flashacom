import * as React from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import './AddModal.css'
import Modal from "@mui/material/Modal";
import {style} from "../../model/ModalStyle";
import AddPagination from "./pagination/AddPagination";
import {useState} from "react";


export default function AddModal() {
    const [open, setOpen] = useState<boolean>(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div className="add-modal">
            <SpeedDial
                ariaLabel="add-button"
                id="add-dial"
                sx={{position: 'fixed', bottom: 16, right: 16, width: "3rem", height: "3rem"}}
                icon={<SpeedDialIcon id="add-icon"/>}
                openIcon={<SpeedDialIcon/>}
                onClick={handleOpen}
            >
            </SpeedDial>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box className="add-modal-container" sx={style}>
                    <AddPagination setOpen={setOpen}/>
                </Box>
            </Modal>
        </div>
    );
}


