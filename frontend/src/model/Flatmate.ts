import dayjs, {Dayjs} from "dayjs";

export type Flatmate = {
    id: string,
    firstName: string,
    lastName: string,
    photoUrl: string,
    dateOfBirth: Dayjs,
    eatingHabits: EatingHabits,
    contact: Contact,
    availability: string
}

export type PersonalInfo = {
    firstName: string,
    lastName: string,
    photoUrl: string,
    dateOfBirth: Dayjs
}

export type EatingHabits = {
    vegetarian: boolean,
    vegan: boolean,
    likes: string[],
    dislikes: string[],
    allergies: string[]
}

export type Contact = {
    eMail: string,
    phone: string,
    payPal: string
}

export const dummyFlatmate: Flatmate = {
    id: "",
    firstName: "",
    lastName: "",
    photoUrl: "",
    dateOfBirth: dayjs('2000-01-01'),
    eatingHabits: {
        vegan: false,
        vegetarian: false,
        likes: [],
        dislikes: [],
        allergies: []
    },
    contact: {
        eMail: "",
        phone: "",
        payPal: ""
    },
    availability: "AT_HOME"
}