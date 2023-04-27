import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import FormPersonalInfo from "../form-personal-info/FormPersonalInfo";
import FormEatingHabits from "../form-eating-habits/FormEatingHabits";
import FormContactInfo from "../form-contact-info/FormContactInfo";
import './AddPagination.css'
import {ChangeEvent, useState} from "react";
import {Contact, EatingHabits, PersonalInfo} from "../../../model/Flatmate";
import dayjs, {Dayjs} from "dayjs";


export default function AddPagination() {

    const [activeStep, setActiveStep] = useState(0);
    const [skipped, setSkipped] = useState(new Set<number>());
    const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({firstName: "", lastName: "", photoUrl: "", dateOfBirth: dayjs('2000-01-01')})
    const [contact, setContact] = useState<Contact>({eMail: "", phone: "", payPal: ""})
    const [food, setFood] = useState<EatingHabits>({
        vegan: false,
        vegetarian: false,
        likes: [],
        dislikes: [],
        allergies: []
    })

    const steps = ['Personal', 'Food', 'Contact'];
    const stepContent = [
        <FormPersonalInfo key={0} personalInputChange={onPersonalInputChange} dateChange={onDateChange}/>,
        <FormEatingHabits key={1} food={food} foodInputChange={onFoodInputChange} foodSelectChange={onFoodSelectChange} deleteItem={deleteListItem}/>,
        <FormContactInfo key={2} contact={contact} contactCompose={onContactInputChange}/>]


    function onPersonalInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | null): void {
        if (event) {
            setPersonalInfo({...personalInfo, [event.target.name]: event.target.value})
        }
    }

    function onDateChange(date: Dayjs | null): void {
        if (date) {
            setPersonalInfo({...personalInfo, dateOfBirth: date})
        }
    }

    function onContactInputChange(event: ChangeEvent<HTMLInputElement>): void {
        setContact({...contact, [event.target.name]: event.target.value})
    }

    function onFoodInputChange(event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>): void {
        if (event.currentTarget.name === "likes") {
            setFood({...food, likes: [...food.likes, event.currentTarget.value]})
        } else if (event.currentTarget.name === "dislikes") {
            setFood({...food, dislikes: [...food.dislikes, event.currentTarget.value]})
        } else if (event.currentTarget.name === "allergies") {
            setFood({...food, allergies: [...food.allergies, event.currentTarget.value]})
        }
    }

    function onFoodSelectChange(event: ChangeEvent<HTMLInputElement>): void {
        setFood({...food, [event.target.value]: event.target.checked})
    }

    function deleteListItem(list: string, item: string): void {
        if (list === "likes") setFood({...food, [list]: food.likes.filter(like => like !== item)})
        else if (list === "dislikes") setFood({...food, [list]: food.dislikes.filter(dislike => dislike !== item)})
        else if (list === "allergies") setFood({...food, [list]: food.allergies.filter(allergies => allergies !== item)})
    }

    const isStepSkipped = (step: number) => {
        return skipped.has(step);
    };

    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    return (
        <Box sx={{width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            {stepContent[activeStep]}
            <div className="grow-container"></div>
            <Stepper activeStep={activeStep} className="add-stepper">
                {steps.map((label, index) => {
                    const stepProps: { completed?: boolean } = {};
                    const labelProps: {
                        optional?: React.ReactNode;
                    } = {};
                    if (isStepSkipped(index)) {
                        stepProps.completed = false;
                    }
                    return (
                        <Step key={label} {...stepProps}>
                            <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
            {activeStep === steps.length ? (
                <React.Fragment>
                    <Box sx={{display: 'flex', flexDirection: 'row', pt: 2}}>
                        <Box sx={{flex: '1 1 auto'}}/>
                        <Button onClick={handleReset}>Reset</Button>
                    </Box>
                </React.Fragment>
            ) : (
                <React.Fragment>
                    <Box sx={{display: 'flex', flexDirection: 'row', pt: 2, width: '100%'}}>
                        <Button
                            color="inherit"
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            sx={{mr: 1}}
                        >
                            Back
                        </Button>
                        <div className="grow-container"></div>
                        <Button onClick={handleNext}>
                            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                        </Button>
                    </Box>
                </React.Fragment>
            )}
        </Box>
    );
}