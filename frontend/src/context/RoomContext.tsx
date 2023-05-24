import {createContext, ReactElement, useContext, useEffect, useState} from "react";
import {dummyRoom, Room} from "../model/Room";
import axios from "axios";
import {toast} from "react-toastify";
import {Flatmate} from "../model/Flatmate";
import {UserProvider} from "./UserContext";

type contextType = {
    allRooms: Room[],
    currentRoom: Room,
    setCurrentRoom: (room: Room) => void,
    selectedAssignees: Flatmate[],
    setSelectedAssignees: (flatmates: Flatmate[]) => void,
    selectedAssigned: Flatmate[],
    setSelectedAssigned: (flatmates: Flatmate[]) => void,
    post: (room: Room) => void,
    put: (list: string[]) => void,
    deleteRoom: (id: string) => void
}

export const RoomProvider = createContext<contextType>({
    allRooms: [],
    currentRoom: dummyRoom,
    setCurrentRoom: () => {},
    selectedAssignees: [],
    setSelectedAssignees: () => [],
    selectedAssigned: [],
    setSelectedAssigned: () => {},
    post: () => {},
    put: () => {},
    deleteRoom: () => {}
})

export default function RoomContext(props: { children: ReactElement }) {

    const userContext = useContext(UserProvider)

    const [allRooms, setAllRooms] = useState<Room[]>([])
    const [currentRoom, setCurrentRoom] = useState<Room>(dummyRoom)
    const [selectedAssignees, setSelectedAssignees] = useState<Flatmate[]>([])
    const [selectedAssigned, setSelectedAssigned] = useState<Flatmate[]>([])

    useEffect(
        () => {
            if (userContext.user.username !== "" && userContext.user.username !== "anonymousUser") getAllRooms()
        },
        [userContext.user]
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

    function putAssignments(assignedList: string[]): void {
        axios.put("api/room/" + currentRoom.id, assignedList)
            .then(getAllRooms)
    }

    function deleteRoom(id: string) {
        axios.delete("api/room/" + id)
            .then(() => setAllRooms(allRooms.filter(room => room.id !== id)))
            .catch(() => toast.error("Failed to delete Room"))
    }

    return (
        <RoomProvider.Provider value={{
            allRooms: allRooms,
            currentRoom: currentRoom,
            setCurrentRoom: setCurrentRoom,
            selectedAssignees: selectedAssignees,
            setSelectedAssignees: setSelectedAssignees,
            selectedAssigned: selectedAssigned,
            setSelectedAssigned: setSelectedAssigned,
            post: postNewRoom,
            put: putAssignments,
            deleteRoom: deleteRoom
        }}>
            {props.children}
        </RoomProvider.Provider>
    )
}