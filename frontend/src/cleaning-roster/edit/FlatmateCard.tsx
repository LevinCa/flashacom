import {Flatmate} from "../../model/Flatmate";
import {useContext, useState} from "react";
import {RoomProvider} from "../../context/RoomContext";
import './EditModal.css'
import {FlatmateProvider} from "../../context/FlatmateContext";


export default function FlatmateCard(props: {flatmate: Flatmate}) {

    const roomContext = useContext(RoomProvider)
    const flatmateContext = useContext(FlatmateProvider)
    const [selected, setSelected] = useState<boolean>(false)

    function onFlatmateClick() {
        if (!selected && (flatmateContext.assignees.some(flatmate => flatmate.id === props.flatmate.id))) {
            roomContext.setSelectedAssignees([...roomContext.selectedAssignees, props.flatmate])
        } else if (!selected && !(flatmateContext.assignees.some(flatmate => flatmate.id === props.flatmate.id))){
            roomContext.setSelectedAssigned([...roomContext.selectedAssigned, props.flatmate])
        } else {
            roomContext.setSelectedAssigned(roomContext.selectedAssigned.filter(flatmate => flatmate.id !== props.flatmate.id))
            roomContext.setSelectedAssignees(roomContext.selectedAssignees.filter(flatmate => flatmate.id !== props.flatmate.id))
        }
        setSelected(!selected)
    }

    return (
        <div className={"edit-room-flatmate-container".concat(selected ? " selected-flatmate" : "")}
             onClick={onFlatmateClick}>
            <div className="flatmate-image-container">
                <img src={props.flatmate.photoUrl} alt={props.flatmate.firstName}/>
            </div>
            <h3>{props.flatmate.firstName}</h3>
        </div>
    )
}