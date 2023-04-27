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
                            <Route path={"/flatmate"} element={<><HelpModal/><FlatmateOverview/><AddModal/></>}></Route>
                        </Routes>
                    </BrowserRouter>
                </div>
            </LocalizationProvider>
        </ThemeProvider>
    );
}

export default App;
