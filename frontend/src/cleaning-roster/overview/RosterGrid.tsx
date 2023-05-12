import './RosterGrid.css'
import {useContext} from "react";
import {RoomProvider} from "../../context/RoomContext";
import RoomGridItem from "../room-grid-item/RoomGridItem";

export default function RosterGrid() {

    const roomContext = useContext(RoomProvider)

    return (
        <div className="overview-grid">
            {roomContext.allRooms.map(room => {
                return(
                    <RoomGridItem key={room.id} room={room}/>
                )
            })}
        </div>
    )
}