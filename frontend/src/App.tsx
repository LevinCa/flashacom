import React from 'react';
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


const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

function App() {
    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline/>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div className="App">
                    <BrowserRouter>
                        <Header/>
                        <Routes>
                            <Route path={"/flatmate"} element={<>
                                <HelpModal/>
                                <FlatmateOverview/>
                                <AddModal element={<AddPagination/>}/>
                                <DetailsModal/>
                            </>}></Route>
                            <Route path={"/cleaning-roster"} element={<>
                                <RosterGrid/>
                                <AddModal element={<AddRoom/>}/>
                            </>}/>
                        </Routes>
                    </BrowserRouter>
                </div>
            </LocalizationProvider>
        </ThemeProvider>
    );
}

export default App;
