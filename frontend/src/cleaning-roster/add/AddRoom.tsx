import React, {useContext, useState} from "react";
import './AddRoom.css'
import {AutorenewRounded, CachedRounded} from "@mui/icons-material";
import {RoomProvider} from "../../context/RoomContext";
import background0 from '../../resources/0.jpeg'
import background1 from '../../resources/1.jpeg'
import background2 from '../../resources/2.jpeg'
import background3 from '../../resources/3.jpeg'
import background4 from '../../resources/4.jpeg'
import background5 from '../../resources/5.jpeg'
import background6 from '../../resources/6.jpeg'
import {FormControlLabel, FormGroup, Slider, Switch, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import {Room} from "../../model/Room";
import {FormProvider} from "../../context/FormContext";
import {toast} from "react-toastify";

export default function AddRoom() {

    const roomContext = useContext(RoomProvider)
    const formContext = useContext(FormProvider)
    const [name, setName] = useState<string>("")
    const [isVertical, setIsVertical] = useState<boolean>(false)
    const [shapeIndex, setShapeIndex] = useState<number>(0)
    const [imageIndex, setImageIndex] = useState<number>(7)
    const [hueChange, setHueChange] = useState<number>(0)
    const [brightnessChange, setBrightnessChange] = useState<number>(100)
    const [isInvert, setIsInvert] = useState<boolean>(false)
    const [isBnW, setIsBnW] = useState<boolean>(false)
    const [isSaturated, setIsSaturated] = useState<boolean>(false)
    const [saturation, setSaturation] = useState<number>(1)

    const shapeCssActive: string = " active-shape-item"
    const imageCssActive: string = " active-image-item"
    const imageList: string[] = [
        background0,
        background1,
        background2,
        background3,
        background4,
        background5,
        background6,
    ]

    const style = {
        backgroundImage: "url(" + imageList[imageIndex] + ")",
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        filter: "hue-rotate(" + hueChange + "deg) " +
            "invert(".concat(isInvert ? "1)" : "0)") +
            "saturate(" + saturation as unknown as string + ")" +
            "brightness(" + brightnessChange + "%)",
    }

    const imageStyle = {
        filter: "hue-rotate(" + hueChange + "deg) " +
            "invert(".concat(isInvert ? "1)" : "0)") +
            "saturate(" + saturation as unknown as string + ")" +
            "brightness(" + brightnessChange + "%)",
    }

    function addRoom() {
        let rowSpan: number = 0
        let colSpan: number = 0
        switch (shapeIndex) {
            case 1:
                colSpan = 1
                rowSpan = 1
                break
            case 2:
                colSpan = 1
                rowSpan = 2
                break
            case 3:
                colSpan = 1
                rowSpan = 3
                break
            case 4:
                colSpan = 2
                rowSpan = 1
                break
            case 5:
                colSpan = 2
                rowSpan = 2
                break
            case 6:
                colSpan = 2
                rowSpan = 3
                break
            case 7:
                colSpan = 3
                rowSpan = 1
                break
            case 8:
                colSpan = 3
                rowSpan = 2
                break
            case 9:
                colSpan = 3
                rowSpan = 3
                break
        }
        const isValid: boolean = (
            (0 < colSpan) && (colSpan < 4)
            && (0 < rowSpan) && (rowSpan < 4)
            && (-1 < imageIndex) && (imageIndex < imageList.length))
        if (isValid) {
            const newRoom: Room = {
                id: "",
                name: name,
                imageProperties: {
                    index: imageIndex,
                    hue: hueChange,
                    brightness: brightnessChange,
                    isInverted: isInvert,
                    isBlackAndWhite: isBnW,
                    isOverSaturated: isSaturated
                },
                rowSpan: rowSpan,
                columnSpan: colSpan,
                assignments: new Map<string, string>()
            }
            roomContext.post(newRoom)
            formContext.setAddModalOpen(false)
        }
        else toast.error("Missing Inputs")
    }

    return (
        <div className="add-room">
            <div className="add-room-flex-container" id="add-room-flex-container-name">
                <div className="add-room-name-container">
                    <TextField variant="standard" name="name" label="Name" value={name}
                               onChange={event => setName(event.target.value)}
                               sx={{width: '60%', minWidth: '200px'}}
                    />
                </div>
            </div>
            <div className="add-room-flex-container">
                <div className="icon-label-container">
                    <label htmlFor="add-room-shape">Shape: </label>
                <div className="rotate-icon" onClick={() => {
                    setIsVertical(!isVertical)
                    setShapeIndex(0)
                }}>
                    {isVertical ? <AutorenewRounded/> : <CachedRounded/>}
                </div>
                </div>
                <div id="add-room-shape" className="shape-container">
                    <div className={"shape-item shape-item-1-1".concat(shapeIndex === 1 ? shapeCssActive : "")}
                         onClick={() => setShapeIndex(1)}
                         style={style}
                    >1 X 1
                    </div>
                    {isVertical &&
                        <div className={"shape-item shape-item-1-2".concat(shapeIndex === 2 ? shapeCssActive : "")}
                             onClick={() => setShapeIndex(2)}
                             style={style}
                        >1 X 2</div>}
                    {isVertical &&
                        <div className={"shape-item shape-item-1-3".concat(shapeIndex === 3 ? shapeCssActive : "")}
                             onClick={() => setShapeIndex(3)}
                             style={style}
                        >1 X 3</div>}
                    {!isVertical &&
                        <div className={"shape-item shape-item-2-1".concat(shapeIndex === 4 ? shapeCssActive : "")}
                             onClick={() => setShapeIndex(4)}
                             style={style}
                        >2 X 1</div>}
                    <div className={"shape-item shape-item-2-2".concat(shapeIndex === 5 ? shapeCssActive : "")}
                         onClick={() => setShapeIndex(5)}
                         style={style}
                    >2 X 2
                    </div>
                    {isVertical &&
                        <div className={"shape-item shape-item-2-3".concat(shapeIndex === 6 ? shapeCssActive : "")}
                             onClick={() => setShapeIndex(6)}
                             style={style}
                        >2 X 3</div>}
                    {!isVertical &&
                        <div className={"shape-item shape-item-3-1".concat(shapeIndex === 7 ? shapeCssActive : "")}
                             onClick={() => setShapeIndex(7)}
                             style={style}
                        >3 X 1</div>}
                    {!isVertical &&
                        <div className={"shape-item shape-item-3-2".concat(shapeIndex === 8 ? shapeCssActive : "")}
                             onClick={() => setShapeIndex(8)}
                             style={style}
                        >3 X 2</div>}
                    <div className={"shape-item shape-item-3-3".concat(shapeIndex === 9 ? shapeCssActive : "")}
                         onClick={() => setShapeIndex(9)}
                         style={style}
                    >3 X 3
                    </div>
                </div>
            </div>
            <div className="add-room-flex-container">
                <label htmlFor="add-room-background">Background: </label>
                <div id="add-room-background" className="background-item-container">
                    {imageList.map((image, index) => {
                        return (
                            <div
                                className={"background-item".concat(imageIndex === index ? imageCssActive : "")}
                                key={image}
                                onClick={() => {
                                    setImageIndex(index)
                                }}
                                id={"background-item-".concat(index as unknown as string)}>
                                <img
                                    src={imageList[index]}
                                    alt={"Background Image ".concat(index as unknown as string)}
                                    style={imageStyle}
                                />
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className="add-room-flex-container">
                <label htmlFor="add-room-filter-container">Image Filter: </label>
                <div id="add-room-filter-container" className="filter-container">
                <div className="slider-container">
                    <Slider id="add-room-hue-slider"
                            className="add-room-slider"
                            defaultValue={0}
                            value={hueChange}
                            max={360} valueLabelDisplay="auto"
                            onChange={(_, value) => setHueChange(value as number)}/>
                    <label htmlFor="add-room-hue-slider">Hue</label>
                    <Slider id="add-room-brightness-slider"
                            className="add-room-slider"
                            defaultValue={100}
                            value={brightnessChange}
                            max={200} valueLabelDisplay="auto"
                            onChange={(_, value) => setBrightnessChange(value as number)}/>
                    <label htmlFor="add-room-brightness-slider">Brightness</label>
                </div>
                    <FormGroup>
                        <FormControlLabel control={
                            <Switch checked={isInvert} onChange={() => setIsInvert(!isInvert)}/>
                        } label="Invert"/>
                        <FormControlLabel control={
                            <Switch checked={isBnW} onChange={event => {
                                setIsBnW(!isBnW)
                                event.target.checked ? setSaturation(0) : setSaturation(1)
                                event.target.checked && setIsSaturated(false)
                            }}/>
                        } label="B&W"/>
                        <FormControlLabel control={
                            <Switch checked={isSaturated} onChange={event => {
                                setIsSaturated(!isSaturated)
                                event.target.checked ? setSaturation(2) : setSaturation(1)
                                event.target.checked && setIsBnW(false)
                            }}/>
                        } label="Saturate"/>
                    </FormGroup>
                    <Button onClick={() => {
                        setSaturation(1)
                        setBrightnessChange(100)
                        setIsInvert(false)
                        setIsBnW(false)
                        setIsSaturated(false)
                        setHueChange(0)
                    }
                    }>Reset</Button>
                </div>
            </div>
            <Button color="success" onClick={addRoom}>Add Room</Button>
        </div>
    )
}