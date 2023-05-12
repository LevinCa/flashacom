import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import FlatmateContext from "./context/FlatmateContext";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import RoomContext from "./context/RoomContext";
import FormContext from "./context/FormContext";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <ToastContainer theme="dark"/>
        <FormContext>
            <RoomContext>
                <FlatmateContext>
                    <App/>
                </FlatmateContext>
            </RoomContext>
        </FormContext>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
