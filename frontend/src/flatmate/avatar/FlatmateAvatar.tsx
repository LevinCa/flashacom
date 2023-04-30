import {Flatmate} from "../../model/Flatmate";
import {useContext} from "react";
import {FlatmateProvider} from "../../context/FlatmateContext";

export default function FlatmateAvatar(props: { flatmate: Flatmate, cssAvailabilityClass: string }) {

    const flatmateContext = useContext(FlatmateProvider)

    function onAvatarClick() {
        flatmateContext.getDetails(props.flatmate.id)
    }

    return (
        <div className="flatmate-avatar" onClick={onAvatarClick}>
            <div className={"flatmate-image-container ".concat(props.cssAvailabilityClass)}>
                <img
                     src={props.flatmate.photoUrl}
                     alt={props.flatmate.firstName}
                     onError={error => error.currentTarget.src = require("../../resources/avatar.jpeg")}
                />
            </div>
            <h5>{props.flatmate.firstName}</h5>
        </div>
    )
}