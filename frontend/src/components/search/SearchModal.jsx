import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { DoctreeContext } from "../../context/doctreeContext"
import { doctorRequests } from "../../services/supplier"
import { IoCloseSharp } from "react-icons/io5"
import "./SearchModal.css"

const SearchModal = ({ setOpen }) => {
    const [searchQuery, setSearchQuery] = useState("")
    const { setPatient } = useContext(DoctreeContext)
    const navigateTo = useNavigate()

    const searchPatient = async (event) => {
        try {
            event.preventDefault()
            console.log(searchQuery)
            const accessToken = localStorage.getItem("ACCESS_TOKEN")
            const response = await doctorRequests.getPatient(accessToken, searchQuery)
            if (response.status === 401) {
                window.alert("Session Expired. Please login again")
                navigateTo("/")
            }
            else if (response.status === 500) {
                return window.alert("Internal Server Error")
            }
            else if (response.status === 200) {
                const data = response.data.patient
                setPatient(data)
                setOpen(false)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="overlay">
            <div className="search--modal">
                <div className="search--title">
                    <h1>Search Patient</h1>
                    <button type="button" onClick={() => setOpen(false)} id="closeButton"><IoCloseSharp id="closeIcon" /></button>
                </div>
                <div className="search--form">
                    <form onSubmit={searchPatient}>
                        <div className="search--form--details">
                            <div className="search--form--inputs">
                                <label htmlFor="email">Email</label>
                                <input
                                    className="search--form--input"
                                    type="email"
                                    value={searchQuery}
                                    onChange={(event) => setSearchQuery(event.target.value)}
                                    required
                                />
                            </div>
                            <button type="submit" id="form--searchButton">Search</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SearchModal