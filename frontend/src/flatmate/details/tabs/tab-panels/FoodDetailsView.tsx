import {Flatmate} from "../../../../model/Flatmate";
import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {useState} from "react";


export default function FoodDetailsView(props: { flatmate: Flatmate }) {

    const [expanded, setExpanded] = useState<string | false>(false)

    const handleChange =
        (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false)
        }

    return (
        <div className="food-details-view">
            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}
                    id="panel1bh-header"
                >
                    <Typography sx={{width: '33%', flexShrink: 0}}>Likes</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <div className="food-tag-container">
                        {props.flatmate.eatingHabits.likes.map(like => {
                            return <div className="food-tag" aria-label="likes" key={like}
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
                    <div className="food-tag-container">
                        {props.flatmate.eatingHabits.dislikes.map(dislike => {
                            return <div className="food-tag" aria-label="dislikes" key={dislike}
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
                    <div className="food-tag-container">
                        {props.flatmate.eatingHabits.allergies.map(allergies => {
                            return <div className="food-tag" aria-label="allergies" key={allergies}
                            >{allergies}</div>
                        })}
                    </div>
                </AccordionDetails>
            </Accordion>
        </div>
    )
}