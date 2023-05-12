import {createContext, ReactElement, useEffect, useState} from "react";
import {dummyRoom, Room} from "../model/Room";
import axios from "axios";
import {toast} from "react-toastify";


export const RoomProvider = createContext<{
    allRooms: Room[],
    currentRoom: Room,
    setCurrentRoom: (room: Room) => void,
    post: (room: Room) => void
}>({
    allRooms: [],
    currentRoom: dummyRoom,
    setCurrentRoom: () => {},
    post: () => {}
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

    function postNewRoom(room: Room): void {
        axios.post("/api/room", room)
            .then(response => {
                setAllRooms([...allRooms, response.data])
                toast.success("Room successfully added")
            })
            .catch(() => toast.error("Failed to add Room"))
    }

    return (
        <RoomProvider.Provider value={{
            allRooms: allRooms,
            currentRoom: currentRoom,
            setCurrentRoom: setCurrentRoom,
            post: postNewRoom
        }}>
            {props.children}
        </RoomProvider.Provider>
    )
}