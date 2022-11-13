import { useState } from "react"
import { IoCloseSharp } from "react-icons/io5"
import "./SearchModal.css"

const SearchModal = ({ setOpen }) => {
    const [searchQuery, setSearchQuery] = useState("")

    const onSubmit = () => {
        console.log("searching")
    }

    return (
        <div className="overlay">
            <div className="search--modal">
                <div className="search--title">
                    <h1>Search Patient</h1>
                    <button type="button" onClick={() => setOpen(false)} id="closeButton"><IoCloseSharp id="closeIcon" /></button>
                </div>
                <div className="search--form">
                    <form onSubmit={onSubmit}>
                        <div className="search--form--details">
                            <div className="search--form--inputs">
                                <label htmlFor="email">Email</label>
                                <input
                                    className="search--form--input"
                                    type="text"
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