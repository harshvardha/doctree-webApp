import { useState } from "react";
import React from "react";

const DoctreeContext = React.createContext()

const DoctreeProvider = ({ children }) => {
    // const [accessToken, setAccessToken] = useState("")
    // const [role, setRole] = useState("")
    const [user, setUser] = useState()

    return (
        <DoctreeContext.Provider
            value={{
                user,
                setUser
            }}
        >
            {children}
        </DoctreeContext.Provider>
    )
}

export { DoctreeContext, DoctreeProvider }