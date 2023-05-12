import {Room} from "../../model/Room";
import {useState} from "react";


export default function RoomGridItem(props: { room: Room }) {

    const [cssClasses, setCssClasses] = useState<string>(calcGridClass())
    const [active, setActive] = useState<boolean>(false)
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
        <div className={"grid-item ".concat(cssClasses)}
             style={{boxShadow: (props.room.assignments.size === 0) ? "0 0.5rem 1rem 0 rgba(200, 0, 0, 0.5)" : ""}}
             onClick={() => {
                 setActive(!active)
                 active
                     ? setCssClasses(cssClasses.concat(" active-grid-item"))
                     : setCssClasses(cssClasses.replace("active-grid-item", ""))
             }}>
            <div className="background-image-container" style={style}></div>
            <p className="grid-item-name">{props.room.name}</p>
        </div>
    )
}