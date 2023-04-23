import {useContext} from "react";
import {FlatmateProvider} from "../../context/FlatmateContext";
import FlatmateAvatar from "../avatar/FlatmateAvatar";
import "./FlatmateOverview.css"

export default function FlatmateOverview() {

    const flatmateContext = useContext(FlatmateProvider)

    return (
        <div className="flatmate-overview">
            {
                flatmateContext.allFlatmates
                    .filter(flatmate => flatmate.availability === "AT_HOME")
                    .map(flatmate => {
                        return (
                            <FlatmateAvatar key={flatmate.id} flatmate={flatmate} cssAvailabilityClass={"border-green"}/>
                        )
                    })
            }
            {
                flatmateContext.allFlatmates
                    .filter(flatmate => flatmate.availability === "HOME_OFFICE")
                    .map(flatmate => {
                        return (
                            <FlatmateAvatar key={flatmate.id} flatmate={flatmate} cssAvailabilityClass={"border-yellow"}/>
                        )
                    })
            }
            {
                flatmateContext.allFlatmates
                    .filter(flatmate => flatmate.availability === "OUT_FOR_WORK" || flatmate.availability === "DO_NOT_DISTURB")
                    .map(flatmate => {
                        return (
                            <FlatmateAvatar key={flatmate.id} flatmate={flatmate} cssAvailabilityClass={"border-red"}/>
                        )
                    })
            }
            {
                flatmateContext.allFlatmates
                    .filter(flatmate => flatmate.availability === "ABSENT")
                    .map(flatmate => {
                        return (
                            <FlatmateAvatar key={flatmate.id} flatmate={flatmate} cssAvailabilityClass={"border-grey"}/>
                        )
                    })
            }
        </div>
    )
}