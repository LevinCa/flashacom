export type Room = {
    id: string,
    name: string,
    imageProperties: ImageProperties
    rowSpan: number,
    columnSpan: number,
    assignments: string[]
}

export type ImageProperties = {
    index: number,
    hue: number,
    brightness: number,
    isInverted: boolean
    isBlackAndWhite: boolean,
    isOverSaturated: boolean
}

export const dummyImageProperties: ImageProperties = {
    index: 7,
    hue: 0,
    brightness: 0,
    isInverted: false,
    isBlackAndWhite: false,
    isOverSaturated: false
}

export const dummyRoom: Room = {
    id: "",
    name: "",
    imageProperties: dummyImageProperties,
    rowSpan: 1,
    columnSpan: 1,
    assignments: []
}