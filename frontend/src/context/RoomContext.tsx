import {createContext, ReactElement, useEffect, useState} from "react";
import {dummyRoom, Room} from "../model/Room";
import axios from "axios";
import {toast} from "react-toastify";


export const RoomProvider = createContext<{
    allRooms: Room[],
    currentRoom: Room,
    setCurrentRoom: (room: Room) => void
}>({
    allRooms: [],
    currentRoom: dummyRoom,
    setCurrentRoom: () => {}
})

export default function RoomContext(props: {children: ReactElement}) {

    const [allRooms, setAllRooms] = useState<Room[]>([])
    const [currentRoom, setCurrentRoom] = useState<Room>(dummyRoom)

    useEffect(
        () => getAllRooms(),
        []
    )

    function getAllRooms(): void {
        axios.get("/api/room")
            .then(response => setAllRooms(response.data))
            .catch(() => toast.error("Failed to retrieve Data"))
    }

    return (
        <RoomProvider.Provider value={{
            allRooms: allRooms,
            currentRoom: currentRoom,
            setCurrentRoom: setCurrentRoom
        }}>
            {props.children}
        </RoomProvider.Provider>
    )
}