import {createContext, ReactElement, useEffect, useState} from "react";
import {Community} from "../model/Community";
import axios from "axios";
import {toast} from "react-toastify";

type contextType = {
    allCommunities: Community[],
    post: (community: Community) => Promise<Community>
}

export const CommunityProvider = createContext<contextType>({
    allCommunities: [],
    post: () => Promise.prototype
})

export default function CommunityContext(props: { children: ReactElement }) {

    const [allCommunities, setAllCommunities] = useState<Community[]>([])

    useEffect(
        getAllCommunities,
        []
    )

    function getAllCommunities(): void {
        axios.get("/api/community")
            .then(response => setAllCommunities(response.data))
            .catch(() => toast.error("Failed to load data!"))
    }

    function postCommunity(community: Community): Promise<Community> {
        return axios.post<Community>("/api/community", community)
            .then(response => {
                setAllCommunities([...allCommunities, response.data])
                return response.data
            })
    }

    return (
        <CommunityProvider.Provider value={{
            allCommunities: allCommunities,
            post: postCommunity
        }}>
            {props.children}
        </CommunityProvider.Provider>
    )
}