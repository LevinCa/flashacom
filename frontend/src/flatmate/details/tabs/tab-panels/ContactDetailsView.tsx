import {Contact, Flatmate} from "../../../../model/Flatmate";
import {Close, Edit} from "@mui/icons-material";
import React, {ChangeEvent, useContext, useState} from "react";
import {TextField} from "@mui/material";
import {FlatmateProvider} from "../../../../context/FlatmateContext";
import Button from "@mui/material/Button";


export default function ContactDetailsView(props: { flatmate: Flatmate }) {

    const flatmateContext = useContext(FlatmateProvider)
    const [editable, setEditable] = useState<boolean>(false)
    const [contact, setContact] = useState<Contact>({
        eMail: flatmateContext.currentFlatmate.contact.eMail,
        phone: flatmateContext.currentFlatmate.contact.phone,
        payPal: flatmateContext.currentFlatmate.contact.payPal
    })

    function contactChange(event: ChangeEvent<HTMLInputElement>): void {
        setContact({...contact, [event.target.name]: event.target.value})
    }

    function saveChanges() {
        flatmateContext.putFlatmate({...flatmateContext.currentFlatmate, contact: contact})
            .then(() => setEditable(false))
    }

    return (
        <div className="contact-details-view">
            <div className="edit-icon" onClick={() => {
                setEditable(!editable);
            }}>
                {!editable
                    ? <Edit sx={{width: '100%', height: '100%'}}/>
                    : <Close sx={{width: '100%', height: '100%'}}/>
                }</div>
            <div className="details-line-container">
                <label htmlFor="details-email">E-Mail: </label>
                {!editable
                    ? <p id="details-email">{props.flatmate.contact.eMail}</p>
                    : <TextField name="eMail" variant="standard" value={contact.eMail} onChange={contactChange}/>}
            </div>
            <div className="details-line-container">
                <label htmlFor="details-phone">Phone: </label>
                {!editable
                    ? <p id="details-phone">{props.flatmate.contact.phone}</p>
                    : <TextField name="phone" variant="standard" value={contact.phone} onChange={contactChange}/>}
            </div>
            <div className="details-line-container">
                <label htmlFor="details-paypal">PayPal: </label>
                {!editable
                    ? <p id="details-paypal">{props.flatmate.contact.payPal}</p>
                    : <TextField name="payPal" variant="standard" value={contact.payPal} onChange={contactChange}/>}
            </div>
            { editable && <Button type="button" onClick={() => saveChanges()}>Save</Button>}
        </div>
    )
}