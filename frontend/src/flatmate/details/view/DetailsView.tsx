import {FormEvent, useContext, useState} from "react";
import {FlatmateProvider} from "../../../context/FlatmateContext";
import {Close, Edit, EmailRounded, PaymentRounded, PhoneRounded} from "@mui/icons-material";
import DetailTabs from "../tabs/DetailTabs";
import './DetailsView.css'
import {TextField} from "@mui/material";
import Button from "@mui/material/Button";

export default function DetailsView() {

    const flatmateContext = useContext(FlatmateProvider)
    const [imgSrc, setImgSrc] = useState<string>(flatmateContext.currentFlatmate.photoUrl)

    const [editable, setEditable] = useState<boolean>(false)

    function checkAvailabilityClass(availability: string): string {
        switch (availability) {
            case 'AT_HOME':
                return 'border-green'
            case 'HOME_OFFICE':
                return 'border-yellow'
            case 'DO_NOT_DISTURB':
            case 'OUT_FOR_WORK':
                return 'border-red'
            default:
                return 'border-grey'
        }
    }

    function submitImageChange(event: FormEvent<HTMLFormElement>): void {
        event.preventDefault()
        flatmateContext.putFlatmate({...flatmateContext.currentFlatmate, photoUrl: imgSrc})
            .then(() => setEditable(false))

    }

    return (
        <div className="details-view">
            <div
                className={"flatmate-image-container ".concat(checkAvailabilityClass(flatmateContext.currentFlatmate.availability))}>
                <div className="edit-icon" onClick={() => {
                    setEditable(!editable);
                    editable && setImgSrc(flatmateContext.currentFlatmate.photoUrl)
                }}>
                    {!editable
                        ? <Edit sx={{width: '100%', height: '100%'}}/>
                        : <Close sx={{width: '100%', height: '100%'}}/>
                    }</div>
                <img src={imgSrc}
                     alt="Profile"
                     onError={error => error.currentTarget.src = require("../../../resources/avatar.jpeg")}
                />
            </div>
            {editable &&
                <form onSubmit={submitImageChange}>
                    <TextField variant="standard" label="Photo URL" sx={{flex: 1}}
                               value={imgSrc} onChange={event => setImgSrc(event.target.value)}/>
                    <Button type="submit">Save</Button>
                </form>
            }
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