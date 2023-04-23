
export type Flatmate = {
    id: string,
    firstName: string,
    lastName: string,
    photoUrl: string,
    dateOfBirth: Date,
    eatingHabits: EatingHabits,
    contact: Contact,
    availability: string
}

type EatingHabits = {
    vegetarian: boolean,
    vegan: boolean,
    likes: string[],
    dislikes: string[],
    allergies: string[]
}

type Contact = {
    eMail: string,
    phone: string,
    payPal: string
}
