export type Room = {
    id: string,
    name: string,
    imageIndex: number,
    rowSpan: number,
    columnSpan: number,
    assignments: Map<string, string>
}

export const dummyRoom: Room = {
    id: "",
    name: "",
    imageIndex: 0,
    rowSpan: 1,
    columnSpan: 1,
    assignments: Map.prototype
}