import React, {useContext} from "react";
import {FlatmateProvider} from "../../context/FlatmateContext";
import './EditModal.css'
import FlatmateCard from "./FlatmateCard";


export default function UnassignedList() {

    const flatmateContext = useContext(FlatmateProvider)

    function preventPropagation(event: React.MouseEvent<HTMLDivElement>) {
        event.stopPropagation()
    }

    return (
        <div id="unassigned-list" className="edit-room-container"
             onClick={preventPropagation}
        >
            <h2>Unassigned</h2>
            <div className="edit-room-assignees-container">
                {flatmateContext.assignees.map(flatmate => {
                    return (
                        <FlatmateCard key={flatmate.id} flatmate={flatmate}/>
                    )})}
            </div>
        </div>
    )
}