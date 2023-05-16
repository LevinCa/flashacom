import {Room} from "../../model/Room";
import {useContext} from "react";
import {RoomProvider} from "../../context/RoomContext";
import {FormProvider} from "../../context/FormContext";


export default function RoomGridItem(props: { room: Room }) {

    const roomContext = useContext(RoomProvider)
    const formContext = useContext(FormProvider)
    const cssClasses = calcGridClass()
    const saturate = () => {
        if (props.room.imageProperties.isBlackAndWhite) return 0
        else if (props.room.imageProperties.isOverSaturated) return 2
        else return 1
    }

    function calcGridClass(): string {
        return "grid-item-row-span-"
            .concat(props.room.rowSpan as unknown as string)
            .concat("-col-span-")
            .concat(props.room.columnSpan as unknown as string)
    }

    const image: string = require("../../resources/".concat(props.room.imageProperties.index as unknown as string).concat(".jpeg"))

    const style = {
        backgroundImage: "url(" + image + ")",
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        cursor: 'pointer',
        filter: "hue-rotate(" + props.room.imageProperties.hue + "deg) " +
            "invert(".concat(props.room.imageProperties.isInverted ? "1)" : "0)") +
            "saturate(" + saturate() + ")" +
            "brightness(" + props.room.imageProperties.brightness + "%)",
    }

    return (
        <div
            className={"grid-item ".concat(cssClasses).concat(props.room.assignments.length === 0 ? " unassigned-room" : "")}
            onClick={() => {
                roomContext.setCurrentRoom(props.room)
                formContext.setRoomEditOpen(true)
            }}
        >
            <div className="background-image-container" style={style}></div>
            <p className="grid-item-name">{props.room.name}</p>
        </div>
    )
}