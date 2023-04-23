import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import {useState} from "react";
import {Menu, People} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";
import "./Navigation.css"

export default function Navigation() {
    const [state, setState] = useState<boolean>(false)
    const navigate = useNavigate()

    const toggleDrawer =
        (open: boolean) =>
            (event: React.KeyboardEvent | React.MouseEvent) => {
                if (
                    event.type === 'keydown' &&
                    ((event as React.KeyboardEvent).key === 'Tab' ||
                        (event as React.KeyboardEvent).key === 'Shift')
                ) {
                    return;
                }

                setState(open);
            };

    const box = (
        <Box
            sx={{width: 250}}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <List>
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => navigate("/flatmate")}>
                            <ListItemIcon>
                                <People/>
                            </ListItemIcon>
                            <ListItemText primary="Flatmates"/>
                        </ListItemButton>
                    </ListItem>

            </List>
        </Box>
    )

    return (
        <div className="navigation">
                <React.Fragment key="left">
                    <Button onClick={toggleDrawer(true)}><Menu/></Button>
                    <Drawer
                        anchor="left"
                        open={state}
                        onClose={toggleDrawer(false)}
                    >
                        {box}
                    </Drawer>
                </React.Fragment>
        </div>
    )
}