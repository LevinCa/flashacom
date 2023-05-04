import {createContext, ReactElement, useEffect, useState} from "react";
import {dummyFlatmate, Flatmate} from "../model/Flatmate";
import axios from "axios";
import {toast} from "react-toastify";


export const FlatmateProvider = createContext<{
    allFlatmates: Flatmate[],
    currentFlatmate: Flatmate,
    detailsOpen: boolean,
    setDetailsOpen: (open: boolean) => void,
    post: (newFlatmate: Flatmate) => void,
    getDetails: (id: string) => void,
    putFlatmate: (flatmate: Flatmate) => Promise<void>,
    deleteFlatmate: () => void
}>({
    allFlatmates: [],
    currentFlatmate: dummyFlatmate,
    detailsOpen: false,
    setDetailsOpen: () => {},
    post: () => {},
    getDetails: () => {},
    putFlatmate: () => Promise.prototype,
    deleteFlatmate: () => {}
    })

export default function FlatmateContext(props: {children: ReactElement}) {

    const [allFlatmates, setAllFlatmates] = useState<Flatmate[]>([])
    const [currentFlatmate, setCurrentFlatmate] = useState<Flatmate>(dummyFlatmate)
    const [openDetails, setOpenDetails] = useState<boolean>(false)

    useEffect(() => getAllFlatmates(),[currentFlatmate])

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
            deleteFlatmate: deleteFlatmate
        }}>
            {props.children}
        </FlatmateProvider.Provider>
    )
}