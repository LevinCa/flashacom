

export type User = {
    id: string,
    username: string,
    password?: string,
    flatmateId: string,
    communityId: string
}

export const dummyUser: User = {
    id: "",
    username: "",
    password: "",
    flatmateId: "",
    communityId: ""
}