import {TextField} from "@mui/material";
import {ChangeEvent} from "react";
import {Contact} from "../../../model/Flatmate";

type PropsContact = {
    contact: Contact,
    contactCompose: (event: ChangeEvent<HTMLInputElement>) => void
}

export default function FormContactInfo(props: PropsContact) {

    return (
        <form className="form-personal">
            <TextField id="eMail" name="eMail" label="E-Mail" value={props.contact.eMail} variant="standard"
                       onChange={props.contactCompose} sx={{width: '100%'}}/>
            <TextField id="phone" name="phone" label="Phone Number" value={props.contact.phone} variant="standard"
                       onChange={props.contactCompose} sx={{width: '100%'}}/>
            <TextField id="payPal" name="payPal" label="PayPal" value={props.contact.payPal} variant="standard"
                       onChange={props.contactCompose} sx={{width: '100%'}}/>
        </form>
    )
}