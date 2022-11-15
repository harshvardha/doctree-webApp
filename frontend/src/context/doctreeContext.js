import { useState } from "react";
import React from "react";

const DoctreeContext = React.createContext()

const DoctreeProvider = ({ children }) => {
    // This prescription state will be used when doctor is logged in to store the prescriptions of the patient searched
    const [patient, setPatient] = useState()
    const [user, setUser] = useState()

    return (
        <DoctreeContext.Provider
            value={{
                patient,
                user,
                setPatient,
                setUser
            }}
        >
            {children}
        </DoctreeContext.Provider>
    )
}

export { DoctreeContext, DoctreeProvider }