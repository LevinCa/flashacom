import {Flatmate} from "../../../../model/Flatmate";
import React, {ChangeEvent, useContext, useState} from "react";
import {Close, Edit} from "@mui/icons-material";
import {FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField} from "@mui/material";
import {FlatmateProvider} from "../../../../context/FlatmateContext";
import {DatePicker} from "@mui/x-date-pickers";
import {DemoContainer} from "@mui/x-date-pickers/internals/demo/DemoContainer";
import dayjs, {Dayjs} from "dayjs";
import "./TabPanels.css"
import Button from "@mui/material/Button";


export default function PersonalDetailsView(props: { flatmate: Flatmate }) {

    const flatmateContext = useContext(FlatmateProvider)

    const [editable, setEditable] = useState<boolean>(false)
    const [dob, setDob] = useState<Dayjs | null>(dayjs(flatmateContext.currentFlatmate.dateOfBirth))
    const [availability, setAvailability] = useState<string>(flatmateContext.currentFlatmate.availability)
    const [fullName, setFullName] = useState<string>(
        flatmateContext.currentFlatmate.firstName
        + " "
        + flatmateContext.currentFlatmate.lastName
    )


    function handleChange(event: SelectChangeEvent): void {
        setAvailability(event.target.value)
    }

    function onNameChange(event: ChangeEvent<HTMLInputElement>): void {
        setFullName(event.target.value)
    }

    function saveChanges() {
        const nameList = fullName.split(" ")
        let updatedFlatmate: Flatmate
        if (nameList.length > 1) {
            updatedFlatmate =
                {
                    ...flatmateContext.currentFlatmate,
                    firstName: nameList[0],
                    lastName: nameList[1],
                    dateOfBirth: dayjs(dob),
                    availability: availability
                }
        } else {
            updatedFlatmate = {
                ...flatmateContext.currentFlatmate,
                dateOfBirth: dayjs(dob),
                availability: availability
            }
        }
        flatmateContext.putFlatmate(updatedFlatmate)
            .then(() => setEditable(false))
    }

    return (
        <div className="personal-details-view" style={{position: "relative"}}>
            <div className="edit-icon" onClick={() => {
                setEditable(!editable);
            }}>
                {!editable
                    ? <Edit sx={{width: '100%', height: '100%'}}/>
                    : <Close sx={{width: '100%', height: '100%'}}/>
                }</div>
            <div className="details-line-container">
                <label htmlFor="details-full-name">Full Name: </label>
                {!editable
                    ?
                    <p id="details-full-name">{props.flatmate.firstName.concat(" ").concat(props.flatmate.lastName)}</p>
                    : <TextField variant="standard" value={fullName}
                                 onChange={onNameChange}/>}
            </div>
            <div className="details-line-container">
                <label htmlFor="details-dob">Date of Birth: </label>
                {!editable
                    ? <p id="details-dob">{props.flatmate.dateOfBirth.toString()}</p>
                    : (<DemoContainer components={['DatePicker']}>
                        <DatePicker label="Date of Birth" value={dob}
                                    onChange={newValue => setDob(newValue)}/>
                    </DemoContainer>)}
            </div>
            <div className="details-line-container">
                <label htmlFor="details-availability">Availability: </label>
                {!editable
                    ? <p id="details-availability">{props.flatmate.availability.toLowerCase().replaceAll("_", " ")}</p>
                    : <FormControl variant="standard" sx={{m: 1, minWidth: 120}}>
                        <InputLabel id="details-availability-select-label">Availability</InputLabel>
                        <Select
                            labelId="details-availability-select-label"
                            id="details-availability-select"
                            value={availability}
                            onChange={handleChange}
                            label=""
                        >
                            <MenuItem value="AT_HOME">At Home</MenuItem>
                            <MenuItem value="HOME_OFFICE">Home Office</MenuItem>
                            <MenuItem value="OUT_FOR_WORK">Out for Work</MenuItem>
                            <MenuItem value="ABSENT">Absent</MenuItem>
                        </Select>
                    </FormControl>}
            </div>
            { editable && <Button type="button" onClick={() => saveChanges()}>Save</Button>}
        </div>
    )
}