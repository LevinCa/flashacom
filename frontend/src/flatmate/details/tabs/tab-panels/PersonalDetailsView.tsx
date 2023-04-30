import {Flatmate} from "../../../../model/Flatmate";


export default function PersonalDetailsView(props: { flatmate: Flatmate }) {

    return (
        <div className="personal-details-view">
            <div className="details-line-container">
                <label htmlFor="details-full-name">Full Name: </label>
                <p id="details-full-name">{props.flatmate.firstName + " " + props.flatmate.lastName}</p>
            </div>
            <div className="details-line-container">
                <label htmlFor="details-dob">Date of Birth: </label>
                <p id="details-dob">{props.flatmate.dateOfBirth.toString()}</p>
            </div>
            <div className="details-line-container">
                <label htmlFor="details-availability">Availability: </label>
                <p id="details-availability">{props.flatmate.availability.toLowerCase().replaceAll("_", " ")}</p>
            </div>
        </div>
    )
}