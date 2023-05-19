import Button from "@mui/material/Button";
import React, {useContext, useEffect, useState} from "react";
import {FlatmateProvider} from "../../context/FlatmateContext";
import {RoomProvider} from "../../context/RoomContext";
import UnassignedList from "./UnassignedList";
import './EditModal.css'
import {FormProvider} from "../../context/FormContext";
import FlatmateCard from "./FlatmateCard";
import {Flatmate} from "../../model/Flatmate";
import {ArrowBackIosNewRounded, ArrowForwardIosRounded} from "@mui/icons-material";


export default function EditModal() {

    const flatmateContext = useContext(FlatmateProvider)
    const roomContext = useContext(RoomProvider)
    const formContext = useContext(FormProvider)

    const [currentAssignees, setCurrentAssignees] = useState<Flatmate[]>([])

    useEffect(
        () => setAssignments(),
        [roomContext.currentRoom]
    )

    function setAssignments(): void {
        const assignees: Flatmate[] = []
        for (const flatmateId of roomContext.currentRoom.assignments) {
            let currentAssignee: Flatmate | undefined = flatmateContext.allFlatmates.find(mate => mate.id === flatmateId)
            if (currentAssignee !== undefined) assignees.push(currentAssignee)
        }
        setCurrentAssignees(assignees)
    }


    function closeModal(event: React.MouseEvent<HTMLDivElement>) {
        event.stopPropagation()
        formContext.setRoomEditOpen(false)
    }

    function preventPropagation(event: React.MouseEvent<HTMLDivElement>) {
        event.stopPropagation()
    }

    function buttonClickLeft(event: React.MouseEvent<HTMLButtonElement>) {
        const transferList: Flatmate[] = currentAssignees.concat(roomContext.selectedAssignees)
        setCurrentAssignees(transferList)
        let transferList2 = flatmateContext.assignees
        for (const selectedFlatmate of roomContext.selectedAssignees) {
            transferList2 = transferList2.filter(flatmate => flatmate.id !== selectedFlatmate.id)
        }
        flatmateContext.setAssignees(transferList2)
        roomContext.setSelectedAssignees([])
        event.stopPropagation()
        roomContext.put(transferList.map(flatmate => flatmate.id))
    }

    function buttonClickRight(event: React.MouseEvent<HTMLButtonElement>) {
        const transferList: Flatmate[] = flatmateContext.assignees.concat(roomContext.selectedAssigned)
        flatmateContext.setAssignees(transferList)
        let transferList2 = currentAssignees
        for (const selectedFlatmate of roomContext.selectedAssigned) {
            transferList2 = transferList2.filter(flatmate => flatmate.id !== selectedFlatmate.id)
        }
        setCurrentAssignees(transferList2)
        roomContext.setSelectedAssigned([])
        event.stopPropagation()
        roomContext.put(transferList2.map(flatmate => flatmate.id))
    }

    function deleteRoom() {
        roomContext.deleteRoom(roomContext.currentRoom.id)
        formContext.setRoomEditOpen(false)
    }

    const image: string = require("../../resources/"
        .concat(
            roomContext.currentRoom.imageProperties.index < 7
                ? roomContext.currentRoom.imageProperties.index as unknown as string
                : "0"
        ).concat(".jpeg"))

    function saturate(): string {
        if (roomContext.currentRoom.imageProperties.isOverSaturated) {
            return "2"
        } else if (roomContext.currentRoom.imageProperties.isBlackAndWhite) {
            return "0"
        } else return "1"
    }

    const roomStyle = {
            backgroundImage: "url(" + image + ")",
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            cursor: 'pointer',
            filter: "hue-rotate(" + roomContext.currentRoom.imageProperties.hue + "deg) " +
                "invert(".concat(roomContext.currentRoom.imageProperties.isInverted ? "1)" : "0)") +
                "saturate(" + saturate() + ")" +
                "brightness(" + roomContext.currentRoom.imageProperties.brightness + "%)",
    }

    return (
        <div className="room-edit-modal" style={{display: formContext.roomEditOpen ? "flex" : "none"}}
             onClick={closeModal}
        >
            <div className="edit-room-container"
                 onClick={preventPropagation}
            >
                <div className="background-image-container" style={roomStyle}></div>
                <h2>{roomContext.currentRoom.name}</h2>
                <div className="edit-room-assignees-container">
                    {currentAssignees.map(flatmate => {
                        return (
                            <FlatmateCard key={flatmate.id} flatmate={flatmate}/>
                        )
                    })}
                </div>
            </div>
            <div className="edit-view-transfer-container">
                <Button
                    variant="contained"
                    className="transfer-button"
                    onClick={buttonClickLeft}
                ><ArrowBackIosNewRounded/></Button>
                <Button
                    variant="contained"
                    className="transfer-button"
                    onClick={buttonClickRight}
                ><ArrowForwardIosRounded/></Button>
            </div>
            <UnassignedList/>
            <Button color="error" id="room-delete-button" onClick={deleteRoom}>Delete</Button>
        </div>
    )
}