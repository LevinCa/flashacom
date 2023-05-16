import {createContext, ReactElement, useState} from "react";


export const FormProvider = createContext<{
    addModalOpen: boolean,
    setAddModalOpen: (open: boolean) => void,
    roomEditOpen: boolean,
    setRoomEditOpen: (open: boolean) => void
}>({
    addModalOpen: false,
    setAddModalOpen: () => {},
    roomEditOpen: false,
    setRoomEditOpen: () => {}
})

export default function FormContext(props: { children: ReactElement }) {

    const [addModalOpen, setAddModalOpen] = useState<boolean>(false)
    const [roomEditOpen, setRoomEditOpen] = useState<boolean>(false)

    return (
        <FormProvider.Provider value={{
            addModalOpen: addModalOpen,
            setAddModalOpen: setAddModalOpen,
            roomEditOpen: roomEditOpen,
            setRoomEditOpen: setRoomEditOpen
        }}>
            {props.children}
        </FormProvider.Provider>
    )
}