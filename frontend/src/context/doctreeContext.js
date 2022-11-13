import { useState } from "react";
import React from "react";

const DoctreeContext = React.createContext()

const DoctreeProvider = ({ children }) => {
    const [accessToken, setAccessToken] = useState("")
    const [role, setRole] = useState("")
    const [prescriptions, setPrescriptions] = useState([])

    return (
        <DoctreeContext.Provider
            value={{
                prescriptions,
                role,
                accessToken,
                setAccessToken,
                setRole,
                setPrescriptions
            }}
        >
            {children}
        </DoctreeContext.Provider>
    )
}

export { DoctreeContext, DoctreeProvider }