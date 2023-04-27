import {TextField} from "@mui/material";
import React, {ChangeEvent, useEffect, useState} from "react";
import './FormPersonalInfo.css'
import {DatePicker} from "@mui/x-date-pickers";
import {DemoContainer} from "@mui/x-date-pickers/internals/demo/DemoContainer";
import dayjs, {Dayjs} from "dayjs";

type PropsPersonal = {
    personalInputChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | null) => void,
    dateChange: (dateOfBirth: Dayjs | null) => void
}
export default function FormPersonalInfo(props: PropsPersonal) {

    const [imgSrc, setImgSrc] = useState<string>(require('../../../resources/avatar.jpeg'))
    const [dateOfBirth, setDateOfBirth] = useState<Dayjs | null>(dayjs('2000-01-01'))

    useEffect(
        () => props.dateChange(dateOfBirth),
        //eslint-disable-next-line
        [dateOfBirth]
    )

    return (
        <div className="form-personal">
            <div className="flatmate-image-container add-image-container border-green">
                <img src={imgSrc} alt={require('../../../resources/avatar.jpeg')}/>
            </div>
            <form className="form-personal">
                <div className="form-personal-names">
                    <TextField name="firstName" id="first-name-input" label="First Name" variant="standard"
                               onChange={props.personalInputChange}/>
                    <TextField name="lastName" id="last-name-input" label="Last Name" variant="standard"
                               onChange={props.personalInputChange}/>
                </div>
                <div className="image-form-container">
                    <TextField name="photoUrl" id="form-personal-img-url" label="Photo URL" className="form-input-grow"
                               variant="standard" onChange={event => {
                        setImgSrc(event.target.value);
                        props.personalInputChange(event)
                    }}/>
                </div>
                <DemoContainer components={['DatePicker']}>
                    <DatePicker label="Date of Birth" value={dateOfBirth}
                                onChange={newValue => setDateOfBirth(newValue)}/>
                </DemoContainer>
            </form>
        </div>
    )
}