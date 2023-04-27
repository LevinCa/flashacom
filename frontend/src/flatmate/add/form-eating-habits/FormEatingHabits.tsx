import {
    FormControl,
    FormControlLabel,
    Input,
    InputLabel,
    Switch,
} from "@mui/material";
import {EatingHabits} from "../../../model/Flatmate";
import React, {ChangeEvent, useState} from "react";
import './FormEatingHabits.css'

type PropsFormEatingHabits = {
    food: EatingHabits,
    foodInputChange: (event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
    foodSelectChange: (event: ChangeEvent<HTMLInputElement>) => void,
    deleteItem: (list: string, item: string) => void
}

export default function FormEatingHabits(props: PropsFormEatingHabits) {

    const [veganChecked, setVeganChecked] = useState<boolean>(false)
    const [vegetarianChecked, setVegetarianChecked] = useState<boolean>(false)
    const [vegetarianDisabled, setVegetarianDisabled] = useState<boolean>(false)

    const [likes, setLikes] = useState<string[]>([])
    const [dislikes, setDislikes] = useState<string[]>([])
    const [allergies, setAllergies] = useState<string[]>([])

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
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
        props.foodSelectChange(event)
    }

    function onInputKeyDown(event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) {
        if (event.key.toLowerCase() === "enter") {
            if (event.currentTarget.name === "likes") {
                setLikes([...likes, event.currentTarget.value])
                props.foodInputChange(event)
            } else if (event.currentTarget.name === "dislikes") {
                setDislikes([...dislikes, event.currentTarget.value])
                props.foodInputChange(event)
            } else if (event.currentTarget.name === "allergies") {
                setAllergies([...allergies, event.currentTarget.value])
                props.foodInputChange(event)
            }
            event.currentTarget.value = ""
        }
    }

    function deleteItem(event: React.MouseEvent<HTMLDivElement>): void {
        if (event.currentTarget.ariaLabel === "likes") {
            setLikes(likes.filter(like => like !== event.currentTarget.textContent))
        } else if (event.currentTarget.ariaLabel === "dislikes") {
            setDislikes(dislikes.filter(dislike => dislike !== event.currentTarget.textContent))
        } else if (event.currentTarget.ariaLabel === "allergies") {
            setAllergies(allergies.filter(allergy => allergy !== event.currentTarget.textContent))
        }
        if (event.currentTarget.ariaLabel) {
            props.deleteItem(event.currentTarget.ariaLabel, event.currentTarget.textContent ? event.currentTarget.textContent : "")
        }
    }

    return (
        <form className="form-personal form-food">
            <div>
                <FormControlLabel
                    value="vegan"
                    control={<Switch aria-label="vegan" color="primary" checked={veganChecked}
                                     onChange={handleChange}/>}
                    label="Vegan"
                    labelPlacement="top"
                />
                <FormControlLabel
                    value="vegetarian"
                    control={<Switch aria-label="vegetarian" color="primary" disabled={vegetarianDisabled}
                                     checked={vegetarianChecked} onChange={handleChange}/>}
                    label="Vegetarian"
                    labelPlacement="top"
                    checked={vegetarianChecked}
                />
            </div>
            <FormControl variant="standard" sx={{width: '100%'}}>
                <InputLabel htmlFor="input-likes">Likes</InputLabel>
                <Input id="input-likes" name="likes" onKeyDown={event => onInputKeyDown(event)}/>
            </FormControl>
            <div className="food-tag-container">
                {likes.map(like => {
                    return <div className="food-tag" aria-label="likes" key={like}
                                onClick={event => deleteItem(event)}>{like}</div>
                })}
            </div>
            <FormControl variant="standard" sx={{width: '100%'}}>
                <InputLabel htmlFor="input-dislikes">Dislikes</InputLabel>
                <Input id="input-dislikes" name="dislikes" onKeyDown={event => onInputKeyDown(event)}/>
            </FormControl>
            <div className="food-tag-container">
                {dislikes.map(dislike => {
                    return <div className="food-tag" aria-label="dislikes" key={dislike}
                                onClick={event => deleteItem(event)}>{dislike}</div>
                })}
            </div>
            <FormControl variant="standard" sx={{width: '100%'}}>
                <InputLabel htmlFor="input-allergies">Allergies</InputLabel>
                <Input id="input-allergies" name="allergies" onKeyDown={event => onInputKeyDown(event)}/>
            </FormControl>
            <div className="food-tag-container">
                {allergies.map(allergy => {
                    return <div className="food-tag" aria-label="allergies" key={allergy}
                                onClick={event => deleteItem(event)}>{allergy}</div>
                })}
            </div>
        </form>
    )
}