import {createContext, ReactElement, useEffect, useState} from "react";
import {Flatmate} from "../model/Flatmate";
import axios from "axios";
import {toast} from "react-toastify";


export const FlatmateProvider = createContext<{
    allFlatmates: Flatmate[],
}>({
    allFlatmates: []
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

    return (
        <FlatmateProvider.Provider value={{
            allFlatmates: allFlatmates
        }}>
            {props.children}
        </FlatmateProvider.Provider>
    )
}