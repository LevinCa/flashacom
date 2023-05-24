import React, {useContext} from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import FlatmateOverview from "./flatmate/overview/FlatmateOverview";
import Header from "./static/Header";
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import HelpModal from "./flatmate/help/HelpModal";
import AddModal from "./flatmate/add/AddModal";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {LocalizationProvider} from '@mui/x-date-pickers';
import DetailsModal from "./flatmate/details/DetailsModal";
import RosterGrid from "./cleaning-roster/overview/RosterGrid";
import AddPagination from "./flatmate/add/pagination/AddPagination";
import AddRoom from "./cleaning-roster/add/AddRoom";
import EditModal from "./cleaning-roster/edit/EditModal";
import LoginView from "./user/LoginView";
import ProtectedRoutes from "./ProtectedRoutes";
import {UserProvider} from "./context/UserContext";


const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

function App() {

    const userContext = useContext(UserProvider)

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline/>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div className="App">
                    <BrowserRouter>
                        <Header/>
                        <Routes>
                            <Route path={"/login"} element={<LoginView signUp={false}/>}/>
                            <Route path={"/signup"} element={<LoginView signUp={true}/>}/>
                            <Route element={<ProtectedRoutes user={userContext.user.username}/>}>
                                <Route path={"/flatmate"} element={<>
                                    <HelpModal/>
                                    <FlatmateOverview/>
                                    <AddModal element={<AddPagination/>}/>
                                    <DetailsModal/>
                                </>}></Route>
                                <Route path={"/cleaning-roster"} element={<>
                                    <RosterGrid/>
                                    <AddModal element={<AddRoom/>}/>
                                    <EditModal/>
                                </>}/>
                            </Route>
                        </Routes>
                    </BrowserRouter>
                </div>
            </LocalizationProvider>
        </ThemeProvider>
    );
}

export default App;
