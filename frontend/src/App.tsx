import React from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import FlatmateOverview from "./flatmate/overview/FlatmateOverview";
import Header from "./static/Header";
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";


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
                        <Route path={"/flatmate"} element={<FlatmateOverview/>}></Route>
                    </Routes>
                </BrowserRouter>
            </div>
        </ThemeProvider>
    );
}

export default App;
