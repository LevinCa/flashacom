import {createContext, ReactElement, useEffect, useState} from "react";
import {dummyUser, User} from "../model/user";
import axios from "axios";

type contextType = {
    user: User,
    login: (username: string, password: string) => Promise<void>,
    logout: () => void,
    signup: (user: User) => void
}

export const UserProvider = createContext<contextType>({
    user: dummyUser,
    login: () => Promise.prototype,
    logout: () => {},
    signup: () => {}
})

export default function UserContext(props: { children: ReactElement }) {

    const [user, setUser] = useState<User>(dummyUser)

    useEffect(
        () => loadCookies(),
        []
    )

    function loadCookies(): void {
        axios.get("/api/user/me")
            .then(response => setUser(response.data))
    }

    function loginUser(username: string, password: string): Promise<void> {
        return axios.post("/api/user", undefined, {auth: {username, password}})
            .then(response => setUser(response.data))
    }

    function logoutUser() {
        axios.post("/api/user/logout")
            .then(() => setUser(dummyUser))
    }

    function signUpUser(newUser: User): void {
        axios.post("/api/user/signup", newUser)
            .then(() => loginUser(newUser.username, newUser.password!))
    }

    return (
        <UserProvider.Provider value={{
            login: loginUser,
            user: user,
            logout: logoutUser,
            signup: signUpUser
        }}>
            {props.children}
        </UserProvider.Provider>
    )
}