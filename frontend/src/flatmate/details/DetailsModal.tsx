import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import {style} from "../../model/ModalStyle";
import * as React from "react";
import {useContext} from "react";
import {FlatmateProvider} from "../../context/FlatmateContext";
import DetailsView from "./view/DetailsView";


export default function DetailsModal() {

    const flatmateContext = useContext(FlatmateProvider)

    const handleClose = () => flatmateContext.setDetailsOpen(false);

    return (
        <Modal
            open={flatmateContext.detailsOpen}
            onClose={handleClose}
            disableAutoFocus={true}
        >
            <Box className="details-modal-container" sx={{...style, height: '90%', overflow: 'scroll'}}>
                <DetailsView/>
            </Box>
        </Modal>
    )
}