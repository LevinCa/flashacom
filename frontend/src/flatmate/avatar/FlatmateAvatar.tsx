import {Flatmate} from "../../model/Flatmate";

export default function FlatmateAvatar(props: { flatmate: Flatmate, cssAvailabilityClass: string }) {

    return (
        <div className={"flatmate-avatar"}>
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