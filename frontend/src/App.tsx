import React from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import FlatmateOverview from "./flatmate/overview/FlatmateOverview";
import Header from "./static/Header";
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import HelpModal from "./flatmate/help/HelpModal";
import AddModal from "./flatmate/add/AddModal";


const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

function App() {
    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline/>
            <div className="App">
                <BrowserRouter>
                    <Header/>
                    <Routes>
                        <Route path={"/flatmate"} element={<><HelpModal/><FlatmateOverview/><AddModal/></>}></Route>
                    </Routes>
                </BrowserRouter>
            </div>
        </ThemeProvider>
    );
}

export default App;
