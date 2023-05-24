import {Navigate, Outlet} from "react-router-dom";

type Props = {
    user: string | undefined
}

export default function ProtectedRoutes(props: Props) {

    const authenticated = props.user !== undefined && props.user !== 'anonymousUser'

    function checkAuthenticated(){
        return (authenticated ? <Outlet /> : <Navigate to={"/login"} />)
    }

    return (
        props.user !== "" ? checkAuthenticated() : <p>Loading...</p>
    )
}