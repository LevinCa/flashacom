import "./Header.css"
import Navigation from "./Navigation";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";
import {AccountCircleRounded, LogoutRounded} from "@mui/icons-material";
import {useContext, useEffect, useState} from "react";
import {UserProvider} from "../context/UserContext";
import {dummyUser, User} from "../model/user";

export default function Header() {

    const navigate = useNavigate()
    const userContext = useContext(UserProvider)
    const [user, setUser] = useState<User>(userContext.user)

    useEffect(() => {
        setUser(userContext.user)
    }, [userContext.user])

    return (
        <div className="header-view">
            <Navigation/>
            <div className="header">
                <img src={require("../resources/logo.png")} alt="Logo"/>
                <h1>FlaShaCom</h1>
            </div>
            <div className="user-button-container">
                {user.username === "" || user.username === "anonymousUser"
                    ? <Button onClick={() => navigate("/login")}><AccountCircleRounded/></Button>
                    : <Button onClick={() => {
                        userContext.logout()
                        setUser(dummyUser)
                        navigate("/login")
                    }}><LogoutRounded/></Button>}
            </div>
        </div>
    )
}