import {Room} from "../../model/Room";
import {useState} from "react";


export default function RoomGridItem(props: { room: Room }) {

    const [cssClasses, setCssClasses] = useState<string>(calcGridClass())
    const [active, setActive] = useState<boolean>(false)

    function calcGridClass(): string {
        return "grid-item-row-span-"
            .concat(props.room.rowSpan as unknown as string)
            .concat("-col-span-")
            .concat(props.room.columnSpan as unknown as string)
    }

    const image: string = require("../../resources/".concat(props.room.imageProperties.imageIndex as unknown as string).concat(".jpeg"))

    const style = {
        backgroundImage: "url(" + image + ")",
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        cursor: 'pointer'
    }

    return (
        <div className={"grid-item ".concat(cssClasses)}
             style={style} onClick={() => {
                 setActive(!active)
                 active
                     ? setCssClasses(cssClasses.concat(" active-grid-item"))
                     : setCssClasses(cssClasses.replace("active-grid-item", ""))
        }}>
            <div className="grid-item-name">{props.room.name}</div>
        </div>
    )
}