import "./Header.css"
import Navigation from "./Navigation";

export default function Header() {
    return (
        <div className="header">
            <Navigation/>
            <div className="header">
                <img src={require("../resources/logo.png")} alt="Logo"/>
                <h1>FlaShaCom</h1>
            </div>
            <div></div>
        </div>
    )
}