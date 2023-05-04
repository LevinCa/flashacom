import {EatingHabits} from "../../../../model/Flatmate";
import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {ChangeEvent, useContext, useEffect, useState} from "react";
import {Close, Edit} from "@mui/icons-material";
import {FormControl, FormControlLabel, Input, InputLabel, Switch} from "@mui/material";
import Button from "@mui/material/Button";
import {FlatmateProvider} from "../../../../context/FlatmateContext";


export default function FoodDetailsView() {

    const flatmateContext = useContext(FlatmateProvider)
    const [expanded, setExpanded] = useState<string | false>(false)
    const [editable, setEditable] = useState<boolean>(false)
    const [veganChecked, setVeganChecked] = useState<boolean>(flatmateContext.currentFlatmate.eatingHabits.vegan)
    const [vegetarianChecked, setVegetarianChecked] = useState<boolean>(flatmateContext.currentFlatmate.eatingHabits.vegetarian)
    const [vegetarianDisabled, setVegetarianDisabled] = useState<boolean>(flatmateContext.currentFlatmate.eatingHabits.vegan)
    const [food, setFood] = useState<EatingHabits>(flatmateContext.currentFlatmate.eatingHabits)
    const [cssNotEditable, setCssNotEditable] = useState<string>("")

    useEffect(() => {
        if (!editable) setCssNotEditable(" details-tag")
        else setCssNotEditable("")
    }, [editable])

    const handleChange =
        (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false)
        }

    function handleSwitchChange(event: ChangeEvent<HTMLInputElement>) {
        if (event.target.value === "vegan") {
            setVeganChecked(event.target.checked);
            if (event.target.checked) {
                setVegetarianChecked(true)
                setVegetarianDisabled(true)
            } else {
                setVegetarianDisabled(false)
            }
        } else {
            setVegetarianChecked(event.target.checked)
        }
        setFood({...food, vegan: veganChecked, vegetarian: veganChecked})
    }

    function onInputKeyDown(event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const name = event.currentTarget.name as ("likes" | "dislikes" | "allergies")
        if (event.key.toLowerCase() === "enter") {
            setFood({...food, likes: [...food[name], event.currentTarget.value]})
            event.currentTarget.value = ""
        }
    }

    function deleteItem(event: React.MouseEvent<HTMLDivElement>): void {
        if (event.currentTarget.ariaLabel === "likes") {
            setFood({...food, likes: food.likes.filter(like => like !== event.currentTarget.textContent)})
        } else if (event.currentTarget.ariaLabel === "dislikes") {
            setFood({...food, dislikes: food.dislikes.filter(dislike => dislike !== event.currentTarget.textContent)})
        } else if (event.currentTarget.ariaLabel === "allergies") {
            setFood({...food, allergies: food.allergies.filter(allergy => allergy !== event.currentTarget.textContent)})
        }
    }

    function saveChanges() {
        flatmateContext.putFlatmate({...flatmateContext.currentFlatmate, eatingHabits: food})
            .then(() => setEditable(false))
    }


    return (
        <div className="food-details-view">
            <div className="edit-icon" onClick={() => {
                setEditable(!editable);
            }}>
                {!editable
                    ? <Edit sx={{width: '100%', height: '100%'}}/>
                    : <Close sx={{width: '100%', height: '100%'}}/>
                }</div>
            <Accordion className="accordion" expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}
                    id="panel1bh-header"
                >
                    <Typography sx={{width: '33%', flexShrink: 0}}>Likes</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {editable &&
                        <FormControl variant="standard" sx={{width: '100%'}}>
                            <InputLabel htmlFor="details-input-likes">Likes</InputLabel>
                            <Input id="details-input-likes" name="likes" onKeyDown={event => onInputKeyDown(event)}/>
                        </FormControl>}
                    <div className="food-tag-container">
                        {food.likes.map(like => {
                            return <div className={"food-tag".concat(cssNotEditable)} aria-label="likes" key={like}
                                        onClick={deleteItem}
                            >{like}</div>
                        })}
                    </div>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}
                    id="panel2bh-header"
                >
                    <Typography sx={{width: '33%', flexShrink: 0}}>Dislikes</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {editable &&
                        <FormControl variant="standard" sx={{width: '100%'}}>
                            <InputLabel htmlFor="details-input-dislikes">Likes</InputLabel>
                            <Input id="detail-input-dislikes" name="dislikes"
                                   onKeyDown={event => onInputKeyDown(event)}/>
                        </FormControl>}
                    <div className="food-tag-container">
                        {food.dislikes.map(dislike => {
                            return <div className={"food-tag".concat(cssNotEditable)} aria-label="dislikes" key={dislike}
                                        onClick={deleteItem}
                            >{dislike}</div>
                        })}
                    </div>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}
                    id="panel3bh-header"
                >
                    <Typography sx={{width: '33%', flexShrink: 0}}>Allergies</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {editable &&
                        <FormControl variant="standard" sx={{width: '100%'}}>
                            <InputLabel htmlFor="details-input-allergies">Likes</InputLabel>
                            <Input id="details-input-allergies" name="allergies"
                                   onKeyDown={event => onInputKeyDown(event)}/>
                        </FormControl>}
                    <div className="food-tag-container">
                        {food.allergies.map(allergies => {
                            return <div className={"food-tag".concat(cssNotEditable)} aria-label="allergies" key={allergies}
                                        onClick={deleteItem}
                            >{allergies}</div>
                        })}
                    </div>
                </AccordionDetails>
            </Accordion>
            {editable &&
                <div className="switch-container">
                    <FormControlLabel
                        value="vegan"
                        control={<Switch aria-label="vegan" color="primary" checked={veganChecked}
                                         onChange={handleSwitchChange}/>}
                        label="Vegan"
                        labelPlacement="top"
                    />
                    <FormControlLabel
                        value="vegetarian"
                        control={<Switch aria-label="vegetarian" color="primary" disabled={vegetarianDisabled}
                                         checked={vegetarianChecked} onChange={handleSwitchChange}/>}
                        label="Vegetarian"
                        labelPlacement="top"
                        checked={vegetarianChecked}
                    />
                </div>}
            {editable && <Button type="button" onClick={() => saveChanges()} fullWidth={true}>Save</Button>}
        </div>
    )
}