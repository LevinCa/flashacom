import * as React from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import './AddModal.css'
import Modal from "@mui/material/Modal";
import {style} from "../../model/ModalStyle";
import {ReactElement, useContext} from "react";
import {FormProvider} from "../../context/FormContext";


export default function AddModal(props: {element: ReactElement}) {

    const formContext = useContext(FormProvider)

    const handleOpen = () => formContext.setAddModalOpen(true);
    const handleClose = () => formContext.setAddModalOpen(false);

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
                open={formContext.addModalOpen}
                onClose={handleClose}
            >
                <Box className="add-modal-container" sx={style}>
                    {props.element}
                </Box>
            </Modal>
        </div>
    );
}


