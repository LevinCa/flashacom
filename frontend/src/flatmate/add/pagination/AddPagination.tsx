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
import {ChangeEvent, useContext, useState} from "react";
import {Contact, EatingHabits, Flatmate, PersonalInfo} from "../../../model/Flatmate";
import dayjs, {Dayjs} from "dayjs";
import {FlatmateProvider} from "../../../context/FlatmateContext";
import {FormProvider} from "../../../context/FormContext";


export default function AddPagination() {

    const flatmateContext = useContext(FlatmateProvider)
    const formContext = useContext(FormProvider)
    const [activeStep, setActiveStep] = useState(0);
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

    const handleNext = () => {
        if (activeStep < steps.length -1) {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
        if (activeStep === steps.length -1) {
            const newFlatmate: Flatmate = {
                id: "",
                firstName: personalInfo.firstName,
                lastName: personalInfo.lastName,
                photoUrl: personalInfo.photoUrl,
                dateOfBirth: personalInfo.dateOfBirth,
                eatingHabits: food,
                contact: contact,
                availability: "AT_HOME"
            }
            flatmateContext.post(newFlatmate)
            formContext.setAddModalOpen(false)
        }
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    return (
        <Box sx={{width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            {stepContent[activeStep]}
            <div className="grow-container"></div>
            <Stepper activeStep={activeStep} className="add-stepper">
                {steps.map(label => {
                    const stepProps: { completed?: boolean } = {};
                    const labelProps: {
                        optional?: React.ReactNode;
                    } = {};
                    return (
                        <Step key={label} {...stepProps}>
                            <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
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
        </Box>
    );
}