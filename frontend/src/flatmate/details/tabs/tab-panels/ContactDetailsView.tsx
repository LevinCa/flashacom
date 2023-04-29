import {Flatmate} from "../../../../model/Flatmate";


export default function ContactDetailsView(props: {flatmate: Flatmate}) {

    return (
        <div className="contact-details-view">
            <div className="details-line-container">
                <label htmlFor="details-email">E-Mail: </label>
                <p id="details-email">{props.flatmate.contact.eMail}</p>
            </div>
            <div className="details-line-container">
                <label htmlFor="details-phone">Phone: </label>
                <p id="details-phone">{props.flatmate.contact.phone}</p>
            </div>
            <div className="details-line-container">
                <label htmlFor="details-paypal">PayPal: </label>
                <p id="details-paypal">{props.flatmate.contact.payPal}</p>
            </div>
        </div>
    )
}