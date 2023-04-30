import {useContext} from "react";
import {FlatmateProvider} from "../../../context/FlatmateContext";
import {EmailRounded, PaymentRounded, PhoneRounded} from "@mui/icons-material";
import DetailTabs from "../tabs/DetailTabs";
import './DetailsView.css'

export default function DetailsView() {

    const flatmateContext = useContext(FlatmateProvider)

    function checkAvailabilityClass(availability: string): string {
        switch (availability) {
            case 'AT_HOME':
                return 'border-green'
            case 'OUT_FOR_WORK':
            case 'HOME_OFFICE':
                return 'border-yellow'
            case 'DO_NOT_DISTURB':
                return 'border-red'
            default:
                return 'border-grey'
        }
    }

    return (
        <div className="details-view">
            <div
                className={"flatmate-image-container ".concat(checkAvailabilityClass(flatmateContext.currentFlatmate.availability))}>
                <img src={flatmateContext.currentFlatmate.photoUrl}
                     alt="Profile"
                     onError={error => error.currentTarget.src = require("../../../resources/avatar.jpeg")}
                />
            </div>
            <div className="personal-data-container">
                <h4>{flatmateContext.currentFlatmate.firstName}</h4>
            </div>
            <div className="contact-link-container">
                <a href={"mailto:" + flatmateContext.currentFlatmate.contact.eMail}><EmailRounded color="primary"/></a>
                <a href={"tel:" + flatmateContext.currentFlatmate.contact.phone}><PhoneRounded color="primary"/></a>
                <a href={"https://" + flatmateContext.currentFlatmate.contact.payPal}><PaymentRounded color="primary"/></a>
            </div>
            <DetailTabs flatmate={flatmateContext.currentFlatmate}/>
        </div>
    )
}