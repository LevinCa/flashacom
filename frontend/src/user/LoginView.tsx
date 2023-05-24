import {Autocomplete, darken, lighten, styled, TextField} from "@mui/material";
import {useContext, useState} from "react";
import Button from "@mui/material/Button";
import {UserProvider} from "../context/UserContext";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import "./User.css"
import {User} from "../model/user";
import {CommunityProvider} from "../context/CommunityContext";
import {AddRounded, RemoveRounded} from "@mui/icons-material";


type loginProps = {
    signUp: boolean
}

export default function LoginView(props: loginProps) {

    const userContext = useContext(UserProvider)
    const communityContext = useContext(CommunityProvider)
    const navigate = useNavigate()

    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [repeatPassword, setRepeatPassword] = useState<string>("")
    const [communityId, setCommunityId] = useState<string>("")
    const [inputValid, setInputValid] = useState<boolean>(false)
    const [addCommunity, setAddCommunity] = useState<boolean>(false)
    const [communityName, setCommunityName] = useState<string>("")
    const [logoUrl, setLogoUrl] = useState<string>("")

    const GroupHeader = styled('div')(({theme}) => ({
        position: 'sticky',
        top: '-8px',
        padding: '4px 10px',
        color: theme.palette.primary.main,
        backgroundColor:
            theme.palette.mode === 'light'
                ? lighten(theme.palette.primary.light, 0.85)
                : darken(theme.palette.primary.main, 0.8),
    }))

    const GroupItems = styled('ul')({
        padding: 0,
    })

    const communities = communityContext.allCommunities.map(community => {
        const firstLetter = community.name[0].toUpperCase();
        return {
            firstLetter: /\d/.test(firstLetter) ? '0-9' : firstLetter,
            key: community.id,
            ...community,
        }
    })

    function login(): void {
        if (!props.signUp) {
            userContext.login(username, password)
                .then(() => navigate("/flatmate"))
                .catch(() => toast.error("Login failed!"))
        } else {
            setAddCommunity(false)
            navigate("/login");
        }
    }

    function signUp() {
        if (props.signUp) {
            const newUser: User = {
                id: "",
                username: username,
                password: password,
                flatmateId: "",
                communityId: communityId
            }
            userContext.logout()
            if (addCommunity) {
                communityContext.post({id: "", logoUrl: logoUrl, name: communityName, flatmateIds: [], roomIds: []})
                    .then(data => userContext.signup({...newUser, communityId: data.id}))
            } else {
                userContext.signup(newUser)
            }
        } else {
            navigate("/signup")
        }
    }

    function validate(): void {
        let valid: boolean = username !== "" && password !== ""
        setInputValid(valid)
    }

    function sortCommunities() {
        return communities.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))
    }

    return (
        <div className="login-view">
            <TextField value={username} variant="standard" label="Username"
                       onChange={event => {
                           setUsername(event.target.value)
                           validate()
                       }}
                       sx={{width: "80%", maxWidth: "300px"}}
            />
            <TextField value={password} type="password" variant="standard" label="Password"
                       onChange={event => {
                           setPassword(event.target.value)
                           validate()
                       }}
                       sx={{width: "80%", maxWidth: "300px"}}
            />
            {props.signUp &&
                <TextField value={repeatPassword} type="password" variant="standard" label="Repeat Password"
                           onChange={event => {
                               setRepeatPassword(event.target.value)
                               validate()
                           }}
                           sx={{width: "80%", maxWidth: "300px"}}
                />
            }
            {props.signUp &&
                <div className="community-container">
                    <Autocomplete
                        disabled={addCommunity}
                        onChange={(event, newValue) => setCommunityId(!!newValue?.id ? newValue.id : "")}
                        options={sortCommunities()}
                        groupBy={community => community.firstLetter}
                        getOptionLabel={community => community.name}
                        sx={{maxWidth: 300, width: "80%", minWidth: "200px"}}
                        renderInput={(params) => <TextField {...params} label="Communities"/>}
                        renderGroup={(params) => (
                            <li key={params.key}>
                                <GroupHeader>{params.group}</GroupHeader>
                                <GroupItems>{params.children}</GroupItems>
                            </li>
                        )}
                    />
                    <Button variant={!addCommunity ? "contained" : "outlined"} onClick={() => {
                        if (!addCommunity) setCommunityId("")
                        setAddCommunity(!addCommunity)
                    }}>
                        {!addCommunity
                            ? <AddRounded/>
                            : <RemoveRounded/>
                        }
                    </Button>
                </div>
            }
            { props.signUp && addCommunity &&
                <TextField variant="standard" label="Community Name" value={communityName}
                           onChange={event => setCommunityName(event.target.value)}
                           sx={{width: "80%", maxWidth: "300px"}}
                />
            }
            { props.signUp && addCommunity &&
                <TextField variant="standard" label="Logo URL" value={logoUrl}
                           onChange={event => setLogoUrl(event.target.value)}
                           sx={{width: "80%", maxWidth: "300px"}}
                />
            }
            <div className="button-container">
                <Button
                    disabled={props.signUp && !inputValid}
                    variant={props.signUp ? "contained" : "outlined"}
                    onClick={signUp}
                >Sign Up</Button>
                <Button
                    disabled={!props.signUp && !inputValid}
                    variant={props.signUp ? "outlined" : "contained"}
                    onClick={login}
                >Login</Button>
            </div>
        </div>
    )
}