import {createContext, ReactElement, useContext, useEffect, useState} from "react";
import {dummyFlatmate, Flatmate} from "../model/Flatmate";
import axios from "axios";
import {toast} from "react-toastify";
import {RoomProvider} from "./RoomContext";
import {Room} from "../model/Room";
import {UserProvider} from "./UserContext";

type contextType = {
    allFlatmates: Flatmate[],
    currentFlatmate: Flatmate,
    detailsOpen: boolean,
    setDetailsOpen: (open: boolean) => void,
    post: (newFlatmate: Flatmate) => void,
    getDetails: (id: string) => void,
    putFlatmate: (flatmate: Flatmate) => Promise<void>,
    deleteFlatmate: () => void,
    assignees: Flatmate[],
    setAssignees: (flatmate: Flatmate[]) => void
}

export const FlatmateProvider = createContext<contextType>({
    allFlatmates: [],
    currentFlatmate: dummyFlatmate,
    detailsOpen: false,
    setDetailsOpen: () => {},
    post: () => {},
    getDetails: () => {},
    putFlatmate: () => Promise.prototype,
    deleteFlatmate: () => {},
    assignees: [],
    setAssignees: () => {}
    })

export default function FlatmateContext(props: {children: ReactElement}) {

    const roomContext = useContext(RoomProvider)
    const userContext = useContext(UserProvider)
    const [allFlatmates, setAllFlatmates] = useState<Flatmate[]>([])
    const [currentFlatmate, setCurrentFlatmate] = useState<Flatmate>(dummyFlatmate)
    const [openDetails, setOpenDetails] = useState<boolean>(false)
    const [unassigned, setUnassigned] = useState<Flatmate[]>([])

    useEffect(() => {
        if (userContext.user.username !== "" && userContext.user.username !== "anonymousUser") getAllFlatmates()
    },[currentFlatmate, userContext.user])

    useEffect(() => {
        checkUnassigned()
        // eslint-disable-next-line
    },[roomContext.currentRoom])

    function checkUnassigned(): void {
        let assigneesList: Flatmate[] = allFlatmates
        for (const flatmate of assigneesList) {
            let assignedRooms: Room[] = roomContext.allRooms.filter(room => room.assignments.includes(flatmate.id))
            if (assignedRooms.length > 0) {
                assigneesList = assigneesList.filter(assignedFlatmate => flatmate !== assignedFlatmate)
            }
        }
        setUnassigned(assigneesList)
    }

    function getAllFlatmates(): void {
        axios.get("/api/flatmate")
            .then(response => {
                setAllFlatmates(response.data)
            })
            .catch(() => toast.error("Failed to Load the Data"))
    }

    function postFlatmate(newFlatmate: Flatmate): void {
        axios.post('/api/flatmate', newFlatmate)
            .then(() => {
                setAllFlatmates([...allFlatmates, newFlatmate])
                toast.success(newFlatmate.firstName + " successfully added")
            })
            .catch(() => toast.error("Failed to add Flatmate"))
    }

    function getById(id: string): void {
        axios.get("/api/flatmate/" + id)
            .then(response => {
                setCurrentFlatmate(response.data)
                setOpenDetails(true)
            })
    }

    function putFlatmate(flatmate: Flatmate): Promise<void> {
        return axios.put("/api/flatmate/" + flatmate.id, flatmate)
            .then(response => setCurrentFlatmate(response.data))
    }

    function deleteFlatmate(): void {
        axios.delete("/api/flatmate/" + currentFlatmate.id)
            .then(() => {
                setCurrentFlatmate(dummyFlatmate)
                setAllFlatmates(allFlatmates.filter(flatmate => flatmate.id !== currentFlatmate.id))
                setOpenDetails(false)
            })
            .catch(() => toast.error("Failed to delete"))
    }

    return (
        <FlatmateProvider.Provider value={{
            allFlatmates: allFlatmates,
            currentFlatmate: currentFlatmate,
            detailsOpen: openDetails,
            setDetailsOpen: setOpenDetails,
            post: postFlatmate,
            getDetails: getById,
            putFlatmate: putFlatmate,
            deleteFlatmate: deleteFlatmate,
            assignees: unassigned,
            setAssignees: setUnassigned
        }}>
            {props.children}
        </FlatmateProvider.Provider>
    )
}