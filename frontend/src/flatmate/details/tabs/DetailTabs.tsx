import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import {Flatmate} from "../../../model/Flatmate";
import PersonalDetailsView from "./tab-panels/PersonalDetailsView";
import FoodDetailsView from "./tab-panels/FoodDetailsView";
import {useState} from "react";
import ContactDetailsView from "./tab-panels/ContactDetailsView";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

export default function DetailTabs(props: {flatmate: Flatmate}) {
    const [value, setValue] = useState(0)

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue)
    }

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange}>
                    <Tab label="Personal" />
                    <Tab label="Food" />
                    <Tab label="Contact" />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <PersonalDetailsView flatmate={props.flatmate}/>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <FoodDetailsView flatmate={props.flatmate}/>
            </TabPanel>
            <TabPanel value={value} index={2}>
                <ContactDetailsView flatmate={props.flatmate}/>
            </TabPanel>
        </Box>
    );
}