import {useContext, useState} from "react";
import './AddRoom.css'
import {AutorenewRounded, CachedRounded} from "@mui/icons-material";
import {RoomProvider} from "../../context/RoomContext";
import 0 from '../../resources/0.jpeg'

export default function AddRoom() {

    const roomContext = useContext(RoomProvider)
    const [isVertical, setIsVertical] = useState<boolean>(false)
    const [shapeIndex, setShapeIndex] = useState<number>(0)
    const cssActive: string = " active-shape-item"
    const imageList: string[] = [
        "../../resources/0.jpeg",
        "../../resources/1.jpeg",
        "../../resources/2.jpeg",
        "../../resources/3.jpeg",
        "../../resources/4.jpeg",
        "../../resources/5.jpeg",
        "../../resources/6.jpeg"
    ]

    function fetchImage(index: number): string {
        return require(imageList[index]) as string
    }

    return (
        <div className="add-room">
            <label htmlFor="add-room-shape">Shape: </label>
            <div className="rotate-icon" onClick={() => {
                setIsVertical(!isVertical)
                setShapeIndex(0)
            }}>
                {isVertical ? <AutorenewRounded/> : <CachedRounded/>}
            </div>
            <div id="add-room-shape" className="shape-container">
                <div className={"shape-item shape-item-1-1".concat(shapeIndex === 1 ? cssActive : "")}
                     onClick={() => setShapeIndex(1)}
                >1 X 1
                </div>
                {isVertical &&
                    <div className={"shape-item shape-item-1-2".concat(shapeIndex === 2 ? cssActive : "")}
                         onClick={() => setShapeIndex(2)}
                    >1 X 2</div>}
                {isVertical &&
                    <div className={"shape-item shape-item-1-3".concat(shapeIndex === 3 ? cssActive : "")}
                         onClick={() => setShapeIndex(3)}
                    >1 X 3</div>}
                {!isVertical &&
                    <div className={"shape-item shape-item-2-1".concat(shapeIndex === 4 ? cssActive : "")}
                         onClick={() => setShapeIndex(4)}
                    >2 X 1</div>}
                <div className={"shape-item shape-item-2-2".concat(shapeIndex === 5 ? cssActive : "")}
                     onClick={() => setShapeIndex(5)}
                >2 X 2
                </div>
                {isVertical &&
                    <div className={"shape-item shape-item-2-3".concat(shapeIndex === 6 ? cssActive : "")}
                         onClick={() => setShapeIndex(6)}
                    >2 X 3</div>}
                {!isVertical &&
                    <div className={"shape-item shape-item-3-1".concat(shapeIndex === 7 ? cssActive : "")}
                         onClick={() => setShapeIndex(7)}
                    >3 X 1</div>}
                {!isVertical &&
                    <div className={"shape-item shape-item-3-2".concat(shapeIndex === 8 ? cssActive : "")}
                         onClick={() => setShapeIndex(8)}
                    >3 X 2</div>}
                <div className={"shape-item shape-item-3-3".concat(shapeIndex === 9 ? cssActive : "")}
                     onClick={() => setShapeIndex(9)}
                >3 X 3
                </div>
            </div>
            <label htmlFor="add-room-background">Background: </label>
            <div id="add-room-background" className="background-item-container">
            {imageList.map((image, index) => {
                return (
                        <div
                            className="background-item"
                            key={index}
                            id={"background-item-".concat(index as unknown as string)}>
                            <img src={require(imageList[index])} alt={"Background Image ".concat(index as unknown as string)}/>
                        </div>
                )})}
            </div>
        </div>
    )
}