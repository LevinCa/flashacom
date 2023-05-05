import {createContext, ReactElement, useState} from "react";
import {Room} from "../model/Room";


export const RoomProvider = createContext<{
    allRooms: Room[]
}>({
    allRooms: []
})

export default function RoomContext(props: {children: ReactElement}) {

    const [allRooms, setAllRooms] = useState<Room[]>([])

    return (
        <RoomProvider.Provider value={{
            allRooms: allRooms
        }}>
            {props.children}
        </RoomProvider.Provider>
    )
}