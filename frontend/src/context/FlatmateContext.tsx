import {createContext, ReactElement, useEffect, useState} from "react";
import {Flatmate} from "../model/Flatmate";
import axios from "axios";
import {toast} from "react-toastify";


export const FlatmateProvider = createContext<{
    allFlatmates: Flatmate[],
    post: (newFlatmate: Flatmate) => void
}>({
    allFlatmates: [],
    post: () => {}
    })

export default function FlatmateContext(props: {children: ReactElement}) {

    const [allFlatmates, setAllFlatmates] = useState<Flatmate[]>([])

    useEffect(() => getAllFlatmates(),[])

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

    return (
        <FlatmateProvider.Provider value={{
            allFlatmates: allFlatmates,
            post: postFlatmate
        }}>
            {props.children}
        </FlatmateProvider.Provider>
    )
}