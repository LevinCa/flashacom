import {createContext, ReactElement, useState} from "react";


export const FormProvider = createContext<{
    addModalOpen: boolean,
    setAddModalOpen: (open: boolean) => void
}>({
    addModalOpen: false,
    setAddModalOpen: () => {
    }
})

export default function FormContext(props: { children: ReactElement }) {

    const [addModalOpen, setAddModalOpen] = useState<boolean>(false)

    return (
        <FormProvider.Provider value={{
            addModalOpen: addModalOpen,
            setAddModalOpen: setAddModalOpen
        }}>
            {props.children}
        </FormProvider.Provider>
    )
}